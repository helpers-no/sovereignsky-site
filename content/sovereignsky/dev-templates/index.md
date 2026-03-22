---
title: "Dev Templates"
identifier: "dev-templates"
weight: 22
date: 2025-01-01
description: "Starting a new project shouldn't mean days of boilerplate setup. Dev Templates provide production-ready starting points for APIs, web apps, and backends — all pre-configured for the DevContainer Toolbox with consistent best practices."
summary: "Quick, modern, and standardized project templates for rapid prototyping and consistent development"
status: "active"
repository: "https://github.com/helpers-no/dev-templates"
externalUrl: "/sovereignsky/dev-templates/"
topics:
  - "cybersecurity"
tags:
  - "templates"
  - "boilerplate"
  - "development"
  - "rapid-prototyping"
  - "best-practices"
audience:
  - "developer"
showHero: true
heroStyle: "big"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "Quick, modern, and standardized project templates for rapid prototyping and consistent development",
  "description": "Production-ready templates for APIs, web apps, backends, and experiments. Lower the entry barrier for all developers with rapid prototyping and consistent best practices."
}
{{< /summary >}}

## The Problem

Starting a new project means days of boilerplate: setting up build tools, configuring Kubernetes manifests, writing CI/CD pipelines, figuring out deployment. Every team does it differently. When someone else inherits the project, they start over.

## The Solution

Select a template. Get a complete project with application code, Kubernetes manifests, GitHub Actions workflows, and automatic deployment — all following the same structure. Every project works the same way.

```bash
# Inside the devcontainer, run:
dev-template
```

Pick your template (e.g., `typescript-basic-webserver`), and you have a running project with local development, CI/CD, and Kubernetes deployment ready to go.

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

## What Each Template Includes

Every template comes with:

- **Application code** — working starter app, not just a skeleton
- **Dockerfile** — container-ready from the start
- **Kubernetes manifests** — deployment, service, and kustomization for ArgoCD
- **GitHub Actions workflow** — automatic build and push to GitHub Container Registry
- **Local development** — run and test inside the devcontainer

## The Developer Workflow

1. **Create** a GitHub repo and clone it
2. **Set up** DevContainer Toolbox (one command)
3. **Select** a template with `dev-template.sh`
4. **Develop** locally inside the devcontainer
5. **Push** to GitHub — CI/CD builds and pushes your container image
6. **Register** with ArgoCD — `./uis argocd register my-app https://github.com/user/repo`
7. **Test** at `http://my-app.localhost` — automatic routing, no DNS setup

## Real-World Example: Red Cross Norway

The Norwegian Red Cross has 40,000+ volunteers across 380+ local branches. Many are programmers who see how IT can improve daily operations. Dev Templates give these volunteers a structured way to build solutions that central IT can actually adopt — same project structure, same deployment pipeline, predictable handover.

## How It Fits Together

- **[DevContainer Toolbox (DCT)](/sovereignsky/devcontainer-toolbox/)** — the development environment
- **Dev Templates** — the project starter (you are here)
- **[Urbalurba Infrastructure Stack (UIS)](/sovereignsky/urbalurba-infrastructure/)** — the Kubernetes cluster and services
- **[Client Provisioning](/sovereignsky/client-provisioning/)** — automated machine setup for managed fleets
