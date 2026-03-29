# Create Portable AI Developer Documentation

> **IMPLEMENTATION RULES:** Before implementing this plan, read and follow:
> - [WORKFLOW.md](../../WORKFLOW.md) - The implementation process
> - [PLANS.md](../../PLANS.md) - Plan structure and best practices

## Status: Completed

**Completed**: 2026-03-29

**Goal**: Create a portable `docs/ai-developer/` folder with universal AI development workflow docs, create project-specific `project-sovereignsky.md`, move plans, rewrite CLAUDE.md as thin enforcer, delete old docs. Test by cold-starting Claude.

**Investigation**: [INVESTIGATE-ai-developer-docs.md](INVESTIGATE-ai-developer-docs.md)

**Last Updated**: 2026-03-29

---

## Overview

The `docs/ai-developer/` folder has two types of content:

**Portable docs** (copy to any project):
- README.md, WORKFLOW.md, PLANS.md, DEVCONTAINER.md, GIT.md, TALK.md

**Project-specific files** (unique to this repo):
- `project-sovereignsky.md` — project structure, Hugo, generators, styling
- `plans/` — backlog, active, completed plans

CLAUDE.md becomes a thin enforcer: workflow rule + container rule + pointer to ai-developer/.

---

## Phase 1: Create Portable Documentation Files — DONE

Write the 6 universal files in `docs/ai-developer/`. No project names, specific tools, file paths, or build commands.

### Tasks

- [x] 1.1 Create `docs/ai-developer/README.md` — entry point with:
  - Brief three-layer framing (Cage/Plan/Tests)
  - Document index table
  - File naming convention (no prefix = portable, `project-*` = project-specific, `template-*` = from dev-template)
  - Guided read order (project-*.md first, then template-*.md, then workflow/plans as needed)
  - Plans folder structure
  - Quick reference for common user commands
  - Link to CLAUDE.md for always-loaded rules
- [x] 1.2 Create `docs/ai-developer/WORKFLOW.md` — universal workflow with:
  - Flow diagram (investigate → plan → implement, 8 steps)
  - Investigation as the most important step (research, best practices, gap analysis, tool verification)
  - Feature branch offered not mandated
  - User confirmation at each phase
  - Example session (generic)
  - Feature branch explanation for newcomers
  - Optional GitHub/Azure DevOps issues section
- [x] 1.3 Create `docs/ai-developer/PLANS.md` — universal plan system with:
  - Investigation guidance (where quality is built — research, web search, gap analysis, tool verification)
  - Folder structure (backlog → active → completed)
  - File types (PLAN-*.md, INVESTIGATE-*.md)
  - Ordered naming (PLAN-nnn-*) with splitting investigations guidance
  - Plan structure with IMPLEMENTATION RULES blockquote
  - User confirmation as default validation
  - Templates (bug fix, feature, investigation)
  - Best practices
- [x] 1.4 Create `docs/ai-developer/DEVCONTAINER.md` — DCT devcontainer guide with:
  - The rule: all commands run inside the container, never on the host
  - Key paths: `/opt/devcontainer-toolbox/`, `/workspace/`, tools.json, additions/
  - `dev-*` commands (dev-help, dev-setup, dev-env, dev-tools, dev-services, etc.)
  - Getting help: `dev-help` anywhere in the container
  - Installing tools: run scripts in additions/ directly, `--help` for options
  - NEVER edit `/opt/devcontainer-toolbox/` — file issues at GitHub
  - Docker exec from host pattern
  - Project customization: `.devcontainer.extend/`, `.devcontainer.secrets/`
- [x] 1.5 Create `docs/ai-developer/GIT.md` — git operations with:
  - Safety rules: never run git commands without user confirmation
  - List of commands requiring confirmation (add, commit, push, checkout -b, merge, branch -d)
  - GitHub workflow (gh pr create, gh issue view, branch naming)
  - Azure DevOps workflow (az repos pr create, work item linking)
  - Common patterns (commit, push, PR, merge)
