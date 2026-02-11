---
title: "Red Team con WSL2: Punto Ciego en la Monitorización de Red"
date: 2026-02-11
description: "Cómo un Red Teamer puede abusar de los canales de comunicación de Hyper-V (AF_VSOCK) para comunicaciones ocultas y movimiento lateral Cross-OS."
image: /images/blog/wsl2_evasion.png
tags: ["red-team", "wsl2", "evasion", "hyper-v", "offensive-security"]
featured: true
---

El desafío de operar sigilosamente en entornos Windows ha llegado a un punto de saturación en el "User Land". Hooks en `ntdll`, monitoreo de ETW (Event Tracing for Windows), y filtros NDIS en la pila de red hacen que moverse o ejecutar código sea cada vez más ruidoso.

Pero, ¿y si te dijera que hay un túnel directo al kernel de Windows que la mayoría de las soluciones de seguridad ignoran por completo? Bienvenido a **WSL2** y el mundo de los **Hyper-V Sockets (AF_VSOCK)**.

## El Cambio de Paradigma: Desacople y "Shadow Instances"

Tradicionalmente, tratamos a WSL (Windows Subsystem for Linux) como una simple herramienta. Pero para un Red Teamer, es una **"Instancia en la Sombra" (Shadow Instance)**: un sistema operativo completo que comparte el hardware pero no la supervisión de seguridad del Host.

Es vital aclarar un mito común: **WSL2 no te hace invisible al firewall perimetral corporativo**. El tráfico que sale de Linux hacia internet (ej. tu C2) sigue pasando por la interfaz `vEthernet` y finalmente por la NIC física, siendo visible para un Palo Alto o BlueCoat.

La verdadera ventaja es el **Desacople de Correlación**. Aunque el tráfico sale por la NIC física y es visible para el firewall, el proceso origen es un binario de Linux (ej. `curl` o un ELF custom), **no un proceso de Windows**.
Esto rompe la cadena de correlación típica de las herramientas de monitorización que buscan "Proceso Windows X haciendo conexión Y". El firewall ve el tráfico, pero el sistema no ve qué proceso de Windows lo generó (porque no lo generó Windows).

## Profundizando en el Abismo: Arquitectura de Bajo Nivel

Para entender la verdadera invisibilidad de esta técnica, debemos diseccionar la arquitectura de WSL2 más allá de lo superficial.

### 1. La Jerarquía de Privilegios (Rings)

En una máquina con Windows moderno y VBS (Virtualization-based Security) activado:
*   **Ring 3 (User Mode)**: Donde viven tus aplicaciones y los agentes de seguridad.
*   **Ring 0 (Kernel Mode)**: El reino de los drivers, el kernel de NT y los callbacks de seguridad que alimentan la telemetría.
*   **Ring -1 (Hypervisor)**: Aquí reina Hyper-V. Es el nivel más privilegiado.

WSL2 no es un proceso contenedorizado; es una **Lightweight Utility VM**. Linux corre en su propio kernel en paralelo al kernel de Windows. Cuando usamos `AF_VSOCK`, la comunicación es facilitada por el Hypervisor mediante **canales de memoria compartida** y mecanismos de señalización, en lugar de una red virtualizada tradicional.

### 2. VMBus: La Autopista de Memoria

El **VMBus** es un mecanismo de transporte lógico entre particiones de Hyper-V. No es una red; es un canal de memoria compartida basado en Ring Buffers.

*   **En Linux (Guest)**: El driver `hv_sock` (`drivers/hv/hv_sock.c`) expone la familia de direcciones `AF_VSOCK`. Al escribir en el socket, los datos se copian directamente al Ring Buffer del VMBus.
*   **En Windows (Host)**: El driver `hvsock.sys` (Kernel Mode) recoge estos datos desde el VMBus y los entrega al servicio o proceso que escucha en `AF_HYPERV`.

### 3. El Punto Ciego: NDIS y WFP

La mayoría de las soluciones de monitorización de red en Windows (Firewalls personales, sensores con inspección de red) se anclan en dos puntos:
1.  **NDIS (Network Driver Interface Specification)**: Filtros para drivers de red física o virtual (`vEthernet`).
2.  **WFP (Windows Filtering Platform)**: Callouts para inspeccionar paquetes TCP/IP, UDP, etc.

**El tráfico de AF_VSOCK nunca es encapsulado en un paquete IP**. No tiene cabeceras Ethernet, ni IP, ni TCP. Es un stream de bytes crudo (Byte Stream) que fluye de memoria a memoria gestionado por el Hypervisor.
Como resultado, el tráfico **pasa por debajo** de los filtros NDIS y WFP. Para una solución que vigila la pila de red, esta comunicación simplemente *no existe*.

