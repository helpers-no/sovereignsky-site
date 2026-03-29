# Feature: Projects List Page Redesign

## Status: Completed

**Completed**: 2026-03-27

**Goal**: Restyle the sovereignsky projects listing page to match the Stitch design, using the same pattern as blog and events list pages.

**Last Updated**: 2026-03-27

**Prerequisites**: PLAN-section-design-foundation (completed), PLAN-blog-redesign (completed)

---

## Overview

The projects list page at `/sovereignsky/` used default Blowfish/DaisyUI card styling. This plan applies the same Stitch design pattern established in the blog and events list pages: blue gradient hero, stat cards, shared filter pills, featured card, and responsive grid.

---

## Phase 1: List Page Redesign — DONE

### Tasks

- [x] 1.1 Blue gradient hero with "Open Source Tools" badge, "SovereignSky Projects" title, description (reuses `.sd-events-hero` classes)
- [x] 1.2 3 stat cards overlapping hero (total projects, active count, topics covered)
- [x] 1.3 Shared filter pills (`.sd-filter-pill`) for audience + topic
- [x] 1.4 Featured project card: first by weight, horizontal 50/50 grid with video/image support (hero.* preferred, featured.* fallback)
- [x] 1.5 Remaining projects in 3-column responsive grid with images/video
- [x] 1.6 Filter JavaScript with URL persistence, using `.sd-filter-pill-active` classes
- [x] 1.7 Sovereignsky footer, default footer hidden via CSS
- [x] 1.8 Removed "Live" badge from featured card (not needed)

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
docker exec compassionate_margulis bash -c "cd /workspace && npm run validate"

# Manual: check http://localhost:1313/sovereignsky/
# Manual: test audience + topic filters
```

---

## Phase 2: Project Ordering and Metadata — DONE

### Tasks

- [x] 2.1 Reorder projects by weight to match desired order:
  1. devcontainer-toolbox (10) — featured card
  2. urbalurba-infrastructure (20)
  3. dev-templates (30)
  4. client-provisioning (40)
  5. refugee-id (50)
  6. sovdev-logger (60)
  7. bifrost (70)
  8. software-database (80)
  9. ndsi (90)
  10. docuwrite (100)
  11. securenet (110)
- [x] 2.2 Expand topics for all projects (most had only 1-2, now 3-4 each)
- [x] 2.3 Expand audience for projects that were missing relevant audiences
- [x] 2.4 Regenerate all project pages with updated frontmatter

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && node scripts/generate-sovereignsky-pages.js"
docker exec compassionate_margulis bash -c "cd /workspace && npm run validate"

# Manual: verify filter pills show more topic/audience options
# Manual: verify project order matches desired sequence
```

---

## Acceptance Criteria

- [x] Projects list has blue gradient hero with stats
- [x] DevContainer Toolbox is featured project (first by weight)
- [x] Remaining projects in 3-column grid
- [x] Filters work (audience + topic)
- [x] Video/image support on project cards (hero.* for video, featured.* for image)
- [x] Project ordering matches user-specified sequence
- [x] All projects have meaningful topics (3-4 each) and audiences
- [x] `npm run validate` passes (15/15)
- [x] Hugo builds successfully
- [ ] Dark mode testing — deferred
- [ ] Responsive testing — deferred

---

## Key Decisions

1. **Featured project**: Determined by `weight` field (lowest weight = featured). No separate `featured` boolean needed.
2. **No "Live" badge**: Removed from featured card — status already visible elsewhere.
3. **Reused blog CSS**: Project cards use `.sd-blog-featured`, `.sd-blog-card`, `.sd-blog-grid` classes — same visual treatment as blog.
4. **Expanded metadata**: All projects got broader topics and audiences to make filters more useful.

## Files Modified

- `layouts/sovereignsky/list.html` — Complete rewrite with Stitch design
- `data/sovereignsky/projects.json` — Updated weights, topics, audiences for all 11 projects
- `content/sovereignsky/*/index.md` — Regenerated with updated frontmatter
- `assets/css/custom.css` — Added `.sd-projects` footer rule
- `docs/plans/active/PLAN-projects-list-redesign.md` — This plan