- [x] 1.6 Create `docs/ai-developer/TALK.md` — AI-to-AI testing protocol with:
  - Purpose: catch UX issues automated tests miss
  - Participants: contributor (builds) + tester (tests as new user)
  - Talk folder lives outside repo (security — sessions contain secrets)
  - File-based communication via shared talk.md
  - Session format: header, numbered messages, steps with expected output
  - Session lifecycle: archive previous, create fresh, test rounds
  - What gets caught: wrong URLs, rendering errors, confusing output, missing steps
  - Example session (generic)

### Validation

User reviews each file for:
- No project-specific references
- Complete and self-sufficient for a cold-start AI
- Consistent cross-references between files

---

## Phase 2: Create Project-Specific File — DONE

Create `project-sovereignsky.md` with all project-specific content currently in CLAUDE.md and referenced docs.

### Tasks

- [x] 2.1 Create `docs/ai-developer/project-sovereignsky.md` with:
  - Project description (Hugo site for digital sovereignty)
  - Project structure (config/, content/, data/, layouts/, scripts/, static/)
  - Devcontainer specifics (container discovery command, workspace path)
  - Hugo development (server commands, restart triggers, localhost:1313)
  - Key scripts (generators, validate, generate:all, build)
  - Data pipeline overview (JSON → generator → markdown → Hugo, link to docs/DATA-PIPELINE.md)
  - Validation (npm run validate, link to docs/DATA-VALIDATION.md)
  - Styling (Blowfish theme, DaisyUI, Tailwind, custom CSS, link to docs/DESIGN-COMPONENTS.md)
  - Page layouts (link to docs/PAGE-LAYOUTS.md)

### Validation

User confirms project-sovereignsky.md has all the project context an AI needs.

---

## Phase 3: Move Plans — DONE

Move existing plans from `docs/plans/` to `docs/ai-developer/plans/`.

### Tasks

- [x] 3.1 Create `docs/ai-developer/plans/backlog/`, `docs/ai-developer/plans/active/`, `docs/ai-developer/plans/completed/`
- [x] 3.2 Move all files from `docs/plans/backlog/` → `docs/ai-developer/plans/backlog/`
- [x] 3.3 Move all files from `docs/plans/active/` → `docs/ai-developer/plans/active/`
- [x] 3.4 Move all files from `docs/plans/completed/` → `docs/ai-developer/plans/completed/`
- [x] 3.5 Remove old `docs/plans/` directory

### Validation

```bash
ls docs/ai-developer/plans/backlog/
ls docs/ai-developer/plans/completed/
ls docs/plans/ 2>&1  # Should fail
```

---

## Phase 4: Rewrite CLAUDE.md — DONE

Replace CLAUDE.md with thin enforcer — workflow rule, container rule, pointer.

### Tasks

- [x] 4.1 Rewrite CLAUDE.md with:
  - Project name as heading
  - "How We Work" section: plan-first rule, check active plans, create in backlog, wait for approval, links to WORKFLOW.md and PLANS.md
  - Container rule: all commands inside devcontainer
  - "Project Details" section: pointer to README.md and project-*.md files
