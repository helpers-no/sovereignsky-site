# INVESTIGATE: Section-Based Design System for Project Pages

## Status: Backlog
## Type: Investigation
## Created: 2026-03-21

## Goal

Determine how to restructure `data/sovereignsky/projects.json` so that project pages can render with visually rich, section-based designs (inspired by Google Stitch mockups) instead of flat markdown.

## Background

### Current Architecture

The rendering pipeline is:

```
data/sovereignsky/projects.json
  → scripts/generate-sovereignsky-pages.js
    → content/sovereignsky/{identifier}/index.md
      → Hugo (layouts/sovereignsky/single.html + shortcodes)
        → HTML
```

Each project in the JSON has a `body` field containing flat markdown (headings, paragraphs, tables, bullet lists). The generator script dumps `body` as-is into the markdown file. Hugo renders it as one blob via `{{ .Content }}`. There is also a `shortcodes` array that gets appended after the body.

The result is a plain document layout — every section looks the same.

### What We Want

Google Stitch was used to design project landing pages with distinct visual sections: hero banners, feature grids with icons, numbered step flows, persona cards, stats banners, checklists, CTAs, etc. Each section has its own design treatment.

To achieve this, the content must be **structured** so the rendering layer knows which design to apply to each section.

### Stitch Project Reference

The Stitch designs are in project **"SovereignSky Landing Page"** (project ID: `3224991992411328938`). Key screens:

- **"DevContainer Toolbox Design"** (`c22705059e01440480b8875e0051dd29`) — the primary reference for devcontainer-toolbox
- **"DevContainer Toolbox - Final Verified Content"** (`c43b1a7cb46843fdbf37ce1205e0918e`) — refined version with accurate content
- **"DevContainer Toolbox - Accurate Content Redesign"** (`c1a67003d32346b9bde3354fb81bf246`) — another iteration
- **"SovereignSky - Infrastructure"** (`3dcd0af4788840a8a54e0fbce2732124`) — shows stats, feature blocks, checklists
- **"SovereignSky - Security"** (`61c554d2fc624a8e87d80c6dfcb9ce38`) — shows certification grids, resource cards

## Key Terms

**Design tokens**: Named variables for design decisions (colors, fonts, spacing, shadows). Instead of hardcoding `#0058be` in every shortcode, you define `--color-primary: #0058be` once in CSS. All shortcodes reference the token. Change the value in one place, everything updates. The Stitch export provides these tokens — they're listed in the "Reference Implementation" section below.

**Design system**: A documented set of rules and reusable components that define how the site looks. It has three parts: (1) design tokens — the variables, (2) component library — the building blocks (our shortcodes), (3) usage rules — when to use what. Stitch generated a design system document for the project (visible in the Stitch project metadata) with rules like "no 1px borders, use background color shifts" and "primary buttons use gradient fill." The benefit is that once shortcodes are built following these rules, creating a new designed page is just writing JSON — no design decisions needed per page.

---

## Key Decision: Why Sections Array (Option B)

Two main approaches were evaluated:

### Option A: Shortcodes embedded in body (rejected)

Keep `body` as markdown, insert shortcode placeholders like `{{SHORTCODE:id}}` that the generator replaces. Problem: when someone hands you markdown content, you'd have to surgically extract parts and move them into shortcodes. Poor maintenance story.

### Option B: Sections array replaces body (chosen)

Replace the `body` field with a `sections` array. Each section has a `type` that determines its design. A `"type": "markdown"` section is plain passthrough — so you can drop raw markdown in and upgrade sections to richer designs one at a time.

**Why Option B wins:**
- Clean upgrade path: start with `"type": "markdown"`, convert to `"type": "feature-grid"` when ready
- Good maintenance story: someone gives you markdown, you paste it into a markdown section
- Single mental model: iterate sections, render by type
- Generator script has a clear loop: for each section, emit the matching shortcode or raw markdown

### Blog Posts Are Different

Blog posts (hand-written `.md` files) don't use this system. They get default template styling. If a blog writer wants designed sections, they add shortcodes manually in the markdown. The same shortcode templates serve both workflows — the difference is who inserts them (generator script vs. human writer).

## Section Types Catalog

From analyzing all Stitch screens, these are the distinct section design patterns:

