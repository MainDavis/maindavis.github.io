---
title: "Installation"
description: "Prerequisites, dependencies, and build."
tags: ["installation", "nim", "windows"]
order: 5
lastUpdated: 2026-02-06
---

## Prerequisites

- Nim >= 2.0
- winim package

## Install dependencies

```bash
nimble install winim
```

## Build

```bash
git clone https://github.com/MainDavis/Faceless.git
cd Faceless
build.cmd
```

## Manual build

```bash
nim c faceless.nim
```

## Release build

The `build.cmd` script produces the release binary using `nim.cfg` optimizations.

Relevant flags in `nim.cfg`:

| Flag | Effect |
|------|--------|
| `-d:release -d:danger` | Maximum optimization, no safety checks |
| `--opt:speed` | Optimize for speed |
| `passL = "-s"` | Strip symbols |
| `--stackTrace:off` | Disable stack traces |
| `--checks:off` | Disable runtime checks |
| `passC = "-flto"` | Link-Time Optimization |

## Notes

- Use isolated, authorized environments for testing.
- Review `nim.cfg` for optimization and obfuscation flags.

## See also

- [Usage](/en/arsenal/faceless/usage)
- [Troubleshooting](/en/arsenal/faceless/troubleshooting)
