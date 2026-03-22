# Feature: Section-Based Design Foundation

## Status: Active

**Goal**: Establish the section-based design system and validate it with devcontainer-toolbox as pilot.

**GitHub Issue**: —

**Last Updated**: 2026-03-22

**Prerequisites**: None

**Blocks**: All per-content-type section design plans (Plans 2-14 in INVESTIGATE-section-based-design.md)

**Priority**: High

---

## Overview

Currently, project pages render flat markdown with uniform styling. This plan implements a `sections` array in JSON that maps to Hugo shortcodes, enabling visually distinct section designs (feature grids, persona cards, step flows, etc.) inspired by the Google Stitch mockups.

This is the foundation plan — it creates the infrastructure (generator changes, shortcode templates, CSS) and validates it end-to-end using devcontainer-toolbox as the pilot project. All other content types build on this foundation.

**Investigation**: [INVESTIGATE-section-based-design.md](INVESTIGATE-section-based-design.md)

**Design reference**: Stitch project `3224991992411328938` — fetch via `mcp__stitch__get_screen` or browse at https://stitch.withgoogle.com/projects/3224991992411328938

**Stitch HTML reference**: Screen `c43b1a7cb46843fdbf37ce1205e0918e` ("DevContainer Toolbox - Final Verified Content") — the primary implementation blueprint

**React reference** (secondary): https://github.com/terchris/aistudio-sovereignsky (`src/App.tsx`)

**Pipeline docs**: [docs/DATA-PIPELINE.md](../../DATA-PIPELINE.md)

---

## Phase 1: Update Generator Script

Add sections support to `generate-sovereignsky-pages.js` with backward compatibility.

### Tasks

- [x] 1.1 Add `buildSections(sections)` function that iterates sections array and emits markdown or shortcode per type
- [x] 1.2 `type: "markdown"` → output body as plain markdown
- [x] 1.3 `type: "code-block"` → output as fenced code block with language
- [x] 1.4 All other types → output as `{{< type id="..." >}}\n{json config}\n{{< /type >}}`
- [x] 1.5 Update `buildBody()` to check: if `sections` exists, call `buildSections()`; else use existing `body` + `shortcodes` logic
- [x] 1.6 Verify all existing projects still generate identical markdown (no regressions)

### Validation

```bash
# Save current generated output for comparison
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/')

# Generate pages
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-sovereignsky-pages.js"

# Verify no changes to existing project pages (only devcontainer-toolbox should differ after Phase 3)
git diff content/sovereignsky/
```

---

## Phase 2: Create Shortcode Templates

Build 7 shortcode templates using HTML structure from the **Stitch HTML reference** (screen `c43b1a7cb46843fdbf37ce1205e0918e`), styled with Blowfish color variables and DaisyUI classes.

### Tasks

- [x] 2.1 Create `layouts/shortcodes/summary.html` — two-column layout: large headline left, description right, on tinted background
- [x] 2.2 Create `layouts/shortcodes/feature-grid.html` — parses JSON config, renders 2-column split with icon headers and dot-item lists
- [x] 2.3 Create `layouts/shortcodes/steps.html` — parses JSON config, renders centered heading + description + terminal-style code block
- [x] 2.4 Create `layouts/shortcodes/persona-cards.html` — parses JSON config, renders vertical list of persona items with filled Material icons
- [x] 2.5 Create `layouts/shortcodes/highlight-card.html` — parses JSON config, renders gradient background card with icon, title, description
- [x] 2.6 Create `layouts/shortcodes/tool-icons.html` — parses JSON config, renders row of tool icons with labels in bordered container
- [x] 2.7 Create `layouts/shortcodes/cta.html` — parses JSON config, renders call-to-action banner with buttons
- [x] 2.8 Add Material Symbols Outlined font + Space Grotesk + Inter to `layouts/partials/extend-head.html`
- [x] 2.9 Add section design CSS to `assets/css/custom.css` — scoped under `.section-design` wrapper with `--sd-*` custom properties, including dark mode overrides and `.editorial-shadow`

