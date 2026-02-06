---
title: "Faceless"
description: "Token impersonation and privilege escalation with OPSEC focus."
status: "active"
statusLabel: "active"
version: "1.2"
owner: "MainDavis"
lastUpdated: 2026-02-06
image: /images/projects/faceless.png
tags: ["red-team", "windows", "opsec", "nim"]
order: 1
featured: true
---

## Overview

Faceless is a lightweight Windows toolkit based on **token impersonation** and built for controlled operations with an OPSEC mindset. The goal is to minimize operational noise and detection surface while executing actions in higher-privileged contexts.

This documentation focuses on architecture, concepts, and safe usage in authorized environments. It does not include new offensive techniques or guidance outside legal scope.

## Scope

- Controlled operations in authorized environments.
- Focus on reproducibility and documentation.
- Minimal external dependencies to reduce noise.

## Quick summary

- Dynamic API resolution to keep the IAT clean
- Compile-time string obfuscation to reduce signatures
- PPID spoofing for spawned processes

## Repository

Official repository: https://github.com/MainDavis/Faceless

## See also

- [Overview](/en/arsenal/faceless/overview)
- [Installation](/en/arsenal/faceless/setup)
- [Usage](/en/arsenal/faceless/usage)
- [OPSEC](/en/arsenal/faceless/opsec)
