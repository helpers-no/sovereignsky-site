# Feature: Page-Level Polish (Dark Mode + Responsive + Nav)

## Status: Backlog

**Goal**: Complete the visual polish for sovereignsky project pages — dark mode, responsive layouts, pagination lines, and nav styling.

**Last Updated**: 2026-03-23

**Prerequisites**: PLAN-page-level-redesign (completed)

**Priority**: High

---

## Overview

The page-level redesign is functionally complete but has unfinished polish items: dark mode testing, mobile responsive testing, pagination footer lines, and full nav styling.

---

## Phase 1: Dark Mode for Sovereignsky Pages

### Tasks

- [ ] 1.1 Test dark mode on hero (background, text, CTA buttons, decorative panel/video)
- [ ] 1.2 Test dark mode on metadata-sidebar card (Topics, Tags, Audience)
- [ ] 1.3 Test dark mode on all section shortcodes (highlight-card, feature-grid, steps, persona-cards, tool-icons, side-by-side, summary, cta)
- [ ] 1.4 Test dark mode on sovereignsky footer
- [ ] 1.5 Fix any contrast/color issues found
- [ ] 1.6 Verify all 11 project pages in dark mode

### Validation

```bash
# Manual: toggle dark mode on http://localhost:1313/sovereignsky/devcontainer-toolbox/
# Manual: check all 11 project pages in dark mode
```

---

## Phase 2: Responsive Testing

### Tasks

- [ ] 2.1 Test on mobile (375px):
  - Hero should stack vertically (title above, panel hidden)
  - Metadata-sidebar should stack (content above, metadata below)
  - Side-by-side sections should stack
  - Feature-grid columns should stack
  - Summary should stack to single column
- [ ] 2.2 Test on tablet (768px)
- [ ] 2.3 Test on desktop (1280px)
- [ ] 2.4 Fix any responsive issues found
- [ ] 2.5 Verify all 11 project pages across viewports

### Validation

```bash
# Manual: test at 375px, 768px, 1280px viewports
```

---

## Phase 3: Pagination and Footer Lines

### Tasks

- [ ] 3.1 Fix remaining horizontal lines between pagination and footer on sovereignsky pages
- [ ] 3.2 The `<hr>` in `article-pagination.html` and the `<div class="pt-8">` wrapper need to be hidden/removed for sovereignsky pages

### Validation

```bash
# Manual: check bottom of all sovereignsky pages for stray lines
```

---

## Phase 4: Nav Styling

### Tasks

- [ ] 4.1 Investigate why CSS-only nav styling breaks Blowfish dropdown menus
- [ ] 4.2 Determine correct approach: template override with preserved dropdown JS, or scoped CSS that avoids stacking context issues
- [ ] 4.3 Implement Stitch-styled nav (glassmorphism background, colors) without breaking dropdowns
- [ ] 4.4 Test nav on all pages (not just sovereignsky)
- [ ] 4.5 Test dark mode for nav
- [ ] 4.6 Test mobile hamburger menu

### Validation

```bash
# Manual: test dropdown menus on all pages
# Manual: test mobile hamburger menu
# Manual: toggle dark mode
```

---

## Acceptance Criteria

- [ ] Dark mode works for hero, metadata, and all sections on sovereignsky pages
- [ ] Mobile layout works (375px) — hero stacks, sections responsive
- [ ] No stray horizontal lines in pagination/footer area
- [ ] Nav has Stitch styling with working dropdowns
- [ ] All 11 project pages work across viewports and color modes
- [ ] Non-sovereignsky pages are unaffected

---

## Phase 5: Homepage Cleanup (from PLAN-homepage2)

Remaining items from the completed homepage redesign plan.

### Tasks

- [ ] 5.1 Advanced cross-file validation: data paths, countSource, explicit identifiers in homepage JSON
- [ ] 5.2 Responsive verification for homepage (mobile/tablet/desktop)
- [ ] 5.3 Remove old `layouts/partials/home/custom.html` or keep as backup
- [ ] 5.4 Final visual review of homepage

### Validation

```bash
# Manual: check homepage at 375px, 768px, 1280px
# Manual: verify all homepage sections render
```

---

## Related

- **PLAN-dark-mode-fix.md** — Pre-existing dark mode issue on /about/ and /totalforsvarsaret/ (DaisyUI conflict, separate task)
- **PLAN-homepage2.md** (completed) — Homepage remaining items moved to Phase 5 above
