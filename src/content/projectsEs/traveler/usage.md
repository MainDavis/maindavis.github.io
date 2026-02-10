---
title: "Usage"
description: "Flujo operativo paso a paso."
tags: ["usage"]
order: 7
lastUpdated: 2026-02-10
---

## Fase 1: Preparar el payload

1. En la maquina Linux/WSL2, genera un shellcode en formato crudo (PIC).  
2. Define un comportamiento **seguro para laboratorio** (por ejemplo, abrir una ventana o realizar una accion inofensiva).  
3. Exporta el buffer a un archivo llamado `payload.bin`.  
4. Coloca `payload.bin` en el mismo directorio donde resides `Leymano`.

## Fase 2: Levantar el receiver en Windows

En el host Windows, como administrador:

```powershell
cd C:\ruta\al\repositorio\Traveler\receiver
.\Anchor.exe
```

Anchor se encarga de:

- Descubrir la instancia WSL activa y su GUID.  
- Registrar el servicio de comunicacion en `GuestCommunicationServices`.  
- Abrir el listener AF\_HYPERV para el puerto configurado (5005 por defecto).  
- Quedarse esperando una conexion entrante desde el guest.

La salida esperada incluira mensajes del tipo:

```text
[*] WSL2 Stream Loader
[+] LISTENER ACTIVO. Esperando inyección...
```

## Fase 3: Ejecutar el sender en Linux / WSL2

En la VM Linux/WSL2:

```bash
cd sender
./Leymano
```

Leymano:

- Carga `payload.bin` en memoria.  
- Genera una clave de sesion y cifra el payload con XOR.  
- Establece un socket AF\_VSOCK hacia `CID 2` y el puerto configurado.  
- Envia clave, tamaño y stream cifrado hacia Anchor.

## Fase 4: Inyeccion y ejecución

En Windows, Anchor:

- Recibe la clave de sesion y el tamaño del payload.  
- Reserva memoria RW y descarga en ella el stream cifrado.  
- Aplica XOR in-place para recuperar el shellcode en claro.  
- Cambia los permisos de la region a RX.  
- Llama a `EnumSystemLocalesA` pasando el puntero al shellcode como callback, provocando su ejecucion.

## Ver tambien

- [OPSEC](/es/arsenal/traveler/opsec)
- [Troubleshooting](/es/arsenal/traveler/troubleshooting)
