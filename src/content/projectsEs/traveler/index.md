---
title: "Traveler"
description: "Loader fileless entre WSL2 y Windows usando canales de hipervisor."
status: "active"
statusLabel: "activo"
version: "1.0"
owner: "MainDavis"
lastUpdated: 2026-02-10
image: /images/projects/traveler.png
tags: ["red-team", "windows", "wsl2", "loader", "nim"]
order: 2
featured: true
---

## Overview

Traveler es un **loader fileless cross-OS** pensado para laboratorios y operaciones de Red Team **autorizadas**. Utiliza canales internos de virtualizacion (AF_VSOCK / Hyper-V) para mover shellcode cifrado desde un entorno Linux/WSL2 directamente a la memoria del host Windows, evitando artefactos en disco y reduciendo la huella en la red tradicional.

La documentacion de este arsenal resume arquitectura, flujo operativo y consideraciones OPSEC. No introduce tecnicas ofensivas nuevas ni esta pensado para uso fuera de entornos controlados.

## Alcance

- Entornos Windows 10/11 con WSL2 / Hyper-V habilitado.
- Escenarios donde el operador controla tanto el guest Linux como el host Windows.
- Pruebas de cadenas fileless y canales de hipervisor.

## Resumen rapido

- Cadena **Leymano → AF_VSOCK → Anchor** totalmente en memoria.
- Cifrado XOR ligero por sesion antes de transmitir el payload.
- Recepcion RW, descifrado in-place y cambio posterior a RX.
- Ejecucion indirecta mediante callback de API (`EnumSystemLocalesA`).

## Repositorio

Repositorio oficial: https://github.com/MainDavis/Traveler

## Ver tambien

- [Overview](/es/arsenal/traveler/overview)
- [Features](/es/arsenal/traveler/features)
- [Architecture](/es/arsenal/traveler/architecture)
- [Usage](/es/arsenal/traveler/usage)
- [OPSEC](/es/arsenal/traveler/opsec)
- [FAQ](/es/arsenal/traveler/faq)
- [Troubleshooting](/es/arsenal/traveler/troubleshooting)
