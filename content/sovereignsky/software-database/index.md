---
title: "Software Database"
identifier: "software-database"
weight: 80
date: 2024-12-01
description: "Every foreign SaaS tool is a potential backdoor for extraterritorial data access. We track what France (SILL), Germany (openCode), Denmark, and other European countries recommend — and aggregate their government-vetted catalogs into one searchable database with sovereign alternatives."
summary: "4,400+ software products from government-vetted catalogs across Europe, mapped with sovereign alternatives"
status: "active"
repository: "https://github.com/helpers-no/software-scrape"
externalUrl: "/sovereignsky/software-database/"
topics:
  - "digital-sovereignty"
  - "data-protection"
  - "cloud-act"
  - "platform-dependency"
tags:
  - "software"
  - "alternatives"
  - "open-source"
  - "european"
  - "catalog"
audience:
  - "developer"
  - "public-sector"
  - "it-ops"
  - "enterprise"
  - "humanitarian"
showHero: true
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "4,400+ software products from government-vetted catalogs across Europe, mapped with sovereign alternatives",
  "description": "The Software Database aggregates software from multiple government-vetted and expert-curated catalogs into a unified, searchable catalog. Each product is deduplicated, categorized across four taxonomies, and enriched with vendor information, alternatives mappings, and sovereignty assessments."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "Organizations want to reduce dependency on foreign-controlled software, but there is no single catalog of European and open-source alternatives. Government-vetted lists exist in France, Germany, and Italy — but they use different formats, categories, and identifiers. Finding what is available, where it comes from, and whether a sovereign alternative exists requires searching multiple sources manually.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< feature-grid id="data-sources" >}}
{
  "title": "Data Sources",
  "columns": [
    {
      "icon": "verified",
      "title": "Government-Vetted",
      "color": "primary",
      "items": [
        "SILL France (626 products)",
        "openCode / ZenDiS (planned)",
        "Developers Italia (planned)",
        "EU OSS Catalogue (planned)"
      ]
    },
    {
      "icon": "hub",
      "title": "Foundation & Expert",
      "color": "secondary",
      "items": [
        "CNCF Landscape (1,358)",
        "Euro Stack (1,103)",
        "OpenAlternative (649)",
        "Cloud Service Map (582)",
        "switching.software (130)"
      ]
    }
  ]
}
{{< /feature-grid >}}

{{< side-by-side id="side-by-side-3" >}}
{
  "left": [
    {
      "type": "highlight-card",
      "icon": "warning",
      "title": "The Challenges",
      "description": "The same software appears across catalogs with different identifiers. Each catalog uses its own category system. Raw catalog data lacks context. We solve this with 942 product mappings, 10,415+ lines of category mappings, and Wikidata enrichment.",
      "style": "tertiary"
    },
    {
      "type": "highlight-card",
      "icon": "autorenew",
      "title": "Goal: Fully Automated Pipeline",
      "description": "A weekly automated pipeline that scrapes all sources, auto-suggests canonical ID mappings using fuzzy matching, and publishes the updated catalog — flagging conflicts for human review without blocking the pipeline.",
      "style": "primary"
    }
  ],
  "right": [
    {
      "type": "persona-cards",
      "title": "How We Solve Them",
      "items": [
        {
          "icon": "fingerprint",
          "label": "Deduplication",
          "description": "Ansible appears as ansible, red-hat-ansible, and ansible-automation-platform depending on the source. We maintain a canonical registry with 942 product mappings across 4,400+ raw entries."
        },
        {
          "icon": "category",
          "label": "Category Harmonization",
          "description": "CNCF uses technical hierarchies, SILL France uses publiccode.yml, Euro-Stack uses business focus. We map all to four standardized taxonomies: Technical (43), Developer (26), Business (28), Platforms (8)."
        },
        {
          "icon": "auto_awesome",
          "label": "Data Enrichment",
          "description": "Enrich products using Wikidata for vendor information and web search to validate descriptions and find missing homepages."
        }
      ]
    }
  ]
}
{{< /side-by-side >}}
