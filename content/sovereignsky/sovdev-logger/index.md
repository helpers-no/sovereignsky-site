---
title: "sovdev-logger"
identifier: "sovdev-logger"
weight: 30
date: 2025-01-01
description: "Application telemetry often flows to foreign cloud providers, exposing operational patterns and sensitive metadata. sovdev-logger works with self-hosted backends like Grafana and Loki, keeping your observability data under your control and jurisdiction."
summary: "One log call — automatic logs, metrics, traces, and service maps. 95% less instrumentation code."
status: "active"
repository: "https://github.com/helpers-no/sovdev-logger"
externalUrl: "/sovereignsky/sovdev-logger/"
topics:
  - "cybersecurity"
  - "critical-infrastructure"
tags:
  - "logging"
  - "observability"
  - "opentelemetry"
  - "metrics"
  - "tracing"
  - "typescript"
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
  "headline": "One log call — automatic logs, metrics, traces, and service maps. 95% less instrumentation code.",
  "description": "Stop writing separate code for logs, metrics, and traces. Write one log entry and automatically get structured logs, metrics dashboards, distributed traces, and service dependency maps."
}
{{< /summary >}}

## Who Do You Write Logs For?

You write code for yourself during development. But **you write logs for the operations engineer staring at a screen at 7 PM on Friday.**

Your application just crashed in production. Everyone on your team has left for the weekend. The ops engineer who got the alert doesn't know your codebase, doesn't know your business logic, and definitely doesn't want to be there right now.

Good logging is the difference between a 3-hour debugging session and a 5-minute fix. Help them get home to their family.

## The Problem

Traditional observability requires 20+ lines per operation — separate logger calls, metric counters, trace spans, manual correlation.

## The Solution

```typescript
sovdev_log(INFO, FUNCTIONNAME, 'Payment processed', PEER_SERVICES.PAYMENT_GATEWAY, input, output);
// ↑ Automatic logs + metrics + traces + correlation
```

**Result**: 95% less instrumentation code, complete observability out of the box.

## What You Get Automatically

Every log call generates:

| Output | Backends |
|--------|----------|
| Structured Logs | Azure Log Analytics, Loki, JSON files |
| Metrics | Azure Monitor, Prometheus, Grafana |
| Distributed Traces | Application Insights, Tempo |
| Service Maps | Automatic dependency graphs |
| File Logs | JSON files for local development |

No extra code required.

## For Azure Developers

This library uses **OpenTelemetry** — Microsoft's recommended standard. Same code works with Azure Monitor in production and Grafana locally. No vendor lock-in.

| Environment | Logs | Metrics | Traces |
|------------|------|---------|--------|
| Azure Production | Azure Log Analytics | Azure Monitor | Application Insights |
| Local Development | Console + JSON files | Grafana | Tempo |
| On-Premises | Loki | Prometheus | Tempo |

## Supported Languages

| Language | Status |
|----------|--------|
| TypeScript | ✅ Available |
| Go, Python, C#, Rust, PHP | 📅 Planned |

Works with any OpenTelemetry-compatible backend: Azure Monitor, Grafana Cloud, Datadog, New Relic, or self-hosted.

## Quick Start

```bash
npm install @sovdev/logger
```

No configuration needed for local development. Logs to console and `./logs/` directory out of the box.