El esquema de direccionamiento es simple y ajeno a IP:
*   **CID (Context Identifier)**: `CID_HOST (2)` es nuestra puerta trasera al Windows Host.
*   **Puerto**: Un entero de 32 bits.

## Weaponizando la Virtualización

Aquí es donde entra el ataque **Cross-OS**. Esta técnica brilla en escenarios de **Post-Explotación**: ya has comprometido la "Shadow Instance" (Linux) o el Host, y buscas persistencia o movimiento lateral sigiloso.
Si controlamos Linux, podemos bombear datos arbitrarios hacia Windows. Solo necesitamos que un usuario ejecute (o inyectar) un pequeño "Receiver" en Windows que escuche en el socket.

### Traveler: La Prueba de Concepto

Para demostrar esto, desarrollé **Traveler** (puedes ver el código fuente en el repositorio), una herramienta diseñada para inyectar shellcode desde WSL2 directamente a la memoria de Windows.

La arquitectura del ataque es la siguiente:

1.  **Leymano (Sender - Linux)**: Cifra el payload (shellcode) y lo envía a través de un socket `AF_VSOCK` hacia el CID 2.
2.  **Anchor (Receiver - Windows)**: Escucha en `AF_HYPERV` (la implementación de Windows de vsock), recibe el stream, lo descifra en memoria y lo ejecuta.

Lo brillante de este esquema no es la ejecución en sí, sino el **transporte**. El payload nunca toca el disco en Windows (evitando escaneos de AV estáticos) y nunca viaja por la red (evitando IDS/IPS corporativos).

## Show me the Code (Nim)

Implementar esto es sorprendentemente sencillo gracias a lenguajes modernos como Nim, que nos permite interactuar con la API de Windows y los syscalls de Linux con facilidad.

### El Lado del Host (Windows)

En Windows, necesitamos definir la estructura `SOCKADDR_HV` manualmente, ya que no es estándar en todos los headers. Observa el `VmId` y `ServiceId`.

```nim
import winim/lean

# Definición de la estructura para Hyper-V Sockets
type SOCKADDR_HV {.pure, final.} = object
  Family*: USHORT
  Reserved*: USHORT
  VmId*: GUID      # ID de la VM (o del Host)
  ServiceId*: GUID # ID del servicio (similar al puerto)

# Template para el GUID de VSOCK
# Fíjate cómo el puerto se incrusta en el primer dword del GUID
proc makeServiceGUID(port: uint32): GUID =
  result = GUID(Data1: port.int32, Data2: 0xfacb, Data3: 0x11e6, 
                Data4: [0xbd.byte, 0x58, 0x64, 0x00, 0x6a, 0x79, 0x86, 0xd3])
```

Para escuchar, simplemente creamos un socket con la familia `AF_HYPERV` (34):

```nim
var s = socket(34, SOCK_STREAM, 1) # AF_HYPERV, 1 = HV_PROTOCOL_RAW
bind(s, ...)
listen(s, 1)
```

### El Lado del Guest (Linux)

Desde Linux, conectar es trivial. Usamos la familia estándar `AF_VSOCK` (40) y apuntamos al `CID_HOST` (2).

```nim
import posix

const
  AF_VSOCK = 40
  VMADDR_CID_HOST = 2
  TARGET_PORT = 5005

var fd = socket(AF_VSOCK, SOCK_STREAM, 0)

var addr_vm: SockAddr_VM
addr_vm.svm_family = AF_VSOCK
addr_vm.svm_port = TARGET_PORT
addr_vm.svm_cid = VMADDR_CID_HOST

# Conectando directamente al kernel de Windows...
connect(fd, addr_vm, ...)
send(fd, payload, ...)
```

## Conclusión: La Superficie de Ataque Oculta

WSL2 ha traído Linux al escritorio de Windows, pero también ha traído nuevas primitivas de comunicación que aún no están totalmente maduras desde el punto de vista de la observabilidad de seguridad.

Para un Red Teamer, **AF_VSOCK** representa una oportunidad de oro para:
1.  Exfiltrar datos de forma sigilosa.
2.  Moverse lateralmente entre sistemas operativos en el mismo hierro.
3.  Evadir controles de red estrictos.

Las herramientas como **Traveler** son solo la punta del iceberg. A medida que la integración entre sistemas operativos se profundiza, las fronteras de seguridad se vuelven más difusas. Y es en esa niebla donde nosotros operamos mejor.
