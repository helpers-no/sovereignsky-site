# Design Components Reference

All reusable design components across the SovereignSky site. Components follow the "Sovereign Resilience" design system from Stitch.

**Visual reference**: See the "SovereignSky Component Library" screen in the [Stitch project](https://stitch.withgoogle.com/projects/3224991992411328938).

**CSS tokens**: All components use `--sd-*` CSS custom properties scoped under `.section-design`. See `assets/css/custom.css`.

---

## Component Types

| Type | Used by | How it works |
|------|---------|-------------|
| **Shortcodes** | Project pages (`/sovereignsky/`) | JSON sections in `projects.json` → generator → Hugo shortcodes |
| **Page templates** | Events (`/events/`), Blog (`/blog/`), Publications (`/publications/`) | Hugo templates read data directly, styled with page-specific CSS |
| **Shared elements** | Hero, footer, metadata, filters | Partials and CSS classes reused across page types |

---

# Part 1: Project Page Shortcodes

Used on `/sovereignsky/` project pages. Each shortcode maps to a section type in `projects.json`.

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

---

# Part 2: Events Page Components

Used on `/events/` pages. These are template-level components in `layouts/events/list.html` and `single.html`, styled with `.sd-events` CSS classes. Data comes from `data/events/events.json`.

**Stitch references:**
- List page: "SovereignSky Events" screen
- Single page: "Datasenterdagen 2026 Event Page" screen

## Events List Page

**Template:** `layouts/events/list.html`

### Events Hero

Blue gradient hero with animated badge, title, and description.

- CSS class: `.sd-events-hero`
- Background: linear gradient `#0058be → #2170e4` with blurred color orbs
- Badge: animated pulse dot + uppercase label
- Title: Space Grotesk, white, large

### Stat Cards

3 cards overlapping the hero via negative margin. Cards hover to blue with white text.

- CSS class: `.sd-events-stat-card`
- Layout: 1 column mobile, 3 columns desktop
- Dynamic values: Upcoming count, This Month count, Strategic Focus
- Hover: background changes to `--sd-primary`, text turns white

### Filter Pills

Audience and Topic filter buttons. Two groups side by side on desktop.

- CSS class: `.sd-events-pill` / `.sd-events-pill-active`
- Label above pills: `.sd-events-filter-label` (tiny uppercase)
- Active: `--sd-primary` background, white text
- Inactive: `--sd-surface-container-high` background
- JS: toggles `.sd-events-pill-active` class, filters `.event-card` elements by `data-topics` and `data-audience` attributes

### Event Cards

Rendered by the `events` shortcode → `event-list.html` partial. Styled via CSS:

- First card: featured treatment (blue left border, shadow, larger padding)
- Remaining cards: 2-column grid on desktop, top border turns blue on hover
- CSS: `.sd-events-list .event-card:first-child` for featured, rest via `.sd-events-list .event-card`

### About Bar

Info bar at the bottom with "Suggest Event" button.

- CSS class: `.sd-events-about-inner`
- Background: `--sd-surface-container-low`

## Events Single Page

**Template:** `layouts/events/single.html`

### Event Hero

Same blue gradient as list page, with event title, date badge (glass icon + date), and description.

- Reuses `.sd-events-hero` base styles
- Date badge: `.sd-events-single-hero-date` with glass icon container
- Title from frontmatter `.Title`
- Date from frontmatter `.Params.date`

### Bento Info Grid

Two-column layout: Key Information (2/3) + Target Audience (1/3).

- CSS class: `.sd-events-single-bento`
- Key Info card: `.sd-events-single-info` — location, organizer, format with Material icons. Topics tags. CTA button to event website.
- Audience card: `.sd-events-single-audience` — persona cards with icons mapped by audience identifier

### Back Link

Simple "← Back to all events" link at the bottom.

---

# Part 3: Publications Page Components

Used on `/publications/` pages. Template-level components styled with `.sd-publications` CSS class and shared components.

**Data source**: `data/publications/publications.json` — array of publication objects.

## Publications List Page

**Template:** `layouts/publications/list.html`

### Hero + Stats + Filters

Reuses the same shared components as events and blog:
- Blue gradient hero (`.sd-events-hero`) with "Research & Reports" badge
- 3 stat cards (publications count, topics covered, sources/publishers)
- Shared filter pills (`.sd-filter-pill`) for audience + topic

### Featured Publication Card

First publication by `weight` gets the large horizontal card treatment. Reuses `.sd-blog-featured` CSS classes.

Shows: image, type badge (Report/Paper/Guide/Book), publisher, title, description, topic tags, "Read Publication" link.

### Compact Publication Grid

Remaining publications in a 2-column grid (`.sd-pub-grid`) with compact cards (`.sd-pub-card`).

Each card shows: thumbnail (80x80), type + publisher meta line, title. No description — compact style.

## Publications Single Page

**Template:** `layouts/publications/single.html`

### Featured Image

Full-width image at top (same as blog). Uses `featured.*` from content bundle.

### Summary Section

Two-column layout (same pattern as DCT summary):
- **Left**: Type · Publisher · Year label, title, "Authors: ..." list, "Read Original Publication" CTA button
- **Right**: Abstract text

### Summary Card + Details Sidebar (2/3 + 1/3 grid)

- **Left (2/3)**: Blue highlight card (`.sd-highlight-primary`) showing the `summary` field text
- **Right (1/3)**: Sticky details card (`.sd-sidebar-card`) with institutions, credibility indicators (Open Access, Peer Reviewed, Academic Publisher), edition, topics, tags, audience

Type/year/publisher NOT duplicated in details card (already in summary header).

### Full-Width Content

Body content renders below the sidebar grid at full width using `.sd-content` class. The `65ch` max-width constraint only applies on sovereignsky project pages (`.sd-page`), not publications.

Links styled blue with underlines in `.sd-content`.

### Key Takeaways

If available in frontmatter, displayed as a green-bordered callout box before body content.

### Back Link

"← Back to publications" link at bottom.

---

# Part 4: Blog Page Components

Used on `/blog/` pages. Template-level components styled with `.sd-blog` CSS class.

**Data source**: Blog posts generated from `data/blog/blog.json`.

## Blog List Page

**Template:** `layouts/blog/list.html`

### Hero + Stats + Filters

Same shared components as events and publications:
- Blue gradient hero with "Knowledge Hub" badge
- 3 stat cards (total posts, reading time, topics covered)
- Shared filter pills (`.sd-filter-pill`)

### Featured Blog Post

Most recent post by date gets the large horizontal card (`.sd-blog-featured`). Shows: image, "Featured" badge, date, reading time, title, description, topic tags, "Read Full Insight" link.

Topic tags on featured card only — grid cards kept clean.

### Blog Post Grid

Remaining posts in 3-column grid (`.sd-blog-grid`) with cards (`.sd-blog-card`). Each shows: image, date, reading time, title, description.

## Blog Single Page

**Template:** `layouts/blog/single.html`

### Featured Image

Full-width image at top — no overlay/blur. Image is visible content.

### Header

Centered: topic badge, title, date + reading time + author meta line.

### Metadata Bar

Topics, tags, audience displayed as clickable pills between header and content. 3-column grid on desktop.

### TOC

Collapsible Table of Contents — collapsed by default. Styled with Stitch tokens (`.sd-blog-toc`).

### Content

Prose content with Space Grotesk headings. External URL button ("Read Original Article") for posts linking to external sources.

### Footer

Related posts + "← Back to blog" link.

---

# Part 5: Shared Elements

## Sovereignsky Hero

Used on project pages. Tag badge, title, description, status, CTA buttons, optional video/image panel.

**Template:** `layouts/partials/hero/sovereignsky.html`

**Activated by:** `heroStyle: "sovereignsky"` in frontmatter (set by generator for section-based projects)

**Fields used from frontmatter:**
- `.Title` — hero title
- `.Params.description` — hero description
- `.Params.status` — status dot (active/planned/completed)
- `.Date` — "Started" date
- `.Params.repository` — "View Repository" CTA button
- `.Params.documentation` — "Documentation" CTA button
- `.Params.externalUrl` — "Project Website" CTA button
- `.Params.topics` — tag badge label (first topic)
- `hero.*` resource — square image/video in right panel

## Sovereignsky Footer

4-column footer: SovereignSky, Platform, Resources, About.

**Template:** `layouts/partials/sovereignsky-footer.html`

**Used by:** Project pages and Events pages. Default site footer hidden via `body:has(.sd-footer) .site-footer { display: none }` and `body:has(.sd-events) .site-footer { display: none }`.

## Metadata Sidebar

Inline metadata card (Topics, Tags, Audience) displayed alongside content in a 2/3 + 1/3 grid.

**Template:** `layouts/shortcodes/metadata-sidebar.html`

**Auto-generated** by the generator — wraps the first `highlight-card` after `summary` in a project's sections.

---

## Icons

All icons use [Material Symbols Outlined](https://fonts.google.com/icons?icon.set=Material+Symbols). Use the icon name as a string (e.g., `"error_outline"`, `"check_circle"`, `"psychology"`).

Persona cards render icons as **filled** (`font-variation-settings: 'FILL' 1`). All other components use the outline style.

Verify icon names exist at https://fonts.google.com/icons before using them.

---

## Color Conventions

| Color | CSS Variable | Used for |
|-------|-------------|----------|
| Primary (blue) | `--sd-primary` / `#0058be` | CTAs, links, primary actions, hero gradients |
| Secondary (green) | `--sd-secondary` / `#006c49` | Success, operational status, badges |
| Tertiary (purple) | `--sd-tertiary` / `#6b38d4` | Problems, warnings, deep-tech |

---

## Adding a New Component

### For project pages (shortcode-based):
1. Design it in Stitch (update the Component Library screen)
2. Create `layouts/shortcodes/{name}.html` template
3. Add the JSON schema to this document (Part 1)
4. Use CSS classes for dynamic colors (never use Hugo template variables in `style=""` attributes — causes `ZgotmplZ`)
5. If used inside `side-by-side`, add rendering support to `side-by-side.html`
6. Update `generate-sovereignsky-pages.js` if the new type needs special handling

### For other page types (template-based):
1. Design it in Stitch
2. Modify the page template (`layouts/{type}/list.html` or `single.html`)
3. Add CSS scoped under a page-specific class (e.g., `.sd-events`)
4. Document the components in this file (Part 2+)
5. Use `--sd-*` tokens and `.section-design` wrapper for consistency
