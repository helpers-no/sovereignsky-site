# Project: SovereignSky Site

A Hugo-based website about digital sovereignty, data protection, and humanitarian technology.

---

## Devcontainer

This project runs in a DCT devcontainer based on `ghcr.io/helpers-no/devcontainer-toolbox`.

### Finding the container

The container name changes on rebuild. Find it dynamically:

```bash
docker ps --format '{{.Names}}\t{{.Image}}' | grep devcontainer-toolbox
```

### Running commands from the host

```bash
docker exec <container-name> bash -c "cd /workspace && <command>"
```

### Workspace path

Inside the container: `/workspace/`

---

## Project Structure

```
sovereignsky-site/
├── config/                    # Hugo configuration
├── content/                   # Hugo content (generated markdown pages)
├── data/                      # Data files (JSON — single source of truth)
│   ├── schemas/               # JSON schemas for validation
│   ├── publications/          # publications.json
│   ├── blog/                  # blog.json
│   ├── events/                # events.json
│   ├── sovereignsky/          # projects.json
│   └── ...                    # networks, laws, countries, etc.
├── docs/                      # Documentation
│   └── ai-developer/          # AI developer docs (you are here)
│       └── plans/             # Implementation plans
├── images/                    # Source images for content
├── layouts/                   # Hugo templates and partials
│   ├── partials/              # Reusable template fragments
│   └── shortcodes/            # Hugo shortcodes
├── scripts/                   # Node.js generator and utility scripts
├── static/                    # Static assets
└── assets/css/                # Custom CSS
```

---

## Data Pipeline

**JSON is the single source of truth.** Content flows through a pipeline:

```
data/*.json → scripts/generate-*-pages.js → content/*/index.md → Hugo build → HTML
```

1. **Edit JSON** in `data/{type}/{type}.json`
2. **Run generator** to produce markdown pages
3. **Hugo builds** HTML from the generated markdown

**Never edit files in `content/` directly** — they are generated and will be overwritten.

See [docs/DATA-PIPELINE.md](../DATA-PIPELINE.md) for the complete architecture.

---

## Key Commands

All commands run inside the devcontainer.

### Validation

```bash
npm run validate              # Validate all JSON against schemas (18 schemas)
```

### Generation

```bash
npm run generate:all          # Run all 13 generators
npm run build                 # validate + generate:all
node scripts/generate-publications-pages.js   # Run a single generator
```

### Hugo Server

Hugo runs inside the devcontainer at `http://localhost:1313`.

```bash
# Start Hugo (with drafts and future posts visible)
hugo server -D --buildFuture --bind 0.0.0.0 --disableFastRender

# Restart Hugo
pkill hugo; hugo server -D --buildFuture --bind 0.0.0.0 --disableFastRender

# Build for production
hugo --gc
```

**When to restart Hugo**: After changing templates, partials, shortcodes, CSS, config files, or data files. Markdown content changes are picked up automatically.

---

## Content Types

There are **13 content types** with generators:

| Type | Data file | Generator |
|------|-----------|-----------|
| projects | `data/sovereignsky/projects.json` | `generate-sovereignsky-pages.js` |
| blog | `data/blog/blog.json` | `generate-blog-pages.js` |
| publications | `data/publications/publications.json` | `generate-publications-pages.js` |
| events | `data/events/events.json` | `generate-events-pages.js` |
| networks | `data/networks/networks.json` | `generate-network-pages.js` |
| laws | `data/laws/laws.json` | `generate-laws-pages.js` |
| countries | `data/countries/countries.json` | `generate-countries-pages.js` |
| datacenters | `data/datacenters/datacenters.json` | `generate-datacenters-pages.js` |
| blocs | `data/blocs/blocs.json` | `generate-blocs-pages.js` |
| software | `data/software/software.json` | `generate-software-pages.js` |
| personas | `data/audience/audience.json` | `generate-persona-pages.js` |
| jurisdictions | (uses laws data) | `generate-jurisdictions-pages.js` |
| datacenter-countries | (uses countries data) | `generate-datacenter-country-pages.js` |

---

## Styling

- **Hugo theme**: Blowfish
- **Component library**: DaisyUI (loaded via CDN in `layouts/partials/extend-head.html`)
- **CSS framework**: Tailwind (from Blowfish)
- **Custom CSS**: `assets/css/custom.css`

Prefer Tailwind/DaisyUI classes over custom CSS when possible.

---

## Detailed Documentation

| Document | Content |
|----------|---------|
| [docs/DEVELOPMENT.md](../DEVELOPMENT.md) | Full development setup guide |
| [docs/DATA-VALIDATION.md](../DATA-VALIDATION.md) | JSON schema validation details |
| [docs/DATA-PIPELINE.md](../DATA-PIPELINE.md) | Complete data flow architecture |
| [docs/PAGE-LAYOUTS.md](../PAGE-LAYOUTS.md) | Component naming and page types |
| [docs/DESIGN-COMPONENTS.md](../DESIGN-COMPONENTS.md) | Shortcodes, templates, color system |
