---
title: "Advanced Reflective DLL Injection in Nim: Bypassing the Loader"
date: 2026-02-04
description: "A deep dive into manual PE mapping using Nim to inject libraries without touching the disk or using standard Windows APIs."
image: /images/blog/dll_injection.png
tags: ["red-team", "malware-dev", "nim", "evasion"]
featured: true
---

Reflective DLL Injection has been a staple in the Red Team arsenal for years. However, the days of simply using Stephen Fewer's original technique and expecting to bypass modern EDRs are long gone. Today, we are taking a look at how to implement an advanced version of this technique using Nim, focusing on manual mapping to stay as stealthy as possible.

The core idea is simple: instead of letting LoadLibrary do the work (which triggers multiple telemetry points), we act as the Windows PE loader ourselves.

# The Manual Mapping Workflow

To successfully map a DLL into a remote process, we need to follow the same steps the OS would:

1. Parsing the PE Header: We need to read the headers to understand where sections go.

2. Allocating Memory: Finding a home for our DLL in the target process.

3. Mapping Sections: Copying .text, .data, and other sections to their relative offsets.

4. Base Relocation: Fixing hardcoded addresses if we didn't get our preferred base address.

5. Import Resolution: Manually loading the functions our DLL needs to run.

6. Execution: Calling the DllMain entry point.

## Defining the PE Structures in Nim

Nim's FFI (Foreign Function Interface) makes it incredibly easy to work with Windows APIs. First, we need to define some structures that Nim doesn't have by default.

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

## Step 1: Memory Allocation and Section Mapping

We start by allocating memory in the target process. Instead of RWX (Read-Write-Execute) memory, which is a huge red flag, we should initially allocate RW and later change it to RX for the code sections.

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

## Step 2: The Relocation Process

Since we rarely get the base address the DLL prefers, we must calculate the "delta" (the difference between the preferred and the actual address) and apply it to every absolute address in the code.

```nim
proc applyRelocations(buffer: pointer, baseAddress: pointer, delta: int64): void =
    # Logic to iterate through IMAGE_DIRECTORY_ENTRY_BASERELOC
    # and patch the addresses in memory
    discard
```

## Step 3: Resolving Imports

This is where many detections happen. Instead of calling GetProcAddress repeatedly, we can parse the export table of ntdll.dll or kernel32.dll manually to find the functions we need.

```nim
proc resolveImports(baseAddress: pointer): void =
    let ntHeader = cast[PIMAGE_NT_HEADERS](cast[ByteAddress](baseAddress) + cast[PIMAGE_DOS_HEADER](baseAddress).e_lfanew)
    let importDir = ntHeader.OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_IMPORT]
    
    # Iterate through IMAGE_IMPORT_DESCRIPTORs
    # Load required DLLs and fix the IAT (Import Address Table)
```

## Why Nim for this?

Nim offers a unique balance. You get the low-level control of C with a much more modern syntax. Plus, the winim library provides excellent bindings. When compiled, Nim generates C code, which means we can apply advanced obfuscation at the source level before it ever hits a compiler like MinGW or MSVC.

## Final Execution

Once the DLL is mapped and fixed, we point a thread to the DllMain.

```nim
let dllMain = cast[proc(hinst: HINSTANCE, reason: DWORD, reserved: LPVOID): BOOL {.stdcall.}](
    cast[ByteAddress](baseAddress) + ntHeader.OptionalHeader.AddressOfEntryPoint
)

dllMain(cast[HINSTANCE](baseAddress), DLL_PROCESS_ATTACH, nil)
```

# Stealth Considerations

To take this to a professional level, consider:

* Module Overloading: Mapping your DLL over a legitimate, already loaded Windows DLL.

* Stack Spoofing: Hiding the return address of your thread to point back to legitimate code.

* Custom Syscalls: Using Nim to perform NtAllocateVirtualMemory via direct syscalls to avoid EDR hooks.

This approach is significantly more robust than basic injection. It leaves no files on disk and avoids the most common API hooks used by defensive tools.
