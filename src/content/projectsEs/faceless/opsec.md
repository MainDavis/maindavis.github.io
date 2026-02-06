---
title: "OPSEC"
description: "Evasion y reduccion de huella."
tags: ["opsec", "evasion"]
order: 4
lastUpdated: 2026-02-06
---

## Mecanismos principales

Faceless reduce superficie de deteccion con:

- IAT limpia mediante GetModuleHandle + GetProcAddress
- Strings sensibles ofuscadas en tiempo de compilacion
- PPID spoofing para procesos hijos
- Minimiza permisos solicitados cuando es posible

### IAT limpia

Las APIs sensibles se resuelven en runtime con `GetModuleHandle` + `GetProcAddress`, evitando imports sospechosos en la IAT.

### Ofuscacion de strings

Strings sensibles se cifran en compilacion y se descifran en memoria en tiempo de ejecucion:

- `winlogon.exe`, `lsass.exe`, `services.exe`
- `SeDebugPrivilege`
- `NT AUTHORITY\\SYSTEM`
- `kernel32.dll`, `advapi32.dll`

### PPID spoofing

Los procesos hijos se crean con un parent legitimo (`explorer.exe`, `svchost.exe`) para romper cadenas sospechosas.

### Huella minima

- Solicita `PROCESS_QUERY_LIMITED_INFORMATION` cuando es posible.
- Manejo de errores silencioso.
- Sin simbolos ni metadata en builds release.

## Consideraciones

- El objetivo es bajar indicadores estaticos y patrones de comportamiento obvios.
- Evita depender de librerias externas que aumenten huella.
- Registra lo minimo necesario en operaciones autorizadas.

## Buenas practicas

- Ejecuta pruebas en entornos aislados y con autorizacion explicita.
- Documenta cambios y versiones en el blog del proyecto.

## Ver tambien

- [Features](/es/arsenal/faceless/features)
- [Troubleshooting](/es/arsenal/faceless/troubleshooting)
