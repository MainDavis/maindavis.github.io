---
title: "Troubleshooting"
description: "Problemas comunes y verificacion basica."
tags: ["troubleshooting"]
order: 8
lastUpdated: 2026-02-06
---

## Problemas comunes

| Problema | Causa | Solucion |
|----------|-------|----------|
| `Limited mode` | No ejecuta como Administrador | Ejecuta con privilegios elevados |
| `Execution failed` | Servicio Secondary Logon deshabilitado | Habilita el servicio: `sc config seclogon start= auto` |
| `Access denied` | Target es un proceso protegido (PPL) | Selecciona otro proceso objetivo |
| `Not found` | El proceso no existe | Verifica nombre o PID |

## Requisitos

| Componente | Requisito |
|-----------|-----------|
| OS | Windows 10/11 (x64) |
| Privilegios | Administrador (recomendado) |
| Servicios | Secondary Logon (habilitado) |
| Compilador | Nim >= 2.0 |
| Dependencias | winim |

## Checklist rapido

1. Compilacion sin errores y binario generado.
2. Entorno controlado y con permisos adecuados.
3. Objetivo valido y accesible.

Si el fallo persiste, revisa los logs de tu entorno y ajusta el flujo a un escenario de laboratorio.

## Ver tambien

- [Installation](/es/arsenal/faceless/setup)
- [FAQ](/es/arsenal/faceless/faq)
