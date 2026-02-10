---
title: "Traveler"
description: "Cross-OS fileless loader between WSL2 and Windows using hypervisor channels."
status: "active"
statusLabel: "active"
version: "1.0"
owner: "MainDavis"
lastUpdated: 2026-02-10
image: /images/projects/traveler.png
tags: ["red-team", "windows", "wsl2", "loader", "nim"]
order: 2
featured: true
---

## Overview

Traveler is a **cross-OS fileless loader** built for labs and **authorized** Red Team operations. It leverages internal virtualization channels (AF_VSOCK / Hyper-V) to move encrypted shellcode from a Linux/WSL2 environment directly into Windows host memory, avoiding disk artifacts and reducing exposure on traditional network paths.

This arsenal documentation summarizes architecture, operational flow, and OPSEC notes. It does not introduce new offensive techniques and is not intended for use outside controlled environments.

## Scope

- Windows 10/11 environments with WSL2 / Hyper-V enabled.
- Scenarios where the operator controls both the Linux guest and the Windows host.
- Experiments around fileless chains and hypervisor-backed channels.

## Quick summary

- **Leymano → AF_VSOCK → Anchor** end-to-end in memory.
- Lightweight per-session XOR encryption before sending the payload.
- RW reception, in-place decryption, and late switch to RX.
- Indirect execution via API callback (`EnumSystemLocalesA`).

## Repository

Official repository: https://github.com/MainDavis/Traveler

## See also

- [Overview](/en/arsenal/traveler/overview)
- [Features](/en/arsenal/traveler/features)
- [Architecture](/en/arsenal/traveler/architecture)
- [Usage](/en/arsenal/traveler/usage)
- [OPSEC](/en/arsenal/traveler/opsec)
- [FAQ](/en/arsenal/traveler/faq)
- [Troubleshooting](/en/arsenal/traveler/troubleshooting)