### Validation

```bash
# Hugo builds without errors
docker exec $CONTAINER bash -c "cd /workspace && hugo --gc"

# Manual: create a test page with hardcoded shortcode calls to verify each shortcode renders correctly
```

---

## Phase 3: Convert devcontainer-toolbox to Sections

Replace the flat `body` field with a structured `sections` array in the JSON, then regenerate.

### Tasks

- [x] 3.1 In `data/sovereignsky/projects.json`, replace the devcontainer-toolbox `body` field with `sections` array (7 sections: summary, markdown, steps, feature-grid, highlight-card + tool-icons, persona-cards — as specified in the investigation file)
- [x] 3.2 Remove `summary` field from devcontainer-toolbox JSON (content moves into `summary` section type). Note: the frontmatter `summary` field should still be populated from `abstract` for Hugo SEO/listing excerpts.
- [x] 3.3 Keep all other fields unchanged (name, description, abstract, image, topics, tags, audience, project)
- [x] 3.4 Run generator: `node scripts/generate-sovereignsky-pages.js`
- [x] 3.5 Verify generated `content/sovereignsky/devcontainer-toolbox/index.md` contains correct frontmatter + shortcodes
- [x] 3.6 Verify all other project pages are unchanged

### Validation

```bash
# Regenerate
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-sovereignsky-pages.js"

# Verify devcontainer-toolbox has shortcodes
grep -c '{{<' content/sovereignsky/devcontainer-toolbox/index.md

# Verify other projects unchanged
git diff content/sovereignsky/ -- ':!content/sovereignsky/devcontainer-toolbox/'

# Hugo builds without errors
docker exec $CONTAINER bash -c "cd /workspace && hugo --gc"

# Validate JSON
docker exec $CONTAINER bash -c "cd /workspace && npm run validate"
```

---

## Phase 4: Visual Review and Polish

Compare the rendered page against the Stitch mockups and fix issues.

### Tasks

- [x] 4.1 Start Hugo server and open devcontainer-toolbox page
- [x] 4.2 Compare against Stitch screen — content sections match design
- [x] 4.3 Fix Hugo ZgotmplZ escaping (highlight-card, feature-grid) — moved dynamic colors to CSS classes
- [x] 4.4 Disable TOC on section-based pages (shortcode headings not in TOC)
- [x] 4.5 Convert all 10 remaining projects to sections format (markdown passthrough)
- [x] 4.6 Update JSON schema to allow `sections` array
- [x] 4.7 Validate: Hugo builds (967 pages), `npm run validate` passes (15/15)
- [ ] 4.8 Dark mode testing — deferred to hero+sidebar redesign plan
- [ ] 4.9 Mobile responsive testing — deferred to hero+sidebar redesign plan

### Validation

```bash
# Hugo server running
docker exec $CONTAINER bash -c "cd /workspace && hugo server -D --bind 0.0.0.0"

# Manual: visual review at http://localhost:1313/sovereignsky/devcontainer-toolbox/
# Manual: check desktop and mobile viewports
# Manual: toggle dark mode
```

---

## Acceptance Criteria

- [ ] Generator supports `sections` array and falls back to `body` for projects without it
- [ ] All 7 shortcodes render correctly (summary, feature-grid, steps, persona-cards, highlight-card, tool-icons, cta — note: cta is built but not used in DCT pilot; test with a manual example)
- [ ] devcontainer-toolbox page renders with designed sections
- [ ] All other project pages are unchanged (no regressions)
- [ ] Works on desktop (1280px)
- [ ] Works on mobile (375px)
- [ ] Dark mode works for all new sections
- [ ] `npm run validate` passes
- [ ] Hugo builds successfully without errors

---

## Implementation Notes

### Shortcode pattern

Each shortcode receives JSON config between opening and closing tags. Parse it with:

```html
{{ $config := .Inner | transform.Unmarshal }}
```

Then access fields like `{{ $config.title }}`, `{{ range $config.items }}`, etc.

