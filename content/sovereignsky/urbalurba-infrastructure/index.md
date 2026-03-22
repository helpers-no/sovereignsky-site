---
title: "Urbalurba Infrastructure Stack"
identifier: "urbalurba-infrastructure"
weight: 25
date: 2024-01-01
description: "Cloud lock-in is sovereignty lock-in. Urbalurba provides identical infrastructure locally, on-premises, and in any cloud - giving you true portability and the freedom to move workloads to sovereign providers without rewriting applications."
summary: "A complete datacenter environment on your laptop - Kubernetes, databases, AI, and cloud services running locally"
status: "active"
repository: "https://github.com/helpers-no/urbalurba-infrastructure"
documentation: "https://uis.sovereignsky.no/"
externalUrl: "https://uis.sovereignsky.no/"
topics:
  - "critical-infrastructure"
  - "cybersecurity"
tags:
  - "kubernetes"
  - "docker"
  - "local-development"
  - "ai"
  - "infrastructure-as-code"
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
  "headline": "A complete datacenter environment on your laptop — Kubernetes, databases, AI, and cloud services running locally",
  "description": "Zero-friction developer platform for building, testing, and deploying modern apps without needing to know Kubernetes, GitOps, or the cloud. Same infrastructure locally, in cloud, and on-premises."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "Your developers need databases, message queues, AI models, and monitoring — but setting up cloud accounts takes weeks, costs money from day one, and sends your data to foreign providers. Permission bottlenecks, cloud costs, and privacy concerns slow everything down.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< highlight-card id="the-solution" >}}
{
  "icon": "check_circle",
  "title": "The Solution",
  "description": "30+ open-source services, pre-configured and ready to run on your laptop, AKS, Raspberry Pi, Ubuntu server, VM, or any Kubernetes cluster. Same stack everywhere. No cloud account needed to get started.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< feature-grid id="what-s-included" >}}
{
  "title": "What's Included",
  "columns": [
    {
      "icon": "storage",
      "title": "Data & Storage",
      "color": "primary",
      "items": [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "Qdrant",
        "MinIO",
        "Nextcloud"
      ]
    },
    {
      "icon": "monitoring",
      "title": "Ops & Security",
      "color": "secondary",
      "items": [
        "Prometheus",
        "Grafana",
        "Loki",
        "Tempo",
        "OpenTelemetry",
        "ArgoCD",
        "Backstage",
        "Authentik",
        "SonarQube"
      ]
    },
    {
      "icon": "psychology",
      "title": "AI & Integration",
      "color": "tertiary",
      "items": [
        "LiteLLM",
        "Open WebUI",
        "Apache Spark",
        "JupyterHub",
        "Unity Catalog",
        "RabbitMQ",
        "Gravitee API Gateway"
      ]
    }
  ]
}
{{< /feature-grid >}}

{{< persona-cards id="pre-configured-stacks" >}}
{
  "title": "Pre-configured Stacks",
  "items": [
    {
      "icon": "visibility",
      "label": "Observability Stack",
      "description": "Complete monitoring with metrics, logs, and distributed tracing. One command."
    },
    {
      "icon": "smart_toy",
      "label": "Local AI Stack",
      "description": "Run AI models locally with a unified API and ChatGPT-like chat interface. Your data stays on your machine."
    },
    {
      "icon": "analytics",
      "label": "Analytics Stack",
      "description": "Collaborative data science with Jupyter notebooks, Spark, and Unity Catalog."
    }
  ]
}
{{< /persona-cards >}}

{{< highlight-card id="runs-anywhere" >}}
{
  "icon": "rocket_launch",
  "title": "Runs Anywhere",
  "description": "Laptop, Raspberry Pi, Ubuntu server, VM, AKS, or any Kubernetes cluster. Same infrastructure in development and production. No cloud account needed — start building immediately, zero cost.",
  "style": "primary"
}
{{< /highlight-card >}}

{{< tool-icons id="key-benefits" >}}
{
  "title": "Key Benefits",
  "description": "30+ services, true portability, and data sovereignty:",
  "items": [
    {
      "icon": "apps",
      "label": "30+ Services"
    },
    {
      "icon": "sync_alt",
      "label": "True Portability"
    },
    {
      "icon": "shield",
      "label": "Data Stays Local"
    },
    {
      "icon": "cloud_off",
      "label": "No Cloud Needed"
    }
  ]
}
{{< /tool-icons >}}

{{< cta id="ready-to-build-on-sovereign-infrastructure" >}}
{
  "title": "Ready to build on sovereign infrastructure?",
  "description": "Full documentation at uis.sovereignsky.no",
  "buttons": [
    {
      "label": "Documentation",
      "url": "https://uis.sovereignsky.no/"
    },
    {
      "label": "View Repository",
      "url": "https://github.com/helpers-no/urbalurba-infrastructure",
      "style": "secondary"
    }
  ]
}
{{< /cta >}}
