---
title: "Troubleshooting"
description: "Common errors and how to debug them."
tags: ["troubleshooting"]
order: 10
lastUpdated: 2026-02-10
---

## Anchor cannot find WSL / empty GUID

**Symptoms**

- Logs show something like:  
  `[!] No WSL instance found. Make sure Kali is running.`

**Possible causes**

- The WSL2 instance is not started.  
- `hcsdiag list` does not return lines with `WSL`, or the output format changed.

**Actions**

- Manually start your WSL2 distro and run `Anchor.exe` again.  
- Run `hcsdiag list` in an elevated console and confirm the WSL instance and GUID are present.  
- If the output format changed, you may need to adjust the regex in `getWslGuid`.

## Error creating the registry service

**Symptoms**

- Message `[!] ERROR: Administrator privileges required.`  
- Failure inside `setupRegistry`.

**Possible causes**

- Anchor is being run without administrator rights.  
- Security policies block changes under `HKLM\...\GuestCommunicationServices`.

**Actions**

- Run `Anchor.exe` from an “Run as administrator” console.  
- Verify that your user has permissions on that registry branch.

## Connection failures from Leymano

**Symptoms**

- Message `[!] Error connecting. Is Receiver running as Admin?`

**Possible causes**

- Anchor is not running or failed during startup.  
- Port / ServiceId do not match between sender and receiver.  
- Configuration issues in Hyper-V / AF\_VSOCK.

**Actions**

- Ensure `Anchor.exe` is running without errors before launching `Leymano`.  
- Confirm that `TARGET_PORT` in Leymano matches the port used to build the `ServiceGUID` in Anchor.  
- Review WSL2 and Hyper-V configuration and check that AF\_VSOCK is supported in your environment.

## Payload appears not to execute

**Symptoms**

- Logs show that the payload is received and decrypted, but you do not see the expected effect.

**Possible causes**

- Shellcode is not PIC or depends on unavailable context.  
- XOR key used for encryption/decryption does not match due to code changes.  
- The callback fails silently and control never returns to the parent process.

**Actions**

- Validate the payload with a simpler test loader before using Traveler.  
- Start with very basic shellcode (for example, MessageBox) to confirm the chain.  
- Enable more verbose logging or instrumentation in a lab environment to inspect memory and control flow.

## See also

- [Setup](/en/arsenal/traveler/setup)
- [Usage](/en/arsenal/traveler/usage)
