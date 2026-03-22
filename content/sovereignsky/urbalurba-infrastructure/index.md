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
heroStyle: "big"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "A complete datacenter environment on your laptop - Kubernetes, databases, AI, and cloud services running locally",
  "description": "Zero-friction developer platform for building, testing, and deploying modern apps without needing to know Kubernetes, GitOps, or the cloud. Same infrastructure locally, in cloud, and on-premises."
}
{{< /summary >}}

## The Problem

Your developers need databases, message queues, AI models, and monitoring — but setting up cloud accounts takes weeks, costs money from day one, and sends your data to foreign providers. Permission bottlenecks, cloud costs, and privacy concerns slow everything down.

## The Solution

30+ open-source services, pre-configured and ready to run on your laptop, AKS, Raspberry Pi, Ubuntu server, VM, or any Kubernetes cluster. Same stack everywhere. No cloud account needed to get started.

## What's Included

| Category | Services | Count |
|----------|----------|-------|
| **Observability** | Prometheus, Grafana, Loki, Tempo, OpenTelemetry Collector | 5 |
| **AI & ML** | LiteLLM (unified API for local AI models), Open WebUI (ChatGPT-like interface) | 2 |
| **Analytics** | Apache Spark, JupyterHub, Unity Catalog | 3 |
| **Databases** | PostgreSQL, MongoDB, Redis, Elasticsearch, Qdrant, MinIO | 6 |
| **Management** | ArgoCD (GitOps), Backstage (developer portal), Tika, SonarQube | 6 |
| **Identity** | Authentik (SSO, OAuth, LDAP) | 1 |
| **Networking** | Tailscale, Cloudflare Tunnel | 2 |
| **Integration** | RabbitMQ, Gravitee API Gateway, event streams | 3 |
| **Applications** | Nextcloud (file sharing and collaboration) | 1 |

## Pre-configured Stacks

Don't pick individual services — use a ready-made stack:

- **Observability Stack** — Complete monitoring with metrics, logs, and distributed tracing. One command.
- **Local AI Stack** — Run AI models locally with a unified API and ChatGPT-like chat interface. Your data stays on your machine.
- **Analytics Stack** — Collaborative data science with Jupyter notebooks, Spark, and Unity Catalog.

## Key Benefits

- **30+ services** — everything a development team needs, pre-configured
- **Runs anywhere** — laptop, Raspberry Pi, Ubuntu server, VM, AKS, or any Kubernetes cluster
- **No cloud account needed** — start building immediately, zero cost
- **Data stays local** — AI, databases, and monitoring all on your machine
- **Production-identical** — same infrastructure in development and production
- **True portability** — move workloads between providers without rewriting applications

**[Full documentation at uis.sovereignsky.no](https://uis.sovereignsky.no/)**
