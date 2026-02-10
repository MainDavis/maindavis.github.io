---
title: "Troubleshooting"
description: "Errores comunes y cómo depurarlos."
tags: ["troubleshooting"]
order: 10
lastUpdated: 2026-02-10
---

## Anchor no encuentra WSL / GUID vacío

**Sintomas**

- El log muestra algo como:  
  `[!] No se encontró WSL. Asegúrate de que Kali está corriendo.`

**Posibles causas**

- La instancia WSL2 no está iniciada.  
- `hcsdiag list` no devuelve lineas con `WSL` o el formato ha cambiado.

**Acciones**

- Inicia manualmente tu distro WSL2 y vuelve a lanzar `Anchor.exe`.  
- Ejecuta `hcsdiag list` en una consola con privilegios elevados y comprueba que aparece la instancia WSL junto a un GUID.  
- Si el formato de salida ha cambiado, puede ser necesario ajustar el regex en `getWslGuid`.

## Error al crear el servicio en el registro

**Sintomas**

- Mensaje `[!] ERROR: Se requieren permisos de ADMINISTRADOR.`  
- Fallo en `setupRegistry`.

**Posibles causas**

- Anchor se está ejecutando sin permisos de administrador.  
- Políticas de seguridad impiden cambios en `HKLM\...\GuestCommunicationServices`.

**Acciones**

- Ejecuta `Anchor.exe` desde una consola “Ejecutar como administrador”.  
- Verifica que tu usuario tiene permisos sobre esa rama del registro.

## Fallos de conexión desde Leymano

**Sintomas**

- Mensaje `[!] Error conectando. ¿Receiver ejecutándose como Admin?`

**Posibles causas**

- Anchor no está en ejecución o fallo al arrancar.  
- Puerto / ServiceId no coinciden entre sender y receiver.  
- Problemas de configuracion en Hyper-V / AF\_VSOCK.

**Acciones**

- Asegúrate de que `Anchor.exe` está ejecutandose sin errores antes de lanzar `Leymano`.  
- Comprueba que `TARGET_PORT` en Leymano coincide con el puerto configurado al generar el `ServiceGUID` en Anchor.  
- Revisa la configuracion de WSL2 y Hyper-V, y que tu entorno soporta AF\_VSOCK.

## El payload no parece ejecutarse

**Sintomas**

- Los logs muestran que se recibe y descifra el payload, pero no se observa el efecto esperado.

**Posibles causas**

- El shellcode no es PIC o depende de contexto que no esta disponible.  
- La clave XOR usada para cifrar/descifrar no coincide por algun error de modificacion de codigo.  
- El callback falla silenciosamente y el control no vuelve al proceso padre.

**Acciones**

- Valida el payload con un loader de prueba mas simple antes de usar Traveler.  
- Prueba primero con shellcode muy basico (ej. MessageBox) para confirmar la cadena.  
- Activa logs mas verbosos o instrumentation en un entorno de laboratorio para inspeccionar memoria y flujo de ejecucion.

## Ver tambien

- [Setup](/es/arsenal/traveler/setup)
- [Usage](/es/arsenal/traveler/usage)
