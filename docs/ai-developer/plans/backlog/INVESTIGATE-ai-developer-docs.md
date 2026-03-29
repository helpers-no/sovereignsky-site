# Investigate: Portable AI Developer Documentation

## Status: Backlog

**Goal**: Create a portable `ai-developer/` folder that **any project can copy** and immediately have a working AI development workflow. The folder location varies by project (e.g. `docs/ai-developer/`, `website/docs/ai-developer/`), but the plans folder is always inside it. Project-specific details stay in CLAUDE.md. This will eventually replace the ai-developer setups in all three repos.

**Last Updated**: 2026-03-29

---

## Sources Analysed

| Repo | ai-developer location | Maturity |
|------|----------------------|----------|
| **devcontainer-toolbox (DCT)** | `website/docs/ai-development/ai-developer/` | Most mature — 39 completed plans, three-layer framework |
| **urbalurba-infrastructure** | `website/docs/ai-developer/` | Mature — 83 completed plans, TALK.md protocol |
| **sovereignsky-site (this repo)** | `docs/` + `CLAUDE.md` (scattered) | Early — no ai-developer folder yet |

Note: The `ai-developer/` folder is not always in `docs/`. Each project places it where it fits. But `plans/` is always inside `ai-developer/`.

---

## The Core Insight

All three repos have evolved the same plan-based AI development workflow independently, with slightly different conventions. The core system is **not project-specific** — it's a universal pattern for working with AI coding assistants:

1. User describes what they want
2. **AI investigates** — researches the problem, analyses options, checks best practices
3. User reviews the investigation, asks AI to check for gaps
4. AI creates an implementation plan based on the investigation
5. User reviews and approves the plan
6. AI implements phase by phase
7. User reviews result
8. AI completes

### The Investigation is the Most Important Step

The investigation phase (INVESTIGATE-*.md) is where the developer should spend most of their time. This is where quality is built — a thorough investigation leads to a good plan, which leads to clean implementation. A rushed investigation leads to rework.

**What makes a good investigation:**

- **Ask AI to research best practices** — use web search to find how others have solved similar problems, what patterns exist, what pitfalls to avoid
- **Ask AI to find tools and libraries** — and critically, ask it to verify they are actively maintained, recently updated, and have healthy community adoption. AI knowledge has a cutoff date and can recommend abandoned projects.
- **Ask AI to analyse the plan for gaps** — after the investigation produces a plan, ask "are there gaps in this plan?" or "what could go wrong?" This catches missing steps, overlooked dependencies, and edge cases
- **Ask AI to check its own findings** — AI can hallucinate tools, libraries, or best practices that don't exist. Ask it to verify its recommendations against current sources
- **Iterate** — investigations improve through multiple rounds of questions and analysis. The first draft is rarely complete.

**The investigation file is a living document** — it captures decisions, rejected options, and the reasoning behind choices. When someone asks "why did we do it this way?" months later, the investigation has the answer.

The project-specific parts (devcontainer setup, build commands, validation tools, file conventions) belong in CLAUDE.md. The workflow, plan structure, investigation practices, and best practices are universal.

---

## Design Principle: Two Layers

```
ai-developer/                ← PORTABLE: copy to any project
  README.md                  ← Universal entry point + three-layer framing
  WORKFLOW.md                ← Universal workflow (investigate → plan → implement)
  PLANS.md                   ← Universal plan system + investigation guidance
  DEVCONTAINER.md            ← How to work inside the DCT devcontainer
  GIT.md                     ← Git safety rules + GitHub/Azure DevOps operations
  TALK.md                    ← AI-to-AI testing protocol (for projects with testers)
  plans/                     ← Always inside ai-developer/
    backlog/
    active/
    completed/

CLAUDE.md                    ← PROJECT-SPECIFIC: unique per project
  - Project structure and conventions
  - Build/test/validation commands
  - Container name and workspace path
  - Which tools are installed
  - References ai-developer/ for workflow
```

### Placement Convention

