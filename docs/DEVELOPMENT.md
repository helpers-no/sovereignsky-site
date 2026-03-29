# Development Guide

Quick reference for local development tasks.

## DevContainer Setup

This project uses the **DevContainer Toolbox (DCT)** from helpers-no (`ghcr.io/helpers-no/devcontainer-toolbox`).

When you open the project in VS Code with the DevContainer extension, you're working **inside** the container. The workspace is mounted at `/workspace`.

### First-time setup

After the container starts for the first time:

1. **Install Hugo** (run `dev-setup` and select Hugo from the menu, or directly):
   ```bash
   install-fwk-hugo
   ```
   Only needed once — DCT remembers and reinstalls on container rebuild.

2. **Install npm dependencies** (needed for validation scripts and page generators):
   ```bash
   npm install
   ```

3. **Verify**:
   ```bash
   hugo version    # Should show extended edition
   node -v         # Should show Node.js
   npm run validate
   ```

## Hugo Server Commands

### Inside the DevContainer (VS Code terminal)

When working in VS Code's integrated terminal (inside the devcontainer), run commands directly:

```bash
# Start Hugo server
hugo server -D --bind 0.0.0.0 --disableFastRender --buildFuture

# Restart Hugo (kill and start)
pkill hugo; sleep 1; hugo server -D --bind 0.0.0.0 --disableFastRender --buildFuture &

# Check if Hugo is running
pgrep -a hugo
```

### From Host Machine (outside container)

When running from your host terminal, first find the devcontainer name. The name is assigned by Docker and changes on rebuild.

**Step 1: Find the container**
```bash
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/')
```

**Step 2: Restart Hugo**
```bash
docker exec $CONTAINER pkill hugo 2>/dev/null
sleep 1
docker exec -d $CONTAINER sh -c 'cd /workspace && hugo server -D --bind 0.0.0.0 --disableFastRender --buildFuture'
sleep 4
```

Or as a one-liner in bash:
```bash
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/') && docker exec $CONTAINER pkill hugo; sleep 1; docker exec -d $CONTAINER sh -c 'cd /workspace && hugo server -D --bind 0.0.0.0 --disableFastRender --buildFuture'
```

**What the restart command does:**
1. `pkill hugo` - Kills any running Hugo process
2. `sleep 1` - Waits for clean shutdown
3. `hugo server ...` - Starts Hugo in background (`-d` flag)
4. `--disableFastRender` - Forces full rebuild (needed for template changes)
5. `sleep 4` - Waits for server to be ready

## When to Rebuild or Restart Hugo

Hugo automatically rebuilds when files change, but not all changes are picked up equally.

**Automatic rebuild** — no action needed:
- Content file changes (`.md` files)

**Force a full rebuild** — touch a config file:
```bash
touch config/_default/config.toml
```
This works for changes to:
- Templates and layouts (`layouts/`)
- Partials (`layouts/partials/`)
- Existing shortcodes (`layouts/shortcodes/`)
- CSS (`assets/css/`)
- Data files (`data/`)

**Restart required** — kill and start Hugo again:
- **New shortcode files** — Hugo does not detect newly created shortcode files without a restart ([known bug](https://github.com/gohugoio/hugo/issues/14207))
- Config file changes (`config.toml`, `params.toml`)

**When in doubt, restart Hugo.** It only takes a few seconds and prevents debugging phantom issues from stale caches.

## Local URLs

- Site: http://localhost:1313/
- LiveReload: Automatic on file changes

---

## Data Architecture

Content pages are generated from JSON data files using Node.js scripts.

### Data Flow

```
data/*.json  →  scripts/generate-*-pages.js  →  content/*/index.md
```

| Data Source | Script | Generated Content |
|-------------|--------|-------------------|
| `data/jurisdictions/` | `generate-jurisdictions-pages.js` | `content/jurisdictions/{country}/` |
| `data/networks/` | `generate-network-pages.js` | `content/networks/{network}/` |
| `data/software/` | `generate-software-pages.js` | `content/software/{product}/` |
| `data/datacenters/` | `generate-datacenters-pages.js` | `content/datacenters/{provider}/` |
| `data/laws/` | `generate-laws-pages.js` | `content/laws/{law}/` |

### Important

- **DO NOT** manually edit generated content pages - changes will be overwritten
- **DO** edit the JSON source files in `data/` and regenerate
- **Layouts** in `layouts/` control how generated content is displayed

### Section Index Files (`_index.md`)

| Section | `_index.md` Generated? |
|---------|------------------------|
| `jurisdictions` | ✅ Yes |
| `laws` | ❌ No (manual) |
| `networks` | ❌ No (manual) |
| `software` | ❌ No (manual) |
| `datacenters` | ❌ No (manual) |

**TODO:** Update all generation scripts to also generate `_index.md` for consistency.

**Note:** The generation scripts should also pre-calculate section statistics (counts, breakdowns by type/status, etc.) for display in `section-stats`. Currently these calculations are duplicated in:
- Layouts (`layouts/*/list.html`)
- Shortcodes (`layouts/shortcodes/page-stats.html`)

Ideally, stats should be calculated once during generation and stored in the `_index.md` front matter or a dedicated data file.

### Regenerating Content

```bash
# Regenerate all pages for a section
node scripts/generate-jurisdictions-pages.js
node scripts/generate-network-pages.js
node scripts/generate-software-pages.js
node scripts/generate-datacenters-pages.js
node scripts/generate-laws-pages.js
```
