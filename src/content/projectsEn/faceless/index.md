---
title: "Faceless"
description: "Token impersonation and privilege escalation with OPSEC focus."
status: "active"
image: /images/projects/faceless.png
tags: ["red-team", "windows", "opsec", "nim"]
order: 1
featured: true
---

Faceless is a lightweight Windows toolkit based on **token impersonation** and built for controlled operations with an OPSEC mindset. The goal is to minimize operational noise and detection surface while executing actions in higher-privileged contexts.

This documentation focuses on architecture, concepts, and safe usage in authorized environments. It does not include new offensive techniques or guidance outside legal scope.

Quick summary:

- Dynamic API resolution to keep the IAT clean
- Compile-time string obfuscation to reduce signatures
- PPID spoofing for spawned processes

Official repository: https://github.com/MainDavis/Faceless
