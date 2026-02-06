---
title: "Troubleshooting"
description: "Common issues and basic verification."
tags: ["troubleshooting"]
order: 8
lastUpdated: 2026-02-06
---

## Common issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `Limited mode` | Not running as Administrator | Run with elevated privileges |
| `Execution failed` | Secondary Logon service disabled | Enable the service: `sc config seclogon start= auto` |
| `Access denied` | Target is a Protected Process (PPL) | Choose a different target process |
| `Not found` | Process doesn't exist | Verify process name or PID |

## Requirements

| Component | Requirement |
|-----------|-------------|
| OS | Windows 10/11 (x64) |
| Privileges | Administrator (recommended) |
| Services | Secondary Logon (enabled) |
| Compiler | Nim >= 2.0 |
| Dependencies | winim |

## Quick checklist

1. Build succeeds and binary is generated.
2. Controlled environment with appropriate permissions.
3. Valid, accessible target.

If issues persist, review your lab logs and adjust the flow to a safe testing scenario.

## See also

- [Installation](/en/arsenal/faceless/setup)
- [FAQ](/en/arsenal/faceless/faq)
