---
title: "Red Team with WSL2: Network Monitoring Blind Spot"
date: 2026-02-11
description: "How a Red Teamer can abuse Hyper-V communication channels (AF_VSOCK) for unmonitored communication and Cross-OS lateral movement."
image: /images/blog/wsl2_evasion.png
tags: ["red-team", "wsl2", "evasion", "hyper-v", "offensive-security"]
featured: true
---

The challenge of operating stealthily in Windows "User Land" has reached a saturation point. Hooks in `ntdll`, ETW (Event Tracing for Windows) monitoring, and NDIS filters in the network stack make moving or executing code increasingly noisy.

But what if I told you there is a direct tunnel to the Windows kernel that most security solutions completely ignore? Welcome to **WSL2** and the world of **Hyper-V Sockets (AF_VSOCK)**.

## The Paradigm Shift: Decoupling and "Shadow Instances"

Traditionally, we treat WSL (Windows Subsystem for Linux) as a simple tool. But for a Red Teamer, it is a **"Shadow Instance"**: a full operating system sharing the hardware but not the Host's security oversight.

It is vital to clarify a common myth: **WSL2 does not make you invisible to the corporate perimeter firewall**. Traffic leaving Linux towards the internet (e.g., your C2) still passes through the `vEthernet` interface and finally the physical NIC, being visible to a Palo Alto or BlueCoat.

The real advantage is **Correlation Decoupling**. Although traffic exits via the physical NIC and is visible to the firewall, the source process is a Linux binary (e.g., `curl` or a custom ELF), **not a Windows process**.
This breaks the typical correlation chain that looks for "Windows Process X making Connection Y". The firewall sees the traffic, but the host monitoring tools don't see which Windows process generated it (because a Windows process didn't generate it).

## Staring into the Abyss: Low-Level Architecture

To understand the true invisibility of this technique, we must dissect the WSL2 architecture beyond the surface.

### 1. The Privilege Hierarchy (Rings)

On a modern Windows machine with VBS (Virtualization-based Security) enabled:
*   **Ring 3 (User Mode)**: Where your applications and security agents live.
*   **Ring 0 (Kernel Mode)**: The realm of drivers, the NT kernel, and security callbacks feeding telemetry.
*   **Ring -1 (Hypervisor)**: Hyper-V reigns here. It is the most privileged level.

WSL2 is not a containerized process; it is a **Lightweight Utility VM**. Linux runs its own kernel parallel to the Windows kernel. When we use `AF_VSOCK`, communication is facilitated by the Hypervisor via **shared memory channels** and signaling mechanisms, rather than a traditional virtualized network.

### 2. VMBus: The Memory Highway

The **VMBus** is a logical transport mechanism between Hyper-V partitions. It is not a network; it is a shared memory channel based on Ring Buffers.

*   **In Linux (Guest)**: The `hv_sock` driver (`drivers/hv/hv_sock.c`) exposes the `AF_VSOCK` address family. Writing to the socket copies data directly to the VMBus Ring Buffer.
*   **In Windows (Host)**: The `hvsock.sys` driver (Kernel Mode) picks up this data from the VMBus and delivers it to the service or process listening on `AF_HYPERV`.

### 3. The Blind Spot: NDIS and WFP

Most network monitoring solutions in Windows (Personal Firewalls, sensors with network inspection) anchor themselves at two points:
1.  **NDIS (Network Driver Interface Specification)**: Filters for physical or virtual network drivers (`vEthernet`).
2.  **WFP (Windows Filtering Platform)**: Callouts to inspect TCP/IP, UDP packets, etc.

**AF_VSOCK traffic is never encapsulated in an IP packet**. It has no Ethernet headers, no IP, no TCP. It is a raw Byte Stream flowing from memory to memory managed by the Hypervisor.
As a result, the traffic **passes underneath** NDIS and WFP filters. For a solution monitoring the network stack, this communication simply *does not exist*.

The addressing scheme is simple and alien to IP:
*   **CID (Context Identifier)**: `CID_HOST (2)` is our backdoor to the Windows Host.
*   **Puerto**: A 32-bit integer.

## Weaponizing Virtualization

This is where the **Cross-OS** attack comes in. This technique shines in **Post-Exploitation** scenarios: you have already compromised the "Shadow Instance" (Linux) or the Host, and are looking for persistence or stealthy lateral movement.
If we control Linux, we can pump arbitrary data into the Host. We just need a user to execute (or inject) a small "Receiver" on Windows that listens on the socket.

### Traveler: The Proof of Concept

To demonstrate this, I developed **Traveler** (source code available in the repo), a tool designed to inject shellcode from WSL2 directly into Windows memory.

The attack architecture is as follows:

1.  **Leymano (Sender - Linux)**: Encrypts the payload (shellcode) and sends it via an `AF_VSOCK` socket to CID 2.
2.  **Anchor (Receiver - Windows)**: Listens on `AF_HYPERV` (Windows' implementation of vsock), receives the stream, decrypts it in memory, and executes it.

The brilliance of this scheme is not the execution itself, but the **transport**. The payload never touches the disk on Windows (avoiding static AV scans) and never travels over the network (avoiding corporate IDS/IPS).

## Show me the Code (Nim)

Implementing this is surprisingly simple thanks to modern languages like Nim, which allows us to interact with the Windows API and Linux syscalls with ease.

### The Host Side (Windows)

On Windows, we need to manually define the `SOCKADDR_HV` structure, as it's not standard in all headers. Note the `VmId` and `ServiceId`.

```nim
import winim/lean

# Definition of the structure for Hyper-V Sockets
type SOCKADDR_HV {.pure, final.} = object
  Family*: USHORT
  Reserved*: USHORT
  VmId*: GUID      # VM ID (or Host ID)
  ServiceId*: GUID # Service ID (similar to port)

# Template for the VSOCK GUID
# Notice how the port is embedded in the first dword of the GUID
proc makeServiceGUID(port: uint32): GUID =
  result = GUID(Data1: port.int32, Data2: 0xfacb, Data3: 0x11e6, 
                Data4: [0xbd.byte, 0x58, 0x64, 0x00, 0x6a, 0x79, 0x86, 0xd3])
```

To listen, we simply create a socket with the `AF_HYPERV` (34) family:

```nim
var s = socket(34, SOCK_STREAM, 1) # AF_HYPERV, 1 = HV_PROTOCOL_RAW
bind(s, ...)
listen(s, 1)
```

### The Guest Side (Linux)

From Linux, connection is trivial. We use the standard `AF_VSOCK` (40) family and point to `CID_HOST` (2).

```nim
import posix

const
  AF_VSOCK = 40
  VMADDR_CID_HOST = 2
  TARGET_PORT = 5005

var fd = socket(AF_VSOCK, SOCK_STREAM, 0)

var addr_vm: SockAddr_VM
addr_vm.svm_family = AF_VSOCK
addr_vm.svm_port = TARGET_PORT
addr_vm.svm_cid = VMADDR_CID_HOST

# Connecting directly to the Windows kernel...
connect(fd, addr_vm, ...)
send(fd, payload, ...)
```

## Conclusion: The Hidden Attack Surface

WSL2 has brought Linux to the Windows desktop, but it has also brought new communication primitives that are not yet fully mature from a security observability standpoint.

For a Red Teamer, **AF_VSOCK** represents a golden opportunity to:
1.  Exfiltrate data stealthily.
2.  Move laterally between operating systems on the same iron.
3.  Evade strict network controls.

Tools like **Traveler** are just the tip of the iceberg. As OS integration deepens, security boundaries become blurrier. And it is in that fog where we operate best.
