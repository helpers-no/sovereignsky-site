# Feature: Homepage Stitch Redesign

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Active

**Goal**: Convert the homepage from DaisyUI card-based design to the Stitch ("Sovereign Resilience") design system used across the rest of the site.

**Last Updated**: 2026-04-15

---

## Overview

The homepage (`layouts/partials/home/custom.html`) is the last major page still using DaisyUI cards and Tailwind utility classes instead of the site's Stitch design system. All other section pages (events, countries, laws, datacenters, blog, publications, software, networks, personas) have been redesigned with `sd-*` prefixed CSS classes scoped under `.section-design`.

The redesign will convert each homepage section to use existing Stitch patterns while preserving all current content, data bindings, and functionality.

---

## Design Approach

Use the **events list page** (`layouts/events/list.html`) as the primary reference pattern:
- Blue gradient hero with badge, title, description (`sd-events-hero`)
- Overlapping stat cards (`sd-events-stat-card`)
- Card grids with `sd-` prefixed classes
- Material Symbols Outlined icons instead of inline SVGs
- Dark mode support via existing CSS custom properties (`--sd-*`)

The entire homepage will be wrapped in `<article class="sd-home section-design">`.

### Section Mapping

| Current Section | Stitch Pattern | Notes |
|----------------|----------------|-------|
| Hero (gradient banner) | `sd-events-hero` pattern | Keep tagline, add badge |
| Ready to Use (3 tool cards) | `sd-highlight-*` cards or custom `sd-home-tools` grid | Featured tools with status badges |
| Databases (8 stat cards) | `sd-events-stat-card` pattern | Adapt for 4x2 grid of data counts |
| Personas (audience cards) | Existing `sd-` persona card pattern | Reference personas list page |
| Blog (3 featured posts) | `sd-` card grid pattern from blog list | Keep featured slugs |
| Publications (3 featured) | Same card grid pattern | Keep featured slugs |
| Events (card grid) | Keep existing `event-cards-grid.html` partial | Already uses partial |
| Join Us (CTA banner) | `sd-cta` or custom gradient section | Keep content, restyle |
| Coming Soon (2+1 cards) | `sd-highlight-*` card pattern | Progress indicators |

---

## Phase 1: Hero + Stats Sections

### Tasks

- [x] 1.1 Wrap entire homepage in `<article class="sd-home section-design">`
- [x] 1.2 Replace DaisyUI hero with `sd-events-hero` pattern (badge, title, description)
- [x] 1.3 Convert "Ready to Use" tools section to Stitch card pattern with `sd-home-tool-card` styling
- [x] 1.4 Convert "Databases" stat cards to `sd-events-stat-card` pattern (keep data bindings)
- [x] 1.5 Add any new CSS classes needed to `assets/css/custom.css` under a homepage section

### Validation

Hugo builds successfully. User confirms hero and top sections look correct.

---

## Phase 2: Content Sections

### Tasks

- [x] 2.1 Convert Personas section to Stitch card grid (reference personas list page patterns)
- [x] 2.2 Convert Blog section to Stitch card grid (reference blog list page patterns)
- [x] 2.3 Convert Publications section to Stitch card grid
- [x] 2.4 Verify Events section (already uses partial, may just need wrapper class)
- [x] 2.5 Replace inline SVG icons with Material Symbols Outlined where appropriate

### Validation

Hugo builds successfully. User confirms content sections render correctly.

---

## Phase 3: CTA + Coming Soon + Polish

### Tasks

- [x] 3.1 Convert "Join Us" CTA to Stitch-styled gradient section
- [x] 3.2 Convert "Coming Soon" section to Stitch card pattern
- [x] 3.3 Verify dark mode renders correctly across all sections
- [x] 3.4 Test responsive layouts (mobile, tablet, desktop breakpoints)
- [x] 3.5 Remove any remaining DaisyUI/Tailwind utility classes from homepage

### Validation

Hugo builds successfully. User confirms full homepage looks correct in both light and dark mode.

---

## Acceptance Criteria

- [x] Homepage uses only `sd-*` prefixed Stitch classes (no DaisyUI card/badge classes)
- [x] All existing content preserved (text, links, data bindings, counts)
- [x] Dark mode works correctly
- [x] Responsive layout works on mobile, tablet, desktop
- [x] Hugo builds without errors
- [x] Visual consistency with other Stitch-redesigned pages

---

## Files to Modify

- `layouts/partials/home/custom.html` — Main homepage template (full rewrite)
- `assets/css/custom.css` — Add homepage-specific `sd-home-*` classes
