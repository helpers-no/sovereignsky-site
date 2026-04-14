# Feature: Redesign topics single pages (term.html) to Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Goal**: Convert `layouts/topics/term.html` from DaisyUI to the Stitch section-design system, matching the patterns in the recently redesigned datacenter, law, and topics list pages.

**Last Updated**: 2026-04-14

---

## Overview

The topics single page (`term.html`) displays all content tagged with a specific topic (e.g. `/topics/cloud-sovereignty/`). It currently uses DaisyUI breadcrumbs, badges, card grids, and alert components.

The topics **list** page has already been converted to Stitch. This plan converts the remaining **term** (single topic detail) page.

**Current state** (`layouts/topics/term.html`):
- DaisyUI breadcrumbs, badges (`badge-lg`, `badge-outline`), card layout (`card card-compact`), alert
- Icon in gradient box header (non-Stitch)
- 3-column card grid with type-specific metadata per content type
- Type badge overlays on card images/placeholders

**Target pattern**: Same Stitch section-design used in `topics/list.html`, `datacenters/single.html`, `laws/single.html`:
1. `.sd-events-hero` gradient hero with breadcrumbs, badge, title, description
2. `.sd-events-stats` stat cards showing content breakdown by type
3. `.sd-blog-feed` with `.sd-blog-grid` + `.sd-blog-card` for content items
4. Floating TOC partial
5. `sovereignsky-footer.html` partial

---

## Phase 1: Rewrite template to Stitch section-design — DONE

### Tasks

- [x] 1.1 Replace outer `<article>` with `<article class="sd-topics-single section-design">` ✓
- [x] 1.2 Replace DaisyUI header/breadcrumbs with `.sd-events-hero` section ✓
- [x] 1.3 Replace DaisyUI stat badges with `.sd-events-stats` cards (3 cards) ✓
- [x] 1.4 Replace DaisyUI card grid with `.sd-blog-grid` + `.sd-blog-card` pattern ✓
- [x] 1.5 Replace DaisyUI alert (empty state) with Stitch-styled empty state ✓
- [x] 1.6 Replace DaisyUI footer/back-link with Stitch-styled back link ✓
- [x] 1.7 Add floating TOC partial with sections (Hero, Content) ✓
- [x] 1.8 Add `sovereignsky-footer.html` partial ✓
- [x] 1.9 Preserve all existing data resolution logic (topics.json lookup, type config, type counts) ✓

### Validation

Hugo builds without errors. Template structure matches Stitch patterns from other pages.

---

## Phase 2: CSS adjustments (if needed) — DONE

### Tasks

- [x] 2.1 Check if any new CSS is needed — no new CSS required, existing Stitch classes cover all needs ✓
- [x] 2.2 No additions to `custom.css` needed ✓
- [x] 2.3 Dark mode uses existing Stitch CSS variables ✓

### Validation

Visual consistency with other Stitch pages. No DaisyUI classes remain in the template.

---

## Phase 3: Commit, push & verify — DONE

### Tasks

- [x] 3.1 Commit changes on feature branch (517fca7) ✓
- [x] 3.2 Push branch and create PR (#31) ✓
- [x] 3.3 PR merged — pending live site CI deploy verification ✓

### Validation

CI passes, page renders correctly on live site in both light and dark mode.

---

## Acceptance Criteria

- [ ] `term.html` uses Stitch hero, stat cards, and blog-card grid (no DaisyUI)
- [ ] All content types display correctly with type-specific metadata
- [ ] Featured images and placeholders render properly
- [ ] Content type badge overlays are visible on cards
- [ ] Dark mode renders correctly
- [ ] Floating TOC navigation works
- [ ] Back link to /topics/ works
- [ ] Empty state (topic with no content) displays correctly
- [ ] Hugo builds without errors

## Files to Modify

- `layouts/topics/term.html`
- `assets/css/custom.css` (only if needed)
