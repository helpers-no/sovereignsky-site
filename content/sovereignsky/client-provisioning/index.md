---
title: "Client Provisioning of Rancher Desktop"
identifier: "client-provisioning"
weight: 23
date: 2025-01-01
description: "Automated deployment of Rancher Desktop and DevContainer Toolbox to developer machines via Intune (Windows) and Jamf (macOS). A developer gets a new machine, the scripts install everything, and they open any project in a fully configured devcontainer within minutes."
summary: "Automated Rancher Desktop deployment to Windows and Mac machines — via Intune, Jamf, or USB stick."
status: "active"
repository: "https://github.com/helpers-no/client-provisioning"
externalUrl: "/sovereignsky/client-provisioning/"
topics:
  - "cybersecurity"
  - "critical-infrastructure"
tags:
  - "provisioning"
  - "intune"
  - "jamf"
  - "windows"
  - "macos"
  - "automation"
audience:
  - "it-ops"
  - "enterprise"
showHero: true
heroStyle: "big"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "Automated Rancher Desktop deployment to Windows and Mac machines — via Intune, Jamf, or USB stick.",
  "description": "Deployment scripts for setting up developer machines with container-based dev environments. Supports Windows (Intune) and macOS (Jamf)."
}
{{< /summary >}}

## The Goal

A developer gets a new managed machine. The scripts install Rancher Desktop and the DevContainer Toolbox automatically. They open any project in a fully configured devcontainer within minutes. No manual setup. No IT tickets. No "it works on my machine."

## Who This Is For

This is for **operations teams in larger organizations** responsible for setting up and managing PC/Mac fleets. If your developers use managed machines deployed via Intune (Windows) or Jamf (macOS), these scripts automate the entire developer toolchain rollout.

**Not using managed machines?** If your developers manage their own machines, they can install [DevContainer Toolbox](https://dct.sovereignsky.no/) directly with a single command — no need for this provisioning setup.

## What Gets Installed

The scripts install [Rancher Desktop](https://rancherdesktop.io/) (a container runtime) and the [DevContainer Toolbox](https://dct.sovereignsky.no/) — giving developers a complete, ready-to-use environment with 20+ pre-configured tools.

| | macOS | Windows |
|-|-------|---------|
| **Step 1** | Rancher Desktop | WSL2 (Windows features) |
| **Step 2** | DevContainer Toolbox | Rancher Desktop |
| **Step 3** | | DevContainer Toolbox |
| **Reboot needed** | No | Yes (after WSL2) |
| **Managed via** | Jamf | Intune |

Windows requires an extra step because WSL2 must be enabled before Rancher Desktop can run.

## Why This Matters for Maintenance

The biggest benefit isn't just onboarding new developers — it's maintenance. When the maintenance team needs to fix a bug in a system they didn't build, they check out the repo and get the exact same environment the original developer used. Same tools, same versions, same configuration. No guessing.

## Script Standards

Every script follows strict standards enforced by validation tools:

- Version number and unique ID
- Numbered error codes (ERR001, etc.)
- `--help` flag with consistent format
- Structured logging (`log_info`, `log_error`, `log_success`)
- Automatic version bumping via pre-commit hook

## CI/CD Pipeline

Windows `.intunewin` packages are built automatically by Azure Pipelines when changes are pushed to `main`. Mac scripts are validated on push. Each package is a separate artifact ready to upload to Intune.

## USB Testing

No Intune? No problem. Scripts can be copied to a USB stick for manual testing on Windows PCs — useful for testing in isolated environments or before MDM is set up.

## Help Wanted: Silent WSL2 Install

The biggest unsolved problem: automating WSL2 install on Windows via Intune. WSL2 requires enabling Windows features and a reboot, which is tricky to do silently in an MDM pipeline. If you have experience with Intune and WSL2 deployment, we'd love your help.