| Project type | ai-developer/ location | Example |
|-------------|----------------------|---------|
| Docusaurus website | `website/docs/ai-developer/` | urbalurba-infrastructure, dev-templates, DCT |
| Non-Docusaurus | `docs/ai-developer/` | sovereignsky-site |

The `ai-developer/` folder content is identical regardless of where it's placed. CLAUDE.md in each repo points to the correct path.

**Rule**: The documentation files (README.md, WORKFLOW.md, PLANS.md, DEVCONTAINER.md, GIT.md, TALK.md) must not mention project names, specific tools, file paths, or commands. They describe *how to work*, not *what to work on*. The `plans/` folder is the exception — plans are project-specific by nature and are not copied between projects.

---

## Questions — All Resolved

1. **Plans folder location** — ✅ Plans always live inside `ai-developer/plans/`. The `ai-developer/` folder itself can be placed anywhere in the project.

2. **TALK.md** — ✅ Include. Describes how to work with a tester (AI-to-AI testing protocol). Not every project needs it, but useful for projects that have a tester. Ship it in the portable folder.

3. **Three-layer framework (Cage/Plan/Tests)** — ✅ Include as brief framing in README.md. DCT has this as a full page with GIFs and install instructions — too project-specific. But the concept (isolate AI in a container, guide it with plans, validate with tests) is universal and explains *why* the system exists. A short "Why this system?" section (6-8 lines) in README.md gives context without bloat.

4. **Git operations** — ✅ Separate GIT.md file. Git confirmation rules and platform-specific operations (GitHub `gh` commands, Azure DevOps `az repos` commands) should be in their own file rather than embedded in CLAUDE.md or WORKFLOW.md. This handles both GitHub and Azure DevOps workflows. WORKFLOW.md references GIT.md for the actual commands.

5. **Existing docs after migration** — ✅ Delete `docs/PLANS.md` and `docs/WORKFLOW.md` after creating ai-developer/ versions. Move all plans. Update all internal links in all files.

6. **Portability testing** — ✅ Will test thoroughly before replacing other repos. The setup created here will eventually replace ai-developer/ in urbalurba and DCT.

---

## Current State: What Each Repo Has

### Content that is UNIVERSAL (same across all three repos)

| Content | SovereignSky | Urbalurba | DCT |
|---------|:---:|:---:|:---:|
| Plan lifecycle (backlog → active → completed) | ✅ | ✅ | ✅ |
| PLAN-*.md vs INVESTIGATE-*.md file types | ✅ | ✅ | ✅ |
| Phase-by-phase implementation | ✅ | ✅ | ✅ |
| Git confirmation before destructive ops | ✅ | ✅ | ✅ |
| Plan status tracking (checkboxes, phase markers) | ✅ | ✅ | ✅ |
| Plan templates (bug fix, feature, investigation) | ✅ | ✅ | ✅ |
| Feature branch workflow | Partial | ✅ | ✅ |
| User confirmation as default validation | ❌ | ✅ | ✅ |
| Ordered plan naming (PLAN-nnn-*) | Partial | ✅ | ✅ |
| Splitting investigations into multiple plans | Partial | ✅ | ✅ |
| IMPLEMENTATION RULES blockquote | ❌ | ✅ | ✅ |
| README.md entry point | ❌ | ✅ | ✅ |
| Three-layer framework (Cage/Plan/Tests) | ❌ | ❌ | ✅ |
| Plans colocated in ai-developer/ | ❌ | ✅ | ✅ |
| TALK.md (AI-to-AI testing) | ❌ | ✅ | ❌ |

### Content that is PROJECT-SPECIFIC (different in every repo)

