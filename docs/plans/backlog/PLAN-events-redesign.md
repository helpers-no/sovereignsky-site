# Feature: Events Page Redesign

## Status: Backlog

**Goal**: Restyle the events list and single pages to match the Stitch design system ("SovereignSky Events" and "Datasenterdagen 2026 Event Page" screens).

**GitHub Issue**: —

**Last Updated**: 2026-03-24

**Prerequisites**: None (events templates are independent from sovereignsky project pages)

**Priority**: Medium

---

## Overview

The events pages currently use generic DaisyUI card styling. Stitch has designed both a list page and a single event page using the Sovereign Resilience design system. This plan implements both designs.

**Stitch references:**
- List page: Screen "SovereignSky Events" (`3224eebd70e74043a170b461e6c1b0b7`)
- Single page: Screen "Datasenterdagen 2026 Event Page" (`8ea8fc4f82804007b37ce88435cf2ae4`)

**Data source**: `data/events/events.json` — no changes needed, templates read this data directly.

**Scope**: Only affects `/events/` pages. No other content types affected.

### What changes

| Element | Current | Target (Stitch) |
|---------|---------|-----------------|
| List hero | None — jumps into stats | Blue gradient hero with title + description |
| Stats cards | Plain text stats | 3 overlapping stat cards with hover effect |
| Filters | DaisyUI buttons | Stitch-styled pills with uppercase labels |
| Featured event | Same card style as others | Large horizontal card with image, date badge overlay, full metadata |
| Event grid | Uniform card list | 2-column compact cards with large date numbers, top border hover |
| Single hero | Basic Blowfish header | Full-width blue hero with background image, date, description |
| Single content | Flat markdown | Bento grid: Key Info (8/12) + Audience sidebar (4/12) |
| Newsletter CTA | N/A | **Not implementing** — not needed |

### What stays the same

- Event data (`events.json`) — no schema changes
- Filter JavaScript logic — restyle only, same functionality
- Blowfish nav/header (site-wide)
- Footer (use sovereignsky footer if available, else default)

---

## Phase 1: Events List Hero + Stats

### Tasks

- [ ] 1.1 Add blue gradient hero section to `layouts/events/list.html` with title, description, and badge
- [ ] 1.2 Add 3 stat cards overlapping the hero (-mt-12): Upcoming Events count, This Month count, Strategic Focus
- [ ] 1.3 Stats should be dynamic (calculated from events data, not hardcoded)
- [ ] 1.4 Add CSS for hero gradient, stat card hover effect (hover → blue background, white text)
- [ ] 1.5 Use `section-design` class and `--sd-*` tokens for consistency

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
# Manual: check http://localhost:1313/events/
# Hero should show blue gradient with title
# Stats should show correct counts
```

---

## Phase 2: Events List Filters + Cards

### Tasks

- [ ] 2.1 Restyle filter section: uppercase labels ("FILTER BY AUDIENCE", "FILTER BY TOPIC"), Stitch-styled pills
- [ ] 2.2 Active filter pill: primary blue background. Inactive: surface-container-high with hover
- [ ] 2.3 Restyle first/featured event as large horizontal card: image (1/3), content (2/3), date badge overlay, blue left border, topic tags, metadata grid
- [ ] 2.4 Restyle remaining events as 2-column compact cards: large date number, event type badge, title, description, location, top border that turns blue on hover
- [ ] 2.5 Preserve existing JavaScript filter functionality — only change CSS/HTML, not JS logic
- [ ] 2.6 Handle events without images gracefully (use gradient placeholder like project hero)

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
# Manual: check filters work (audience + topic)
# Manual: check featured event card layout
# Manual: check compact event grid
```

---

## Phase 3: Event Single Page

### Tasks

- [ ] 3.1 Add blue gradient hero to `layouts/events/single.html` with event image background (if available), event title, date, description
- [ ] 3.2 Add bento info grid below hero: Key Information card (8/12) with location, organizer, format + CTA button
- [ ] 3.3 Add Target Audience sidebar (4/12) with audience persona cards and registration status
- [ ] 3.4 Add topic tags section
- [ ] 3.5 Add "Back to all events" navigation link
- [ ] 3.6 Use sovereignsky footer if on events pages, else default

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
# Manual: check http://localhost:1313/events/{any-event}/
# Hero should show event title with blue gradient
# Bento grid should show key info + audience
```

---

## Phase 4: Polish + Testing

### Tasks

- [ ] 4.1 Test all events render correctly on list page
- [ ] 4.2 Test all event single pages render correctly
- [ ] 4.3 Test filters with different audience/topic combinations
- [ ] 4.4 Test dark mode (hero, cards, filters)
- [ ] 4.5 Test responsive: mobile (375px), tablet (768px), desktop (1280px)
- [ ] 4.6 Verify non-events pages are unaffected

### Validation

```bash
docker exec compassionate_margulis bash -c "cd /workspace && hugo --gc"
docker exec compassionate_margulis bash -c "cd /workspace && npm run validate"
# Manual: test at 375px, 768px, 1280px
# Manual: toggle dark mode
```

---

## Acceptance Criteria

- [ ] Events list has blue gradient hero with dynamic stats
- [ ] Filters restyled with Stitch design tokens
- [ ] Featured event uses large horizontal card layout
- [ ] Remaining events use 2-column compact grid
- [ ] Event single page has blue hero with bento info grid
- [ ] Filter JavaScript functionality preserved
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] No other pages affected
- [ ] Hugo builds successfully
- [ ] `npm run validate` passes

---

## Implementation Notes

### Template approach

This is a **template-level change** — we modify `layouts/events/list.html` and `layouts/events/single.html` directly. No generator scripts, no JSON changes, no new shortcodes.

### CSS approach

Add events-specific CSS to `assets/css/custom.css` scoped under `.sd-events` class. Reuse existing `--sd-*` tokens and `.section-design` wrapper.

### Stitch HTML reference

| Element | File | Lines |
|---------|------|-------|
| List hero | `/tmp/stitch-events.html` | 124-142 |
| Stat cards | `/tmp/stitch-events.html` | 144-168 |
| Filter bar | `/tmp/stitch-events.html` | 170-189 |
| Featured event card | `/tmp/stitch-events.html` | 194-249 |
| Compact event grid | `/tmp/stitch-events.html` | 251-284 |
| Single hero | `/tmp/stitch-event-single.html` | 110-141 |
| Bento info grid | `/tmp/stitch-event-single.html` | 143-218 |
| Back link | `/tmp/stitch-event-single.html` | 221-226 |

### ZgotmplZ prevention

Same rule as project pages: use CSS classes for dynamic colors, never use Hugo template variables in `style=""` attributes.

### Featured event selection

The Stitch design shows the first/next upcoming event as the featured card. Logic: sort events by date, first one gets the large card treatment, rest go in the compact grid.

## Files to Modify

- `layouts/events/list.html` — Hero, stats, filters, event cards
- `layouts/events/single.html` — Hero, bento grid, audience sidebar
- `assets/css/custom.css` — Events-specific styles scoped under `.sd-events`

## Files NOT Modified

- `data/events/events.json` — No data changes
- `scripts/generate-events-pages.js` — No generator changes
- `data/schemas/` — No schema changes
