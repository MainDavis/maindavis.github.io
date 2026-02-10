---
title: "Overview"
description: "Contexto, objetivos y piezas principales."
tags: ["overview"]
order: 3
lastUpdated: 2026-02-10
---

## Contexto

En arquitecturas basadas en hipervisor como **WSL2**, el guest Linux y el host Windows se comunican por canales internos que no pasan por la red clasica TCP/IP. Traveler explota estos canales (AF_VSOCK / Hyper-V) para establecer una **cadena de entrega fileless** entre ambos extremos.

La idea central es simple:

- Desde Linux/WSL2 (**Leymano**) se carga un shellcode en bruto, se cifra en memoria y se envía por VSOCK.
- En Windows (**Anchor**) se recibe el stream cifrado, se descifra en memoria y se ejecuta de forma indirecta.

## Objetivos

- Demostrar el uso de **canales de hipervisor** como vector de comunicacion para loaders.
- Reducir artefactos en disco en el host Windows.
- Mantener un flujo de ejecucion menos trivial que el clasico RWX + `CreateThread`.
- Servir como **PoC educativo** para operadores y defensores, no como herramienta genérica de abuso.

## Piezas principales

- **Leymano (Sender – Linux/WSL2)**: binario Nim que lee `payload.bin`, cifra el contenido y lo envia al host via AF_VSOCK.
- **Anchor (Receiver – Windows)**: binario Nim que configura el servicio de comunicacion, recibe el stream cifrado, lo descifra y dispara el shellcode mediante callback.

## Ver tambien

- [Architecture](/es/arsenal/traveler/architecture)
- [Features](/es/arsenal/traveler/features)
- [Usage](/es/arsenal/traveler/usage)
