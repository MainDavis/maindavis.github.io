---
title: "FAQ"
description: "Frequently asked questions about Traveler."
tags: ["faq"]
order: 9
lastUpdated: 2026-02-10
---

## Is Traveler a full post-exploitation framework?

No. Traveler is a **loader-focused proof of concept** that explores hypervisor channels and fileless delivery. The real behavior is entirely defined by the shellcode you generate and run through the chain.

## Can I send PE executables instead of shellcode?

Not directly. Traveler expects **raw PIC shellcode**. If you want to work with PE executables, you must first convert them to shellcode with your preferred tooling.

## Do I have to use Kali / WSL2?

Not strictly, but that is the scenario it targets. Any Linux environment with AF\_VSOCK support should work, though you may need configuration or build tweaks.

## Why use a 1-byte XOR key?

Because it is **simple, fast, and sufficient** for the project’s goal: preventing the payload from travelling in clear-text over the channel. It is not meant to be strong cryptography, just lightweight operational obfuscation.

## What happens if Anchor is not run as Administrator?

Anchor needs administrator privileges to:

- Create and modify the `GuestCommunicationServices` key.  
- Properly configure the communication service.  

Without these privileges, registry operations will fail and communication with WSL2 will not be established.

## Is this suitable for production use?

The project is intended as a **PoC for research and lab environments**. Any production use should be preceded by:

- Code review.  
- Risk assessment.  
- Formal, written authorization.

## See also

- [Overview](/en/arsenal/traveler/overview)
- [OPSEC](/en/arsenal/traveler/opsec)