| # | Type | Description | Shortcode needed? |
|---|------|-------------|-------------------|
| 1 | `markdown` | Plain markdown passthrough | No |
| 2 | `hero` | Big headline, CTAs, image | No (frontmatter + Blowfish template) |
| 3 | `feature-grid` | 2-column split with icon headers and dot-item lists (e.g., Languages | Tools) | **Yes** |
| 4 | `persona-cards` | User type cards with Material icon, label, description in a vertical list | **Yes** |
| 5 | `stats` | Big numbers with labels | **Yes** |
| 6 | `steps` | Descriptive process flow with centered heading + code terminal block | **Yes** |
| 7 | `code-block` | Syntax-highlighted code example in terminal UI frame | No (standard fenced code block, but with terminal styling) |
| 8 | `tool-icons` | Row of tool/IDE icons with labels (e.g., Works Everywhere: VS Code, Rider, VS) | **Yes** |
| 9 | `highlight-card` | Gradient background card with icon, title, description (e.g., AI-Ready Development) | **Yes** |
| 10 | `certification-grid` | Badge/compliance standard cards | **Yes** |
| 11 | `cta` | Call-to-action banner with heading + buttons | **Yes** |
| 12 | `related-projects` | Link cards to other projects | **Yes** |
| 13 | `resource-card` | Download/document card with metadata | **Yes** |
| 14 | `feature-block` | Heading + grouped sub-features with descriptions | **Yes** |
| 15 | `summary` | Two-column layout: large headline left, description right, on tinted background | **Yes** |

**12 shortcodes to create total.** But only 7 are needed for the devcontainer-toolbox page:
`feature-grid`, `steps`, `persona-cards`, `tool-icons`, `highlight-card`, `summary`, `cta`

> **Note on `checklist` → `tool-icons`**: The original investigation assumed "Works Everywhere" would be a checklist with checkmarks. The actual Stitch HTML renders it as a row of Material icons with labels (VS Code, Rider, Visual Studio). Renamed to `tool-icons` to match the actual design. A `checklist` shortcode may still be needed for other projects.

> **Note on `highlight-card`**: The Stitch design includes a purple gradient card for "AI-Ready Development" (`bg-gradient-to-br from-tertiary to-tertiary-container`). This is a distinct visual treatment not covered by other section types.

## Proposed JSON Structure

### Current (flat body)

```json
{
  "identifier": "devcontainer-toolbox",
  "name": "DevContainer Toolbox",
  "description": "Cloud-based IDEs like GitHub Codespaces...",
  "abstract": "A standardized, cross-platform development environment...",
  "summary": "A pre-configured development container...",
  "body": "## The Onboarding Problem\n\nNew developer joins Monday...\n\n## What's Included\n\n| Languages | Tools |\n...",
  "image": "devcontainer-toolbox.png",
  "topics": ["cybersecurity"],
  "tags": ["devcontainer", "docker"],
  "audience": ["developer", "it-ops"],
  "project": { "status": "active", "repository": "..." }
}
```

### Proposed (sections array)

```json
{
  "identifier": "devcontainer-toolbox",
  "name": "DevContainer Toolbox",
  "description": "Cloud-based IDEs like GitHub Codespaces...",
  "abstract": "A standardized, cross-platform development environment...",
  "image": "devcontainer-toolbox.png",
  "topics": ["cybersecurity"],
  "tags": ["devcontainer", "docker"],
  "audience": ["developer", "it-ops"],
  "project": { "status": "active", "repository": "..." },

  "sections": [
    {
      "type": "summary",
      "headline": "A standardized, cross-platform development environment for fast, reliable onboarding and consistent delivery",
      "description": "A pre-configured development container providing all tools, libraries, and runtime dependencies required to build software—works identically on Windows, macOS, and Linux."
    },
    {
      "type": "markdown",
      "body": "## The Onboarding Problem\n\nNew developer joins Monday. Spends the entire first week installing tools, debugging environment issues, and asking colleagues why their build doesn't work. External consultants? Multiply that by the time it takes to get VPN access, security approvals, and the right tool versions.\n\nWith DevContainer Toolbox, a new developer is productive in minutes. Open the project in VS Code, wait for the container to build, start coding. No setup guide. No OS-specific troubleshooting. No 'it works on my machine.'"
    },
    {
      "type": "steps",
      "title": "How It Works",
      "description": "The entire development environment is defined as code and version-controlled alongside your application source. When a developer checks out a repository, they get not only the code, but also the exact tools, runtimes, and configurations required to build, run, debug, and test it.",
      "code": {
        "language": "bash",
        "label": "bash — install.sh",
        "command": "curl -fsSL https://raw.githubusercontent.com/helpers-no/devcontainer-toolbox/main/install.sh | bash"
      }
    },
    {
      "type": "feature-grid",
      "title": "What's Included",
      "columns": [
        {
          "icon": "code",
          "title": "Languages",
          "color": "primary",
          "items": ["Python", "TypeScript", "Go", "C#/.NET", "Java", "Rust", "PHP", "Fortran", "Laravel"]
        },
        {
          "icon": "construction",
          "title": "Tools & Frameworks",
          "color": "secondary",
          "items": ["Azure CLI", "Kubernetes", "Terraform", "Docker", "Git", "Node.js", "Nginx", "PowerShell", "Databricks"]
        }
      ]
    },
    {
      "type": "highlight-card",
      "icon": "psychology",
      "title": "AI-Ready Development",
      "description": "Run AI coding assistants like Claude Code safely inside the container — they can access project files but not your host system. Full AI-powered development without the security risk.",
      "style": "tertiary"
    },
    {
      "type": "tool-icons",
      "title": "Works Everywhere",
      "description": "Identical experience on Windows, macOS, and Linux with:",
      "items": [
        { "icon": "terminal", "label": "Visual Studio Code" },
        { "icon": "developer_mode_tv", "label": "JetBrains Rider" },
        { "icon": "window", "label": "Visual Studio" }
      ]
    },
    {
      "type": "persona-cards",
      "title": "Who Benefits",
      "items": [
        { "icon": "person_add", "label": "New developers", "description": "Productive on day one, not day five." },
        { "icon": "assignment_ind", "label": "External consultants", "description": "Work in a controlled, compliant environment without touching their host machine." },
        { "icon": "history", "label": "Teams inheriting code", "description": "Taking over a project from another team or vendor? The devcontainer has the complete environment. No reverse-engineering build steps, no guessing which tool versions they used. Open the project, it just works." },
        { "icon": "leaderboard", "label": "Team leads", "description": "Scale the team without scaling setup overhead." },
        { "icon": "verified_user", "label": "Security teams", "description": "Pinned tool versions, auditable dependencies, nothing installed on host." }
      ]
    }
  ]
}
```