- [x] 4.2 Verify no project-specific content remains in CLAUDE.md (it's all in project-sovereignsky.md now)

### Validation

User confirms CLAUDE.md is thin and enforces the right rules.

---

## Phase 5: Delete Old Files and Update Links — DONE

Remove replaced files and fix all internal references.

### Tasks

- [x] 5.1 Delete `docs/PLANS.md` (replaced by `docs/ai-developer/PLANS.md`)
- [x] 5.2 Delete `docs/WORKFLOW.md` (replaced by `docs/ai-developer/WORKFLOW.md`)
- [x] 5.3 Update all references in `docs/ai-developer/plans/**/*.md` — changed `docs/plans/` to `docs/ai-developer/plans/` in backlog files (CONTRIBUTING.md, PLAN-ux-improvements2.md, INVESTIGATE-section-based-design.md, INVESTIGATE-content-field-standardization.md). Completed plans left as historical.
- [x] 5.4 Update references in CONTRIBUTING.md
- [x] 5.5 Verify no broken links remain — grep confirmed clean

### Validation

```bash
grep -r "docs/plans/" docs/ CLAUDE.md --include="*.md" || echo "No old plan refs"
grep -r "docs/PLANS.md\|docs/WORKFLOW.md" . --include="*.md" || echo "No old doc refs"
```

---

## Phase 6: Validate Portability — DONE

Review every line of the 6 portable files for project-specific content.

### Tasks

- [x] 6.1 Review README.md — no project names, tools, paths, commands
- [x] 6.2 Review WORKFLOW.md — no project names, tools, paths, commands
- [x] 6.3 Review PLANS.md — no project names, tools, paths, commands
- [x] 6.4 Review DEVCONTAINER.md — only universal DCT content, no project-specific container names or tool lists
- [x] 6.5 Review GIT.md — covers both GitHub and Azure DevOps, no project-specific repo names
- [x] 6.6 Review TALK.md — no project-specific paths or commands

Grep confirmed zero matches for project-specific terms across all 6 portable files.

### Validation

User confirms all 6 portable files are project-agnostic.

---

## Phase 7: Cold Start Test — DONE

The real test: commit, end session, restart Claude with fresh context.

### Tasks

- [x] 7.1 Commit all changes ✓
- [x] 7.2 End this Claude Code session ✓
- [x] 7.3 Start a new Claude Code session ✓
- [x] 7.4 Tell Claude: "Read docs/ai-developer/ and tell me what you understand about how to work on this project" ✓
- [x] 7.5 Evaluate: Can Claude explain the workflow? Does it know about investigations, plans, devcontainer, git rules, and the project specifics? ✓
- [x] 7.6 Fix any gaps discovered during the cold start test — Added plan update reminder to CLAUDE.md ✓

### Validation

Claude can explain the complete workflow from a cold start by reading only CLAUDE.md → README.md → project-sovereignsky.md.

---

## Acceptance Criteria

- [x] 6 portable files in `docs/ai-developer/` with zero project-specific content
- [x] `project-sovereignsky.md` with all project context
- [x] All plans moved to `docs/ai-developer/plans/`
- [x] CLAUDE.md is thin enforcer (workflow rule + container rule + pointer)
- [x] Old `docs/PLANS.md`, `docs/WORKFLOW.md`, `docs/plans/` deleted
- [x] No broken internal links
- [x] Cold start test passes — Claude understands workflow and project from docs alone

---

## File Naming Convention

| Prefix | Meaning | Portable? | Created by |
|--------|---------|-----------|------------|
| (none) | Universal workflow docs | ✅ Yes | Copied from template |
| `project-*` | Project-specific setup | ❌ No | Project maintainer |
| `template-*` | Tech stack from template | ❌ No | `dev-template` command |
| `plans/` | Implementation plans | ❌ No | AI + maintainer |

---

## Files to Create

- `docs/ai-developer/README.md` (portable)
- `docs/ai-developer/WORKFLOW.md` (portable)
- `docs/ai-developer/PLANS.md` (portable)
- `docs/ai-developer/DEVCONTAINER.md` (portable)
- `docs/ai-developer/GIT.md` (portable)
- `docs/ai-developer/TALK.md` (portable)
- `docs/ai-developer/project-sovereignsky.md` (project-specific)

## Files to Rewrite

- `CLAUDE.md` — thin enforcer

## Files to Delete

- `docs/PLANS.md`
- `docs/WORKFLOW.md`
- `docs/plans/` (entire directory, after moving contents)

## Files to Move

- `docs/plans/backlog/*` → `docs/ai-developer/plans/backlog/`
- `docs/plans/active/*` → `docs/ai-developer/plans/active/`
- `docs/plans/completed/*` → `docs/ai-developer/plans/completed/`
