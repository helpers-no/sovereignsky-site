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
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "Automated Rancher Desktop deployment to Windows and Mac machines — via Intune, Jamf, or USB stick",
  "description": "A developer gets a new managed machine. The scripts install Rancher Desktop and the DevContainer Toolbox automatically. They open any project in a fully configured devcontainer within minutes."
}
{{< /summary >}}

{{< metadata-sidebar >}}
## Who This Is For

This is for **operations teams in larger organizations** responsible for setting up and managing PC/Mac fleets. If your developers use managed machines deployed via Intune (Windows) or Jamf (macOS), these scripts automate the entire developer toolchain rollout.

**Not using managed machines?** If your developers manage their own machines, they can install [DevContainer Toolbox](https://dct.sovereignsky.no/) directly with a single command — no need for this provisioning setup.

{{< /metadata-sidebar >}}

{{< feature-grid id="what-gets-installed" >}}
{
  "title": "What Gets Installed",
  "columns": [
    {
      "icon": "desktop_mac",
      "title": "macOS (Jamf)",
      "color": "primary",
      "items": [
        "Rancher Desktop",
        "DevContainer Toolbox",
        "No reboot needed"
      ]
    },
    {
      "icon": "desktop_windows",
      "title": "Windows (Intune)",
      "color": "secondary",
      "items": [
        "WSL2 (Windows features)",
        "Rancher Desktop",
        "DevContainer Toolbox",
        "Reboot required after WSL2"
      ]
    }
  ]
}
{{< /feature-grid >}}

{{< highlight-card id="why-this-matters-for-maintenance" >}}
{
  "icon": "build_circle",
  "title": "Why This Matters for Maintenance",
  "description": "The biggest benefit isn't just onboarding new developers — it's maintenance. When the maintenance team needs to fix a bug in a system they didn't build, they check out the repo and get the exact same environment the original developer used. Same tools, same versions, same configuration.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< persona-cards id="script-standards" >}}
{
  "title": "Script Standards",
  "items": [
    {
      "icon": "pin",
      "label": "Version number and unique ID",
      "description": "Every script is versioned and identifiable."
    },
    {
      "icon": "error_outline",
      "label": "Numbered error codes",
      "description": "ERR001, ERR002, etc. for consistent troubleshooting."
    },
    {
      "icon": "help_outline",
      "label": "--help flag",
      "description": "Consistent help format across all scripts."
    },
    {
      "icon": "receipt_long",
      "label": "Structured logging",
      "description": "log_info, log_error, log_success for CI/CD visibility."
    }
  ]
}
{{< /persona-cards >}}

## CI/CD Pipeline

Windows `.intunewin` packages are built automatically by Azure Pipelines when changes are pushed to `main`. Mac scripts are validated on push. Each package is a separate artifact ready to upload to Intune.

## USB Testing

No Intune? No problem. Scripts can be copied to a USB stick for manual testing on Windows PCs — useful for testing in isolated environments or before MDM is set up.

## Help Wanted: Silent WSL2 Install

The biggest unsolved problem: automating WSL2 install on Windows via Intune. WSL2 requires enabling Windows features and a reboot, which is tricky to do silently in an MDM pipeline. If you have experience with Intune and WSL2 deployment, we'd love your help.
