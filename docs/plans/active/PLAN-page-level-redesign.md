# Feature: Page-Level Redesign (Hero + Sidebar)

## Status: Backlog

**Goal**: Restyle the hero section, sidebar, and page layout for sovereignsky project pages to match the Stitch design system.

**GitHub Issue**: —

**Last Updated**: 2026-03-22

**Prerequisites**: PLAN-section-design-foundation (completed)

**Priority**: High

---

## Overview

The section-design-foundation plan redesigned the content area with shortcodes. But the page-level elements — hero, sidebar, title/header, and content width — still use default Blowfish styling. This plan brings those elements in line with the Stitch design.

**Stitch HTML reference**: Screen `c43b1a7cb46843fdbf37ce1205e0918e` ("DevContainer Toolbox - Final Verified Content")

### What changes

| Element | Current (Blowfish) | Target (Stitch) |
|---------|-------------------|-----------------|
| Hero | Featured image, full-width | Grid: title + description + CTAs (left), gradient decorative panel (right), dot-grid background |
| Header | Title + status badge + date below hero | Integrated into hero section with tag badge |
| Sidebar | Blowfish card styling (white bg, borders) | Stitch surface colors, `--sd-*` tokens, uppercase labels, ghost borders |
| Content layout | Sidebar alongside ALL content | Sidebar only alongside top content, designed sections go full width below |
| Content width | `max-w-prose` (65ch) | Full content-column width for designed sections, prose-width for markdown |
| Dark mode | Blowfish defaults | Stitch dark tokens for sidebar and hero |

### What stays the same

- Blowfish nav/header/footer (site-wide, not project-specific)
- Sidebar data sources (Details, Relevant For, Topics, Tags, Related)
- Shortcode templates (already styled with `--sd-*` tokens)
- Featured images in content folder (used for social sharing/meta tags, not displayed in hero)

### Key decisions made

1. **No featured image in hero** — Use a decorative gradient panel instead. Featured images remain in the content folder for social sharing meta tags. Square images may be added later as a separate task.

2. **Sidebar approach: Option B (CSS-only)** — Restyle existing sidebar partials with CSS scoped under `.sd-sidebar`, rather than creating duplicate partial files. Only create a custom partial if HTML structure must change.

3. **Layout split** — The Stitch design shows the sidebar only alongside the top narrative content (problem statement). Below that, designed sections (feature-grid, steps, etc.) go full width. This means splitting the page into two zones: sidebar zone (top) and full-width zone (bottom).

4. **Breadcrumbs** — Keep breadcrumbs above the hero, in the existing Blowfish position. They help with navigation and don't conflict with the Stitch design.

5. **CTA buttons are conditional** — Not all projects have repository/documentation/website URLs. The hero must render gracefully with 0, 1, 2, or 3 buttons.

6. **Hero right panel varies** — Instead of a terminal preview (DCT-specific), use a generic decorative element: gradient panel with the project's primary topic icon and a subtle pattern. This works for all projects.

7. **CSS classes not inline styles** — Per lesson learned from Plan 1, never use Hugo template variables inside `style=""` attributes (causes `ZgotmplZ`). Use CSS classes for all dynamic styling.

---

## Phase 1: Custom Hero Partial

Create a hero partial for sovereignsky project pages that replaces the Blowfish image hero.

### Tasks

- [ ] 1.1 Create `layouts/partials/hero/sovereignsky.html`:
  - Two-column grid (7/5 on desktop, stacked on mobile)
  - Left: tag badge ("Sovereign Infrastructure" or first topic), title (from `.Title`), description (from `.Params.description`), conditional CTA buttons
  - Right: decorative gradient panel with subtle pattern
  - Dot-grid background pattern
  - Status badge and date integrated into hero
  - All styling via CSS classes (no template variables in `style` attributes)
