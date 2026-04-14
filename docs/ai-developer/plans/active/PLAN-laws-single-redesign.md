# Feature: Redesign individual law pages to Stitch design language

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: In Progress

**Goal**: Replace the old sidebar-based `common-single-page.html` layout on individual law pages with the Stitch section-design pattern matching the countries/networks single pages.

**Last Updated**: 2026-04-13

---

## Overview

The `/laws/{law-name}/` pages currently use `common-single-page.html` which renders a traditional Blowfish sidebar layout with DaisyUI cards. The rest of the site (countries, networks, datacenters, laws list) has been redesigned to use the Stitch section-design system with gradient hero, inline stat cards, and full-width content.

**Current state**: `layouts/laws/single.html` delegates entirely to `common-single-page.html` with 7 sidebar card partials.

**Target state**: Inline Stitch template matching `layouts/countries/single.html` pattern — gradient hero, metadata stat cards, full-width content body.

**Reference templates**: `layouts/countries/single.html`, `layouts/countries/bloc.html`

---

## Phase 1: Rewrite single.html to Stitch pattern — DONE

Convert `layouts/laws/single.html` from the `common-single-page.html` partial to an inline Stitch section-design template.

### Tasks

- [x] 1.1 Replace entire `single.html` with inline Stitch template structure
  - Wrap in `<article class="sd-laws section-design">`
  - Add gradient hero (`sd-events-hero`) with breadcrumbs, badge ("Legislation"), title, alternate name, and "Official text" external link button
  - Add metadata stat cards section (`sd-events-stats`) with 3 cards:
    - **Details**: Year, Type (with emoji), Gov Access, Data Protection, boolean flags
    - **Applies To**: Jurisdiction countries/blocs with flags and links
    - **Relevant For**: Audience personas with links
  - Add main content section (`sd-blog-feed` > `sd-dc-content`) with:
    - Abstract section
    - Summary section
    - Table of contents
    - Main markdown content
    - Related Laws section (conflicts, complements, implements, etc.)
    - Same Jurisdiction laws
    - Topics and Tags as pill links
    - Back link to /laws/
  - Add floating TOC partial

- [x] 1.2 Inline the law type emoji/label logic (from sidebar/laws-details-card.html)
- [x] 1.3 Inline the jurisdiction resolution logic (from sidebar/laws-appliesto.html)
- [x] 1.4 Inline the related laws logic (from sidebar/laws-related-card.html)

### Validation

- Hugo build succeeds
- Page renders with gradient hero, stat cards, full-width content
- All metadata visible (year, type, access, protection, flags, jurisdictions, audience)
- Related laws links work
- External "Official text" link works

---

## Phase 2: CSS additions if needed — DONE (no changes needed)

### Tasks

- [x] 2.1 Check if any law-specific CSS classes are needed beyond existing `.sd-laws` styles — None needed, reuses existing `sd-events-stats`, `sd-events-stat-card`, `sd-filter-pills` etc.
- [x] 2.2 Add any missing responsive/dark-mode styles for the new layout — Not needed, inherits from shared section-design styles

### Validation

- Dark mode renders correctly
- Mobile layout is responsive
- No visual regressions on laws list page

---

## Phase 3: Commit, push, and verify — IN PROGRESS

### Tasks

- [x] 3.1 Commit changes on feature branch
- [x] 3.2 Push and create PR #29
- [ ] 3.3 Verify on live site after CI deploy (pending merge)

### Validation

- Live page matches design intent
- All interactive elements work

---

## Files to Modify

- `layouts/laws/single.html` — Primary template rewrite
- `assets/css/custom.css` — CSS additions if needed

## Files for Reference (read-only)

- `layouts/countries/single.html` — Target pattern
- `layouts/partials/sidebar/laws-details-card.html` — Details metadata logic
- `layouts/partials/sidebar/laws-appliesto.html` — Jurisdiction logic
- `layouts/partials/sidebar/laws-related-card.html` — Related laws logic
- `layouts/partials/sidebar/common-audience-card.html` — Audience logic
- `content/laws/gdpr/index.md` — Example law frontmatter
