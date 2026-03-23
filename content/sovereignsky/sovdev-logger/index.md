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
heroStyle: "sovereignsky"
showTableOfContents: false
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary-0" >}}
{
  "headline": "One log call — automatic logs, metrics, traces, and service maps. 95% less instrumentation code.",
  "description": "You write code for yourself during development. But you write logs for the operations engineer staring at a screen at 7 PM on Friday. Good logging is the difference between a 3-hour debugging session and a 5-minute fix."
}
{{< /summary >}}

{{< metadata-sidebar >}}
{{< highlight-card id="the-problem" >}}
{
  "icon": "error_outline",
  "title": "The Problem",
  "description": "Traditional observability requires 20+ lines per operation — separate logger calls, metric counters, trace spans, manual correlation.",
  "style": "tertiary"
}
{{< /highlight-card >}}

{{< /metadata-sidebar >}}

{{< steps id="the-solution" >}}
{
  "title": "The Solution",
  "description": "One call gives you logs, metrics, traces, and correlation — automatically.",
  "code": {
    "language": "typescript",
    "label": "TypeScript — sovdev_log",
    "command": "sovdev_log(INFO, FUNCTIONNAME, 'Payment processed', PEER_SERVICES.PAYMENT_GATEWAY, input, output);"
  }
}
{{< /steps >}}

{{< feature-grid id="what-you-get-automatically" >}}
{
  "title": "What You Get Automatically",
  "columns": [
    {
      "icon": "description",
      "title": "Outputs",
      "color": "primary",
      "items": [
        "Structured Logs",
        "Metrics",
        "Distributed Traces",
        "Service Maps",
        "File Logs"
      ]
    },
    {
      "icon": "cloud",
      "title": "Azure Production",
      "color": "secondary",
      "items": [
        "Azure Log Analytics",
        "Azure Monitor",
        "Application Insights"
      ]
    },
    {
      "icon": "computer",
      "title": "Local / On-Prem",
      "color": "tertiary",
      "items": [
        "Console + JSON files",
        "Grafana / Prometheus",
        "Tempo"
      ]
    }
  ]
}
{{< /feature-grid >}}

{{< side-by-side id="side-by-side-4" >}}
{
  "left": [
    {
      "type": "highlight-card",
      "icon": "sync_alt",
      "title": "No Vendor Lock-in",
      "description": "Built on OpenTelemetry — Microsoft's recommended standard. Same code works with Azure Monitor in production and Grafana locally.",
      "style": "secondary"
    },
    {
      "type": "tool-icons",
      "title": "Supported Languages",
      "description": "Works with any OpenTelemetry-compatible backend:",
      "items": [
        {
          "icon": "code",
          "label": "TypeScript (Available)"
        },
        {
          "icon": "schedule",
          "label": "Go (Planned)"
        },
        {
          "icon": "schedule",
          "label": "Python (Planned)"
        },
        {
          "icon": "schedule",
          "label": "C# (Planned)"
        }
      ]
    }
  ],
  "right": [
    {
      "type": "persona-cards",
      "title": "Quick Start",
      "items": [
        {
          "icon": "download",
          "label": "Install",
          "description": "npm install @sovdev/logger"
        },
        {
          "icon": "code",
          "label": "One line of code",
          "description": "sovdev_log(INFO, FUNCTIONNAME, \"Payment processed\", PEER_SERVICES.PAYMENT_GATEWAY, input, output)"
        },
        {
          "icon": "check_circle",
          "label": "Zero config needed",
          "description": "Logs to console and ./logs/ directory out of the box. No configuration for local development."
        }
      ]
    }
  ]
}
{{< /side-by-side >}}