- [ ] 1.2 Add `.bg-grid-pattern` CSS to `assets/css/custom.css` (from Stitch: `radial-gradient(circle, #0058be15 1px, transparent 1px)`)
- [ ] 1.3 Add hero CSS classes: `.sd-hero`, `.sd-hero-badge`, `.sd-hero-cta-primary`, `.sd-hero-cta-secondary`
- [ ] 1.4 CTA buttons conditional: show "View Repository" if `.Params.repository`, "Documentation" if `.Params.documentation`, "Project Website" if `.Params.externalUrl`
- [ ] 1.5 Update generator to set `heroStyle: "sovereignsky"` and `showHero: true` for section-based projects
- [ ] 1.6 Remove header section (title, status badge, date) from `single.html` when `heroStyle` is `"sovereignsky"` — these are now in the hero partial

### Validation

```bash
# Find container name
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' | grep sovereignsky-site | head -1 | cut -d' ' -f1 | tr -d '/')

docker exec $CONTAINER bash -c "cd /workspaces/sovereignsky-site && node scripts/generate-sovereignsky-pages.js"
docker exec $CONTAINER bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Manual: check http://localhost:1313/sovereignsky/devcontainer-toolbox/
# Hero should show: tag badge, title, description, CTA buttons, gradient panel, dot-grid
# No featured image displayed (but still in folder for social sharing)
# Status badge and date should be in hero, not below it

# Manual: check http://localhost:1313/sovereignsky/securenet/
# Hero should render gracefully with minimal content (no repo, no docs)
```

---

## Phase 2: Restyle Sidebar

Apply Stitch design tokens to sidebar cards using CSS-only approach.

### Tasks

- [ ] 2.1 Add `.sd-sidebar` class to sidebar wrapper in `layouts/sovereignsky/single.html` (conditional on sovereignsky hero)
- [ ] 2.2 Add sidebar CSS to `assets/css/custom.css` scoped under `.sd-sidebar`:
  - Card backgrounds: `var(--sd-surface-container-low)` with rounded corners
  - Labels: `font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--sd-outline)`
  - Values: `font-weight: 700; color: var(--sd-on-surface)`
  - Ghost borders: `border: 1px solid rgba(194, 198, 214, 0.15)` (not solid lines)
  - Status dot: small colored circle next to status value
- [ ] 2.3 Restyle project-links buttons: primary button gets gradient (`sd-hero-cta-primary`), secondary buttons get ghost borders
- [ ] 2.4 Tags: small uppercase pills with ghost borders (matching Stitch line 206-209)
- [ ] 2.5 Dark mode overrides for all sidebar styles

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Manual: sidebar should use Stitch surface colors, uppercase labels, ghost borders
# Manual: toggle dark mode — sidebar should use dark tokens
# Manual: check project-links buttons have gradient/ghost styling
```

---

## Phase 3: Content Layout Split

Split the page into two zones: sidebar zone (top, with sidebar) and full-width zone (bottom, without sidebar).

### Tasks

- [ ] 3.1 Restructure `layouts/sovereignsky/single.html` for section-based pages:
  - Zone 1: flex row with sidebar — contains early markdown sections (problem statement)
  - Zone 2: full-width — contains designed shortcode sections (feature-grid, steps, etc.)
  - Determine split point: after the first markdown section, or use a marker
- [ ] 3.2 Alternative simpler approach: keep sidebar alongside all content, but remove `max-w-prose` so designed sections use full content-column width (sidebar stays at 340px, content fills remaining space)
- [ ] 3.3 Ensure markdown sections within full-width zone still have readable line length (add `max-w-prose` to markdown sections via shortcode or CSS)
- [ ] 3.4 Ensure sidebar remains sticky and properly positioned

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Manual: designed sections (feature-grid, highlight-card) should be wider than before
# Manual: markdown text should still be readable (not stretching full width)
# Manual: sidebar should remain sticky on scroll
# Manual: check all 11 project pages
```

---

## Phase 4: Dark Mode and Responsive Testing

### Tasks

- [ ] 4.1 Test dark mode for hero, sidebar, and all sections
- [ ] 4.2 Fix dark mode color issues (hero background, sidebar surfaces, button colors, decorative panel)
- [ ] 4.3 Test on mobile (375px):
  - Hero grid should stack vertically (title above decorative panel)
  - Sidebar should move below content (existing Blowfish behavior)
  - Designed sections should be full-width
