# Feature: Redesign software single pages to Stitch design

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Active

**Goal**: Convert `layouts/software/single.html` from the old Tailwind utility-class layout to the Stitch section-design system, matching `laws/single.html` and `datacenters/single.html`.

**Last Updated**: 2026-04-14

---

## Overview

The software single page (`/software/{slug}/`) currently uses raw Tailwind utility classes (`max-w-4xl`, `bg-neutral-50`, `grid-cols-3`, etc.) and lacks the visual consistency of the recently redesigned datacenter, laws, and topics pages.

**Current layout**: Flat article with breadcrumb, header, hosting section, jurisdiction warning, key concerns, NDSI assessment, mitigations, alternatives, technical details, sources, and back link — all styled with inline Tailwind classes.

**Target pattern**: `layouts/laws/single.html` / `layouts/datacenters/single.html` — Stitch hero + metadata grid + full-width content + floating TOC + footer. No sidebar.

**Key transformation**:
1. Wrap in `<article class="sd-software section-design">`
2. Replace header/breadcrumb with `.sd-events-hero` gradient hero (breadcrumbs, badge, title, description, risk badge)
3. Replace hosting section with `.sd-events-stats` metadata grid (3 cards: Product Details, Hosting & Jurisdiction, NDSI Score)
4. Wrap remaining content in `.sd-blog-feed > .sd-dc-content`
5. Add floating TOC and `sovereignsky-footer.html`
6. Remove all raw Tailwind utility classes

---

## Phase 1: Hero Section — DONE

### Tasks

- [x] 1.1 Replace outer `<article>` wrapper with `<article class="sd-software section-design">` ✓
- [x] 1.2 Replace breadcrumb nav with Stitch hero breadcrumbs (Home › Software › Name) ✓
- [x] 1.3 Add `.sd-events-hero-badge` with "Software" label and pulsing dot ✓
- [x] 1.4 Add `.sd-headline.sd-events-hero-title` with product name ✓
- [x] 1.5 Add `.sd-events-hero-description` with product description ✓
- [x] 1.6 Add risk level badge button in hero (frosted glass style, matching law source link pattern) ✓
- [x] 1.7 Remove old header section with Tailwind classes ✓

### Validation

Hero renders with gradient background, breadcrumbs, badge, title, description, and risk indicator.

---

## Phase 2: Metadata Grid — DONE

### Tasks

- [x] 2.1 Create `.sd-events-stats` container with 3 cards ✓
- [x] 2.2 **Card 1 — Product Details**: Vendor (with flag), Risk Level (with emoji), Open Source (Yes/No), Data Portability, Self-Hosted — using `<dl>` with flex space-between rows ✓
- [x] 2.3 **Card 2 — Hosting & Jurisdiction**: Data Residency (country pills with flags), Jurisdiction Exposure (country pills with flags or "No foreign exposure" pill), hosting notes — using `.sd-filter-pills` ✓
- [x] 2.4 **Card 3 — NDSI Score**: Overall score as `.sd-events-stat-value`, version/date as description ✓
- [x] 2.5 Remove old "Hosting & Jurisdiction" section with Tailwind grid ✓

### Validation

Three metadata cards render below hero with hover effects and correct data.

---

## Phase 3: Content Section — DONE

### Tasks

- [x] 3.1 Open `.sd-blog-feed > .sd-dc-content` wrapper ✓
- [x] 3.2 Convert jurisdiction exposure warning to Stitch-styled alert (using `var(--sd-error)` colors) ✓
- [x] 3.3 Convert key concerns to styled list under h2 with border-bottom ✓
- [x] 3.4 Convert NDSI assessment breakdown to grid of score cards (dimension name, score, rationale) ✓
- [x] 3.5 Convert mitigations to styled cards with effort/impact pills using `.sd-filter-pill` pattern ✓
- [x] 3.6 Convert alternatives section to `.sd-blog-grid` with `.sd-blog-card-inner` cards (flag, name, description, risk pill) ✓
- [x] 3.7 Converted technical details into Product Details metadata card (Phase 2) ✓
- [x] 3.8 Convert sources section ✓
- [x] 3.9 Add back link with Stitch styling ✓
- [x] 3.10 Remove all remaining Tailwind utility classes ✓

### Validation

All content sections render with Stitch design language. No raw Tailwind classes remain.

---

## Phase 4: TOC and Footer — DONE

### Tasks

- [x] 4.1 Add floating TOC with sections: Jurisdiction, Concerns, Assessment, Mitigations, Alternatives ✓
- [x] 4.2 Add `sovereignsky-footer.html` partial ✓
- [x] 4.3 Set `.Scratch "scope" "single"` at template top ✓

### Validation

Floating TOC appears with correct section anchors. Footer renders.

---

## Acceptance Criteria

- [ ] Software single page uses Stitch section-design classes exclusively (no raw Tailwind)
- [ ] Visual structure matches laws/datacenter single pages (hero → cards → content)
- [ ] All existing data (vendor, hosting, NDSI, mitigations, alternatives, sources) is preserved
- [ ] Hover effects work on metadata cards
- [ ] Floating TOC navigates to correct sections
- [ ] Dark mode renders correctly via CSS variables
- [ ] No Hugo build errors

## Files to Modify

- `layouts/software/single.html` — Full rewrite to Stitch design
