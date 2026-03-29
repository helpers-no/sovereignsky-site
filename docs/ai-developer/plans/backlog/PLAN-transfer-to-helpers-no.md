# Plan: Transfer sovereignsky-site to helpers-no

## Status: Backlog

**Goal**: Transfer this repo from `terchris/sovereignsky-site` to `helpers-no/sovereignsky-site` with zero downtime.

**Priority**: Medium

**Last Updated**: 2026-03-18

**Overall plan**: See `/Users/terje.christensen/learn/projects-2026/testing/github-helpers-no/INVESTIGATE-move-repos-to-helpers-no.md`

**Report back**: After completing each phase, update the overall plan's checklist in the file above. Mark the sovereignsky-site line as complete when all phases are done.

---

## Prerequisites

- **PLAN-transfer-to-helpers-no** in devcontainer-toolbox should be complete first (transfer order #1)

---

## Problem

The repo lives under `terchris/sovereignsky-site`. There are 124 references to `terchris` across 102 files, but most are in generated content pages. Only ~6 source files need manual changes; the rest are regenerated.

---

## Phase 1: Create branch and fix references

### Tasks

- [ ] 1.1 Create branch `move-to-helpers-no`
- [ ] 1.2 Update source files:
  - `data/sovereignsky/projects.json` — 11 repo URLs (`terchris/` → `helpers-no/`)
    - Note: `sovdev-logger`, `docuwrite-base`, `bifrost` stay as `terchris/` for now (not transferring yet)
  - `scripts/generate-laws-pages.js` — "Contribute on GitHub" template link
  - `scripts/generate-datacenters-pages.js` — "Contribute on GitHub" template link
  - `CONTRIBUTING.md` — clone URL, issue links, discussion links
  - `.github/ISSUE_TEMPLATE/config.yml` — discussions URL
  - `config/_default/menus.en.toml` — menu link
  - `layouts/partials/footer.html` — footer link
  - `layouts/partials/home/custom.html` — homepage link
  - `layouts/events/list.html` — events link
  - `data/homepage/sections.json` — homepage data
- [ ] 1.3 Re-run generator scripts to update all content pages:
  - `node scripts/generate-laws-pages.js`
  - `node scripts/generate-datacenters-pages.js`
- [ ] 1.4 Verify generated pages have updated links
- [ ] 1.5 Commit all changes to branch (do NOT merge)

### Validation

User confirms source files are updated. `grep -r "terchris/sovereignsky-site" .` should return zero hits outside of deferred repo references.

---

## Phase 2: Transfer repo

### Tasks

- [ ] 2.1 Transfer repo on GitHub: Settings → Transfer → `helpers-no`
- [ ] 2.2 Verify GitHub redirect works
- [ ] 2.3 Merge `move-to-helpers-no` branch

### Validation

Repo is at `https://github.com/helpers-no/sovereignsky-site`.

---

## Phase 3: Re-enable GitHub Pages

### Tasks

- [ ] 3.1 Re-enable GitHub Pages in repo settings
- [ ] 3.2 Re-add custom domain: `sovereignsky.no`
- [ ] 3.3 Verify site is live at https://sovereignsky.no/

### Validation

User confirms website loads correctly.

---

## Phase 4: Update local clone

### Tasks

- [ ] 4.1 Update local git remote: `git remote set-url origin https://github.com/helpers-no/sovereignsky-site.git`

### Validation

`git remote -v` shows `helpers-no/sovereignsky-site`.

---

## Acceptance Criteria

- [ ] Repo is at `https://github.com/helpers-no/sovereignsky-site`
- [ ] Website is live at `sovereignsky.no`
- [ ] No remaining `terchris/sovereignsky-site` references
- [ ] Generated content pages have updated links
- [ ] Old URL redirects work

---

## Files to Modify

**Source files (~10):**
- `data/sovereignsky/projects.json`
- `scripts/generate-laws-pages.js`
- `scripts/generate-datacenters-pages.js`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `config/_default/menus.en.toml`
- `layouts/partials/footer.html`
- `layouts/partials/home/custom.html`
- `layouts/events/list.html`
- `data/homepage/sections.json`

**Generated files (~90):** Regenerated automatically from scripts.
