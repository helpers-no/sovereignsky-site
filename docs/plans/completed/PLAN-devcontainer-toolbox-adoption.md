# Plan: Migrate to DevContainer Toolbox

## Status: Completed

**Completed**: 2026-03-20

**Goal**: Complete the migration from the custom devcontainer to DCT by updating all documentation and verifying the new environment works.

**Last Updated**: 2026-03-20

**Investigation**: `docs/plans/backlog/INVESTIGATE-devcontainer-toolbox-adoption.md`

---

## Problem

DCT has been installed in this repo and the old devcontainer config is backed up in `.devcontainer-DELETE/`. But all documentation still references the old container name (`relaxed_napier`) and old workspace path (`/workspaces/sovereignsky-site`). The docs also don't explain the DCT setup process (`install-dev-hugo.sh`, `npm install`).

---

## Phase 1: Update CLAUDE.md

### Tasks

- [x] 1.1 Rewrite the "CRITICAL: Devcontainer Environment" section
- [x] 1.2 Replace all remaining `relaxed_napier` references with `$CONTAINER`
- [x] 1.3 Replace all remaining `/workspaces/sovereignsky-site` with `/workspace`

### Validation

```bash
# No hardcoded container name remaining
grep -r "relaxed_napier" CLAUDE.md && echo "FAIL" || echo "PASS"

# No old workspace path remaining
grep -r "/workspaces/sovereignsky-site" CLAUDE.md && echo "FAIL" || echo "PASS"
```

---

## Phase 2: Update documentation — DONE

### Tasks

- [x] 2.1 Update `docs/DEVELOPMENT.md`
- [x] 2.2 Update `docs/DATA-VALIDATION.md`
- [x] 2.3 Update `docs/PLANS.md`
- [x] 2.4 Update `docs/data/laws.md`
- [x] 2.5 Update `docs/plans/backlog/PLAN-darkmode.md`
- [x] 2.6 Do NOT update files in `docs/plans/completed/` — historical records

### Validation

```bash
# No hardcoded container name in active docs
grep -r "relaxed_napier" CLAUDE.md docs/DEVELOPMENT.md docs/DATA-VALIDATION.md docs/PLANS.md docs/data/laws.md docs/plans/backlog/ && echo "FAIL" || echo "PASS"

# No old workspace path in active docs
grep -r "/workspaces/sovereignsky-site" CLAUDE.md docs/DEVELOPMENT.md docs/DATA-VALIDATION.md docs/PLANS.md docs/data/laws.md docs/plans/backlog/ && echo "FAIL" || echo "PASS"
```

---

## Phase 3: Rebuild and verify — DONE

### Tasks

- [x] 3.1 Rebuild devcontainer with DCT image
- [x] 3.2 Inside container, ran `dev-setup` → selected Hugo → installed `install-fwk-hugo` (not `install-dev-hugo.sh` as originally assumed)
  - Hugo Extended 0.157.0 — correct
  - Node v22.12.0 — correct
  - Git 2.50.1 — correct
  - Hugo VS Code extension auto-installed by the DCT script
  - Auto-enabled for container rebuilds via `enabled-tools.conf`
- [x] 3.3 `npm install` — already up to date (16 packages)
- [x] 3.4 `npm run validate` — 15 passed, 0 failed
- [x] 3.5 Hugo server serves site at http://localhost:1313 (967 pages)
- [x] 3.6 Delete `.devcontainer-DELETE/` directory

### Validation

```bash
# All tools available
hugo version
node -v
npm run validate

# Hugo server starts
hugo server --bind 0.0.0.0 -p 1313 &
curl -s -o /dev/null -w "%{http_code}" http://localhost:1313
# Expected: 200
```

---

## Acceptance Criteria

- [ ] No `relaxed_napier` references in active documentation
- [ ] No `/workspaces/sovereignsky-site` references in active documentation
- [ ] `CLAUDE.md` documents dynamic container lookup
- [ ] `docs/DEVELOPMENT.md` documents DCT setup including `install-dev-hugo.sh` and `npm install`
- [ ] Hugo, Node.js, and npm scripts work inside DCT container
- [ ] Hugo dev server serves the site
- [ ] `.devcontainer-DELETE/` is removed
- [ ] `devcontainer.json` is unchanged from DCT default template

---

## Files to Modify

- `CLAUDE.md`
- `docs/DEVELOPMENT.md`
- `docs/DATA-VALIDATION.md`
- `docs/PLANS.md`
- `docs/data/laws.md`
- `docs/plans/backlog/PLAN-darkmode.md`

## Files to Delete

- `.devcontainer-DELETE/` (after Phase 3 verification)
