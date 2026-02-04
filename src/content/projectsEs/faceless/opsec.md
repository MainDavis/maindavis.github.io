---
title: "OPSEC"
description: "Evasion y reduccion de huella."
tags: ["opsec", "evasion"]
order: 4
---

Faceless reduce superficie de deteccion con:

- IAT limpia mediante GetModuleHandle + GetProcAddress
- Strings sensibles ofuscadas en tiempo de compilacion
- PPID spoofing para procesos hijos
- Minimiza permisos solicitados cuando es posible

Consideraciones:

- El objetivo es bajar indicadores estaticos y patrones de comportamiento obvios.
- Evita depender de librerias externas que aumenten huella.
- Registra lo minimo necesario en operaciones autorizadas.

Buenas practicas:

- Ejecuta pruebas en entornos aislados y con autorizacion explicita.
- Documenta cambios y versiones en el blog del proyecto.
