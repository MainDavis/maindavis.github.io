---
title: "Faceless"
description: "Token impersonation y escalada de privilegios con enfoque OPSEC."
status: "active"
image: /images/projects/faceless.png
tags: ["red-team", "windows", "opsec", "nim"]
order: 1
featured: true
---

Faceless es un toolkit ligero para Windows basado en **token impersonation** y pensado para operaciones controladas con enfoque OPSEC. Su objetivo es reducir huella y ruido operativo al ejecutar acciones en el contexto de procesos privilegiados, evitando patrones triviales de deteccion.

Esta documentacion resume conceptos, arquitectura y uso seguro en entornos autorizados. No incluye tecnicas ofensivas nuevas ni recomendaciones para abuso fuera de un contexto legal.

Resumen rapido:

- Resolucion dinamica de APIs para mantener la IAT limpia
- Ofuscacion de strings en compilacion para minimizar firmas
- PPID spoofing para procesos creados

Repositorio oficial: https://github.com/MainDavis/Faceless
