---
title: "Architecture"
description: "Modulos y flujo principal."
tags: ["architecture"]
order: 7
---

Modulos principales:

- faceless.nim: main logic
- dynapi.nim: dynamic API resolution
- strenc.nim: string obfuscation
- ppid.nim: PPID spoofing

Flujo resumido:

1. Resolucion dinamica de APIs
2. Parseo de argumentos
3. Token impersonation
4. Creacion de proceso con PPID spoofing

Detalle por fases:

- Inicializacion: carga dinamica de APIs y validacion de dependencias.
- Escalada: seleccion de objetivo y duplicacion de token.
- Ejecucion: creacion de proceso con contexto elevado y parent ajustado.