### Fields that change

| Field | Change |
|-------|--------|
| `name`, `description`, `abstract`, `image` | No change — drives hero + metadata |
| `topics`, `tags`, `audience` | No change — drives sidebar/chips |
| `project.*` | No change — drives status/links |
| `summary` | Can be removed — was only used as body intro paragraph |
| `body` | **Replaced by `sections`** |
| `shortcodes` | **Replaced by `sections`** (sections *are* the shortcodes) |

## Generated Markdown Output

The generator script would produce this from the sections array:

```markdown
---
title: "DevContainer Toolbox"
identifier: "devcontainer-toolbox"
weight: 20
date: 2024-01-01
description: "Cloud-based IDEs like GitHub Codespaces..."
summary: "A standardized, cross-platform development environment..."
status: "active"
repository: "https://github.com/helpers-no/devcontainer-toolbox"
documentation: "https://dct.sovereignsky.no/"
topics:
  - "cybersecurity"
tags:
  - "devcontainer"
showHero: true
heroStyle: "big"
layout: "single"
type: "sovereignsky"
---

{{< summary id="summary" >}}
{"headline":"A standardized, cross-platform...","description":"A pre-configured..."}
{{< /summary >}}

## The Onboarding Problem

New developer joins Monday...

{{< steps id="how-it-works" >}}
{"title":"How It Works","description":"The entire development...","code":{"language":"bash","label":"bash — install.sh","command":"curl -fsSL ..."}}
{{< /steps >}}

{{< feature-grid id="whats-included" >}}
{"title":"What's Included","columns":[{"icon":"code","title":"Languages","color":"primary","items":["Python","TypeScript",...]},{"icon":"construction","title":"Tools & Frameworks","color":"secondary","items":["Azure CLI",...]}]}
{{< /feature-grid >}}

{{< highlight-card id="ai-ready" >}}
{"icon":"psychology","title":"AI-Ready Development","description":"Run AI coding assistants...","style":"tertiary"}
{{< /highlight-card >}}

{{< tool-icons id="works-everywhere" >}}
{"title":"Works Everywhere","description":"Identical experience...","items":[{"icon":"terminal","label":"Visual Studio Code"},{"icon":"developer_mode_tv","label":"JetBrains Rider"},{"icon":"window","label":"Visual Studio"}]}
{{< /tool-icons >}}

{{< persona-cards id="who-benefits" >}}
{"title":"Who Benefits","items":[{"icon":"person_add","label":"New developers","description":"Productive on day one..."},...]}}
{{< /persona-cards >}}
```

> **Note on frontmatter `summary`**: The `summary` field in frontmatter is populated from the JSON `abstract` field (used by Hugo for SEO/listing excerpts). This is separate from the `summary` *section type* which is a visual two-column layout. The JSON `summary` field is removed; `abstract` takes its role in frontmatter.

`type: "markdown"` sections become plain markdown. All other types become Hugo shortcodes with JSON config inside. Hugo processes the shortcodes via templates in `layouts/shortcodes/`.

## Implementation Scope

### What needs to change

1. **`data/sovereignsky/projects.json`** — Add `sections` array to projects (can coexist with `body` during migration)
2. **`scripts/generate-sovereignsky-pages.js`** — Update `buildBody()` to iterate sections and emit shortcodes
3. **`layouts/shortcodes/`** — Create 7 new shortcode templates (for devcontainer-toolbox):
   - `summary.html`
   - `feature-grid.html`
   - `steps.html`
   - `persona-cards.html`
   - `highlight-card.html`
   - `tool-icons.html`
   - `cta.html`
4. **`layouts/partials/extend-head.html`** — Add Material Symbols Outlined font
5. **`assets/css/custom.css`** — Styling for the new shortcodes, including Stitch color tokens mapped to CSS custom properties (see "CSS color strategy" below)
6. **`data/schemas/`** — Update JSON schema to validate sections array

### What stays the same

