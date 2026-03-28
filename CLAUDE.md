# Claude Code Instructions for SovereignSky Site

## Issue & Plan Workflow

### IMPORTANT: Git Operations Require Confirmation

**NEVER run these commands without user confirmation:**
- `git add`
- `git commit`
- `git push`
- `git checkout -b` (create branch)
- `git merge`
- `git branch -d` (delete branch)

Always show the user what you're about to do and wait for approval.

### First: Check for Active Plans

Before starting new work, check `docs/plans/active/` for existing plans:

```bash
ls docs/plans/active/
```

If there are active plans, ask the user which one to work on, or if they want to start something new.

### When asked to **"work on issue #X"** or similar:

### Step 1: Read and Plan

1. Read the issue: `gh issue view <number>`
2. Add "approved" label: `gh issue edit <number> --add-label "approved"`
3. Create a plan file in `docs/plans/backlog/`:
   - `PLAN-<name>.md` if solution is clear
   - `INVESTIGATE-<name>.md` if research needed first
4. **Stop and ask the user to review the plan**

### Step 2: Wait for Approval

Do NOT proceed until the user confirms the plan is approved.

User will say something like:
- "Plan approved"
- "Looks good, start"
- "Go ahead"

### Step 3: Implement

1. **Ask to create branch**: Show `git checkout -b issue-<number>-<short-name>` and wait for confirmation
2. Move plan: `mv docs/plans/backlog/PLAN-*.md docs/plans/active/`
3. Work through phases in order
4. Run validation after each phase
5. Update the plan file (mark tasks `[x]`)
6. **Ask to commit after each phase**: Show the commit command and wait for confirmation
7. If validation fails, stop and ask for help

### Step 4: Complete

When user approves the result, **ask for confirmation before each git operation**:

1. Move plan: `mv docs/plans/active/PLAN-*.md docs/plans/completed/`
2. Update status in plan: `## Status: Completed`
3. **Ask to commit and push**: Show commands, wait for confirmation
4. **Ask to merge to main**: Show commands, wait for confirmation
5. **Ask to delete branch and close issue**: Show commands, wait for confirmation

### Plan File Format

See **[docs/PLANS.md](docs/PLANS.md)** for full details.

Every plan needs:
- Header with status, goal, issue link
- Phases with numbered tasks
- Validation commands after each phase
- Acceptance criteria

---

## CRITICAL: Devcontainer Environment

**ALL commands that install packages or run code MUST be executed inside the devcontainer.**

This project uses the **DevContainer Toolbox (DCT)** from helpers-no (`ghcr.io/helpers-no/devcontainer-toolbox`). The workspace inside the container is `/workspace`.

### Finding the container name

The container name is assigned by Docker and changes on rebuild. Find it dynamically:

```bash
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/')
```

### Running commands from the host

Use `$CONTAINER` in all `docker exec` commands:

```bash
# Install packages
docker exec $CONTAINER bash -c "cd /workspace && npm install <package>"

# Run npm scripts
docker exec $CONTAINER bash -c "cd /workspace && npm run <script>"

# Run validation
docker exec $CONTAINER bash -c "cd /workspace && npm run validate"

# Run Hugo server (with drafts and future-dated posts visible)
docker exec $CONTAINER bash -c "cd /workspace && hugo server -D --buildFuture --bind 0.0.0.0 --disableFastRender"

# Run Node.js scripts
docker exec $CONTAINER bash -c "cd /workspace && node scripts/<script>.js"
```

**DO NOT run these directly on the host machine:**
- `npm install`
- `npm run`
- `node scripts/*.js`
- `hugo` commands

---

## Project Structure

See **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** for development setup.

```
sovereignsky-site/
├── config/                    # Hugo configuration
├── content/                   # Hugo content (markdown pages)
├── data/                      # Data files and schemas
├── docs/                      # Documentation and plans
│   └── plans/                 # Implementation plans
│       ├── backlog/           # Plans waiting for approval
│       ├── active/            # Currently implementing
│       └── completed/         # Done
├── layouts/                   # Hugo templates
├── scripts/                   # Node.js scripts
└── static/                    # Static assets
```

---

## Key Scripts

### Generate Pages from Data
```bash
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-network-pages.js"
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-laws-pages.js"
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-publications-pages.js"
```

### Validate Data Files
```bash
docker exec $CONTAINER bash -c "cd /workspace && npm run validate"
```

See **[docs/DATA-VALIDATION.md](docs/DATA-VALIDATION.md)** for schema details.

---

## Hugo Development

The Hugo server runs inside the devcontainer at `http://localhost:1313`.

To restart Hugo:
```bash
docker exec $CONTAINER bash -c "pkill hugo; cd /workspace && hugo server -D --buildFuture --bind 0.0.0.0 --disableFastRender"
```

See **[docs/PAGE-LAYOUTS.md](docs/PAGE-LAYOUTS.md)** for template information.

---

## Styling

The site uses:
- **Hugo theme**: Blowfish
- **Component library**: DaisyUI (loaded via CDN in `layouts/partials/extend-head.html`)
- **CSS framework**: Tailwind (from Blowfish)
- **Custom CSS**: `assets/css/custom.css`

Prefer Tailwind/DaisyUI classes over custom CSS when possible.
