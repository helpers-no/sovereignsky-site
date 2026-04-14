# Feature: Redesign datacenter single/country pages to Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Active

**Goal**: Convert datacenter `single.html` and `country.html` templates from the old sidebar layout to the Stitch section-design system, matching `countries/single.html` and `laws/single.html`.

**Last Updated**: 2026-04-14

---

## Overview

Two datacenter detail templates still use the old sidebar-based layout with DaisyUI cards:

- **`single.html`** — Provider detail pages (e.g. `/datacenters/azure/`). Uses `common-detail-header.html` + sidebar with inline card logic. Reads from `site.Data.datacenters` for provider metadata.
- **`country.html`** — Country datacenter pages (e.g. `/datacenters/germany/`). Uses `common-detail-header.html` + sidebar with partial cards. Reads from `site.Data.countries` and `site.Data.datacenters`.

**Note**: `provider.html` already uses a modernized partial-based layout and is not in scope. `list.html` was already redesigned in `PLAN-datacenters-redesign.md`.

**Target pattern**: `layouts/countries/single.html` — Stitch hero + inline metadata grid + full-width content + floating TOC + footer. No sidebar.

**Key transformation**:
1. Replace `common-detail-header.html` with `.sd-events-hero` gradient hero (breadcrumbs, badge, title)
2. Replace sidebar cards with `.sd-events-stats` inline metadata grid
3. Wrap content in `.sd-blog-feed > .sd-dc-content`
4. Add floating TOC and `sovereignsky-footer.html`
5. Remove all sidebar partial calls

---

## Phase 1: Redesign `single.html` (Provider Detail Page) — DONE

### Tasks

- [x] 1.1 Replace `common-detail-header.html` with Stitch hero section ✓
- [x] 1.2 Build metadata grid with 3 cards: Provider Details, Countries, Compare ✓
- [x] 1.3 Build content section with external link, content, tags, back link ✓
- [x] 1.4 Add floating TOC and `sovereignsky-footer.html` ✓
- [x] 1.5 Remove all sidebar partial calls ✓
- [x] 1.6 Preserve all existing data resolution logic ✓

### Validation

Hugo template syntax is correct. Page structure matches `countries/single.html` pattern.

---

## Phase 2: Redesign `country.html` (Country Datacenter Page) — DONE

### Tasks

- [x] 2.1 Replace `common-detail-header.html` with Stitch hero section ✓
- [x] 2.2 Build metadata grid with 3 cards: Region Details, Memberships, Top Providers ✓
- [x] 2.3 Build content section with summary, map, providers, regions, laws link ✓
- [x] 2.4 Add floating TOC and `sovereignsky-footer.html` ✓
- [x] 2.5 Remove all sidebar partial calls and DaisyUI card markup ✓

### Validation

Hugo template syntax is correct. Page structure matches `countries/single.html` pattern.

---

## Phase 3: Commit & Push — IN PROGRESS

### Tasks

- [x] 3.1 Commit changes on feature branch ✓
- [x] 3.2 Push branch ✓
- [ ] 3.3 Create PR and verify on live site after CI deploy

### Validation

CI passes, pages render correctly on live site.

---

## Acceptance Criteria

- [ ] `single.html` uses Stitch hero, inline metadata grid, and full-width content (no sidebar)
- [ ] `country.html` uses Stitch hero, inline metadata grid, and full-width content (no sidebar)
- [ ] All existing data (provider details, countries, risk levels, comparisons) is preserved
- [ ] Map shortcodes render correctly on country pages
- [ ] Inline partials (providers, regions) still work
- [ ] Floating TOC navigation works
- [ ] Dark mode renders correctly
- [ ] Site builds without errors

## Files to Modify

- `layouts/datacenters/single.html`
- `layouts/datacenters/country.html`
