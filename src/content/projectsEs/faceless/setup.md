---
title: "Installation"
description: "Prerequisitos, dependencias y build."
tags: ["installation", "nim", "windows"]
order: 5
---

Prerequisitos:

- Nim >= 2.0
- winim package

Instalacion de dependencias:

```bash
nimble install winim
```

Build:

```bash
git clone https://github.com/MainDavis/Faceless.git
cd Faceless
build.cmd
```

Alternativa manual:

```bash
nim c faceless.nim
```

Notas:

- Usa entornos aislados y autorizados para pruebas.
- Revisa `nim.cfg` para ver flags de optimizacion y ofuscacion.
