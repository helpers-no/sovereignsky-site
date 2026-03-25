# Feature: Blog Page Redesign

## Status: Backlog

**Goal**: Restyle the blog list and single post pages to match the Stitch design system.

**GitHub Issue**: —

**Last Updated**: 2026-03-25

**Prerequisites**: None

**Priority**: Medium

---

## Overview

The blog pages currently use default Blowfish styling. Stitch has designed both a list page and a post page using the Sovereign Resilience design system.

**Stitch references:**
- List page: Screen "SovereignSky Blog - Clean Full Width" (`2d3c5d7a96c14f14888af4a75b730afb`)
- Post page: Screen "Hybrid War Post with Sidebar Metadata" (`ff20b09409a04658b6bff591586120e6`)

**Data source**: `data/blog/blog.json` — no changes needed.

**Scope**: Only affects `/blog/` pages. No other content types affected.

### Key decisions

1. **Featured post**: Most recent post gets the large card treatment on the list page. No `featured` field needed — just use the first post after sorting by date.
2. **TOC**: Keep the collapsible Table of Contents on blog posts — blog articles have real content with multiple headings.
3. **Newsletter CTA**: Not implementing.
4. **Blog post structure**: Keep the current content/prose layout, restyle with Stitch tokens. Add hero, restyle metadata.

### What changes

| Element | Current | Target (Stitch) |
|---------|---------|-----------------|
| List hero | Section header with icon | Blue gradient hero with "Blog" title, badge, description |
| Filters | DaisyUI buttons | Stitch-styled pills (same as events) |
| Featured post | Same card as others | Large horizontal card (50/50 image/content grid), "Featured" badge, read more link |
| Post grid | Vertical cards | 3-column card grid with images, dates, descriptions |
| Post hero | Blowfish image hero | Full-width hero image with title overlay, date, author |
| Post TOC | DaisyUI collapsible | Restyle with Stitch tokens (keep functionality) |
| Post metadata | Blowfish sidebar | Stitch-styled inline metadata (topics, tags, audience) |
| Footer | Default Blowfish | Sovereignsky footer |

---

## Phase 1: Blog List Page

### Tasks

- [ ] 1.1 Add blue gradient hero to `layouts/blog/list.html` with "Blog" title, "Knowledge Hub" badge, description
- [ ] 1.2 Add Stitch-styled filter pills (audience + topic) — reuse `.sd-events-pill` CSS or create `.sd-blog-pill`
- [ ] 1.3 Render most recent post as featured card: horizontal 50/50 grid (image left, content right), "Featured" badge, date, title, description, topic tags, read more link
- [ ] 1.4 Render remaining posts as 3-column card grid: image top, date, title, description
- [ ] 1.5 Add filter JavaScript (audience + topic filtering on blog cards)
- [ ] 1.6 Add sovereignsky footer
- [ ] 1.7 Hide default site footer on blog pages

### Validation

```bash
# Hugo builds
# Manual: check http://localhost:1313/blog/
# Manual: test filters
# Manual: check featured post is the most recent
```

---

## Phase 2: Blog Post Page

### Tasks

- [ ] 2.1 Add Stitch-styled hero to `layouts/blog/single.html`: full-width featured image with gradient overlay, title, date, author, reading time
- [ ] 2.2 Keep TOC — restyle with Stitch tokens (`.sd-blog` scoped CSS)
- [ ] 2.3 Keep prose content layout — add Stitch typography (Space Grotesk headings, Inter body)
- [ ] 2.4 Add inline metadata after content: topics, tags, audience (similar to project metadata-sidebar but simpler — no 2/3+1/3 grid, just a horizontal bar)
- [ ] 2.5 Add "Back to blog" link
- [ ] 2.6 Add sovereignsky footer
- [ ] 2.7 Style code blocks, blockquotes, images within blog posts to match Stitch

### Validation

```bash
# Hugo builds
# Manual: check any blog post
# Manual: TOC works
# Manual: metadata links clickable
```

---

## Phase 3: Polish + Testing

### Tasks

- [ ] 3.1 Test all 11 blog posts render correctly on list and single pages
- [ ] 3.2 Test filters with different audience/topic combinations
- [ ] 3.3 Test dark mode
- [ ] 3.4 Test responsive: mobile (375px), tablet (768px), desktop (1280px)
- [ ] 3.5 Verify non-blog pages are unaffected

### Validation

```bash
# Hugo builds, npm run validate passes
# Manual: test at multiple viewports and dark mode
```

---

## Acceptance Criteria

- [ ] Blog list has blue gradient hero
- [ ] Most recent post displayed as featured card
- [ ] Remaining posts in 3-column grid
- [ ] Filters work (audience + topic)
- [ ] Blog post has Stitch hero with featured image
- [ ] TOC preserved and restyled
- [ ] Metadata (topics, tags, audience) displayed inline
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No other pages affected
- [ ] Hugo builds successfully

---

## Implementation Notes

### Template approach

Template-level change to `layouts/blog/list.html` and `layouts/blog/single.html`. No generator or JSON changes.

### CSS approach

Add blog CSS to `assets/css/custom.css` scoped under `.sd-blog`. Reuse filter pill CSS from events (`.sd-events-pill` classes or create shared `.sd-filter-pill`).

### Blog content source

Blog posts are generated from `data/blog/blog.json` by `scripts/generate-blog-pages.js`. The generated markdown files in `content/blog/` are rendered by Hugo templates. The list page reads posts via Hugo's page collection.

### Stitch HTML reference

| Element | File | Lines |
|---------|------|-------|
| List hero | `/tmp/stitch-blog-list.html` | 119-131 |
| List filters | `/tmp/stitch-blog-list.html` | 133-158 |
| Featured post card | `/tmp/stitch-blog-list.html` | 162-189 |
| Regular post grid | `/tmp/stitch-blog-list.html` | 191-280 |
| Post hero | `/tmp/stitch-blog-post.html` | TBD |

## Files to Modify

- `layouts/blog/list.html` — Hero, filters, featured card, post grid
- `layouts/blog/single.html` — Hero, TOC restyle, metadata, back link
- `assets/css/custom.css` — Blog-specific styles scoped under `.sd-blog`
