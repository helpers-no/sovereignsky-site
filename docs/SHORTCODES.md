# Shortcode Reference

Reusable design components for sovereignsky project pages. Each shortcode maps to a section type in `projects.json`.

**Visual reference**: See the "SovereignSky Component Library" screen in the [Stitch project](https://stitch.withgoogle.com/projects/3224991992411328938).

---

## How It Works

```
projects.json (sections array)
  → generate-sovereignsky-pages.js (renders shortcodes)
    → content/{project}/index.md (Hugo shortcode calls)
      → layouts/shortcodes/{type}.html (HTML templates)
        → Rendered page
```

Each project has a `sections` array. The generator turns each section into either raw markdown (`type: "markdown"`) or a Hugo shortcode call (`type: "feature-grid"`, etc.).

---

## Section Types

### summary

Two-column layout with large headline left and description right. Tinted background. Used at the top of every project page after the hero.

**JSON:**
```json
{
  "type": "summary",
  "headline": "A standardized, cross-platform development environment",
  "description": "Pre-configured container providing all tools and dependencies."
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `headline` | Yes | Large bold text (left column) |
| `description` | No | Body text (right column) |

**Template:** `layouts/shortcodes/summary.html`

---

### highlight-card

Gradient background card with icon, title, and description. Three style variants for different purposes.

**JSON:**
```json
{
  "type": "highlight-card",
  "icon": "error_outline",
  "title": "The Problem",
  "description": "New developer joins Monday...",
  "style": "tertiary"
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `icon` | No | Material Symbols icon name |
| `title` | Yes | Bold heading |
| `description` | Yes | Body text |
| `style` | No | `"primary"` (blue), `"secondary"` (green), `"tertiary"` (purple). Default: primary |

**Style conventions:**
| Style | Color | Use for |
|-------|-------|---------|
| `tertiary` | Purple | Problem statements, challenges, warnings |
| `primary` | Blue | Solutions, capabilities, status updates |
| `secondary` | Green | Real-world examples, success stories |

**Template:** `layouts/shortcodes/highlight-card.html`

---

### feature-grid

Multi-column split with icon headers and dot-item lists. Each column has its own accent color.

**JSON:**
```json
{
  "type": "feature-grid",
  "title": "What's Included",
  "columns": [
    {
      "icon": "code",
      "title": "Languages",
      "color": "primary",
      "items": ["Python", "TypeScript", "Go"]
    },
    {
      "icon": "construction",
      "title": "Tools & Frameworks",
      "color": "secondary",
      "items": ["Docker", "Kubernetes", "Terraform"]
    }
  ]
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Centered heading above the grid |
| `columns` | Yes | Array of column objects |
| `columns[].icon` | Yes | Material Symbols icon name |
| `columns[].title` | Yes | Uppercase column header |
| `columns[].color` | No | `"primary"` (blue dots), `"secondary"` (green), `"tertiary"` (purple). Default: primary |
| `columns[].items` | Yes | Array of strings |

**Template:** `layouts/shortcodes/feature-grid.html`

---

### steps

Centered heading with description paragraph, followed by a terminal-style code block. Used for "How It Works" sections with install commands.

**JSON:**
```json
{
  "type": "steps",
  "title": "How It Works",
  "description": "The entire development environment is defined as code...",
  "code": {
    "language": "bash",
    "label": "bash — install.sh",
    "command": "curl -fsSL https://example.com/install.sh | bash"
  }
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Centered heading |
| `description` | No | Centered paragraph below heading |
| `code` | No | Terminal block object |
| `code.language` | No | Language label (not used for syntax highlighting) |
| `code.label` | No | Text in terminal title bar (e.g., "bash — install.sh") |
| `code.command` | Yes | The command to display in monospace |

**Template:** `layouts/shortcodes/steps.html`

---

### persona-cards

Vertical list of items with filled Material icons. Used for "Who Benefits", "Components", or any list of people/things with descriptions.

**JSON:**
```json
{
  "type": "persona-cards",
  "title": "Who Benefits",
  "items": [
    {
      "icon": "person_add",
      "label": "New developers",
      "description": "Productive on day one, not day five."
    },
    {
      "icon": "verified_user",
      "label": "Security teams",
      "description": "Pinned tool versions, auditable dependencies."
    }
  ]
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Heading above the list |
| `items` | Yes | Array of card objects |
| `items[].icon` | Yes | Material Symbols icon name (rendered as filled) |
| `items[].label` | Yes | Bold title |
| `items[].description` | Yes | Body text |

**Template:** `layouts/shortcodes/persona-cards.html`

---

### tool-icons

Row of icons with labels in a bordered container. Used for showing supported tools, platforms, or IDEs.

**JSON:**
```json
{
  "type": "tool-icons",
  "title": "Works Everywhere",
  "description": "Identical experience on Windows, macOS, and Linux with:",
  "items": [
    { "icon": "terminal", "label": "Visual Studio Code" },
    { "icon": "developer_mode_tv", "label": "JetBrains Rider" },
    { "icon": "window", "label": "Visual Studio" }
  ]
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Heading inside the container |
| `description` | No | Subtitle text |
| `items` | Yes | Array of icon objects |
| `items[].icon` | Yes | Material Symbols icon name |
| `items[].label` | Yes | Tiny uppercase label below icon |

**Template:** `layouts/shortcodes/tool-icons.html`

---

### cta

Full-width gradient banner with heading, description, and buttons. Used at the bottom of a page as a call to action.

**JSON:**
```json
{
  "type": "cta",
  "title": "Ready to build on sovereign infrastructure?",
  "description": "Full documentation at uis.sovereignsky.no",
  "buttons": [
    { "label": "Documentation", "url": "https://uis.sovereignsky.no/" },
    { "label": "View Repository", "url": "https://github.com/...", "style": "secondary" }
  ]
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Large white heading |
| `description` | No | Subtitle text |
| `buttons` | No | Array of button objects |
| `buttons[].label` | Yes | Button text |
| `buttons[].url` | Yes | Link URL |
| `buttons[].style` | No | `"secondary"` for ghost button. Default: solid white |

**Template:** `layouts/shortcodes/cta.html`

---

### side-by-side

Two-column layout that groups other components. Left and right each contain an array of component configs. Used for placing related sections next to each other (e.g., AI-Ready + Works Everywhere | Who Benefits).

**JSON:**
```json
{
  "type": "side-by-side",
  "left": [
    { "type": "highlight-card", "icon": "psychology", "title": "AI-Ready", "description": "...", "style": "tertiary" },
    { "type": "tool-icons", "title": "Works Everywhere", "items": [...] }
  ],
  "right": [
    { "type": "persona-cards", "title": "Who Benefits", "items": [...] }
  ]
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `left` | Yes | Array of component configs (rendered stacked in left column) |
| `right` | Yes | Array of component configs (rendered stacked in right column) |

**Supported inner types:** `highlight-card`, `tool-icons`, `persona-cards`, `feature-grid`

**Template:** `layouts/shortcodes/side-by-side.html`

---

### metadata-sidebar

Wraps content in a 2/3 + 1/3 grid with a sticky metadata card on the right. The metadata card automatically shows Topics, Tags, and Audience from the page's frontmatter. Not set manually in JSON — the generator inserts this automatically around the first `highlight-card` after the summary.

**Auto-generated by the generator. No JSON config needed.**

The metadata card contains:
- Topics (clickable, links to `/topics/{topic}/`)
- Tags (clickable, links to `/tags/{tag}/`)
- Audience (clickable, links to `/personas/{audience}/`)

**Template:** `layouts/shortcodes/metadata-sidebar.html`

---

### markdown

Plain markdown passthrough. Not a shortcode — the generator outputs the body as raw markdown. Used for content that doesn't need a designed component (e.g., complex tables, prose paragraphs with links).

**JSON:**
```json
{
  "type": "markdown",
  "body": "## Available Templates\n\n| Template | TypeScript | Python |\n..."
}
```

**Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `body` | Yes | Raw markdown string |

---

## Page-Level Components

These are not shortcodes but are part of the sovereignsky page design:

### Hero

Rendered by `layouts/partials/hero/sovereignsky.html`. Automatically shows:
- Tag badge (first topic)
- Title (from frontmatter)
- Description (from frontmatter)
- Status dot + date
- CTA buttons (conditional: repository, documentation, externalUrl)
- Square image/video from `imageSquare` field (if set)

### Footer

Rendered by `layouts/partials/sovereignsky-footer.html`. 4-column layout: SovereignSky, Platform, Resources, About.

---

## Icons

All icons use [Material Symbols Outlined](https://fonts.google.com/icons?icon.set=Material+Symbols). Use the icon name as a string (e.g., `"error_outline"`, `"check_circle"`, `"psychology"`).

Persona cards render icons as **filled** (`font-variation-settings: 'FILL' 1`). All other components use the outline style.

Verify icon names exist at https://fonts.google.com/icons before using them.

---

## Color Conventions

| Color | CSS Variable | Used for |
|-------|-------------|----------|
| Primary (blue) | `--sd-primary` / `#0058be` | CTAs, links, primary actions |
| Secondary (green) | `--sd-secondary` / `#006c49` | Success, operational status |
| Tertiary (purple) | `--sd-tertiary` / `#6b38d4` | Problems, warnings, deep-tech |

---

## Adding a New Component

1. Design it in Stitch (update the Component Library screen)
2. Create `layouts/shortcodes/{name}.html` template
3. Add the JSON schema to this document
4. Use CSS classes for dynamic colors (never use Hugo template variables in `style=""` attributes — causes `ZgotmplZ`)
5. If used inside `side-by-side`, add rendering support to `side-by-side.html`
6. Update `generate-sovereignsky-pages.js` if the new type needs special handling
