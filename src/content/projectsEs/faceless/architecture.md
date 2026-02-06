---
title: "Architecture"
description: "Modulos y flujo principal."
tags: ["architecture"]
order: 7
lastUpdated: 2026-02-06
---

## Modulos principales

- faceless.nim: main logic
- dynapi.nim: dynamic API resolution
- strenc.nim: string obfuscation
- ppid.nim: PPID spoofing

## Estructura del proyecto

```
Faceless/
├── faceless.nim      # Main application logic
├── dynapi.nim        # Dynamic API resolution module
├── strenc.nim        # Compile-time string encryption
├── ppid.nim          # Parent PID spoofing implementation
├── nim.cfg           # Compiler configuration (release optimizations)
├── build.cmd         # Build script
└── README.md
```

## Flujo resumido

1. Resolucion dinamica de APIs
2. Parseo de argumentos
3. Token impersonation
4. Creacion de proceso con PPID spoofing

## Detalle por fases

- Inicializacion: carga dinamica de APIs y validacion de dependencias.
- Escalada: seleccion de objetivo y duplicacion de token.
- Ejecucion: creacion de proceso con contexto elevado y parent ajustado.

## Ver tambien

- [Overview](/es/arsenal/faceless/overview)
- [Features](/es/arsenal/faceless/features)
