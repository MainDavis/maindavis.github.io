---
title: "Faceless"
description: "Token impersonation y escalada de privilegios con enfoque OPSEC."
status: "active"
statusLabel: "activo"
version: "1.2"
owner: "MainDavis"
lastUpdated: 2026-02-06
image: /images/projects/faceless.png
tags: ["red-team", "windows", "opsec", "nim"]
order: 1
featured: true
---

## Overview

Faceless es un toolkit ligero para Windows basado en **token impersonation** y pensado para operaciones controladas con enfoque OPSEC. Su objetivo es reducir huella y ruido operativo al ejecutar acciones en el contexto de procesos privilegiados, evitando patrones triviales de deteccion.

Esta documentacion resume conceptos, arquitectura y uso seguro en entornos autorizados. No incluye tecnicas ofensivas nuevas ni recomendaciones para abuso fuera de un contexto legal.

## Alcance

- Operaciones controladas en entornos autorizados.
- Foco en reproducibilidad y documentacion.
- Minimiza dependencias externas para reducir ruido.

## Resumen rapido

- Resolucion dinamica de APIs para mantener la IAT limpia
- Ofuscacion de strings en compilacion para minimizar firmas
- PPID spoofing para procesos creados

## Repositorio

Repositorio oficial: https://github.com/MainDavis/Faceless

## Ver tambien

- [Overview](/es/arsenal/faceless/overview)
- [Installation](/es/arsenal/faceless/setup)
- [Usage](/es/arsenal/faceless/usage)
- [OPSEC](/es/arsenal/faceless/opsec)
