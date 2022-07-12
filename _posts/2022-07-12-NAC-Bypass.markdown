---
title: "NAC Bypass"
layout: post
date: 2022-07-11 13:00
image: /assets/images/NAC/network-logo.png
headerImage: true
tag:
- NAC
- cheat-sheet
category: blog
description: NAC, como funciona y bypass.
---

# NAC (Network Access Control) bypass

El NAC es una solución para prevenir conexiónes no autorizadas a redes internas.

## Como funciona un NAC

Intervienen los siguientes actores:

- Supplicant: Equipo portatil o sobremesa que se conecta a la red.
- Authenticator: Switch o Access Point que en base a la configuración NAC va requerir la autentificación del supplicant.
- Authentication server: Sistema que verifica la identidad del Supplicant contra un LDAP.

### Pasos

1. Cuando el Authenticator detecta una nueva conexión envía una solicitud de autentificación.
2. La respuesta del Supplicant incluye el nombre de la identidad que puede ser un nombre de máquina o de usuario.
3. El Authenticator envía esa identidad al Authentication server para que pueda generar un Access-Challenge que unicamente un usuario legítimo podría resolver.
4. Ese Access-Challenge es enviado al Supplicant desde el Authenticator, donde este le responde y contesta para finalmente recibir el OK o el KO

Si el dispositivo no tiene un certíficado válido, no se le daría acceso a ninguna red o bien se le redirige a una red invitado.

### MAB (MAC Authentication Bypass)

Cuando una empresa tiene dispositivos que no tienen la capacidad de implementar este protocolo, la compañía deberá usar whitelistening de MAC.

Si se da este caso y no existen configuraciones de seguridad adicionales se podría acceder a la red de forma sencilla haciendo MAC spoofing con la dirección física de un dispositivo en whitelist.

## NAC Bypass

Existe la posibilidad de saltarnos el NAC, para ello necesitamos introducir un dispositivo HW (Con dos interfaces de red) en la organización y conectarlo a toma de Ethernet con acceso a red.

La idea es implementar con el dispositivo un bridge que permita el flujo de información entre el Supplicant y el Authenticator mientras se monitoriza el tráfico de forma transparente.

Interfaz del Supplicant → Dispositivo ← Toma de red de la compañía

Una vez conectado hay que montar el bridge para poder esnifar el tráfico.

Hay varias opciones:

- Levantar de forma manual el bridge y gestionar reglas de forwarding, IP y ARP.
- Hacer uso de alguna herramienta ya diseñada para ello.
  - Fenrir-OCD
  - SilentBridge ← Esta uso

### Comando

**./silentbridge --create-bridge --upstream eth0 --phy eth1 --sidechannel wlan0**

- upstream: Toma de red de la compañía (eth0)
- phy: Nombre de la interfaz Supplicant (eth1)
- sidechannel: Puede ser una interfaz WiFi o LTE para acceder por SSH y ejecutar los comandos en el dispositivo de forma remota.

## Probamos

En este punto si levantamos TCPDump o Wireshark podemos ver las tramas de autentificación, terminando con un “Success” y como al marcar el puerto como autenticado se comienza solicitando una IP de red por DHCP.

Con esta configuración solo se podría monitorizar el tráfico no cifrado de punto a punto, a no ser que implementemos nuevas reglas para generar tráfico suplantando al Supplicant.

## Bypass

Una vez somos capaces de monitorear el tráfico podemos ir un paso más allá y bypasear el NAC. Para ello vamos a hacer uso del módulo “—add-interaction” de SilentBridge, donde vamos a hacer que el todo el tráfico del dispositivo sea haga pasar por tráfico legítimo del Supplicant.

Antes de nada necesitamos la siguiente información que podemos optener del snifing previo:

- IP de Supplicant → “-client-ip”
- MAC de Supplicant → “—client-mac”
- MAC de switch Authenticator → “—switch-mac”
- MAC del gateway a quien enviar la información → “—gw-mac”

Ejemplo: **./silentbridge --add-interaction --gw-mac a1:b2:c3:a1:b2:c3 --client-ip 10.10.10.10 --upstream eth0 --client-mac a1:b2:c3:a1:b2:c3 --phy eth1 --switch-mac a1:b2:c3:a1:b2:c3 --sidechannel wlan0**

Todo el tráfico del dispositivo se hará suplantando al Supplicant, por lo que parecerá que el tráfico el legítimo.

En este punto se puede realizar cualquier técnica de hacking para enumerar e identificar vulnerabilidades en los sistemas de red.

## Otras técnicas

- NAC bypass using IPv6: [https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/nac-doesn-t-like-your-penetration-testing-device-ipv6-to-the-rescue/](https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/nac-doesn-t-like-your-penetration-testing-device-ipv6-to-the-rescue/)