| Content | SovereignSky | Urbalurba | DCT |
|---------|--------------|-----------|-----|
| Environment | Docker devcontainer, Hugo | Ansible, kubectl | Devcontainer, bash scripts |
| Build commands | `npm run validate`, `hugo` | `kubectl apply` | `dev-test`, `shellcheck` |
| Validation | JSON schemas, Hugo build | K8s dry-run, pod checks | Static/unit/install tests |
| File conventions | JSON → generator → markdown | Manifests, playbooks | Install scripts, metadata |
| Version management | N/A (CI/CD deploys) | N/A | version.txt bumping |
| Creation guides | N/A | Adding a service guide | CREATING-SCRIPTS.md |
| Git platform | GitHub | GitHub | Azure DevOps + GitHub |
| Library reuse rules | N/A | bash lib rules | N/A |

---

## Proposed Portable `ai-developer/`

### README.md — Entry Point

Universal quick reference for AI coding assistants. Contains:
- **Why this system?** — Brief three-layer framing (Cage/Plan/Tests, 6-8 lines). AI runs in a container (cage), follows structured plans (plan), and validates work (tests). Explains why without project-specific details.
- **Document index** — table linking to WORKFLOW.md, PLANS.md, DEVCONTAINER.md, GIT.md, TALK.md
- **Plans folder** structure explanation
- **Quick reference** — what to do when user says X
- **Link to CLAUDE.md** — "See CLAUDE.md in the repo root for project-specific instructions"

**Must NOT contain**: project names, specific tools, file paths, build commands, install instructions.

### WORKFLOW.md — Universal Workflow

