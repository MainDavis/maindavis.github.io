---
title: "OPSEC"
description: "Evasion and footprint reduction."
tags: ["opsec", "evasion"]
order: 4
lastUpdated: 2026-02-06
---

## Core mechanisms

Faceless reduces detection surface via:

- Clean IAT using GetModuleHandle + GetProcAddress
- Compile-time string obfuscation
- PPID spoofing for child processes
- Minimizes requested permissions when possible

### Clean IAT

Sensitive APIs are resolved at runtime using `GetModuleHandle` + `GetProcAddress`, keeping the IAT free of suspicious imports.

### String obfuscation

Sensitive strings are encrypted at compile time and decoded at runtime:

- `winlogon.exe`, `lsass.exe`, `services.exe`
- `SeDebugPrivilege`
- `NT AUTHORITY\\SYSTEM`
- `kernel32.dll`, `advapi32.dll`

### PPID spoofing

Child processes are spawned with legitimate parents (`explorer.exe`, `svchost.exe`) to break suspicious parent-child chains.

### Minimal footprint

- Requests `PROCESS_QUERY_LIMITED_INFORMATION` where possible.
- Silent error handling.
- No symbols or metadata in release builds.

## Considerations

- The goal is to reduce static indicators and obvious behavioral patterns.
- Avoids external dependencies that increase footprint.
- Keeps logging minimal in authorized operations.

## Best practices

- Use isolated, explicitly authorized environments.
- Document changes and versions in the project blog.

## See also

- [Features](/en/arsenal/faceless/features)
- [Troubleshooting](/en/arsenal/faceless/troubleshooting)
