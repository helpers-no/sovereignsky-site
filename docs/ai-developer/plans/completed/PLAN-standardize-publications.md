# Standardize Publications Content Type

## Status: Completed

**Completed**: 2026-03-29

**Goal**: Make publications.json follow the standard content field conventions — ItemList wrapper, standard field names, body content as single source of truth in JSON.

**GitHub Issue**: Part of content field standardization (INVESTIGATE-content-field-standardization.md)

**Last Updated**: 2026-03-29

---

## Problem

Publications is the most non-standard of the four page content types:
- **No ItemList wrapper** — plain JSON array instead of `{ "@type": "ItemList", "itemListElement": [...] }`
- **No `@type`** on items — other content types have schema.org types
- **`image` instead of `imageWide`** — inconsistent with projects which use `imageWide`/`imageSquare`
- **`url` instead of `externalUrl`** — ambiguous naming
- **No `draft` field** — can't mark items as drafts
- **Body content in markdown only** — 7 of 8 publications have body content only in `content/publications/*/index.md`, not in JSON. Only `eu-cloud-sovereignty-framework` has a `body` field in JSON.
- **`showHero` in frontmatter** — generator sets this but it's a template concern, not content data (already decided in investigation)

---

## Current State

**8 publications** in `data/publications/publications.json`:
1. `digitisation-sovereignty-humanitarian-space` — body in markdown only
2. `safeguarding-humanitarian-digital-threats` — body in markdown only
3. `humanitarian-metadata-problem` — body in markdown only
4. `gisf-digital-physical-security` — body in markdown only
5. `icrc-data-protection-handbook` — body in markdown only
6. `totalberedskapsmeldingen-2025` — body in markdown only
7. `ffi-frivillige-beredskapsorganisasjoner-totalforsvar` — body in markdown only
8. `eu-cloud-sovereignty-framework` — ✅ has `body` in JSON

---

## Phase 1: Migrate Body Content to JSON

Extract markdown body content from the 7 publications that only have it in markdown files and add it as `body` fields in `publications.json`.

### Tasks

- [x] 1.1 For each of the 7 publications without `body` in JSON, read `content/publications/{identifier}/index.md` and extract the markdown content below the frontmatter (skip the artifact `---` divider lines)
- [x] 1.2 Add the extracted content as a `body` string field to each publication object in `publications.json`
- [x] 1.3 Verify all 8 publications now have a `body` field in JSON

### Validation

```bash
# All 8 publications should have body field
CONTAINER=$(docker ps -q | xargs -I {} docker inspect {} \
  --format '{{.Name}} {{range .Mounts}}{{.Source}}{{end}}' \
  | grep sovereignsky-site | cut -d' ' -f1 | tr -d '/')
docker exec $CONTAINER bash -c "cd /workspace && node -e \"
  const data = require('./data/publications/publications.json');
  const items = Array.isArray(data) ? data : data.itemListElement;
  items.forEach(p => console.log(p.identifier, p.body ? '✅ has body' : '❌ NO body'));
  const missing = items.filter(p => !p.body);
  if (missing.length) { console.error('FAIL: ' + missing.length + ' without body'); process.exit(1); }
  console.log('OK: all ' + items.length + ' have body');
\""
```

---

## Phase 2: Standardize JSON Structure and Field Names

Update `publications.json` with ItemList wrapper and renamed fields.

### Tasks

- [x] 2.1 Wrap the array in an ItemList structure
- [x] 2.2 Add `"@type": "ScholarlyArticle"` to each publication item
- [x] 2.3 Rename `image` → `imageWide` on all items that have it
- [x] 2.4 Rename `url` → `externalUrl` on all items that have it
- [x] 2.5 Add `"draft": false` to all items

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspace && node -e \"
  const data = require('./data/publications/publications.json');
  // Check wrapper
  if (data['@type'] !== 'ItemList') { console.error('FAIL: no ItemList wrapper'); process.exit(1); }
  if (!data.itemListElement) { console.error('FAIL: no itemListElement'); process.exit(1); }
  const items = data.itemListElement;
  // Check fields
  let errors = 0;
  items.forEach(p => {
    if (!p['@type']) { console.error(p.identifier + ': missing @type'); errors++; }
    if (p.image) { console.error(p.identifier + ': still has image (should be imageWide)'); errors++; }
    if (p.url) { console.error(p.identifier + ': still has url (should be externalUrl)'); errors++; }
    if (p.draft === undefined) { console.error(p.identifier + ': missing draft'); errors++; }
  });
  if (errors) { process.exit(1); }
  console.log('OK: all ' + items.length + ' items standardized');