- `layouts/sovereignsky/single.html` — still renders `{{ .Content }}`, no change needed
- Hugo config — `unsafe: true` already enabled
- Frontmatter generation — no change to `generateFrontmatter()`
- Image handling — no change
- Projects without `sections` can keep using `body` (backward compatible)

### Migration strategy

1. Start with devcontainer-toolbox as pilot
2. Keep `body` field support — projects without `sections` still work
3. Generator checks: if `sections` exists, use it; else fall back to `body`
4. Convert other projects one at a time

## Shortcode Data Schemas

### summary

Two-column layout with large headline left and description right, on a tinted surface background.

```json
{
  "headline": "string (large text, left column)",
  "description": "string (body text, right column)"
}
```

Stitch CSS: `bg-surface-container-low py-20`, grid `md:grid-cols-2 gap-16`. Headline uses `text-3xl font-headline font-semibold`. Label "Summary" in `text-sm font-bold uppercase tracking-[0.2em] text-secondary`.

### feature-grid

Two-column split with icon header, title, and dot-item list per column. Each column can have its own accent color.

```json
{
  "title": "string",
  "columns": [
    {
      "icon": "string (Material Symbols name, e.g. 'code')",
      "title": "string",
      "color": "primary | secondary | tertiary (accent color for dots and icon)",
      "items": ["string"]
    }
  ]
}
```

Stitch CSS: `grid md:grid-cols-2 gap-px bg-outline-variant/20 rounded-2xl`. Each column has `bg-surface-container-lowest p-10`. Items are `grid grid-cols-2 gap-y-4` with colored dots (`w-1.5 h-1.5 rounded-full bg-{color}/40`).

### steps

Centered heading with description paragraph, followed by a terminal-style code block.

```json
{
  "title": "string",
  "description": "string",
  "code": {
    "language": "string (e.g. 'bash')",
    "label": "string (terminal title bar text)",
    "command": "string (the command to display)"
  }
}
```

Stitch CSS: Dark terminal block with `bg-on-background rounded-2xl`. Title bar with dots and label. Code in `font-mono text-lg md:text-2xl text-blue-400`. Copy button on the right.

### persona-cards

Vertical list of persona items, each with a filled Material icon, bold label, and description.

```json
{
  "title": "string",
  "items": [
    {
      "icon": "string (Material Symbols name)",
      "label": "string",
      "description": "string"
    }
  ]
}
```

Stitch CSS: Each item is `flex gap-6 p-6 rounded-2xl` with `hover:bg-white` transition. Icons are `text-primary text-3xl` with `font-variation-settings: 'FILL' 1` (filled style).

### highlight-card

Gradient background card with icon, title, and description. Used for special callouts (e.g., "AI-Ready Development").

```json
{
  "icon": "string (Material Symbols name)",
  "title": "string",
  "description": "string",
  "style": "primary | secondary | tertiary (determines gradient colors)"
}
```

Stitch CSS: `p-10 rounded-[2rem] bg-gradient-to-br from-{style} to-{style}-container`. Text uses `text-on-{style}-container`. Icon uses `font-variation-settings: 'FILL' 1`.

### tool-icons

Row of tool/IDE icons with labels, inside a bordered container with title and description.

```json
{
  "title": "string",
  "description": "string (optional)",
  "items": [
    {
      "icon": "string (Material Symbols name)",
      "label": "string"
    }
  ]
}
```

Stitch CSS: Container `p-10 rounded-[2rem] bg-surface-container border border-outline-variant/30`. Items in `flex gap-6` with vertical `flex-col items-center gap-2`, separated by `w-px h-12 bg-outline-variant/30` dividers.

### cta

```json
{
  "title": "string",
  "description": "string (optional)",
  "buttons": [
    {
      "label": "string",
      "url": "string",
      "style": "primary | secondary (default: primary)"
    }
  ]
}
```

### stats (future — for Infrastructure/Security pages)

```json
{
  "title": "string (optional)",
  "items": [
    {
      "value": "string (e.g. '142', '99.999%', '12ms')",
      "label": "string",
      "description": "string (optional)"
    }
  ]
}
```

### certification-grid (future)

```json
{
  "title": "string",
  "items": [
    {
      "name": "string (e.g. 'GDPR')",
      "label": "string (e.g. 'European Privacy')",
      "icon": "string (optional)"
    }
  ]
}
```

### resource-card (future)

```json
{
  "title": "string",
  "description": "string",
  "metadata": {
    "format": "string (e.g. 'PDF')",
    "size": "string (e.g. '14.8 MB')",
    "version": "string",
    "updated": "string (date)"
  },
  "url": "string"
}
```

### feature-block (future)

```json
{
  "title": "string",
  "description": "string",
  "features": [
    {
      "title": "string",
      "description": "string"
    }
  ]
}
```

### related-projects (future)

```json
{
  "title": "string (optional, default: 'Related Projects')",
  "items": [
    {
      "identifier": "string (project identifier)",
      "label": "string (optional override)",
      "description": "string (optional override)"
    }
  ]
}
```

