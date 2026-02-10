---
title: "Usage"
description: "Step-by-step operational flow."
tags: ["usage"]
order: 7
lastUpdated: 2026-02-10
---

## Phase 1: Prepare the payload

1. On the Linux/WSL2 machine, generate shellcode in raw PIC format.  
2. Choose a **lab-safe** behavior (for example, showing a window or performing a benign action).  
3. Export the buffer to a file named `payload.bin`.  
4. Place `payload.bin` in the same directory as `Leymano`.

## Phase 2: Start the receiver on Windows

On the Windows host, with administrator rights:

```powershell
cd C:\path\to\Traveler\receiver
.\Anchor.exe
```

Anchor will:

- Discover the active WSL instance and its GUID.  
- Register the communication service under `GuestCommunicationServices`.  
- Open the AF\_HYPERV listener for the configured port (5005 by default).  
- Wait for an incoming connection from the guest.

Expected output includes messages similar to:

```text
[*] WSL2 Stream Loader
[+] LISTENER ACTIVE. Waiting for injection...
```

## Phase 3: Run the sender on Linux / WSL2

On the Linux/WSL2 VM:

```bash
cd sender
./Leymano
```

Leymano will:

- Load `payload.bin` into memory.  
- Generate a session key and XOR-encrypt the payload.  
- Establish an AF\_VSOCK socket towards `CID 2` and the configured port.  
- Send key, size, and encrypted stream to Anchor.

## Phase 4: Injection and execution

On Windows, Anchor:

- Receives the session key and payload size.  
- Reserves RW memory and downloads the encrypted stream into it.  
- Applies XOR in-place to recover the clear-text shellcode.  
- Switches the region to RX.  
- Calls `EnumSystemLocalesA`, passing the shellcode pointer as a callback, which triggers execution.

## See also

- [OPSEC](/en/arsenal/traveler/opsec)
- [Troubleshooting](/en/arsenal/traveler/troubleshooting)
