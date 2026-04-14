# Feature: Redesign /countries/ pages to match Stitch Section-Design system

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Goal**: Migrate the countries listing page, single/detail pages, and bloc pages from old Blowfish/DaisyUI design to the Stitch Section-Design system (`sd-*` classes).

**Last Updated**: 2026-04-10

**Paperclip Issue**: SOV-29

---

## Overview

The `/countries/` section is the last major section still using the old layout pattern (`section-header.html`, DaisyUI `.stats`, plain Tailwind). It needs to match the Stitch section-design pattern already applied to datacenters, laws, networks, topics, personas, and publications.

**Three templates to redesign:**
- `layouts/countries/list.html` — country listing with grid
- `layouts/countries/single.html` — individual country detail page
- `layouts/countries/bloc.html` — regional bloc pages (EU, EEA, etc.)

**Reference pages**: `layouts/datacenters/list.html`, `layouts/laws/list.html`, `layouts/networks/list.html`, `layouts/networks/single.html`

**Data sources**: `site.Data.countries.countries.itemListElement`, `site.Data.datacenters`, `site.Data.laws`

---

## Phase 1: Redesign List Template (`layouts/countries/list.html`) — DONE

### Tasks

- [x] 1.1 Replace `section-header.html` partial with `sd-events-hero` structure ✓
- [x] 1.2 Add `sd-events-stats` section with overlapping stat cards ✓
- [x] 1.3 Wrap country grid in `sd-blog-feed` / `sd-dc-content` container ✓
- [x] 1.4 Restyle country cards using `sd-*` design tokens ✓
- [x] 1.5 Wrap `.Content` section in `sd-dc-content` ✓
- [x] 1.6 Replace floating TOC; add `sovereignsky-footer.html` ✓
- [x] 1.7 Add `.sd-countries` scoped CSS ✓
- [x] 1.8 Verify Hugo template syntax ✓

### Changes Made

- `layouts/countries/list.html` — full rewrite to section-design pattern
- `assets/css/custom.css` — added `.sd-countries-stats`, `.sd-country-grid`, `.sd-country-card` styles
- Commit: `bd4843e`

---

## Phase 2: Redesign Single/Detail Template (`layouts/countries/single.html`) — DONE

### Tasks

- [x] 2.1 Remove `common-single-page.html` wrapper ✓
- [x] 2.2 Apply `sd-countries section-design` wrapper with hero (breadcrumbs, flag, name) ✓
- [x] 2.3 Replace 7 sidebar cards with inline 3-column metadata grid (`sd-country-detail-meta`) ✓
- [x] 2.4 Wrap content in `sd-blog-feed` / `sd-dc-content` ✓
- [x] 2.5 Inline map, laws, providers from existing partials ✓
- [x] 2.6 Add `sovereignsky-footer.html` and floating TOC ✓
- [x] 2.7 Add responsive CSS for `sd-country-detail-meta` ✓
- [x] 2.8 Verify Hugo template syntax ✓

### Changes Made

- `layouts/countries/single.html` — full rewrite from `common-single-page.html`
- `assets/css/custom.css` — added `.sd-country-detail-meta` responsive grid styles
- Commit: `19123fa`

---

## Phase 3: Redesign Bloc Template (`layouts/countries/bloc.html`) — DONE

### Tasks

- [x] 3.1 Replace `common-detail-header.html` with `sd-events-hero` (breadcrumbs, flag, bloc name) ✓
- [x] 3.2 Replace DaisyUI `.stats` with `sd-events-stat-card` (4 cards: Risk, Members, Laws, DC Regions) ✓
- [x] 3.3 Apply `sd-countries section-design` wrapper ✓
- [x] 3.4 Restyle member country grid and provider cards with `sd-country-card` pattern ✓
- [x] 3.5 Preserve map shortcode and all data bindings ✓
- [x] 3.6 Replace DaisyUI divider/buttons with section-design links ✓
- [x] 3.7 Add `sovereignsky-footer.html` and updated floating TOC ✓
- [x] 3.8 Add `sd-bloc-stats` (4-col) and `sd-bloc-note` CSS ✓
- [x] 3.9 Verify Hugo template syntax ✓

### Changes Made

- `layouts/countries/bloc.html` — full rewrite to section-design pattern
- `assets/css/custom.css` — added `.sd-bloc-stats` responsive grid and `.sd-bloc-note` styles
- Commit: `bb70006`

---

## Acceptance Criteria

- [ ] All three templates use Stitch section-design (`sd-*` classes)
- [ ] Gradient hero with badge and description on all pages
- [ ] Stat cards overlap hero section
- [ ] Country flags and data bindings preserved
- [ ] Map shortcodes and interactive elements work
- [ ] Both light and dark mode render correctly
- [ ] `sovereignsky-footer.html` on all pages
- [ ] Site builds without errors

## Files to Modify

- `layouts/countries/list.html`
- `layouts/countries/single.html`
- `layouts/countries/bloc.html`
- `assets/css/custom.css` (add `.sd-countries` scoped styles)

## Implementation Notes

- Use `sd-countries` as the article class identifier (matching pattern: `sd-datacenters`, `sd-laws`, `sd-networks`)
- Stat card count: 3 cards for list page (matches datacenters/laws), 4 cards for bloc page (needs grid override like networks)
- Country cards should preserve flag emoji rendering and computed `dcCount`/`lawCount` from `site.Data`
- The single page currently uses 7 sidebar partials — these need to be converted to inline metadata sections
- Stop after each phase for user confirmation before proceeding
