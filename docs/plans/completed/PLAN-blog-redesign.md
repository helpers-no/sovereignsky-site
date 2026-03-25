# Feature: Blog Page Redesign

## Status: Completed

**Completed**: 2026-03-25

**Goal**: Restyle the blog list and single post pages to match the Stitch design system.

**Stitch references:**
- List page: Screen "SovereignSky Blog - Clean Full Width"
- Post page: Screen "Hybrid War Post with Sidebar Metadata"

---

## What Was Done

### Phase 1: Blog List Page — DONE

- [x] Refactored events filter CSS to shared `.sd-filter-pill` classes (events template updated)
- [x] Blue gradient hero with "Knowledge Hub" badge, title, description (reuses `.sd-events-hero` classes)
- [x] 3 stat cards overlapping hero (total posts, reading time, topics covered)
- [x] Stitch-styled filter pills using shared `.sd-filter-pill` classes (audience + topic)
- [x] Featured post: most recent post as large horizontal 50/50 card (image left, content right, "Featured" badge, topic tags, read more link)
- [x] Remaining posts in 3-column responsive grid (image, date, title, description)
- [x] Topic tags on featured card only — grid cards kept clean (decision: less clutter)
- [x] Filter JavaScript with URL persistence
- [x] Sovereignsky footer, default footer hidden

### Phase 2: Blog Post Page — DONE

- [x] Featured image shown full-width at top (no overlay/blur — image is visible content)
- [x] Title, topic badge, date, reading time, author below image (centered)
- [x] Fixed author field: `authors` (plural array) not `author` (singular)
- [x] Topics/tags/audience metadata bar between header and content (not at bottom)
- [x] TOC collapsed by default, restyled with Stitch tokens (Material icon, chevron)
- [x] External URL button ("Read Original Article") above TOC
- [x] Prose content with Space Grotesk headings
- [x] Related posts + "Back to blog" link at bottom
- [x] Sovereignsky footer
- [x] Removed persistent Blowfish sidebar — full-width layout (consistent with projects/events)

### Phase 3: Validation — DONE

- [x] Hugo builds successfully
- [x] npm run validate passes (15/15)
- [x] All blog posts return HTTP 200
- [ ] Dark mode testing — deferred (same as other pages)
- [ ] Responsive testing — deferred (same as other pages)

---

## Key Decisions

1. **Featured post**: Most recent post by date, no `featured` field needed
2. **Topics on featured only**: Grid cards show date/title/description only — cleaner look
3. **No sidebar**: Inline metadata consistent with projects and events
4. **Image above, title below**: Featured image shown full-width without overlay (image is content, not decoration)
5. **Metadata before content**: Topics/tags/audience shown between title and TOC, not at bottom
6. **TOC collapsed**: Closed by default, user opens on demand
7. **Shared filter CSS**: Refactored `.sd-events-pill` to `.sd-filter-pill` — reused by blog and events

## Files Modified

- `layouts/blog/list.html` — Complete rewrite with Stitch design
- `layouts/blog/single.html` — Complete rewrite: image-first hero, inline metadata, no sidebar
- `layouts/events/list.html` — Updated filter class names to shared `.sd-filter-pill`
- `assets/css/custom.css` — Shared filter classes, blog list CSS, blog post CSS
