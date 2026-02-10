---
title: "Setup"
description: "Requisitos y compilación en Linux y Windows."
tags: ["setup", "installation"]
order: 6
lastUpdated: 2026-02-10
---

## Prerrequisitos

### En Linux / WSL2 (Leymano)

- Distribucion Linux (Kali u otra distro orientada a seguridad) o WSL2 con soporte AF\_VSOCK.
- Compilador y toolchain de **Nim** instalados.
- Herramienta para generar shellcode en formato **crudo** (framework de pentest o utilidades propias).

### En Windows (Anchor)

- Windows 10/11 con **WSL2** y **Hyper-V** habilitados.
- **Nim** instalado en el host Windows.
- Toolchain de compilacion (por ejemplo `mingw-w64` / `gcc` para Windows).
- **Permisos de administrador** para modificar el registro relacionado con `GuestCommunicationServices`.

## Compilación

### 1. Clonar el repositorio

```bash
git clone https://github.com/MainDavis/Traveler.git
cd Traveler
```

### 2. Compilar Leymano (Linux / WSL2)

```bash
cd sender
nim c -d:release --opt:size Leymano.nim
# Genera el binario `Leymano`
```

### 3. Compilar Anchor (Windows)

En PowerShell o CMD:

```powershell
cd .\receiver\
nim c -d:release --cpu:amd64 --opt:size Anchor.nim
# Genera el binario `Anchor.exe`
```

## Preparación del payload

- Genera shellcode en formato crudo (PIC) con la herramienta que prefieras.
- Guarda el resultado como `payload.bin`.
- Copia `payload.bin` al mismo directorio donde vas a ejecutar `Leymano`.

## Ver tambien

- [Usage](/es/arsenal/traveler/usage)
- [Troubleshooting](/es/arsenal/traveler/troubleshooting)
