# Feature: Page-Level Redesign (Hero + Layout + Footer)

## Status: Completed

**Goal**: Restyle the hero section, sidebar, content layout, and footer for sovereignsky project pages to match the Stitch design system.

**Completed**: 2026-03-23

**Prerequisites**: PLAN-section-design-foundation (completed)

---

## What Was Done

### Phase 1: Custom Hero — DONE
- Created `layouts/partials/hero/sovereignsky.html` with tag badge, title, description, conditional CTAs, status/date
- Hero right panel shows video/image from `imageSquare` field (.webm/.mp4 autoplay support)
- Generator sets `heroStyle: "sovereignsky"` for section-based projects
- Hidden duplicate header when sovereignsky hero is active

### Phase 2: Sidebar → Inline Metadata — DONE
- Removed persistent sidebar entirely (matching Stitch design)
- Created `metadata-sidebar` shortcode: wraps content in 2fr/1fr grid with sticky metadata card
- Metadata card shows Topics, Tags, Audience (clickable links)
- Status/Started removed from sidebar (already in hero)
- Generator auto-wraps first highlight-card after summary in metadata-sidebar

### Phase 3: Full-Width Layout — DONE
- Full-width content flow, no sidebar
- Removed `prose` class and `max-w-prose` for sovereignsky pages
- Added CSS for markdown elements (headings, paragraphs, tables) in `.sd-content`
- Created `side-by-side` shortcode for 6/6 grid layouts
- Applied side-by-side to: DCT, UIS, software-database, sovdev-logger, docuwrite, client-provisioning, refugee-id, NDSI
- Feature-grid support inside side-by-side shortcode

### Phase 4: Footer + Nav + Images — DONE
- Created Stitch-styled footer for sovereignsky pages (4-column: SovereignSky, Platform, Resources, About)
- Default site footer hidden on sovereignsky pages via CSS `:has()` selector
- Global nav restyled with Space Grotesk font (template override, no layout changes)
- Renamed image fields: `image` → `imageWide`, added `imageSquare`
- Consistent naming: `{identifier}-wide.{ext}`, `{identifier}-square.{ext}`
- Hero videos for DCT and UIS

### Additional Work
- Added problem statements to software-database and docuwrite
- Restructured all projects with side-by-side layouts
- Fixed summary shortcode width
- Removed pagination HR lines (partial fix)

## Key Decisions

1. **Sidebar removed entirely** — Stitch has no persistent sidebar, metadata inline via shortcode
2. **Hero shows video/image** — `imageSquare` field with .webm/.mp4 support
3. **Image fields renamed** — `imageWide` (social) + `imageSquare` (hero), `-wide`/`-square` suffix convention
4. **Side-by-side shortcode** — Created for Stitch 6/6 grid layouts
5. **Nav: fonts only** — CSS-only backdrop/color changes broke dropdowns; settled on font change only
6. **Footer: sovereignsky-specific** — Custom footer partial, default hidden via `:has()`

## Files Created/Modified

- `layouts/partials/hero/sovereignsky.html` — Custom hero
- `layouts/partials/sovereignsky-footer.html` — Custom footer
- `layouts/partials/header/basic.html` — Nav font override
- `layouts/partials/header/components/desktop-menu.html` — Nav font override
- `layouts/partials/footer.html` — Added `.site-footer` class
- `layouts/sovereignsky/single.html` — Full-width layout, no sidebar
- `layouts/shortcodes/metadata-sidebar.html` — Inline metadata
- `layouts/shortcodes/side-by-side.html` — Two-column section groups
- `layouts/shortcodes/summary.html` — Fixed width
- `layouts/partials/sidebar/sovereignsky-sidebar.html` — Stitch-styled metadata card
- `layouts/partials/sidebar/sovereignsky-metadata-inline.html` — Inline metadata
- `scripts/generate-sovereignsky-pages.js` — heroStyle, imageWide/imageSquare, metadata-sidebar wrapping
- `data/sovereignsky/projects.json` — All projects restructured, image fields renamed
- `data/schemas/sovereignsky-projects.schema.json` — imageWide/imageSquare fields
- `assets/css/custom.css` — Hero, footer, content width, table styles, pagination fixes
- `images/projects/` — Renamed with `-wide`/`-square` convention
