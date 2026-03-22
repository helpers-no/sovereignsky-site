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
{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "Organizations know they depend on foreign cloud providers, but they have no standardized way to measure how dependent they are, compare themselves to peers, or track improvement over time.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< feature-grid id="ndsi-levels" >}}
{
  "title": "NDSI Levels",
  "columns": [
    {
      "icon": "shield",
      "title": "Strong (Level 3-4)",
      "color": "secondary",
      "items": [
        "Level 4: Sovereign (35-44 pts)",
        "Level 3: Resilient (26-34 pts)"
      ]
    },
    {
      "icon": "warning",
      "title": "Needs Work (Level 0-2)",
      "color": "tertiary",
      "items": [
        "Level 2: Aware (18-25 pts)",
        "Level 1: Dependent (9-17 pts)",
        "Level 0: Unassessed (0-8 pts)"
      ]
    }
  ]
}
{{< /feature-grid >}}

{{< side-by-side id="side-by-side-3" >}}
{
  "left": [
    {
      "type": "persona-cards",
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
  ],
  "right": [
    {
      "type": "persona-cards",
      "title": "Dependencies",
      "items": [
        {
          "icon": "database",
          "label": "Software Database",
          "description": "Risk scores for individual software products, mapping to European alternatives, vendor ownership data."
        }
      ]
    },
    {
      "type": "highlight-card",
      "icon": "info",
      "title": "Current Status",
      "description": "The framework is in planning phase. The survey and basic scoring are functional, but full integration with the Software Database for automated risk assessment is under development.",
      "style": "primary"
    }
  ]
}
{{< /side-by-side >}}