## Architectural Decision: Keep Blowfish

**Decision**: Keep the Blowfish theme. The section-based design only changes the content area inside `{{ .Content }}` on project pages.

### What Blowfish provides (not worth rebuilding)

| Feature | Used by |
|---|---|
| Dark mode toggle + persistence | Entire site |
| Site search | Entire site |
| Base layout (header, nav, footer) | Every page |
| Tailwind CSS (pre-compiled) | All templates and shortcodes |
| Hero image system with blur | Project + blog pages |
| Breadcrumbs, pagination, related articles | All content pages |
| SEO (schema.org, sitemap, RSS) | Entire site |
| Code copy buttons, accessibility | Entire site |

Removing Blowfish would require weeks of rebuilding these features with no user-visible benefit.

### Where the new design lives

```
┌─────────────────────────────┐
│  Header / Nav    ← Blowfish │
├─────────────────────────────┤
│  Hero            ← Blowfish │
├─────────────────────────────┤
│                             │
│  Content area    ← NEW      │
│  (shortcodes with           │
│   scoped design tokens)     │
│                             │
├─────────────────────────────┤
│  Footer          ← Blowfish │
└─────────────────────────────┘
```

All 112 custom partials, 28 existing shortcodes, and all non-project pages (blog, laws, datacenters, networks, etc.) are untouched.

### CSS color strategy: Bridging Stitch and Blowfish

**The problem**: The Stitch HTML uses Tailwind color classes like `bg-surface-container-low`, `text-on-surface-variant`, `bg-primary`, `border-outline-variant/20`. These are custom colors defined in Stitch's Tailwind config. Blowfish has its *own* Tailwind config with different color names (`--color-primary-600`, `--color-neutral-400`). We can't use Stitch's class names directly in Hugo shortcodes because Blowfish's Tailwind build doesn't know them.

**Solution**: Define the Stitch colors as CSS custom properties in `assets/css/custom.css`, scoped inside `.section-design`. Then use those properties in shortcode HTML via inline styles or utility classes.

```css
.section-design {
  --sd-primary: #0058be;
  --sd-primary-container: #2170e4;
  --sd-secondary: #006c49;
  --sd-tertiary: #6b38d4;
  --sd-tertiary-container: #8455ef;
  --sd-surface: #faf8ff;
  --sd-surface-container: #eaedff;
  --sd-surface-container-low: #f2f3ff;
  --sd-surface-container-lowest: #ffffff;
  --sd-surface-container-high: #e2e7ff;
  --sd-on-surface: #131b2e;
  --sd-on-surface-variant: #424754;
  --sd-on-primary: #ffffff;
  --sd-outline-variant: #c2c6d6;
}

/* Dark mode overrides (adjust values for dark backgrounds) */
.dark .section-design {
  --sd-surface: #1a1b2e;
  --sd-surface-container-low: #222336;
  /* ... etc */
}
```

In shortcode HTML, use these as: `style="background-color: var(--sd-surface-container-low)"` or define utility classes in custom.css like `.sd-bg-surface-low { background-color: var(--sd-surface-container-low); }`.

**Why not just use Blowfish colors?** The Stitch design uses a specific surface-container hierarchy (lowest → low → base → high → highest) that creates the "tonal layering" effect. Blowfish doesn't have equivalent graduated surface colors. Mapping to Blowfish's `neutral-100/200/300` would lose the design intent.

**Why not extend Blowfish's Tailwind config?** Blowfish pre-compiles its Tailwind CSS. Adding custom colors to the Tailwind config would require modifying the theme's build process. CSS custom properties in `custom.css` work without touching the theme build.

### Why scoping prevents conflicts

