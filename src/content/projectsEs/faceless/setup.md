---
title: "Installation"
description: "Prerequisitos, dependencias y build."
tags: ["installation", "nim", "windows"]
order: 5
lastUpdated: 2026-02-06
---

## Prerequisitos

- Nim >= 2.0
- winim package

## Instalacion de dependencias

```bash
nimble install winim
```

## Build

```bash
git clone https://github.com/MainDavis/Faceless.git
cd Faceless
build.cmd
```

## Alternativa manual

```bash
nim c faceless.nim
```

## Build release

El script `build.cmd` genera el binario release aplicando optimizaciones del `nim.cfg`.

Flags relevantes en `nim.cfg`:

| Flag | Efecto |
|------|--------|
| `-d:release -d:danger` | Maxima optimizacion, sin checks de seguridad |
| `--opt:speed` | Optimiza por velocidad |
| `passL = "-s"` | Elimina simbolos |
| `--stackTrace:off` | Sin stack traces |
| `--checks:off` | Desactiva checks runtime |
| `passC = "-flto"` | Link-Time Optimization |

## Notas

- Usa entornos aislados y autorizados para pruebas.
- Revisa `nim.cfg` para ver flags de optimizacion y ofuscacion.

## Ver tambien

- [Usage](/es/arsenal/faceless/usage)
- [Troubleshooting](/es/arsenal/faceless/troubleshooting)
