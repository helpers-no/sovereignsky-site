# Feature: Publications Page Redesign

## Status: Backlog

**Goal**: Restyle the publications list and single pages to match the Stitch design system, using the same pattern as blog, events, and projects list pages.

**Last Updated**: 2026-03-27

**Prerequisites**: None

**Priority**: Medium

---

## Overview

The publications pages use a compact card layout (`card-compact.html` partial) with DaisyUI styling. This plan applies the same Stitch design pattern established across the site: blue gradient hero, stat cards, shared filter pills, and a consistent card grid.

**Data source**: `data/publications/publications.json` — array of publication objects (not schema.org ItemList wrapper like other data files).

**Scope**: Only affects `/publications/` pages.

### Key differences from blog

- Publications use a **compact card** showing image + publisher + title (no description in cards)
- Publications have extra metadata: `publication_type`, `publisher`/`institutions`, `author`, `year`, `source_url`
- Single page uses `common-single-page.html` partial with sidebar cards
- No `weight` field — publications likely sorted by date
- 8 publications total (smaller collection than blog)

### What changes

| Element | Current | Target (Stitch) |
|---------|---------|-----------------|
| List hero | Section header with icon | Blue gradient hero with badge, title, description |
| Stats | DaisyUI stat cards | 3 overlapping stat cards |
| Filters | DaisyUI buttons | Shared `.sd-filter-pill` classes |
| Publication cards | Compact cards (image + publisher + title) | 3-column grid with image, publisher, title, type badge |
| Single page | `common-single-page.html` with Blowfish sidebar | Remove sidebar, inline metadata (same as blog/projects) |
| Footer | Default Blowfish | Sovereignsky footer |

---

## Phase 1: Publications List Page

### Tasks

- [ ] 1.1 Blue gradient hero with badge, "Publications" title, description
- [ ] 1.2 3 stat cards overlapping hero (total publications, topics covered, publishers/sources)
- [ ] 1.3 Shared filter pills (`.sd-filter-pill`) for audience + topic
- [ ] 1.4 Publication cards in 3-column grid: image, type badge (Report/Paper/Guide/Book), publisher, title
- [ ] 1.5 Filter JavaScript with URL persistence using `.sd-filter-pill-active`
- [ ] 1.6 Sovereignsky footer, hide default footer

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
# Manual: check http://localhost:1313/publications/
# Manual: test filters
```

---

## Phase 2: Publications Single Page

### Tasks

- [ ] 2.1 Replace `common-single-page.html` with custom template
- [ ] 2.2 Featured image at top (same as blog: image above, title below)
- [ ] 2.3 Title, publisher, type badge, date, authors below image
- [ ] 2.4 Metadata bar (topics, tags, audience) before content
- [ ] 2.5 "Read Original" external link button (publications link to external sources)
- [ ] 2.6 Key takeaways section (if available in frontmatter)
- [ ] 2.7 Prose content
- [ ] 2.8 "Back to publications" link
- [ ] 2.9 Sovereignsky footer
- [ ] 2.10 No sidebar — inline metadata consistent with rest of site

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
# Manual: check any publication single page
# Manual: external link works
```

---

## Phase 3: Testing

### Tasks

- [ ] 3.1 All 8 publications render on list and single pages
- [ ] 3.2 Filters work
- [ ] 3.3 Hugo builds, npm run validate passes
- [ ] 3.4 Non-publications pages unaffected

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && npm run validate"
```

---

## Acceptance Criteria

- [ ] Publications list has blue gradient hero with stats
- [ ] Shared filter pills work
- [ ] Publication cards in 3-column grid with type badges
- [ ] Single page has image-first hero, inline metadata, no sidebar
- [ ] External "Read Original" link preserved
- [ ] Hugo builds successfully
- [ ] `npm run validate` passes

---

## Implementation Notes

### Card design for publications

Publications are different from blog posts — they link to external sources and show publisher/institution rather than author. The card should emphasize:
- **Publisher** (who published it — e.g., "European Commission", "ICRC")
- **Type** badge (Report, Paper, Guide, Book)
- **Title** (the publication name)
- **Image** (thumbnail/cover if available)

### Single page approach

Current single page uses `common-single-page.html` which provides a sidebar-based layout. Replace with a custom template matching the blog post pattern: image-first, inline metadata, full-width content.

## Files to Modify

- `layouts/publications/list.html` — Hero, stats, filters, card grid
- `layouts/publications/single.html` — Custom template replacing common-single-page
- `assets/css/custom.css` — Publications footer rule (if needed)
