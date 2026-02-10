---
title: "Features"
description: "Core capabilities of the loader."
tags: ["opsec", "features"]
order: 4
lastUpdated: 2026-02-10
---

## Capability summary

| Feature | Description |
|--------|-------------|
| AF\_VSOCK / Hyper-V channel | Uses hypervisor sockets to connect Linux guest and Windows host without going through TCP/IP. |
| Per-session encryption | Generates a 1-byte XOR key per run to encrypt the payload before sending it. |
| Fileless delivery | Shellcode in clear-text only ever lives in host memory; no extra binaries are written to NTFS. |
| Dynamic service registration | Creates and configures the `GuestCommunicationServices` registry key in Windows at runtime. |
| Indirect execution | Uses `EnumSystemLocalesA` as a callback to execute shellcode without `CreateThread`. |
| WSL2 awareness | Automatically discovers the active WSL instance GUID using `hcsdiag`. |

## Notes

- Traveler is not meant to be an all-in-one framework; it is a PoC focused on **one very specific** delivery and injection flow.
- The actual payload (shellcode) is agnostic: the only requirement is being **PIC in raw format**.

## See also

- [Architecture](/en/arsenal/traveler/architecture)
- [OPSEC](/en/arsenal/traveler/opsec)
