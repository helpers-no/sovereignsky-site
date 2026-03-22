---
title: "Norwegian Digital Sovereignty Index (NDSI)"
identifier: "ndsi"
weight: 15
date: 2024-01-01
description: "What gets measured gets managed. NDSI provides a structured framework to assess your organization's sovereignty posture, identify vulnerabilities to foreign control, and track improvement over time - aligned with EU standards and Norwegian regulations."
summary: "A community-driven framework for measuring and improving digital sovereignty readiness in Norwegian organizations"
status: "planned"
externalUrl: "/sovereignsky/ndsi/"
topics:
  - "digital-sovereignty"
  - "data-protection"
tags:
  - "norway"
  - "index"
  - "assessment"
  - "framework"
audience:
  - "public-sector"
  - "enterprise"
  - "it-ops"
showHero: true
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "A community-driven framework for measuring and improving digital sovereignty readiness in Norwegian organizations",
  "description": "The Norwegian Digital Sovereignty Index is a practical framework for measuring how dependent your organization is on foreign-controlled digital infrastructure. Based on the EU Cloud Sovereignty Framework."
}
{{< /summary >}}

{{< metadata-sidebar >}}
## NDSI Levels

Organizations are scored from Level 0 to Level 4:

| Level | Name | Score | What It Means |
|-------|------|-------|---------------|
| 4 | Sovereign | 35-44 | Strong control over digital infrastructure |
| 3 | Resilient | 26-34 | Good awareness, some dependencies to address |
| 2 | Aware | 18-25 | Significant dependencies, exit strategies needed |
| 1 | Dependent | 9-17 | High foreign dependency, priority action needed |
| 0 | Unassessed | 0-8 | Critical gaps, immediate investigation required |

{{< /metadata-sidebar >}}

{{< persona-cards id="components" >}}
{
  "title": "Components",
  "items": [
    {
      "icon": "quiz",
      "label": "NDSI Quick Scan Survey",
      "description": "11 questions covering provider jurisdiction, data control, exit readiness, and operational resilience."
    },
    {
      "icon": "security",
      "label": "Software Risk Check",
      "description": "Select the tools your organization uses and get an instant risk assessment based on jurisdiction, data location, and portability."
    }
  ]
}
{{< /persona-cards >}}

## Dependencies

NDSI depends on the **Software Database** to provide:
- Risk scores for individual software products
- Mapping to European and open-source alternatives
- Vendor ownership and jurisdiction data

## Current Status

The framework is in planning phase. The survey and basic scoring are functional, but full integration with the Software Database for automated risk assessment is under development.