- [ ] 4.4 Test on tablet (768px)
- [ ] 4.5 Test on desktop (1280px)
- [ ] 4.6 Fix responsive issues
- [ ] 4.7 Verify all 11 project pages work across viewports
- [ ] 4.8 Fix horizontal lines between pagination and footer on sovereignsky pages (comes from `article-pagination.html` `<hr>` and footer border-top CSS)

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspaces/sovereignsky-site && hugo --gc"

# Manual: toggle dark mode at http://localhost:1313/sovereignsky/devcontainer-toolbox/
# Manual: test at 375px, 768px, 1280px viewports
# Manual: check all 11 project pages in both light and dark mode
```

---

## Acceptance Criteria

- [ ] Hero shows title, description, conditional CTA buttons, decorative panel (no featured image)
- [ ] Hero renders gracefully for projects with minimal data (e.g., securenet)
- [ ] Featured images remain in content folder for social sharing meta tags
- [ ] Sidebar uses Stitch surface colors, uppercase labels, ghost borders
- [ ] Designed sections use wider content width than before
- [ ] Markdown text stays at readable line length
- [ ] Dark mode works for hero, sidebar, and all sections
- [ ] Mobile layout works (375px) — hero stacks, sidebar below content
- [ ] All 11 project pages render correctly
- [ ] Non-sovereignsky pages are unaffected (blog, laws, etc.)
- [ ] `npm run validate` passes
- [ ] Hugo builds successfully

---

## Implementation Notes

### Hero partial naming

Hugo resolves hero partials by `heroStyle` frontmatter value. Setting `heroStyle: "sovereignsky"` will load `layouts/partials/hero/sovereignsky.html`. The generator sets this automatically for section-based projects; other projects keep `heroStyle: "big"` (Blowfish default).

### ZgotmplZ prevention

From Plan 1 lesson: Hugo's context-aware escaping replaces template variables in `style=""` attributes with `ZgotmplZ`. All dynamic styling must use CSS classes defined in `custom.css`, not inline styles with `{{ }}` expressions. For example:
- CTA button gradient: use `.sd-hero-cta-primary` class, not `style="background: linear-gradient({{ }})"`
- Sidebar card backgrounds: use `.sd-sidebar .card` selector, not `style="background: var({{ }})"`

### Content layout decision

Phase 3 offers two approaches:
- **Full split** (matching Stitch exactly): sidebar only in top zone, full-width sections below. More complex template logic, requires determining where to split content.
- **Simpler approach**: keep sidebar alongside all content, just remove `max-w-prose` so sections fill the content column. Sidebar stays at 340px. Less dramatic but much simpler.

Recommend starting with the simpler approach (3.2) and only doing the full split if the visual result isn't good enough.

### Stitch reference lines

From the downloaded Stitch HTML (`c43b1a7cb46843fdbf37ce1205e0918e`):

| Element | Lines |
|---------|-------|
| Hero section | 99-149 |
| Hero tag badge | 103-106 |
| Hero CTA buttons | 112-121 |
| Hero decorative panel | 123-147 |
| Sidebar metadata | 184-222 |
| Sidebar status | 186-193 |
| Sidebar tags | 204-211 |
| Dot-grid pattern CSS | 76-79 |

### Projects with minimal data

`securenet` has no body content, no repository URL, and no documentation URL. The hero should still render well with just a title, description, and the decorative panel. The CTA buttons section should be hidden entirely when no URLs are available.

## Files to Modify

- `layouts/partials/hero/sovereignsky.html` — **New file**: custom hero with grid layout
- `layouts/sovereignsky/single.html` — Conditional hero, sidebar class, content width
- `scripts/generate-sovereignsky-pages.js` — Set `heroStyle: "sovereignsky"` for section-based projects
- `assets/css/custom.css` — Hero, sidebar, layout, and dark mode styles

## Future Work (not in this plan)

- Square hero images for social sharing (replace current wide images)
- Per-project decorative elements in hero (terminal preview for DCT, etc.)
- Full sidebar/content split layout (if simpler approach in Phase 3 isn't sufficient)