\""
```

---

## Phase 3: Update Schema

Update `publications.schema.json` to match the new structure.

### Tasks

- [x] 3.1 Change schema root from array type to object type with ItemList wrapper properties (`@context`, `@type`, `name`, `description`, `itemListElement`)
- [x] 3.2 Add `@type` as required string field on items
- [x] 3.3 Rename `image` → `imageWide` in item schema
- [x] 3.4 Rename `url` → `externalUrl` in item schema
- [x] 3.5 Add `draft` as optional boolean field on items
- [x] 3.6 Add `body` as optional string field on items (already present, kept)

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspace && npm run validate"
```

---

## Phase 4: Update Generator

Update `generate-publications-pages.js` to read from the new structure.

### Tasks

- [x] 4.1 Read items from `data.itemListElement` instead of treating data as a plain array
- [x] 4.2 Read `item.imageWide` instead of `item.image`
- [x] 4.3 Read `item.externalUrl` instead of `item.url` (map to frontmatter `external_url`)
- [x] 4.4 Skip items where `item.draft === true`
- [x] 4.5 Always use `item.body` for markdown content — remove the "preserve existing markdown" fallback logic (JSON is now the single source of truth)
- [x] 4.6 Verify generator still handles items without `body` gracefully (empty content)

### Validation

```bash
# Generate and build
docker exec $CONTAINER bash -c "cd /workspace && node scripts/generate-publications-pages.js"
docker exec $CONTAINER bash -c "cd /workspace && hugo --gc"

# Verify all 8 pages exist
docker exec $CONTAINER bash -c "cd /workspace && ls content/publications/*/index.md | wc -l"
# Expected: 8

# Verify body content is present in generated files
docker exec $CONTAINER bash -c "cd /workspace && for f in content/publications/*/index.md; do
  lines=\$(wc -l < \"\$f\")
  name=\$(basename \$(dirname \"\$f\"))
  echo \"\$name: \$lines lines\"
done"
```

---

## Phase 5: Update Hugo Templates and Utility Scripts

Update templates and scripts that access publications data directly.

### Tasks

- [x] 5.1 Update `layouts/partials/home/custom.html` — change `.Site.Data.publications.publications` to `.Site.Data.publications.publications.itemListElement`
- [x] 5.2 Update `scripts/fix-publication-topics.js` — extract `itemListElement` from wrapper before iterating
- [x] 5.3 Verify `layouts/publications/single.html` and `list.html` — confirmed no changes needed (read page frontmatter, not JSON directly)

### Validation

```bash
# Full build with no errors
docker exec $CONTAINER bash -c "cd /workspace && hugo --gc"

# Manual check: http://localhost:1313/publications/
# - All 8 publications visible
# - Each publication page has body content
# - Images display correctly
# - External links work
# - Home page publications count still correct
```

---

## Phase 6: Full Validation

### Tasks

- [x] 6.1 Run full validation suite — 18/18 passed
- [x] 6.2 Run full generation — all generators succeeded
- [x] 6.3 Run Hugo build — verified via live Hugo server
- [x] 6.4 Spot-check publication pages in browser — user confirmed looks OK

### Validation

```bash
docker exec $CONTAINER bash -c "cd /workspace && npm run validate"
docker exec $CONTAINER bash -c "cd /workspace && npm run generate:all"
docker exec $CONTAINER bash -c "cd /workspace && hugo --gc"
```

---

## Acceptance Criteria

- [x] `publications.json` has ItemList wrapper with `@context`, `@type`, `name`, `description`, `itemListElement`
- [x] All 8 items have `@type`, `imageWide` (not `image`), `externalUrl` (not `url`), `draft`, `body`
- [x] Schema validates the new structure: `npm run validate` passes
- [x] Generator reads from new structure and produces correct pages
- [x] All 8 publication pages render correctly with body content from JSON
- [x] Hugo builds without errors
- [x] No content is lost — all markdown body content preserved in JSON `body` fields

---

## Files to Modify

- `data/publications/publications.json` — restructure and rename fields, add body content
- `data/schemas/publications.schema.json` — update to match new structure
- `scripts/generate-publications-pages.js` — read from new structure
- `scripts/fix-publication-topics.js` — read from new structure
- `layouts/partials/home/custom.html` — update direct data access to use `itemListElement`

## Implementation Notes

- The body migration (Phase 1) is the most labor-intensive step — 7 files of markdown content to extract and embed as JSON strings
- The markdown content in the existing files has artifact `---` divider lines after the frontmatter that should NOT be included in the `body` field
- JSON strings need proper escaping for quotes and newlines
- The generator currently has logic to preserve existing markdown when JSON has no `body` — this fallback is removed in Phase 4 since JSON becomes the single source of truth
- Templates `single.html` and `list.html` read page frontmatter, not JSON data directly — no changes needed there
- **`author` (JSON) → `authors` (frontmatter)**: This is intentional, not a bug. JSON uses `author` (singular) per schema.org convention. Generators map it to `authors` (plural) for Hugo templates. Both blog and publications do this consistently. No change needed.
