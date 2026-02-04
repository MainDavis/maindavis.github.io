---
title: "Usage"
description: "Quick command reference and general flow."
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

Recommended flow:

1. Enumerate processes and validate context.
2. Select authorized target (PID or name).
3. Use quiet mode when appropriate.

Legal note:

- Use these options only on systems you own or have written permission to test.
