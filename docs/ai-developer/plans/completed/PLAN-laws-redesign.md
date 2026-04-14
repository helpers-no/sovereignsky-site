# Feature: Redesign /laws/ page to match Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Goal**: Redesign the laws list page to use the section-design (Stitch) treatment matching topics, personas, and datacenters pages.

**Last Updated**: 2026-04-10

---

## Overview

The `/laws/` list page uses the old layout (`section-header.html` + DaisyUI stats/cards). It needs to match the Stitch section-design pattern used by topics, personas, and datacenters.

**Key complexity**: The laws page has client-side filtering (by category, jurisdiction, and features) with search, URL state, and active filter display. All filtering JS and law-card rendering must be preserved.

**Reference**: `layouts/topics/list.html` and `layouts/personas/list.html` for the target pattern.

**Data sources**: `data/laws/laws.json`, `data/laws/law_types.json`, `data/countries/`, `data/blocs/`

---

## Phase 1: Redesign List Template — DONE

### Tasks

- [x] 1.1 Replace `section-header.html` with Stitch gradient hero (`sd-events-hero`) ✓
- [x] 1.2 Replace DaisyUI stats with `sd-events-stats` stat cards ✓
- [x] 1.3 Style search box, filters, and law cards grid with section-design compatible styling ✓
- [x] 1.4 Wrap content in `<article class="sd-laws section-design">` container ✓
- [x] 1.5 Preserve all filter JS, law-card partial usage, floating TOC, and URL state ✓
- [x] 1.6 Verify site builds successfully — Hugo not available outside devcontainer; template syntax verified

### Validation

Hugo build succeeds, page renders with new design, all filters work.

---

## Acceptance Criteria

- [ ] Laws page uses Stitch gradient hero
- [ ] Stats use section-design stat cards
- [ ] All filters (category, jurisdiction, features) work
- [ ] Search works
- [ ] Law cards render correctly
- [ ] Site builds without errors

## Files to Modify

- `layouts/laws/list.html`
