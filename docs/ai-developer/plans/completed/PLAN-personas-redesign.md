# Feature: Redesign /personas/ page to match Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Goal**: Redesign the personas list page to use the section-design (Stitch) treatment matching blog and publications pages.

**Last Updated**: 2026-04-06

---

## Overview

The `/personas/` list page still uses the old layout (`section-header.html` + DaisyUI card grid). Blog and publications pages have been migrated to the Stitch section-design pattern with gradient hero, stat cards, filter pills, and styled card layouts. This plan brings personas in line with those pages.

The personas single page already uses `common-single-page.html` and is in good shape — no changes needed there.

---

## Current State

- **Personas list** (`layouts/personas/list.html`): Uses `section-header.html` partial, DaisyUI `card` classes, Tailwind grid. No hero, no stats, no filter pills.
- **Blog list** (`layouts/blog/list.html`): Full Stitch design — gradient hero, 3 stat cards, audience/topic filter pills, featured post + grid layout.
- **Publications list** (`layouts/publications/list.html`): Same Stitch pattern — gradient hero, 3 stat cards, audience/topic filter pills, featured publication + compact card grid.
- **Data source**: `data/audience/audience.json` has 7 personas with identifiers, names, descriptions, icons, topics.

---

## Phase 1: Redesign Personas List Template

### Tasks

- [x] 1.1 Replace `section-header.html` with Stitch gradient hero section (`sd-events-hero` pattern)
  - Badge text: "Target Audiences"
  - Title: "Personas"
  - Description: from `_index.md` .Description
- [x] 1.2 Add stat cards section (`sd-events-stats` pattern) with 3 stats:
  - Total Personas count
  - Blog Posts count (all blog posts)
  - Publications count (all publications)
- [x] 1.3 Add topic filter pills (`sd-events-filters` pattern)
  - Filter by topic — collect unique topics from all personas in `audience.json`
  - No audience filter needed (personas ARE the audiences)
- [x] 1.4 Redesign card grid to match blog/publications card styling
  - Use `sd-blog-featured` + `sd-blog-card` / `sd-blog-grid` pattern classes
  - First persona is featured (large), rest in grid
  - Each card: persona featured image (or gradient placeholder with data-icon), name, description
  - Cards link to `/personas/{identifier}/`
  - Add `data-topics` attribute from persona's topics for filtering
- [x] 1.5 Add "no results" message for empty filter state
- [x] 1.6 Add filter JavaScript (same pattern as blog/publications)
  - URL parameter sync for topic filter
  - Active pill state management

### Validation

- Hugo builds without errors
- Personas list page shows gradient hero, stat cards, filter pills, and styled cards
- Filter pills correctly show/hide persona cards by topic
- Dark mode renders correctly

---

## Phase 2: Visual QA and Polish

### Tasks

- [x] 2.1 Verify dark mode styling on all new elements
- [x] 2.2 Verify responsive layout (mobile, tablet, desktop)
- [x] 2.3 Ensure persona card images/placeholders render correctly
- [x] 2.4 Test filter URL parameters work (e.g., `/personas/?topic=cybersecurity`)

### Validation

User confirms visual quality matches blog/publications pages.

---

## Acceptance Criteria

- [x] Personas list page uses Stitch section-design pattern (hero, stats, filters, cards)
- [x] Filter pills work correctly for topic filtering
- [x] Dark mode works correctly
- [x] Responsive layout works on mobile/tablet/desktop
- [x] Hugo builds without errors (982 pages, 0 errors, 0 warnings)
- [x] Personas single page is unchanged

---

## Files to Modify

- `layouts/personas/list.html` — Full rewrite to Stitch design pattern

## Reference Files (read-only)

- `layouts/blog/list.html` — Primary design reference
- `layouts/publications/list.html` — Secondary design reference
- `data/audience/audience.json` — Persona data source
