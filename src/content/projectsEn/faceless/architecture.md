---
title: "Architecture"
description: "Modules and core flow."
tags: ["architecture"]
order: 7
---

Core modules:

- faceless.nim: main logic
- dynapi.nim: dynamic API resolution
- strenc.nim: string obfuscation
- ppid.nim: PPID spoofing

High-level flow:

1. Resolve APIs dynamically
2. Parse arguments
3. Token impersonation
4. Spawn process with PPID spoofing

Phase details:

- Initialization: dynamic API loading and dependency checks.
- Escalation: target selection and token duplication.
- Execution: spawn process in elevated context with adjusted parent.
