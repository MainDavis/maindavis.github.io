---
title: "Architecture"
description: "Modules and core flow."
tags: ["architecture"]
order: 7
lastUpdated: 2026-02-06
---

## Core modules

- faceless.nim: main logic
- dynapi.nim: dynamic API resolution
- strenc.nim: string obfuscation
- ppid.nim: PPID spoofing

## Project structure

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

## High-level flow

1. Resolve APIs dynamically
2. Parse arguments
3. Token impersonation
4. Spawn process with PPID spoofing

## Phase details

- Initialization: dynamic API loading and dependency checks.
- Escalation: target selection and token duplication.
- Execution: spawn process in elevated context with adjusted parent.

## See also

- [Overview](/en/arsenal/faceless/overview)
- [Features](/en/arsenal/faceless/features)
