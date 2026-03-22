---
title: "Bifrost"
identifier: "bifrost"
weight: 35
date: 2024-01-01
description: "You cannot secure what you cannot see. Bifrost maps your entire application landscape and data flows, revealing hidden dependencies on foreign services - the essential first step in any sovereignty assessment or migration planning."
summary: "Gain full visibility into your organization's application landscape, integrations, and ownership"
status: "active"
repository: "https://github.com/helpers-no/bifrost"
externalUrl: "https://github.com/helpers-no/bifrost"
topics:
  - "critical-infrastructure"
tags:
  - "application-portfolio"
  - "integration"
  - "cmdb"
  - "documentation"
  - "visualization"
audience:
  - "developer"
  - "it-ops"
showHero: true
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "Gain full visibility into your organization's application landscape, integrations, and ownership",
  "description": "Bifrost provides a structured, authoritative view of the IT landscape — combining technical dependencies with clear accountability and ownership."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="what-sets-this-cmdb-apart" >}}
{
  "icon": "star",
  "title": "What sets this CMDB apart",
  "description": "Unlike traditional CMDBs that focus primarily on infrastructure, Bifrost treats applications, APIs, integrations, and stakeholders as equal first-class entities — each with unique identities, ownership, and lifecycle management.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< persona-cards id="core-capabilities" >}}
{
  "title": "Core Capabilities",
  "items": [
    {
      "icon": "app_registration",
      "label": "Application Registry",
      "description": "Each application gets a unique, persistent identifier enriched with business, technical, and operational metadata. Stakeholders mapped via Microsoft Entra ID."
    },
    {
      "icon": "api",
      "label": "Integrations & APIs",
      "description": "Every integration and API is a first-class item with its own identifier, data classification, lifecycle status, and independent stakeholders."
    },
    {
      "icon": "account_tree",
      "label": "Dependency Visualization",
      "description": "Interactive visualizations showing how applications and APIs are interconnected, enabling impact analysis and change management."
    },
    {
      "icon": "sync",
      "label": "Automation & Integration",
      "description": "Bulk import from Excel and ServiceNow, auto-generated wikis and PDF catalogs, continuously updated living source of truth."
    }
  ]
}
{{< /persona-cards >}}

{{< feature-grid id="technical-stack" >}}
{
  "title": "Technical Stack",
  "columns": [
    {
      "icon": "web",
      "title": "Frontend",
      "color": "primary",
      "items": [
        "Next.js 14 (App Router)",
        "TypeScript"
      ]
    },
    {
      "icon": "dns",
      "title": "Backend",
      "color": "secondary",
      "items": [
        "Strapi CMS",
        "SQLite (dev) / PostgreSQL (prod)"
      ]
    },
    {
      "icon": "cloud_upload",
      "title": "Deployment",
      "color": "tertiary",
      "items": [
        "Kubernetes",
        "Docker"
      ]
    }
  ]
}
{{< /feature-grid >}}
