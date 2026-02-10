---
title: "Overview"
description: "Context, goals, and main components."
tags: ["overview"]
order: 3
lastUpdated: 2026-02-10
---

## Context

In hypervisor-based architectures such as **WSL2**, the Linux guest and the Windows host communicate over internal channels that do not traverse the classic TCP/IP network. Traveler leverages these channels (AF_VSOCK / Hyper-V) to build a **fileless delivery chain** between both ends.

The core idea is simple:

- On Linux/WSL2 (**Leymano**) a raw shellcode is loaded, encrypted in memory, and sent over VSOCK.
- On Windows (**Anchor**) the encrypted stream is received, decrypted in memory, and executed indirectly.

## Goals

- Demonstrate the use of **hypervisor channels** as a loader communication vector.
- Reduce disk artifacts on the Windows host.
- Keep an execution flow that is less trivial than the classic RWX + `CreateThread` pattern.
- Serve as an **educational PoC** for operators and defenders, not as a generic abuse framework.

## Main components

- **Leymano (Sender – Linux/WSL2)**: Nim binary that reads `payload.bin`, encrypts it, and sends it to the host over AF_VSOCK.
- **Anchor (Receiver – Windows)**: Nim binary that configures the communication service, receives the encrypted stream, decrypts it, and triggers the shellcode through a callback.

## See also

- [Architecture](/en/arsenal/traveler/architecture)
- [Features](/en/arsenal/traveler/features)
- [Usage](/en/arsenal/traveler/usage)