All Stitch design tokens use the `--sd-` prefix (e.g., `--sd-primary` vs Blowfish's `--color-primary-600`). Wrapping shortcode HTML in a `.section-design` container means tokens only exist inside that scope. The rest of the site is completely unaffected.

### Implementation is incremental — nothing breaks

1. Create shortcode templates → nothing uses them yet, no impact
2. Update generator to handle `sections` array → falls back to `body`, existing projects unchanged
3. Add `sections` to devcontainer-toolbox JSON → only that page changes
4. Style shortcodes → only pages using new shortcodes affected
5. Convert next project when ready

You can even start step 3 with a single `"type": "markdown"` section containing the entire current body — identical output to today. Then break out sections one at a time.

## Questions — Resolved

1. **Icon system**: Use **Material Symbols Outlined** (Google web font). This matches what Stitch generates in its HTML output. The icons are loaded via `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined..." />` and used as `<span class="material-symbols-outlined">icon_name</span>`. The React reference uses Lucide, but Stitch's actual HTML uses Material Symbols — we follow Stitch since that's the design source of truth. Material Symbols also has a larger icon set and supports fill/weight variations via `font-variation-settings`.
2. **Backward compatibility**: Keep `body` and `sections` support permanently. Generator falls back to `body` if no `sections` array. No reason to force-migrate every project.
3. **Shortcode styling**: Use Blowfish's existing color variables first (Phase 1). Optionally introduce Stitch design tokens later (Phase 2). See "Architectural Decision: Keep Blowfish" section.
4. **Theme dependency**: Keep Blowfish. Only the content area changes. See "Architectural Decision: Keep Blowfish" section.

## Questions — Deferred to Implementation

1. **JSON schema validation**: Add schema validation for the sections array after the first shortcode works. Not a blocker.
2. **Which project next**: Decide after devcontainer-toolbox pilot is complete.

## Implementation Plans

The investigation results in **14 plans**: one foundation plan that establishes the pattern, then one plan per content type.

### PLAN 1: Foundation — ✅ COMPLETED 2026-03-22

Established the section-based design system. Originally scoped as devcontainer-toolbox pilot, expanded to all 11 projects during implementation.

- Generator supports `sections` array with `body` fallback
- 7 shortcode templates created (summary, feature-grid, steps, persona-cards, highlight-card, tool-icons, cta)
- Material Symbols Outlined font + Space Grotesk + Inter loaded
- Stitch CSS tokens as `--sd-*` custom properties scoped under `.section-design` with dark mode
- All 11 projects restructured with designed sections (Plan 2 merged into Plan 1)
- `humanitarian-tools` renamed to `refugee-id` with expanded content
- JSON schema updated to validate `sections` array
- Consistent patterns: Problem → tertiary highlight-card, Solution → primary highlight-card or steps

See: `docs/plans/completed/PLAN-section-design-foundation.md`

### PLAN 1.5: Page-Level Redesign — ✅ COMPLETED 2026-03-23

Hero, sidebar removal, full-width layout, footer, nav fonts, image naming, side-by-side layouts. Remaining polish (dark mode, responsive, nav styling) in `PLAN-page-level-polish.md`.

See: `docs/plans/completed/PLAN-page-level-redesign.md`

### PLAN 2: ~~sovereignsky (remaining projects)~~ — ✅ MERGED INTO PLAN 1

All 11 sovereignsky projects converted to sections during Plan 1 implementation.

### PLAN 3-14: One plan per content type

Each plan decides what sections that content type needs, which new shortcodes to build, and converts the data.

| Plan | Content type | Generator script | Existing shortcodes | May need new shortcodes |
|---|---|---|---|---|
| 3 | **blog** | `generate-blog-pages.js` | — | `author-card`, `related-posts` |
| 4 | **laws** | `generate-laws-pages.js` | `laws-list`, `jurisdiction-laws` | `relationship-map`, `conflict-card` |
| 5 | **publications** | `generate-publications-pages.js` | — | `citation-card`, `resource-card` |
| 6 | **networks** | `generate-network-pages.js` | `network-map`, `network-data`, `network-actors`, `network-connection-map` | May not need sections — already has rich shortcodes |
| 7 | **datacenters** | `generate-datacenters-pages.js` | `datacenter-map`, `datacenter-providers`, `datacenter-risk-assessment`, +4 more | May not need sections — already has rich shortcodes |
| 8 | **events** | `generate-events-pages.js` | `events` | **✅ COMPLETED** — `PLAN-events-redesign.md`. Template-level redesign with Stitch hero, stat cards, filters, featured/compact cards, bento single page. |
| 9 | **software** | `generate-software-pages.js` | — | `comparison-table`, `risk-badge` |
| 10 | **blocs** | `generate-blocs-pages.js` | `bloc-cards`, `bloc-member-map` | `member-list` |
| 11 | **countries/regions** | `generate-countries-pages.js` | Shares datacenter + jurisdiction shortcodes | Shares with Plan 7 and 12 |
| 12 | **jurisdictions** | `generate-jurisdictions-pages.js` | `jurisdiction-laws`, `jurisdiction-map` | Shares with Plan 4 and 10 |
| 13 | **personas** | `generate-persona-pages.js` | — | `persona-profile` |
| 14 | **datacenter-countries** | `generate-datacenter-country-pages.js` | Shares datacenter shortcodes | Shares with Plan 7 |

### Notes

- **Plan 8 (events)** has its own plan: `PLAN-events-redesign.md`. It's a template-level redesign (not section-based) with Stitch designs for both list and single pages.
- Plans 6, 7, 11, 12, 14 already have rich data-driven shortcodes. They may only need minor updates, or may not need the section treatment at all.
- Plans 11/12/14 share shortcodes with Plans 4, 7, 10 — they should be planned together.
- Each plan is independent and can be done in any order after Plan 1.
- Not all content types may benefit from sections — some may stay with flat `body` markdown.
- Some content types (like events) benefit more from template-level redesign than section-based JSON. The approach depends on the page type: list pages → template redesign, content pages → sections in JSON.

## Lessons Learned (from Plan 1 implementation)

1. **Hugo `ZgotmplZ` escaping**: Hugo's context-aware escaping replaces template variables used in `style=""` attributes with `ZgotmplZ`. Fix: use CSS classes instead of inline styles for dynamic colors (e.g., `.sd-highlight-tertiary` instead of `style="background: {{ $color }}"`).

2. **TOC must be disabled**: Section-based pages only have markdown headings in `type: "markdown"` sections. Shortcode headings don't appear in Hugo's `.TableOfContents`. Added `showTableOfContents: false` to frontmatter for section-based pages.

3. **Problem/Solution pattern**: All problem statements work best as `highlight-card` with `style: "tertiary"` (purple). Solution statements use either `steps` (when there's a code block) or `highlight-card` with `style: "primary"` (blue). This gives visual consistency across all projects.

4. **CSS custom properties work well**: Defining Stitch colors as `--sd-*` properties in `custom.css` avoids modifying Blowfish's Tailwind build. Scoping under `.section-design` prevents conflicts. Dark mode overrides with `.dark .section-design` work correctly.

5. **`body` fallback is no longer needed**: All 11 projects were converted to sections during Plan 1. The fallback code remains in the generator for safety but no project uses `body` anymore.

6. **Material Symbols icon validation**: Not all icon names are valid. `distinguished_service` was not a real Material Symbols icon and rendered as broken text. Always verify icon names exist at https://fonts.google.com/icons.

## Next Steps

- [x] Create PLAN-section-design-foundation.md (Plan 1) — done
- [x] Fetch Stitch HTML via MCP and document reference patterns — done 2026-03-22
- [x] Implement Plan 1 with devcontainer-toolbox as pilot — completed 2026-03-22
- [x] Expand Plan 1 to all 11 projects — completed 2026-03-22
- [x] Review result against Stitch mockups — content sections match, page-level elements deferred
- [x] Create PLAN-page-level-redesign.md (hero + sidebar + content width) — done 2026-03-22
- [x] Implement PLAN-page-level-redesign.md — completed 2026-03-23
- [x] Create component library in Stitch — done 2026-03-24
- [x] Create docs/SHORTCODES.md reference — done 2026-03-24
- [ ] Create per-content-type plans as needed (Plans 3-14)

## Related Documentation

- **[docs/DATA-PIPELINE.md](../../DATA-PIPELINE.md)** — Full architecture of the JSON → Markdown → HTML pipeline with mermaid diagrams

## Related Files

- `data/sovereignsky/projects.json` — Data source
- `scripts/generate-sovereignsky-pages.js` — Generator script (buildBody function)
- `layouts/sovereignsky/single.html` — Page template
- `layouts/shortcodes/` — Existing shortcodes (31 files)
- `assets/css/custom.css` — Custom styling
- `data/schemas/sovereignsky-projects.schema.json` — JSON schema

## Related Stitch Projects

### SovereignSky Landing Page (primary — project pages design)

- **Browser**: https://stitch.withgoogle.com/projects/3224991992411328938?pli=1
- **MCP**: `mcp__stitch__get_screen` / `mcp__stitch__list_screens` with projectId `3224991992411328938`
- Contains: DevContainer Toolbox designs, Infrastructure page, Security page, Landing page
- Key screens for devcontainer-toolbox:
  - `c22705059e01440480b8875e0051dd29` — "DevContainer Toolbox Design"
  - `c43b1a7cb46843fdbf37ce1205e0918e` — "DevContainer Toolbox - Final Verified Content"
  - `c1a67003d32346b9bde3354fb81bf246` — "DevContainer Toolbox - Accurate Content Redesign"

### Urbalurba Infrastructure Modern Design (secondary — mobile/alternative design)

- **Browser**: https://stitch.withgoogle.com/projects/16633136270964871564?pli=1
- **MCP**: `mcp__stitch__get_screen` / `mcp__stitch__list_screens` with projectId `16633136270964871564`
- Contains: Mobile-first design explorations, alternative layout approaches

## Reference Implementation: Stitch HTML (Primary)

The actual Stitch-generated HTML was fetched via MCP on 2026-03-22. This is the **primary reference** for shortcode implementation — it contains the exact HTML structure, Tailwind classes, and design patterns to replicate.

### How to fetch

```
mcp__stitch__get_screen with:
  name: "projects/3224991992411328938/screens/c43b1a7cb46843fdbf37ce1205e0918e"
  projectId: "3224991992411328938"
  screenId: "c43b1a7cb46843fdbf37ce1205e0918e"
```

Then download the HTML from the `htmlCode.downloadUrl` field.

### Screen: "DevContainer Toolbox - Final Verified Content"

378 lines of HTML. Key sections and their line ranges:

| Section | Lines | Stitch CSS Pattern |
|---|---|---|
| Tailwind config (color tokens) | 11-73 | Full design system colors as Tailwind `extend.colors` |
| Hero | 99-149 | 12-col grid, gradient CTA, terminal code preview |
| Summary | 151-167 | `bg-surface-container-low`, 2-col grid |
| Onboarding Problem + Sidebar | 170-222 | 8/4 col split, sticky sidebar with metadata |
| How It Works (terminal block) | 224-247 | Dark `bg-on-background` terminal with copy button |
| What's Included (feature grid) | 249-287 | 2-col split, dot-items, `editorial-shadow` |
| AI-Ready (highlight card) | 291-299 | `from-tertiary to-tertiary-container` gradient |
| Works Everywhere (tool icons) | 300-319 | Icon row with `w-px` dividers |
| Who Benefits (persona cards) | 321-360 | Vertical list with filled icons, hover states |

### Key CSS patterns from Stitch

```css
/* Dot pattern background for hero */
.bg-grid-pattern {
  background-image: radial-gradient(circle, #0058be15 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Ambient shadow (replaces standard box-shadow) */
.editorial-shadow { box-shadow: 0 12px 40px rgba(0, 31, 38, 0.04); }

/* Ghost borders */
border border-outline-variant/20

/* Material Symbols with fill */
font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24
```

### Icon system: Material Symbols Outlined

Stitch HTML loads Material Symbols as a web font. Icons used in the devcontainer-toolbox design:

| Icon name | Used in | Filled? |
|---|---|---|
| `security` | Hero tag | Yes |
| `arrow_forward` | CTA button | No |
| `code` | Languages header | No |
| `construction` | Tools header | No |
| `psychology` | AI-Ready card | Yes |
| `terminal` | VS Code icon | No |
| `developer_mode_tv` | Rider icon | No |
| `window` | Visual Studio icon | No |
| `content_copy` | Copy button | No |
| `person_add` | New developers | Yes |
| `assignment_ind` | Consultants | Yes |
| `history` | Teams inheriting | Yes |
| `leaderboard` | Team leads | Yes |
| `verified_user` | Security teams | Yes |

### Fonts

Stitch HTML loads: **Space Grotesk** (headlines) + **Inter** (body/labels). The Stitch project metadata says Plus Jakarta Sans, but the generated HTML actually uses Space Grotesk. Follow the HTML.

---

## Reference Implementation: React/TypeScript from AI Studio

The Stitch design was exported to Google AI Studio, which generated a working React/TypeScript implementation:

- **Repository**: https://github.com/terchris/aistudio-sovereignsky
- **Stack**: Vite + React 19 + Tailwind CSS 4 + Framer Motion + Lucide React icons
- **Key file**: `src/App.tsx` — single file with all section components

### Component-to-Section Type Mapping

| React Component | Section Type | What it renders |
|---|---|---|
| `Hero` | `hero` (frontmatter) | Headline, description, CTA buttons, code snippet visual |
| `Summary` | `summary` or `markdown` | Abstract + summary in two-column layout |
| `OnboardingProblem` | `markdown` + sidebar | Narrative text with sticky metadata sidebar (status, tags, related) |
| `HowItWorks` | `code-block` | Install command with copy button in terminal UI |
| `WhatsIncluded` | `feature-grid` | Two-column grid: Languages list + Tools list |
| `Benefits` | `persona-cards` + `checklist` | AI-ready highlight card, IDE icons, 5 persona cards with icons |

### Design Tokens (from `src/index.css`)

The CSS defines the full Stitch design system as Tailwind theme variables:

```css
--color-primary: #0058be;
--color-primary-container: #2170e4;
--color-secondary: #006c49;
--color-tertiary: #6b38d4;
--color-surface: #f0fbff;
--color-surface-container: #d0f4ff;
--color-surface-container-low: #e0f8ff;
--color-surface-container-highest: #acedff;
--color-on-surface: #001f26;
--color-on-surface-variant: #424754;
--color-outline-variant: #c2c6d6;
--font-headline: "Space Grotesk";
--font-body: "Inter";
```

### What to Extract for Hugo Shortcodes

The React components are a **direct blueprint** for the Hugo shortcode HTML/CSS:

1. **HTML structure**: Each React component's JSX translates to the shortcode's HTML template
2. **Tailwind classes**: Can be reused as-is in Hugo shortcodes (site already uses Tailwind via Blowfish)
3. **Color tokens**: Need to be added to `assets/css/custom.css` or Tailwind config
4. **Icons**: React app uses Lucide React; Hugo shortcodes can use inline SVGs from Lucide or the existing icon system
5. **Animations**: Framer Motion effects (fade-in on scroll) can be replicated with CSS `@keyframes` + `IntersectionObserver`, or skipped initially

### Key Differences from Hugo Site

| Aspect | React App | Hugo Site |
|---|---|---|
| Icons | Lucide React components | Blowfish icon set or inline SVG |
| Animations | Framer Motion | CSS animations or none |
| Tailwind version | v4 (CSS-based config) | v3 (via Blowfish, JS-based config) |
| Color system | Custom Stitch tokens | Blowfish theme defaults |
| Fonts | Space Grotesk + Inter (Google Fonts) | Blowfish default fonts |

The Tailwind version mismatch (v4 vs v3) means class names are compatible but the theme configuration approach differs. Color tokens will need to be mapped to CSS custom properties or Tailwind config extensions on the Hugo side.
