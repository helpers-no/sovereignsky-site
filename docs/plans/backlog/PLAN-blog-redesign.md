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
2. **TOC**: Keep the collapsible Table of Contents on blog posts. Keep floating mobile TOC too.
3. **Newsletter CTA**: Not implementing.
4. **No sidebar**: Remove persistent Blowfish sidebar. Metadata inline after content (same pattern as projects and events).
5. **Keep author display**: Author info shown in hero area.
6. **Keep external URL button**: Some posts link to external articles.
7. **Drafts**: Hugo excludes drafts from `.Pages` automatically — no action needed.
8. **Images**: Blog posts are content bundles with `featured.png` — available for featured card and hero.
9. **Filter CSS**: Refactor events `.sd-events-pill` into shared `.sd-filter-pill` classes, reuse for blog.
10. **Pagination**: Keep Hugo's existing pagination, restyle with Stitch tokens.
11. **Related content**: Move from sidebar to below content (after metadata bar).
12. **Blog listing**: Use Hugo `.Pages` collection sorted by date. First = featured card, rest = grid.

### What changes

| Element | Current | Target (Stitch) |
|---------|---------|-----------------|
| List hero | Section header with icon | Blue gradient hero with "Blog" title, badge, description |
| List stats | DaisyUI stat cards | 3 overlapping stat cards (same as events) |
| Filters | DaisyUI buttons | Stitch-styled pills (shared `.sd-filter-pill` classes) |
| Featured post | Same card as others | Large horizontal card (50/50 image/content grid), "Featured" badge, read more link |
| Post grid | Vertical cards | 3-column card grid with images, dates, descriptions |
| Post hero | Blowfish image hero | Full-width hero image with gradient overlay, title, date, author |
| Post TOC | DaisyUI collapsible | Restyle with Stitch tokens (keep functionality + floating mobile TOC) |
| Post sidebar | Blowfish sidebar (Details, Topics, Tags, Audience, Related) | **Removed** — metadata inline after content, related posts below |
| Post author | Author partial | Keep — show in hero area |
| Post external URL | Button in sidebar | Keep — show below hero or in content area |
| Pagination | Blowfish default | Restyle with Stitch tokens |
| Footer | Default Blowfish | Sovereignsky footer |

---

## Phase 1: Blog List Page

### Tasks

- [ ] 1.1 Refactor events filter pill CSS from `.sd-events-pill` to shared `.sd-filter-pill` classes (update events templates to use new class names)
- [ ] 1.2 Add blue gradient hero to `layouts/blog/list.html` with "Blog" title, "Knowledge Hub" badge, description
- [ ] 1.3 Add 3 stat cards overlapping hero (total posts, reading time, topics covered)
- [ ] 1.4 Add Stitch-styled filter pills using shared `.sd-filter-pill` classes
- [ ] 1.5 Render most recent post as featured card: horizontal 50/50 grid (image left, content right), "Featured" badge, date, title, description, topic tags, read more link
- [ ] 1.6 Render remaining posts as 3-column card grid: image top, date, title, description
- [ ] 1.7 Add filter JavaScript (audience + topic filtering on blog cards) — data attributes on cards
- [ ] 1.8 Keep Hugo pagination, restyle with Stitch tokens
- [ ] 1.9 Add sovereignsky footer, hide default site footer on blog pages

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
- [ ] 2.2 Remove persistent Blowfish sidebar — full-width content layout (same as projects/events)
- [ ] 2.3 Keep TOC — restyle with Stitch tokens (`.sd-blog` scoped CSS). Keep floating mobile TOC.
- [ ] 2.4 Keep prose content layout — add Stitch typography (Space Grotesk headings, Inter body)
- [ ] 2.5 Add inline metadata after content: topics, tags, audience (horizontal bar with clickable links)
- [ ] 2.6 Move related content below metadata (was in sidebar)
- [ ] 2.7 Keep external URL button (for posts linking to external articles) — show below hero
- [ ] 2.8 Keep author display — show in hero area
- [ ] 2.9 Add "Back to blog" link
- [ ] 2.10 Add sovereignsky footer
- [ ] 2.11 Style code blocks, blockquotes, images within blog posts to match Stitch
- [ ] 2.12 Restyle pagination with Stitch tokens

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
