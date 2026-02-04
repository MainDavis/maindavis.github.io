---
title: "Usage"
description: "Referencia rapida de comandos y flujo general."
tags: ["usage", "cli"]
order: 6
---

Quick reference:

```bash
faceless.exe --help              # Show help
faceless.exe list                # List all processes
faceless.exe list explorer       # Filter by name
faceless.exe --system            # Auto-escalate to SYSTEM
faceless.exe -p 1234             # Target specific PID
faceless.exe -n winlogon.exe     # Target by name
faceless.exe --system -q         # Silent mode
```

Flujo recomendado:

1. Enumerar procesos y validar contexto.
2. Seleccionar objetivo autorizado (PID o nombre).
3. Ejecutar con modo silencioso cuando aplique.

Nota legal:

- Usa estas opciones solo en sistemas propios o con permiso escrito.
