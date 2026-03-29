# Investigate: Use DevContainer Toolbox as the devcontainer for this repo

## Status: Completed

**Completed**: 2026-03-20

**Goal**: Determine if and how we can replace the custom `.devcontainer/devcontainer.json` with the DevContainer Toolbox (DCT) from helpers-no.

**Last Updated**: 2026-03-20

---

## Questions to Answer

1. DCT already has Node.js and Python — can we just add Hugo on top? **YES — Hugo is now included in DCT as an opt-in addition.**
2. What's the best way to add Hugo — DCT addition script, postCreateCommand, or feature? **DCT addition script (`install-fwk-hugo`) — done.**
3. Can we pin Hugo to a specific version (0.157.0)? **To verify after container rebuild.**
4. What's the image size / build time impact? **No build — DCT uses a pre-built image. Pull only.**
5. Does this affect the CI/CD pipeline? **GitHub Actions uses its own Hugo install, not the devcontainer. No impact.**

---

## Current State

### What happened

1. Hugo addition was created in DCT (`install-fwk-hugo`) — **done**
2. DCT installer was run in this repo:
   ```
   curl -fsSL https://raw.githubusercontent.com/helpers-no/devcontainer-toolbox/main/install.sh | bash
   ```
3. New `.devcontainer/devcontainer.json` was created using the DCT image
4. Old devcontainer config is backed up in `.devcontainer-DELETE/`

### What the new devcontainer.json provides

```json
{
    "image": "ghcr.io/helpers-no/devcontainer-toolbox:latest",
    "overrideCommand": false,
    "workspaceFolder": "/workspace",
    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached"
}
```

Key differences from the old setup:
- **Image**: `ghcr.io/helpers-no/devcontainer-toolbox:latest` (was `mcr.microsoft.com/devcontainers/base:ubuntu-24.04`)
- **Workspace path**: `/workspace` (was `/workspaces/sovereignsky-site`)
- **Tools**: Pre-installed in image (was installed via features at build time)
- **No features block**: Node.js and Git come from the DCT base image. Hugo is an opt-in addition (`install-fwk-hugo`) that the developer runs inside the container.
- **No postCreateCommand**: DCT entrypoint handles startup. `npm install` must be run manually after first container start.
- **No port forwarding**: Not needed — VS Code auto-discovers ports

### What still needs to happen to complete the migration

The devcontainer is installed but the **repo documentation and config are not updated yet**. This is what remains:

---

## Migration Impact Analysis

### 1. Workspace path change: `/workspaces/sovereignsky-site` → `/workspace`

Every `docker exec` command and internal path reference needs updating.

**Active documentation (must update):**

| File | Occurrences |
|------|-------------|
| `CLAUDE.md` | 10 |
| `docs/DEVELOPMENT.md` | 2 |
| `docs/data/laws.md` | 2 |
| `docs/PLANS.md` | 2 |
| `docs/DATA-VALIDATION.md` | 1 |
| `docs/plans/backlog/PLAN-darkmode.md` | 1 |

**Completed plans (do NOT update):**

11 files in `docs/plans/completed/` with ~39 occurrences total. These are historical records of what was done at the time. Leave them as-is.

### 2. Container name change: `relaxed_napier` → TBD

The old container name `relaxed_napier` is hardcoded in ~56 places across CLAUDE.md and docs. With DCT, the container name will change after rebuild.

**Decision: Do NOT hardcode any container name.** Instead, document how to find the container name dynamically. The pattern from `docs/DEVELOPMENT.md` already shows this:

```bash
# Find the container by its source mount path (works regardless of container name)
docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/'
```

Note: This greps the **source** path (host-side), which still contains the repo name. The destination path is now just `/workspace` and is not unique enough to match on.

CLAUDE.md should explain this lookup pattern once, then use a variable like `$CONTAINER` in examples. When working inside the devcontainer (VS Code terminal), no `docker exec` is needed at all.

### 3. devcontainer.json — keep it unchanged

**Decision: Do NOT customize devcontainer.json.** It should stay identical to the DCT default template so all DCT installations use the same file.

- **Port forwarding**: Not needed — VS Code auto-discovers ports when a process listens on them. Hugo on 1313 will just appear.
- **Hugo VS Code extension**: Belongs in DCT's `install-fwk-hugo`, not in this repo. When a developer installs Hugo via DCT, the extension should come with it. This is a change to the devcontainer-toolbox repo, not here.
- **`.vscode/extensions.json`**: Created by the DCT installer with just the Dev Containers extension recommendation. No project-specific additions needed.

### 4. Hugo installation inside DCT

Hugo is an **opt-in addition**, not baked into the DCT base image. After the container starts, the developer runs `install-fwk-hugo` to install it.

Hugo is installed once via `install-fwk-hugo`. DCT remembers selected additions and reinstalls them automatically on container rebuild. A new developer only needs to run the install script once.

`npm install` must be run manually after first container start (no `postCreateCommand` in DCT). This should be documented in `docs/DEVELOPMENT.md` as part of the setup instructions.

Need to verify after container rebuild:
- [ ] Hugo is available after running `install-fwk-hugo`
- [ ] Hugo version (ideally 0.157.0 or compatible)
- [ ] Hugo extended edition (required for SCSS)
- [ ] `npm install` works (node_modules for validation scripts)

### 5. Files to delete

- `.devcontainer-DELETE/` — old config backup, can be removed after migration is verified

---

## Recommendation

**Create a PLAN file** to execute the remaining migration steps:

### Phase 1: Update CLAUDE.md
- Replace hardcoded `relaxed_napier` with dynamic container lookup instructions
- Update workspace path from `/workspaces/sovereignsky-site` to `/workspace`
- Rewrite the "CRITICAL: Devcontainer Environment" section to reflect DCT

### Phase 2: Update documentation
- Update `docs/DEVELOPMENT.md` with DCT setup instructions
- Update `docs/DATA-VALIDATION.md` command examples
- Update `docs/PLANS.md` command examples
- Update `docs/data/laws.md` command examples
- Update `docs/plans/backlog/PLAN-darkmode.md`
- Do NOT update completed plan files — they are historical records of what was done at the time

### Phase 3: Rebuild and verify
- Rebuild devcontainer with DCT image
- Verify Hugo, Node.js, npm scripts all work
- Run `npm run validate` to confirm
- Delete `.devcontainer-DELETE/`

---

## Next Steps

- [x] Create issue in `helpers-no/devcontainer-toolbox` for `install-fwk-hugo` addition
- [ ] Create issue in `helpers-no/dev-templates` for `hugo-basic-site` template
- [ ] Create issue in `helpers-no/dev-templates` to make K8s manifest verification optional
- [x] Run DCT installer in this repo
- [ ] **Create PLAN-devcontainer-toolbox-adoption.md with the phases above**
- [ ] Rebuild container and verify Hugo works
- [ ] Update all documentation
- [ ] Clean up `.devcontainer-DELETE/`
