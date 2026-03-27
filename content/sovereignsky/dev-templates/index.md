---
title: "Dev Templates"
identifier: "dev-templates"
weight: 30
date: 2025-01-01
description: "Starting a new project shouldn't mean days of boilerplate setup. Dev Templates provide production-ready starting points for APIs, web apps, and backends — all pre-configured for the DevContainer Toolbox with consistent best practices."
summary: "Quick, modern, and standardized project templates for rapid prototyping and consistent development"
status: "active"
repository: "https://github.com/helpers-no/dev-templates"
externalUrl: "/sovereignsky/dev-templates/"
topics:
  - "cybersecurity"
  - "digital-sovereignty"
  - "open-source"
tags:
  - "templates"
  - "boilerplate"
  - "development"
  - "rapid-prototyping"
  - "best-practices"
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
  "headline": "Quick, modern, and standardized project templates for rapid prototyping and consistent development",
  "description": "Select a template. Get a complete project with application code, Kubernetes manifests, GitHub Actions workflows, and automatic deployment — all following the same structure."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="the-problem" >}}
{
  "icon": "warning",
  "title": "The Problem",
  "description": "Starting a new project means days of boilerplate: setting up build tools, configuring Kubernetes manifests, writing CI/CD pipelines, figuring out deployment. Every team does it differently. When someone else inherits the project, they start over.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< steps id="the-solution" >}}
{
  "title": "The Solution",
  "description": "Pick your template (e.g., typescript-basic-webserver), and you have a running project with local development, CI/CD, and Kubernetes deployment ready to go.",
  "code": {
    "language": "bash",
    "label": "bash — inside the devcontainer",
    "command": "dev-template"
  }
}
{{< /steps >}}

## Available Templates

### Backend Templates

| Template | TypeScript | Python | Java | C# | Go | PHP |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|
| Basic Web Server | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Simple Database (SQLite) | planned | planned | planned | planned | planned | planned |
| Database (PostgreSQL) | planned | planned | planned | planned | planned | planned |
| Message Queue (RabbitMQ/Dapr) | planned | planned | planned | planned | planned | planned |
| Serverless (Knative) | planned | planned | planned | planned | planned | planned |
| Object Storage (MinIO) | planned | planned | planned | planned | planned | planned |

### Application Templates

| Template | React | Designsystemet | Next.js | Storybook |
|----------|:---:|:---:|:---:|:---:|
| Basic React App | ✅ | ✅ | | |
| Basic Next.js App | planned | planned | planned | planned |

{{< side-by-side id="side-by-side-4" >}}
{
  "left": [
    {
      "type": "persona-cards",
      "title": "What Each Template Includes",
      "items": [
        {
          "icon": "code",
          "label": "Application code",
          "description": "Working starter app, not just a skeleton."
        },
        {
          "icon": "inventory_2",
          "label": "Dockerfile",
          "description": "Container-ready from the start."
        },
        {
          "icon": "cloud_upload",
          "label": "Kubernetes manifests",
          "description": "Deployment, service, and kustomization for ArgoCD."
        },
        {
          "icon": "play_circle",
          "label": "GitHub Actions workflow",
          "description": "Automatic build and push to GitHub Container Registry."
        },
        {
          "icon": "terminal",
          "label": "Local development",
          "description": "Run and test inside the devcontainer."
        }
      ]
    }
  ],
  "right": [
    {
      "type": "persona-cards",
      "title": "How It Fits Together",
      "items": [
        {
          "icon": "deployed_code",
          "label": "DevContainer Toolbox (DCT)",
          "description": "The development environment — all tools pre-configured."
        },
        {
          "icon": "content_copy",
          "label": "Dev Templates",
          "description": "The project starter — you are here."
        },
        {
          "icon": "dns",
          "label": "Urbalurba Infrastructure Stack (UIS)",
          "description": "The Kubernetes cluster and services."
        },
        {
          "icon": "devices",
          "label": "Client Provisioning",
          "description": "Automated machine setup for managed fleets."
        }
      ]
    }
  ]
}
{{< /side-by-side >}}

{{< highlight-card id="real-world-example-red-cross-norway" >}}
{
  "icon": "volunteer_activism",
  "title": "Real-World Example: Red Cross Norway",
  "description": "The Norwegian Red Cross has 40,000+ volunteers across 380+ local branches. Many are programmers who see how IT can improve daily operations. Dev Templates give these volunteers a structured way to build solutions that central IT can actually adopt — same project structure, same deployment pipeline, predictable handover.",
  "style": "secondary"
}
{{< /highlight-card >}}
