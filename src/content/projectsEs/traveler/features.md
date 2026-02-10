---
title: "Features"
description: "Capacidades principales del loader."
tags: ["opsec", "features"]
order: 4
lastUpdated: 2026-02-10
---

## Resumen de capacidades

| Feature | Description |
|--------|-------------|
| Canal AF\_VSOCK / Hyper-V | Uso de sockets de hipervisor para comunicar guest Linux y host Windows sin pasar por TCP/IP. |
| Cifrado por sesion | Generacion de una clave XOR de 1 byte por ejecucion para cifrar el payload antes de enviarlo. |
| Entrega fileless | El shellcode en claro solo existe en memoria del host; no se escriben binarios adicionales en NTFS. |
| Registro dinamico del servicio | Creacion y configuracion de la clave `GuestCommunicationServices` en el registro de Windows en runtime. |
| Ejecucion indirecta | Uso de `EnumSystemLocalesA` como callback para ejecutar el shellcode sin `CreateThread`. |
| Compatibilidad WSL2 | Descubrimiento automatico del GUID de la instancia WSL activa mediante `hcsdiag`. |

## Notas

- Traveler no intenta ser un framework todo-en-uno, sino una PoC centrada en **un flujo muy concreto** de entrega e inyeccion.
- El payload real (shellcode) es agnostico: lo unico que exige es ser **PIC en formato crudo**.

## Ver tambien

- [Architecture](/es/arsenal/traveler/architecture)
- [OPSEC](/es/arsenal/traveler/opsec)
