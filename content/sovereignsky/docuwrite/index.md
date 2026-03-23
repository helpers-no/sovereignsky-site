---
title: "DocuWrite"
identifier: "docuwrite"
weight: 45
date: 2024-01-01
description: "Cloud document services scan your content and may share data with foreign authorities. DocuWrite runs entirely locally, ensuring sensitive documentation never leaves your infrastructure - critical for classified, legal, or confidential materials."
summary: "Swiss army knife for converting Markdown to professional PDFs, Word documents, and presentations"
status: "active"
repository: "https://github.com/helpers-no/docuwrite-base"
externalUrl: "https://github.com/helpers-no/docuwrite-base"
topics:
  - "critical-infrastructure"
tags:
  - "documentation"
  - "markdown"
  - "pdf"
  - "pandoc"
  - "mermaid"
  - "presentations"
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
  "headline": "Swiss army knife for converting Markdown to professional PDFs, Word documents, and presentations",
  "description": "Outdated documentation that stakeholders can't access. DocuWrite creates snapshot PDFs from your Wiki that everyone can share — same version, same meeting, delete after."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "Documentation lives in wikis that stakeholders never check. When they need a report for a meeting or a board presentation, someone manually exports pages, reformats them, and hopes the diagrams render. Different people get different versions. After the meeting, outdated PDFs float around forever.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< highlight-card id="the-solution" >}}
{
  "icon": "check_circle",
  "title": "The Solution",
  "description": "DocuWrite creates snapshot PDFs from your Wiki that everyone can share — same version, same meeting, delete after. Professional formatting with table of contents, numbered pages, searchable text, and Mermaid diagram support. One command, consistent output.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< side-by-side id="side-by-side-3" >}}
{
  "left": [
    {
      "type": "persona-cards",
      "title": "Output Features",
      "items": [
        {
          "icon": "toc",
          "label": "Professional table of contents",
          "description": "Auto-generated from document headings."
        },
        {
          "icon": "format_list_numbered",
          "label": "Numbered pages with timestamp",
          "description": "Every page shows generation date for version tracking."
        },
        {
          "icon": "search",
          "label": "Fully searchable PDF",
          "description": "Text-based PDF, not images."
        },
        {
          "icon": "checklist",
          "label": "Auto-generated TODO appendix",
          "description": "Collects all TODO items into a separate appendix."
        },
        {
          "icon": "schema",
          "label": "Mermaid diagram support",
          "description": "Render diagrams from text descriptions."
        }
      ]
    }
  ],
  "right": [
    {
      "type": "feature-grid",
      "title": "Included Tools",
      "columns": [
        {
          "icon": "build",
          "title": "Converters",
          "color": "primary",
          "items": [
            "Pandoc (Markdown → PDF, DOCX)",
            "Marp CLI (Slide decks)",
            "Puppeteer (HTML → PDF)",
            "Firefox (HTML → PDF)"
          ]
        },
        {
          "icon": "draw",
          "title": "Diagrams",
          "color": "secondary",
          "items": [
            "Mermaid CLI"
          ]
        }
      ]
    },
    {
      "type": "tool-icons",
      "title": "Repositories",
      "description": "Container images for AMD64 and ARM64:",
      "items": [
        {
          "icon": "inventory_2",
          "label": "docuwrite-base"
        },
        {
          "icon": "auto_stories",
          "label": "bifrost-docuwrite"
        }
      ]
    }
  ]
}
{{< /side-by-side >}}
