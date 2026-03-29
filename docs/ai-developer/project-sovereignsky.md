# Project: SovereignSky Site

A Hugo-based website about digital sovereignty, data protection, and humanitarian technology. Uses the Blowfish theme with DaisyUI components and Tailwind CSS.

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

## Key Commands

All commands run inside the devcontainer.

```bash
npm run validate              # Validate all JSON against schemas
npm run generate:all          # Run all generators
npm run build                 # validate + generate:all
hugo server -D --bind 0.0.0.0 --disableFastRender --buildFuture   # Start Hugo
```

---

## When to Read What

The `docs/` folder contains detailed documentation for this project. Read the relevant doc before working in that area.

| When you are... | Read first |
|-----------------|------------|
| Changing data files, generators, or content types | [docs/DATA-PIPELINE.md](../DATA-PIPELINE.md) — JSON-to-HTML architecture, all 13 content types, generator patterns, shortcodes |
| Adding or modifying JSON schemas or validation | [docs/DATA-VALIDATION.md](../DATA-VALIDATION.md) — Schema structure, validation script, adding new validations |
| Working on templates, partials, or page layouts | [docs/PAGE-LAYOUTS.md](../PAGE-LAYOUTS.md) — List/detail page components, section headers, icon system |
| Designing or styling components | [docs/DESIGN-COMPONENTS.md](../DESIGN-COMPONENTS.md) — All shortcodes, section types, color system, CSS tokens |
| Setting up the dev environment or Hugo server | [docs/DEVELOPMENT.md](../DEVELOPMENT.md) — First-time setup, Hugo commands, when to restart |

### Key rules from the docs

- **Never edit files in `content/` directly** — they are generated and will be overwritten
- **Data pipeline**: `data/*.json` → `scripts/generate-*-pages.js` → `content/*/index.md` → Hugo build
- **Restart Hugo** after changing templates, partials, shortcodes, CSS, config, or data files
- **Styling**: Prefer Tailwind/DaisyUI classes over custom CSS. Custom CSS is in `assets/css/custom.css`
