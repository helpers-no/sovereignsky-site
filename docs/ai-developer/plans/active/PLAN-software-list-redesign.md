# Feature: Redesign /software/ list page to match Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Backlog

**Goal**: Redesign the software list page to use the section-design (Stitch) treatment matching topics, personas, blog, and other redesigned pages — while preserving all existing filtering, search, and pagination functionality.

**Last Updated**: 2026-04-14

---

## Overview

The `/software/` list page still uses the old layout (`section-header.html` + raw Tailwind utility classes + inline `<style>` block). All other section pages (topics, personas, blog, publications, events, laws, datacenters) have been migrated to the Stitch section-design pattern. This plan brings the software list page in line.

The software page is more complex than other list pages because it has:
- Client-side search (text input filtering by name, vendor, description)
- Multi-dimensional filter bar (risk level, vendor jurisdiction, data residency, jurisdiction exposure, features, use area)
- Pagination (40 items per page)
- URL state management (filters/page reflected in query params)
- SEO: all cards server-rendered in DOM, JS controls visibility

All filtering, search, and pagination JS logic must be fully preserved. The redesign is visual only — wrapping in Stitch structure and replacing Tailwind utilities with `sd-*` component classes.

**Reference**: `layouts/topics/list.html` (Stitch list pattern), `layouts/software/single.html` (Stitch software single pattern with filter pills)

---

## Current State

- **Software list** (`layouts/software/list.html`): Uses `section-header.html`, raw Tailwind grid (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`), inline `<style>` for filter/page buttons, inline `<script>` for filtering/pagination.
- **Topics list** (`layouts/topics/list.html`): Full Stitch design — gradient hero, 3 stat cards, featured + grid layout.
- **Software single** (`layouts/software/single.html`): Full Stitch design with `sd-filter-pills` pattern for display-only pills.

---

## Phase 1: Hero and Stats Sections

### Tasks

- [ ] 1.1 Wrap entire page in `<article class="sd-software-list section-design">` (distinct from `sd-software` used by single page)
- [ ] 1.2 Replace `section-header.html` partial with Stitch gradient hero section (`sd-events-hero` pattern)
  - Badge text: "Software Assessment"
  - Title: page `.Title` (Software)
  - Description: from page `.Description` or fallback about browsing sovereign software assessments
- [ ] 1.3 Add stat cards section (`sd-events-stats` pattern) with 3 stats:
  - Total Products (count of `.Pages`)
  - Vendors (count of distinct `vendor_name` values)
  - Use Areas (count from `site.Data.software.useAreas`)
- [ ] 1.4 Add `{{ partial "sovereignsky-footer.html" . }}` after closing `</article>`

### Validation

Hugo builds without errors. Page shows gradient hero and stat cards.

---

## Phase 2: Restyle Filter Section

### Tasks

- [ ] 2.1 Move filter section inside `<section class="sd-blog-feed">` wrapper (same content container used by other Stitch pages)
- [ ] 2.2 Restyle the search input: replace Tailwind utilities with Stitch-compatible inline styles using `var(--sd-*)` CSS variables (surface-container background, outline border, on-surface text)
- [ ] 2.3 Restyle the filter bar container: replace `bg-neutral-50 dark:bg-neutral-800` with `var(--sd-surface-container-low)` background
- [ ] 2.4 Restyle filter buttons: replace `.filter-btn` CSS with `sd-filter-pill` / `sd-filter-pill-active` classes from the existing Stitch design system, updating JS to toggle `sd-filter-pill-active` instead of custom `active` class
- [ ] 2.5 Restyle active filter tags display: replace Tailwind `bg-primary-100` tags with `sd-filter-pill` styled tags
- [ ] 2.6 Restyle "Showing X of Y" and pagination info text: use `var(--sd-on-surface-variant)` color

### Validation

Filters render with Stitch styling. All filter interactions still work (risk, country, area, residency, exposure, features). Dark mode works via CSS variables.

---

## Phase 3: Restyle Product Grid and Cards

### Tasks

- [ ] 3.1 Replace Tailwind grid classes on `#software-grid` with Stitch-compatible grid styling (keep 5-column max for software density, use `sd-blog-grid`-inspired responsive grid via inline style or new CSS class)
- [ ] 3.2 Restyle `.software-card` elements: replace Tailwind border/bg/hover utilities with Stitch card pattern (using `var(--sd-*)` variables for surface, outline, shadow)
- [ ] 3.3 Preserve all `data-*` attributes on cards (required for JS filtering)
- [ ] 3.4 Restyle card inner content (title, vendor, residency, exposure, features, use areas): replace Tailwind text utilities with `var(--sd-on-surface)` / `var(--sd-on-surface-variant)` colors
- [ ] 3.5 Restyle "no results" message with Stitch colors
- [ ] 3.6 Restyle pagination buttons: replace `.page-btn` CSS with Stitch-compatible styles using `var(--sd-*)` variables

### Validation

Product grid renders with Stitch styling. Cards show proper colors in light and dark mode. Filtering, pagination, and search all still work. All card data attributes preserved.

---

## Phase 4: Clean Up Inline Styles

### Tasks

- [ ] 4.1 Move any new component-level CSS from inline `<style>` to `assets/css/custom.css` under a `.sd-software-list` scope (only if needed — prefer reusing existing `sd-*` classes)
- [ ] 4.2 Remove all Tailwind utility classes from the template (replace with Stitch classes or scoped CSS)
- [ ] 4.3 Verify the `<script>` block still works with updated class names (especially `.software-card`, `.hidden`, `.initially-hidden`, filter button selectors)
- [ ] 4.4 Test: Hugo builds, page loads, search works, all 7 filter dimensions work, pagination works, URL state preserved

### Validation

No raw Tailwind classes remain in the template. Hugo builds without errors. Full functional test of search, filters, pagination.

---

## Acceptance Criteria

- [ ] Software list page uses Stitch section-design pattern (hero, stats, styled filters, styled cards)
- [ ] All 7 filter dimensions work (risk, country, area, residency, exposure, open source, self-hosted)
- [ ] Search functionality works
- [ ] Pagination works (40 items per page)
- [ ] URL state management preserved (filters/page in query params)
- [ ] Dark mode works correctly via CSS variables
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] All card data attributes preserved for SEO and JS filtering
- [ ] Hugo builds without errors
- [ ] No raw Tailwind utility classes in the template

---

## Files to Modify

- `layouts/software/list.html` — Full rewrite to Stitch design pattern
- `assets/css/custom.css` — Add any new `.sd-software-list` scoped styles (if needed)

## Reference Files (read-only)

- `layouts/topics/list.html` — Primary list page design reference
- `layouts/software/single.html` — Software-specific Stitch reference (pill styles, risk colors)
- `assets/css/custom.css` — Stitch design system CSS variables and components
