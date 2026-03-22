---
title: "Refugee ID"
identifier: "refugee-id"
weight: 55
date: 2022-03-01
description: "When 5,000 refugees arrived daily at the Polish-Ukrainian border, there were no IT systems and no way to tell helpers from traffickers. Refugee ID is a QR-based wristband identification system built to protect the most vulnerable."
summary: "QR-based wristband identification for humanitarian operations — built at the Polish-Ukrainian border to stop human trafficking"
status: "active"
repository: "https://github.com/helpers-no/qr-armband"
externalUrl: "https://github.com/helpers-no/qr-armband"
topics:
  - "digital-sovereignty"
  - "data-protection"
tags:
  - "humanitarian"
  - "qr-code"
  - "identification"
  - "safety"
  - "sintef"
  - "ukraine"
audience:
  - "humanitarian"
  - "public-sector"
showHero: true
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "QR-based wristband identification for humanitarian operations — built at the Polish-Ukrainian border to stop human trafficking",
  "description": "Built in partnership with SINTEF during the Ukraine refugee crisis in 2022. Featured in Dagens Næringsliv."
}
{{< /summary >}}

{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "March 2022. 5,000 refugees arrived daily at the Tesco Centre transit camp near the Polish-Ukrainian border. No IT systems. No volunteer screening. No logistics tracking. No big NGOs. No government funding. Just people who showed up. The nightmare: children and women disappearing to human traffickers posing as drivers or aid workers.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< highlight-card id="the-solution" >}}
{
  "icon": "check_circle",
  "title": "The Solution",
  "description": "With the help of SINTEF, a QR-based wristband identification system was built to distinguish legitimate helpers from traffickers. Every aid worker and volunteer gets a verified QR wristband. Scan it to confirm identity. No wristband, no access to vulnerable people.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< persona-cards id="components" >}}
{
  "title": "Components",
  "items": [
    {
      "icon": "qr_code_2",
      "label": "QR Armband",
      "description": "QR-based wristband identification system for aid workers and refugees."
    },
    {
      "icon": "web",
      "label": "Wristbands Frontend",
      "description": "Web interface for the wristband identification system."
    },
    {
      "icon": "qr_code",
      "label": "Simple QR",
      "description": "Python API for QR code generation."
    },
    {
      "icon": "monitor_heart",
      "label": "Safe Monitor",
      "description": "Safety and communication monitoring system."
    }
  ]
}
{{< /persona-cards >}}

{{< highlight-card id="why-it-matters-for-sovereignty" >}}
{
  "icon": "shield",
  "title": "Why It Matters for Sovereignty",
  "description": "Humanitarian operations handle extremely sensitive personal data — refugee identities, locations, health information. Using foreign-controlled cloud services for this data creates unacceptable risks. These tools demonstrate that critical humanitarian infrastructure can be built on open-source, sovereign foundations.",
  "style": "secondary"
}
{{< /highlight-card >}}

{{< cta id="helping-the-helpers" >}}
{
  "title": "Helping the helpers",
  "description": "This must never happen again — the people who show up must get the tools they need to help people in need.",
  "buttons": [
    {
      "label": "Read the Full Story",
      "url": "https://github.com/helpers-no/.github/blob/main/profile/README.md"
    },
    {
      "label": "DN Article",
      "url": "https://www.dn.no/innlegg/ukraina/flyktninger/it/innlegg-databransjen-kan-hjelpe-polske-flyktningmottak/2-1-1196672",
      "style": "secondary"
    }
  ]
}
{{< /cta >}}
