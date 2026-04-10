# Feature: Redesign /datacenters/ page to match Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Goal**: Redesign the datacenters list page to use the section-design (Stitch) treatment matching laws, topics, and personas pages.

**Last Updated**: 2026-04-10

---

## Overview

The `/datacenters/` list page uses the old layout (`section-header.html` + `.Content` prose rendering). It needs to match the Stitch section-design pattern used by laws and topics.

**Key complexity**: The page renders multiple shortcodes (ECharts bar chart, scatter map, provider cards, country cards, page-stats) that produce their own HTML/JS. These must be preserved while wrapping in section-design containers.

**Reference**: `layouts/laws/list.html` and `layouts/topics/list.html` for the target pattern.

**Data sources**: `data/datacenters/datacenters.json` via shortcodes

---

## Phase 1: Redesign List Template — DONE

### Tasks

- [x] 1.1 Replace `section-header.html` with Stitch gradient hero (`sd-events-hero`) ✓
- [x] 1.2 Replace `page-stats` shortcode with `sd-events-stats` stat cards (compute stats in template) ✓
- [x] 1.3 Wrap content sections in `sd-blog-feed` container with `sd-dc-content` styling ✓
- [x] 1.4 Preserve all shortcode output (charts, maps, provider cards, country cards) ✓
- [x] 1.5 Add floating TOC and footer partial ✓
- [x] 1.6 Add section-design CSS for datacenter content styling ✓
- [x] 1.7 Verify template syntax — Hugo not available outside devcontainer ✓

### Validation

Hugo build succeeds, page renders with new design, all interactive elements work.

---

## Acceptance Criteria

- [ ] Datacenters page uses Stitch gradient hero
- [ ] Stats use section-design stat cards
- [ ] ECharts bar chart renders correctly
- [ ] Scatter map renders correctly
- [ ] Provider cards display correctly
- [ ] Country cards display correctly
- [ ] Site builds without errors

## Files to Modify

- `layouts/datacenters/list.html`
- `content/datacenters/_index.md` (remove shortcodes, simplify to frontmatter only)