### Icon approach

Use **Material Symbols Outlined** web font (same as Stitch HTML output). Load via Google Fonts in `extend-head.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

Use in shortcode HTML:
```html
<span class="material-symbols-outlined">{{ $icon }}</span>

<!-- For filled icons (persona cards) -->
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">{{ $icon }}</span>
```

No SVG mapping needed — the icon name string from JSON is used directly as the text content of the span.

### CSS scoping and color strategy

Wrap all shortcode output in a `.section-design` div. Define Stitch design tokens as CSS custom properties scoped to that class:

```css
.section-design {
  --sd-primary: #0058be;
  --sd-primary-container: #2170e4;
  --sd-secondary: #006c49;
  --sd-tertiary: #6b38d4;
  --sd-tertiary-container: #8455ef;
  --sd-surface: #faf8ff;
  --sd-surface-container-low: #f2f3ff;
  --sd-surface-container-lowest: #ffffff;
  --sd-on-surface: #131b2e;
  --sd-on-surface-variant: #424754;
  --sd-on-primary: #ffffff;
  --sd-outline-variant: #c2c6d6;
}
.dark .section-design {
  /* Dark mode overrides — TBD during Phase 4 */
}
```

**Why not Blowfish colors directly?** Stitch uses a surface-container hierarchy (lowest → low → base → high → highest) for tonal layering. Blowfish doesn't have equivalent graduated surface colors. Using CSS custom properties lets us replicate the exact Stitch design while keeping dark mode support.

**Why not extend Tailwind config?** Blowfish pre-compiles Tailwind. CSS custom properties in `custom.css` work without modifying the theme build.

In shortcode HTML, reference tokens as: `style="background-color: var(--sd-surface-container-low)"` or define utility classes like `.sd-bg-surface-low { background-color: var(--sd-surface-container-low); }`.

See the investigation file's "CSS color strategy" section for full details.

### Stitch HTML reference mapping (primary)

Use the Stitch HTML (screen `c43b1a7cb46843fdbf37ce1205e0918e`) as the primary blueprint. Fetch via Stitch MCP or download from the `htmlCode.downloadUrl`.

| Stitch Section | Shortcode | Lines in HTML |
|---|---|---|
| Summary (2-col layout) | `summary.html` | 151-167 |
| How It Works (terminal) | `steps.html` | 224-247 |
| What's Included (2-col split) | `feature-grid.html` | 249-287 |
| AI-Ready (gradient card) | `highlight-card.html` | 291-299 |
| Works Everywhere (icon row) | `tool-icons.html` | 300-319 |
| Who Benefits (persona list) | `persona-cards.html` | 321-360 |
| — | `cta.html` | (not in this screen, simple to build) |

### React reference (secondary)

The React app at https://github.com/terchris/aistudio-sovereignsky (`src/App.tsx`) provides an alternative reference but uses Lucide icons and Tailwind v4. Prefer the Stitch HTML for implementation.

### Backward compatibility

The generator must continue to work for projects that use `body` instead of `sections`. The check is simple:

```javascript
if (project.sections && project.sections.length > 0) {
  return buildSections(project.sections);
} else {
  return buildBody(project); // existing logic
}
```

## Files to Modify

- `scripts/generate-sovereignsky-pages.js` — Add sections support to buildBody()
- `data/sovereignsky/projects.json` — Replace devcontainer-toolbox body with sections
- `layouts/partials/extend-head.html` — Add Material Symbols Outlined font
- `layouts/shortcodes/summary.html` — **New file**
- `layouts/shortcodes/feature-grid.html` — **New file**
- `layouts/shortcodes/steps.html` — **New file**
- `layouts/shortcodes/persona-cards.html` — **New file**
- `layouts/shortcodes/highlight-card.html` — **New file**
- `layouts/shortcodes/tool-icons.html` — **New file**
- `layouts/shortcodes/cta.html` — **New file**
- `assets/css/custom.css` — Add section design styles (`.editorial-shadow`, `.bg-grid-pattern`)
