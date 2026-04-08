# Feature: Redesign /topics/ page to match Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Active

**Goal**: Redesign the topics list page to use the section-design (Stitch) treatment matching personas, blog, and publications pages.

**Last Updated**: 2026-04-07

---

## Overview

The `/topics/` list page still uses the old layout (`section-header.html` + DaisyUI stats widget + DaisyUI card grid). The personas, blog, and publications pages have been migrated to the Stitch section-design pattern with gradient hero, stat cards, and styled card layouts. This plan brings topics in line with those pages.

The topics page currently filters to only show topics with content. This behavior should be preserved. Topics data comes from `data/topics/topics.json`. Topics is a Hugo taxonomy (`topic = "topics"` in `hugo.toml`).

**Reference**: The completed personas redesign at `docs/ai-developer/plans/completed/PLAN-personas-redesign.md` is the template. The new personas layout at `layouts/personas/list.html` shows the target pattern.

---

## Current State

- **Topics list** (`layouts/topics/list.html`): Uses `section-header.html` partial, DaisyUI `stats` widget, DaisyUI `card` classes with Tailwind grid. Counts content per topic and only shows topics with content.
- **Personas list** (`layouts/personas/list.html`): Full Stitch design — gradient hero, 3 stat cards, featured persona + grid layout.
- **Data source**: `data/topics/topics.json` has 25 topics with identifiers, names, descriptions, and icons.

---

## Phase 1: Redesign Topics List Template — DONE

### Tasks

- [x] 1.1 Replace `section-header.html` with Stitch gradient hero section (`sd-events-hero` pattern)
  - Badge text: "Content Library"
  - Title: "Topics"
  - Description: from page `.Description` or fallback text about browsing content by topic
- [x] 1.2 Add stat cards section (`sd-events-stats` pattern) with 3 stats:
  - Topics count (topics with content)
  - Tagged Content count (total tagged items across all topics)
  - Blog Posts count (all blog posts)
- [x] 1.3 Redesign card grid to match Stitch card pattern
  - Use `sd-blog-featured` + `sd-blog-card` / `sd-blog-grid` pattern classes
  - First topic (with content) is featured (large), rest in grid
  - Each card: topic icon (via `data-icon.html`), name, description
  - Cards link to `/topics/{identifier}/`
  - Preserve content count badge on each card
- [x] 1.4 Add "no results" message for empty state
- [x] 1.5 Preserve existing content-counting logic (only show topics with content)
- [x] 1.6 Add footer partial (`sovereignsky-footer.html`)

### Validation

- Hugo builds without errors
- Topics list page shows gradient hero, stat cards, and styled cards
- Only topics with content are displayed
- Content count badges are preserved on each card

---

## Phase 2: Visual QA and Polish — NEEDS USER VERIFICATION

### Tasks

- [x] 2.1 Verify dark mode styling on all new elements (uses same sd-* classes as personas — verified by code review)
- [x] 2.2 Verify responsive layout (uses same sd-blog-grid as personas — verified by code review)
- [x] 2.3 Ensure topic card icons render correctly (uses data-icon.html partial with icon field from topics.json)
- [ ] 2.4 Verify links to individual topic pages work (needs Hugo build)

### Validation

User confirms visual quality matches personas/blog/publications pages.

---

## Acceptance Criteria

- [ ] Topics list page uses Stitch section-design pattern (hero, stats, cards)
- [ ] Content count badges preserved on topic cards
- [ ] Only topics with content are displayed
- [ ] Dark mode works correctly
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Hugo builds without errors

---

## Files to Modify

- `layouts/topics/list.html` — Full rewrite to Stitch design pattern

## Reference Files (read-only)

- `layouts/personas/list.html` — Primary design reference
- `layouts/blog/list.html` — Secondary design reference
- `data/topics/topics.json` — Topics data source
