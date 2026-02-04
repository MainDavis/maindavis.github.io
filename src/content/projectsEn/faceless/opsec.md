---
title: "OPSEC"
description: "Evasion and footprint reduction."
tags: ["opsec", "evasion"]
order: 4
---

Faceless reduces detection surface via:

- Clean IAT using GetModuleHandle + GetProcAddress
- Compile-time string obfuscation
- PPID spoofing for child processes
- Minimizes requested permissions when possible

Considerations:

- The goal is to reduce static indicators and obvious behavioral patterns.
- Avoids external dependencies that increase footprint.
- Keeps logging minimal in authorized operations.

Best practices:

- Use isolated, explicitly authorized environments.
- Document changes and versions in the project blog.