The end-to-end flow. Adapted from urbalurba/DCT (they're nearly identical). Contains:
- **Flow diagram** (6 steps)
- **Step 1**: User describes what they want (not "work on issue #X")
- **Step 2**: AI creates plan in backlog/
- **Step 3**: User reviews plan
- **Step 4**: AI implements — offer feature branch (not mandate), work phase by phase, user confirms each phase
- **Step 5**: User reviews result
- **Step 6**: AI completes — move to completed/, push, PR if on branch. References GIT.md for platform-specific commands.
- **Quick reference table**
- **Example session** (generic, not project-specific)
- **Feature branch explanation** for newcomers
- **Optional: GitHub/Azure DevOps issues** section at the bottom

**Must NOT contain**: specific validation commands, project-specific review criteria, version management.

### PLANS.md — Universal Plan System

Plan structure and best practices. Merged best of urbalurba and DCT. Contains:
- **Folder structure** (backlog/ → active/ → completed/)
- **File types** — PLAN-*.md and INVESTIGATE-*.md with naming conventions
- **Ordered plans** (PLAN-nnn-*) with "Splitting Investigations" guidance
- **Plan structure** — header with IMPLEMENTATION RULES blockquote, dependencies, phases, validation, acceptance criteria
- **Status values** and transitions
- **Updating plans** during implementation (checkboxes, phase markers)
- **Validation** — user confirmation as default, automated checks as optional
- **Templates** — bug fix, feature, investigation (generic, no project-specific commands)
- **Best practices**

**Must NOT contain**: project-specific validation commands, library reuse rules, specific file patterns.

### GIT.md — Git Platform Operations

Git confirmation rules and platform-specific commands. Contains:
- **Safety rules** — never run git commands without user confirmation (the rules currently in CLAUDE.md)
- **GitHub workflow** — `gh pr create`, `gh issue view`, branch naming
- **Azure DevOps workflow** — `az repos pr create`, work item linking, branch policies
- **Common operations** — commit, push, PR, merge patterns for both platforms

This separates git platform concerns from CLAUDE.md (which is about the project) and from WORKFLOW.md (which is about the plan lifecycle).

### DEVCONTAINER.md — Working Inside the DCT Devcontainer

All projects use the DevContainer Toolbox (DCT) for development. The AI must understand this environment — all commands, tool installs, and code execution happen inside the devcontainer, never on the host.

Contains:
- **The rule** — all commands run inside the devcontainer, never on the host machine
- **Environment variables** — `DCT_HOME=/opt/devcontainer-toolbox`, `DCT_WORKSPACE` (varies per project)
- **Key paths inside the container**:
  - `/opt/devcontainer-toolbox/` — DCT installation root
  - `/opt/devcontainer-toolbox/manage/tools.json` — machine-readable inventory of all available tools (auto-generated)
  - `/workspace/` — mounted project directory (always this path, regardless of project)
  - `/workspace/.devcontainer.extend/` — project tool/service configuration (committed)
  - `/workspace/.devcontainer.secrets/` — local-only secrets (gitignored)
- **Universal `dev-*` commands** — always available in the container:
  - `dev-setup` — interactive tool installation menu
  - `dev-help` — list all commands
  - `dev-env` — show environment info
  - `dev-tools` — machine-readable tool inventory (JSON)
  - `dev-services` — manage background services
  - `dev-check` — configure git identity
  - `dev-sync` — update toolbox without rebuilding
  - `dev-update` — full update with rebuild
- **Getting help** — run `dev-help` anywhere inside the container to see all available commands and version info
- **NEVER edit files in `/opt/devcontainer-toolbox/`** — that directory is maintained by the DCT project, not by individual projects. If something needs fixing, register an issue at https://github.com/helpers-no/devcontainer-toolbox/issues
- **How to access from the host** — `docker exec` pattern for when AI runs on the host (Claude Code outside VS Code)
- **Tool installation** — tools are installed via `dev-setup` or `enabled-tools.conf`, not `apt install` or `npm install -g`
- **Available tools** — `tools.json` lists all installable tools with metadata (id, name, description, category, checkCommand). The actual install scripts live in `/opt/devcontainer-toolbox/additions/`
- **Installing or checking a tool** — run the script directly: `/opt/devcontainer-toolbox/additions/install-dev-ai-claudecode.sh` to install, `--help` for options, `--uninstall` to remove. Each script is self-contained.
- **What's pre-installed** — Python 3.12, Node.js 22 LTS, Docker CLI, GitHub CLI, git, curl, standard Unix tools
- **Project customization** — `.devcontainer.extend/enabled-tools.conf` lists tools to auto-install on container creation, `.devcontainer.extend/project-installs.sh` for project setup (npm install, etc.)

**Must NOT contain**: project-specific paths, container names, or which tools a specific project uses. Those go in CLAUDE.md.

### TALK.md — AI-to-AI Testing Protocol

How to work with a tester. Adapted from urbalurba. Contains:
- **Purpose** — why two AI sessions (contributor + tester) catch issues automated tests miss
- **Participants** — contributor builds, tester tests as a new user
- **Protocol** — numbered messages, file-based communication via shared talk.md
- **Session lifecycle** — archive previous, create fresh, test rounds
- **What gets caught** — wrong URLs, rendering errors, confusing output, missing steps
- **Example session**

Not every project needs this. But for projects with deployed services or complex UIs, it's valuable.

### project-*.md — Project-Specific Instructions

Each project creates one or more `project-*.md` files with project-specific setup, tools, commands, and conventions. These are NOT portable — they are written by the project maintainer.

Examples:
- `project-sovereignsky.md` — Hugo setup, data pipeline, generators, styling (Blowfish/DaisyUI/Tailwind)
- `project-hugo.md` + `project-data-pipeline.md` — if splitting makes more sense

These replace what currently lives in CLAUDE.md (project structure, key scripts, Hugo development, styling).

### template-*.md — Installed by dev-template

When a developer runs `dev-template` to scaffold a project, the template drops a `template-*.md` file into `ai-developer/`. This describes the tech stack, build commands, and conventions for that template.

Examples:
- `template-csharp-basic.md` — C# webserver template: dotnet commands, project structure
- `template-python-basic.md` — Python webserver template: pip/uv commands, project structure

Multiple templates can coexist — each adds its own file. CLAUDE.md is never touched by dev-template.

### plans/ — Always Inside ai-developer/

The `plans/` folder is always inside `ai-developer/`. Contents are project-specific (each project has its own plans), but the folder structure is universal.

When copying `ai-developer/` to a new project:
- Copy the portable docs (README.md, WORKFLOW.md, PLANS.md, DEVCONTAINER.md, GIT.md, TALK.md)
- Create empty `plans/backlog/`, `plans/active/`, `plans/completed/` with `.gitkeep` files
- Do NOT copy `project-*.md`, `template-*.md`, or another project's plans

---

## What Goes Where

### In `ai-developer/` — portable docs (copy to any project)

| File | Content |
|------|---------|
| `README.md` | Three-layer framing, document index, guided read order |
| `WORKFLOW.md` | Universal investigate → plan → implement flow |
| `PLANS.md` | Universal plan structure, investigation guidance, templates |
| `DEVCONTAINER.md` | How to work inside the DCT devcontainer |
| `GIT.md` | Git safety rules + GitHub/Azure DevOps operations |
| `TALK.md` | AI-to-AI testing protocol |
| `plans/backlog/.gitkeep` | Empty folder structure |
| `plans/active/.gitkeep` | Empty folder structure |
| `plans/completed/.gitkeep` | Empty folder structure |

### In `ai-developer/` — project-specific files (NOT copied between projects)

| File pattern | Content | Created by |
|-------------|---------|------------|
| `project-*.md` | Project-specific setup, tools, commands, conventions | Project maintainer |
| `template-*.md` | Tech stack from installed templates | `dev-template` command |
| `plans/**/*.md` | Investigation and implementation plans | AI + maintainer |

### In `CLAUDE.md` — always-loaded enforcer

CLAUDE.md is auto-loaded by Claude Code at session start. It must enforce the workflow and point to ai-developer/. It does NOT contain project details — those are in `project-*.md`.

```markdown
# Project Name

## How We Work

**ALL work follows the plan-based workflow.** Before writing any code:

1. Check `docs/ai-developer/plans/active/` for in-progress work
2. Create an INVESTIGATE-*.md or PLAN-*.md in `docs/ai-developer/plans/backlog/`
3. Wait for user approval before implementing
4. Read [WORKFLOW.md](docs/ai-developer/WORKFLOW.md) for the full process
5. Read [PLANS.md](docs/ai-developer/PLANS.md) for plan structure

All commands must run inside the devcontainer. Never run directly on the host.

## Project Details

Read [docs/ai-developer/README.md](docs/ai-developer/README.md) for the complete AI developer guide.
Read all `project-*.md` files in `docs/ai-developer/` for project-specific instructions.
```

**Three things always in context:**
1. **Plan first** — never skip to coding
2. **Run inside container** — never run on host
3. **Where to read more** — pointer to ai-developer/README.md and project-*.md

### README.md Guided Read Order

README.md tells Claude what to read and when, preventing it from loading all files upfront:

```markdown
## Start Here

1. Read all `project-*.md` files — project-specific setup, tools, commands
2. Read all `template-*.md` files (if any) — tech stack from installed templates
3. Read WORKFLOW.md when starting new work
4. Read PLANS.md when creating or implementing a plan
5. Reference DEVCONTAINER.md, GIT.md, TALK.md as needed
```

### Stays in `docs/` (SovereignSky-specific detailed documentation)

| File | Reason |
|------|--------|
| `DEVELOPMENT.md` | Hugo/devcontainer deep reference (linked from project-*.md) |
| `DATA-VALIDATION.md` | JSON schema deep reference |
| `DATA-PIPELINE.md` | Generator pipeline deep reference |
| `PAGE-LAYOUTS.md` | Component naming deep reference |
| `DESIGN-COMPONENTS.md` | Design system deep reference |

These are detailed reference docs linked from `project-*.md` when needed. They're too detailed for ai-developer/ and too project-specific to be portable.

---

## Migration Steps for This Repo

When implementing, we must:

1. Create `docs/ai-developer/` with all portable files
2. Move `docs/plans/` → `docs/ai-developer/plans/` (with all existing plans)
3. Update CLAUDE.md — remove duplicated content, add ai-developer/ reference
4. Delete `docs/PLANS.md` and `docs/WORKFLOW.md` — replaced by ai-developer/ versions
5. Update all internal links in all existing plans and investigations (they reference `docs/plans/` paths)
6. Verify every link in every file is valid after the move

---

## Summary of Decisions

| # | Decision | Status |
|---|----------|--------|
| 1 | `ai-developer/` is portable — docs have no project-specific content | ✅ |
| 2 | Plans always inside `ai-developer/plans/` | ✅ |
| 3 | README.md with three-layer framing + guided read order | ✅ |
| 4 | WORKFLOW.md — investigation-first, not issue-coupled, feature branch offered | ✅ |
| 5 | PLANS.md — investigation guidance, IMPLEMENTATION RULES blockquote, templates | ✅ |
| 6 | DEVCONTAINER.md — how to work inside the DCT devcontainer | ✅ |
| 7 | GIT.md — git safety rules + GitHub/Azure DevOps operations | ✅ |
| 8 | TALK.md — AI-to-AI testing protocol for projects with testers | ✅ |
| 9 | `project-*.md` — project-specific setup, replaces project content in CLAUDE.md | ✅ |
| 10 | `template-*.md` — dropped by `dev-template`, tech stack docs | ✅ |
| 11 | CLAUDE.md is thin enforcer — workflow rule, container rule, pointer to ai-developer/ | ✅ |
| 12 | README.md guided read order — prevents Claude from loading all files upfront | ✅ |
| 13 | User confirmation as default validation | ✅ |
| 14 | Ordered plan naming with splitting guidance | ✅ |
| 15 | Will replace ai-developer/ in all repos after thorough testing | ✅ (future) |
| 16 | dev-templates is first external repo to receive the portable ai-developer/ | ✅ |
| 17 | Version management — project-specific, in project-*.md if needed | ✅ |
| 18 | Creation guides (CREATING-*.md) — project-specific, in project-*.md if needed | ✅ |

---

## Rollout Plan

### Phase A: Create and test in sovereignsky-site (this repo)

1. Write the portable files (README.md, WORKFLOW.md, PLANS.md, DEVCONTAINER.md, GIT.md, TALK.md)
2. Create `project-sovereignsky.md` with project-specific content from current CLAUDE.md
3. Move `docs/plans/` → `docs/ai-developer/plans/`
4. Rewrite CLAUDE.md as thin enforcer (workflow rule + container rule + pointer)
5. Delete old `docs/PLANS.md` and `docs/WORKFLOW.md`
6. Update all internal links
7. Validate portability — no project-specific references in portable files
8. Cold start test — end session, restart Claude, have it read the docs

### Phase B: Deploy to dev-templates (first external test)

Target: `helpers-no/dev-templates` at `/Users/terje.christensen/learn/helpers/dev-templates/`

Current state:
- `website/docs/ai-developer/` already exists with `plans/backlog/` (one completed plan)
- No CLAUDE.md, no README.md, WORKFLOW.md, PLANS.md, GIT.md, or TALK.md yet
- The repo provides project templates for volunteers — good test case for the portable docs

Steps:
1. Copy portable files to `website/docs/ai-developer/`
2. Keep existing `plans/` content (PLAN-transfer-to-helpers-no.md)
3. Create a CLAUDE.md for dev-templates with project-specific content
4. Verify the setup works for AI-assisted development on that repo

The dev-templates repo is a good first target because:
- It already has the folder structure
- It's a simpler project (templates, not infrastructure)
- It can serve as a **template for other projects** — when developers create new repos from dev-templates, they get the ai-developer/ setup included

### Phase C: Replace in urbalurba and DCT (future)

After testing in sovereignsky and dev-templates:
1. Replace `website/docs/ai-developer/` in urbalurba-infrastructure
2. Replace `website/docs/ai-development/ai-developer/` in devcontainer-toolbox
3. Move project-specific content (library reuse rules, CREATING-*.md, version management) to each repo's CLAUDE.md

---

## Recommendation

Start with **Phase A** — create a PLAN for this repo that writes the portable files and migrates the existing docs.

---

## Next Steps

- [ ] Review this investigation — confirm decisions and rollout plan
- [ ] Create PLAN-portable-ai-developer-docs.md for Phase A (this repo)
