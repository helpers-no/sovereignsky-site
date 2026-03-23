# Feature: Page-Level Redesign (Hero + Sidebar + Layout)

## Status: Active

**Goal**: Restyle the hero section, sidebar, and page layout for sovereignsky project pages to match the Stitch design system.

**GitHub Issue**: —

**Last Updated**: 2026-03-23

**Prerequisites**: PLAN-section-design-foundation (completed)

**Priority**: High

---

## Overview

The section-design-foundation plan redesigned the content area with shortcodes. This plan brings the page-level elements — hero, sidebar/metadata, content layout — in line with the Stitch design.

**Stitch HTML reference**: Screen `c43b1a7cb46843fdbf37ce1205e0918e`

---

## Phase 1: Custom Hero Partial — DONE

- [x] 1.1 Create `layouts/partials/hero/sovereignsky.html` — grid layout with tag badge, title, description, conditional CTAs, status/date
- [x] 1.2 Add hero CSS (`.sd-hero`, `.sd-hero-badge`, `.sd-hero-cta-primary/secondary`, dot-grid background)
- [x] 1.3 CTA buttons conditional (repository, documentation, externalUrl)
- [x] 1.4 Generator sets `heroStyle: "sovereignsky"` for section-based projects
- [x] 1.5 Hide duplicate header when sovereignsky hero is active
- [x] 1.6 Hero right panel shows `hero.*` video/image (with video autoplay for .webm/.mp4)
- [x] 1.7 Rename `image` → `imageWide`, add `imageSquare` field for hero media
- [x] 1.8 Set `imageSquare` for DCT (dct-hero.webm) and UIS (uis-hero.webm)

---

## Phase 2: Sidebar → Inline Metadata — DONE

Changed approach from restyling sidebar (Option B) to removing it entirely (matching Stitch).

- [x] 2.1 Create `metadata-sidebar` shortcode — wraps content in 2fr/1fr grid with sticky metadata card
- [x] 2.2 Metadata card shows Topics, Tags, Audience (Status/Started removed — already in hero)
- [x] 2.3 Generator auto-wraps first highlight-card after summary in metadata-sidebar
- [x] 2.4 Created unified `sovereignsky-sidebar.html` partial with Stitch styling (`.sd-sidebar-card`, `.sd-sidebar-label`, `.sd-sidebar-tag`, `.sd-sidebar-topic`)
- [x] 2.5 Conditional: sovereignsky pages use inline metadata, other content types keep Blowfish sidebar

---

## Phase 3: Full-Width Layout — DONE

- [x] 3.1 Remove sidebar from sovereignsky layout — full-width content flow
- [x] 3.2 Remove `prose` class from sovereignsky section (was adding unwanted styles)
- [x] 3.3 Remove `max-w-prose` for section-based pages (`.sd-content`)
- [x] 3.4 Add CSS for markdown elements (headings, paragraphs, tables) in `.sd-content`
- [x] 3.5 Tables use full width with proper styling
- [x] 3.6 Create `side-by-side` shortcode for 6/6 grid layouts
- [x] 3.7 Add side-by-side layouts to: DCT, UIS, software-database, sovdev-logger, docuwrite, client-provisioning, refugee-id, NDSI
- [x] 3.8 Add `feature-grid` support inside `side-by-side` shortcode
- [x] 3.9 Fix summary shortcode width (remove negative margins)

---

## Phase 4: Dark Mode and Responsive Testing

### Tasks

- [ ] 4.1 Test dark mode for hero, sidebar, and all sections
- [ ] 4.2 Fix dark mode color issues (hero background, metadata card, button colors)
- [ ] 4.3 Test on mobile (375px) — hero should stack, sections full-width
- [ ] 4.4 Test on tablet (768px)
- [ ] 4.5 Test on desktop (1280px)
- [ ] 4.6 Fix responsive issues
- [ ] 4.7 Verify all 11 project pages work across viewports
- [ ] 4.8 Fix horizontal lines between pagination and footer

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"

# Manual: toggle dark mode on all project pages
# Manual: test at 375px, 768px, 1280px viewports
```

---

## Acceptance Criteria

- [x] Hero shows title, description, conditional CTA buttons (no featured image)
- [x] Hero shows video/image when imageSquare is set
- [x] Hero renders gracefully for projects with minimal data
- [x] Featured images remain for social sharing meta tags
- [x] No persistent sidebar — metadata inline with content
- [x] Designed sections use full content width
- [x] Side-by-side layouts used across all projects
- [x] All 11 project pages render correctly
- [x] Non-sovereignsky pages are unaffected
- [x] `npm run validate` passes
- [x] Hugo builds successfully
- [ ] Dark mode works for hero, metadata, and all sections
- [ ] Mobile layout works (375px)
- [ ] Pagination footer lines fixed

---

## Key decisions changed during implementation

1. **Sidebar removed entirely** — Originally planned CSS-only restyle (Option B). During implementation, discovered Stitch design has no persistent sidebar. Metadata rendered inline via `metadata-sidebar` shortcode.

2. **Hero shows video/image** — Originally planned decorative gradient panel. Added `imageSquare` field and video support (.webm/.mp4) after discovering homepage already uses hero videos.

3. **Image fields renamed** — `image` → `imageWide` (rectangular, social sharing), added `imageSquare` (square, hero panel). Clear naming for format.

4. **Side-by-side shortcode** — Not in original plan. Created to match Stitch's 6/6 grid layout (e.g., AI-Ready + Works Everywhere | Who Benefits).

5. **Problem/solution cards** — Added problem statements to projects that didn't have them (software-database, docuwrite) for consistency.

## Files Modified

- `layouts/partials/hero/sovereignsky.html` — Custom hero with video/image support
- `layouts/sovereignsky/single.html` — Full-width layout, no sidebar
- `layouts/shortcodes/metadata-sidebar.html` — Inline metadata with content
- `layouts/shortcodes/side-by-side.html` — Two-column section groups
- `layouts/shortcodes/summary.html` — Fixed width
- `layouts/partials/sidebar/sovereignsky-sidebar.html` — Stitch-styled metadata card
- `layouts/partials/sidebar/sovereignsky-metadata-inline.html` — Inline metadata (unused now)
- `scripts/generate-sovereignsky-pages.js` — heroStyle, imageWide/imageSquare, metadata-sidebar wrapping
- `data/sovereignsky/projects.json` — All projects restructured, image fields renamed
- `data/schemas/sovereignsky-projects.schema.json` — imageWide/imageSquare fields
- `assets/css/custom.css` — Hero, sidebar, content width, table styles
