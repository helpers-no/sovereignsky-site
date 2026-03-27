# Feature: Publications Page Redesign

## Status: Active

**Goal**: Restyle the publications list and single pages to match the Stitch design system.

**Last Updated**: 2026-03-27

**Prerequisites**: None

**Priority**: Medium

---

## Phase 1: Publications List Page — DONE

### Tasks

- [x] 1.1 Blue gradient hero with "Research & Reports" badge, title, description
- [x] 1.2 3 stat cards overlapping hero (total publications, topics covered, sources/publishers)
- [x] 1.3 Shared filter pills (`.sd-filter-pill`) for audience + topic
- [x] 1.4 Add `weight` field to all publications in JSON. FFI publication as featured (weight 10).
- [x] 1.5 Featured publication: horizontal card with image, type badge, publisher, title, description, topic tags, "Read Publication" link
- [x] 1.6 Remaining publications in 2-column compact grid (thumbnail + type + publisher + title)
- [x] 1.7 Filter JavaScript with URL persistence using `.sd-filter-pill-active`
- [x] 1.8 Sovereignsky footer, hide default footer
- [x] 1.9 Expand topics (3-5 per publication) and audiences for better filtering
- [x] 1.10 Add weight to publications generator frontmatter output

---

## Phase 2: Publications Single Page — DONE

### Tasks

- [x] 2.1 Featured image at top (same as blog: image above, title below)
- [x] 2.2 Summary section (two-column): title + type/publisher/year + authors + "Read Original" button (left), abstract text (right)
- [x] 2.3 2/3 + 1/3 grid: summary highlight card in blue (left) + sticky details card with institutions, credibility, topics, tags, audience (right)
- [x] 2.4 Removed duplicate type/year/publisher from details card (already in summary header)
- [x] 2.5 Authors with "Authors:" prefix in summary section, not in details card
- [x] 2.6 "Read Original Publication" button moved to summary section
- [x] 2.7 Full-width body content below the sidebar grid (not constrained by sidebar)
- [x] 2.8 Scoped `.sd-content > p/h2/etc { max-width: 65ch }` to `.sd-page` only so publications use full width
- [x] 2.9 Key takeaways section (if available in frontmatter)
- [x] 2.10 Back to publications link
- [x] 2.11 Sovereignsky footer

---

## Phase 3: Generator + Content Cleanup — DONE

### Tasks

- [x] 3.1 Generator no longer outputs abstract/summary as `## Abstract` / `## Summary` headings in body (now in frontmatter, displayed by template)
- [x] 3.2 Generator adds abstract, summary, institutions, credibility flags, edition, publication_type, takeaways to frontmatter
- [x] 3.3 Generator strips leading `---` from body content
- [x] 3.4 Removed all standalone `---` horizontal rules from publication markdown files
- [x] 3.5 Added link styling to `.sd-content` (blue underlined links)

---

## Acceptance Criteria

- [x] Publications list has blue gradient hero with stats
- [x] FFI is featured publication (first by weight)
- [x] Compact 2-column grid for remaining publications
- [x] Filters work (audience + topic)
- [x] Single page has summary section with abstract, authors, CTA
- [x] Details card (sidebar) shows institutions, credibility, topics, tags, audience
- [x] Body content uses full width
- [x] No duplicate abstract/summary in body
- [x] No stray horizontal rules in content
- [x] Links visible and styled
- [x] Hugo builds successfully
- [ ] Dark mode testing — deferred
- [ ] Responsive testing — deferred

---

## Key Decisions

1. **Featured publication**: Determined by `weight` field (lowest = featured), same as projects
2. **2-column compact grid**: Publications use compact cards, not blog-style large cards
3. **Summary section**: Two-column like DCT — title/authors/CTA left, abstract right
4. **No sidebar for body**: Sidebar only wraps the summary card, body content is full width
5. **Abstract/summary split**: `description` = SEO only, `abstract` = display in summary section, `summary` = blue highlight card
6. **Removed prose class**: Publications use `sd-content` for full-width content, scoped `65ch` limit to sovereignsky pages only

## Files Modified

- `layouts/publications/list.html` — Complete rewrite with Stitch design
- `layouts/publications/single.html` — Complete rewrite: summary section, details card, full-width content
- `scripts/generate-publications-pages.js` — Weight in frontmatter, abstract/summary/institutions/credibility in frontmatter, removed abstract/summary from body, strip `---` from body
- `data/publications/publications.json` — Added weights, expanded topics and audiences
- `content/publications/*/index.md` — Regenerated with new frontmatter, cleaned `---` markers
- `assets/css/custom.css` — Publications footer rule, scoped `65ch` to `.sd-page`, link styling in `.sd-content`
