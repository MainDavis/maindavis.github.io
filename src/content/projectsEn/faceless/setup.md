---
title: "Installation"
description: "Prerequisites, dependencies, and build."
tags: ["installation", "nim", "windows"]
order: 5
---

Prerequisites:

- Nim >= 2.0
- winim package

Install dependencies:

```bash
nimble install winim
```

Build:

```bash
git clone https://github.com/MainDavis/Faceless.git
cd Faceless
build.cmd
```

Manual:

```bash
nim c faceless.nim
```

Notes:

- Use isolated, authorized environments for testing.
- Review `nim.cfg` for optimization and obfuscation flags.
