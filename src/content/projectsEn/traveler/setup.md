---
title: "Setup"
description: "Requirements and build steps on Linux and Windows."
tags: ["setup", "installation"]
order: 6
lastUpdated: 2026-02-10
---

## Prerequisites

### On Linux / WSL2 (Leymano)

- Linux distribution (Kali or another security-focused distro) or WSL2 with AF\_VSOCK support.
- **Nim** compiler and toolchain.
- Tooling to generate shellcode in **raw** format (pentest framework or custom utilities).

### On Windows (Anchor)

- Windows 10/11 with **WSL2** and **Hyper-V** enabled.
- **Nim** installed on the Windows host.
- Build toolchain (for example `mingw-w64` / `gcc` for Windows).
- **Administrator privileges** to modify the registry area related to `GuestCommunicationServices`.

## Build

### 1. Clone the repository

```bash
git clone https://github.com/MainDavis/Traveler.git
cd Traveler
```

### 2. Build Leymano (Linux / WSL2)

```bash
cd sender
nim c -d:release --opt:size Leymano.nim
# Produces the `Leymano` binary
```

### 3. Build Anchor (Windows)

In PowerShell or CMD:

```powershell
cd .\receiver\
nim c -d:release --cpu:amd64 --opt:size Anchor.nim
# Produces the `Anchor.exe` binary
```

## Payload preparation

- Generate shellcode in raw (PIC) format with your tool of choice.
- Save the result as `payload.bin`.
- Copy `payload.bin` into the same directory where you will run `Leymano`.

## See also

- [Usage](/en/arsenal/traveler/usage)
- [Troubleshooting](/en/arsenal/traveler/troubleshooting)
