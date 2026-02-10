---
title: "FAQ"
description: "Preguntas frecuentes sobre Traveler."
tags: ["faq"]
order: 9
lastUpdated: 2026-02-10
---

## ¿Traveler es un framework completo de post-explotación?

No. Traveler es una **prueba de concepto centrada en el loader** y en el uso de canales de hipervisor para entrega fileless. El comportamiento real lo define el shellcode que tu generes y ejecutes sobre la cadena.

## ¿Puedo enviar ejecutables PE en lugar de shellcode?

No directamente. Traveler espera **shellcode en formato crudo (PIC)**. Si quieres trabajar con ejecutables PE, deberas convertirlos a shellcode mediante la herramienta que prefieras antes de usar Traveler.

## ¿Es obligatorio usar Kali / WSL2?

No, pero es el escenario para el que se ha probado. Cualquier entorno Linux con soporte AF\_VSOCK deberia ser compatible, aunque pueden requerirse ajustes en configuracion o compilacion.

## ¿Por que usar XOR de 1 byte?

Porque es **simple, rapido y suficiente** para el objetivo del proyecto: evitar que el payload viaje en claro por el canal. No intenta ser una capa criptografica fuerte, sino un mecanismo ligero de ofuscacion operativa.

## ¿Que pasa si Anchor no se ejecuta como administrador?

Anchor necesita privilegios de administrador para:

- Crear y modificar la clave de `GuestCommunicationServices`.  
- Configurar correctamente el servicio de comunicacion.  

Si no tienes esos privilegios, el registro fallara y la comunicacion con WSL2 no se completara.

## ¿Se puede usar en produccion?

El proyecto esta pensado como **PoC para investigacion y laboratorio**. Cualquier uso en entornos productivos deberia ir acompañado de:

- Revision de codigo.  
- Evaluacion de riesgos.  
- Autorizacion formal y documentada.

## Ver tambien

- [Overview](/es/arsenal/traveler/overview)
- [OPSEC](/es/arsenal/traveler/opsec)
