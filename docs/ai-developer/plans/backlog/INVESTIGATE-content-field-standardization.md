# Investigate: Standardize Content JSON Field Names and Structure

## Status: Backlog

**Goal**: Make all content JSON files use consistent field names, wrappers, and patterns so that generators, templates, and design components work the same way across all content types. JSON must be the single source of truth.

**Last Updated**: 2026-03-28

---

## Problem

The content JSON files use different field names for the same concepts, different wrapper formats, and inconsistent patterns. Some content types have body content split between JSON and markdown files. This creates:

- **Template complexity** — each content type needs custom logic for field names
- **Design inconsistency** — components can't be reused because field names differ
- **Generator duplication** — each generator maps fields differently
- **Stale content risk** — generated markdown can be out of sync with JSON
- **Split source of truth** — publications body content lives in markdown, not JSON
- **AI tool errors** — AI editing one file may use patterns from another

---

## All Content Types

There are **13 content types** with generators:

| Content Type | Generator | Data File | Schema | In npm scripts |
|-------------|-----------|-----------|--------|---------------|
| sovereignsky (projects) | `generate-sovereignsky-pages.js` | `data/sovereignsky/projects.json` | `sovereignsky-projects.schema.json` | ✅ |
| blog | `generate-blog-pages.js` | `data/blog/blog.json` | `blog.schema.json` | ✅ Added |
| publications | `generate-publications-pages.js` | `data/publications/publications.json` | ❌ **Missing** | ✅ |
| events | `generate-events-pages.js` | `data/events/events.json` | `events.schema.json` | ✅ Added |
| networks | `generate-network-pages.js` | `data/networks/networks.json` | `networks.schema.json` | ✅ |
| laws | `generate-laws-pages.js` | `data/laws/laws.json` | `laws.schema.json` | ✅ |
| countries | `generate-countries-pages.js` | `data/countries/countries.json` | `countries.schema.json` | ✅ Added |
| datacenters | `generate-datacenters-pages.js` | `data/datacenters/datacenters.json` | ❌ **Missing** | ✅ Added |
| datacenter-countries | `generate-datacenter-country-pages.js` | (uses countries data) | — | ✅ Added |
| jurisdictions | `generate-jurisdictions-pages.js` | (uses laws data) | `jurisdictions.schema.json` | ✅ Added |
| blocs | `generate-blocs-pages.js` | `data/blocs/blocs.json` | `blocs.schema.json` | ✅ Added |
| personas | `generate-persona-pages.js` | `data/audience/audience.json` | `audience.schema.json` | ✅ Added |
| software | `generate-software-pages.js` | `data/software/software.json` | ❌ **Missing** | ✅ Added |

**Missing schemas**: publications, datacenters, software

---

## Field Comparison (Main 4 Content Types)

| Concept | Projects | Blog | Publications | Events |
|---------|----------|------|-------------|--------|
| **Wrapper** | ItemList ✅ | ItemList ✅ | ❌ plain array | ItemList ✅ |
| **Title** | `name` | `name` | `name` | `name` |
| **URL slug** | `identifier` | `identifier` | `identifier` | `identifier` |
| **SEO text** | `description` | `description` | `description` | `description` |
| **Display summary** | `abstract` | `abstract` | `abstract` | ❌ missing |
| **Detailed summary** | ❌ needs adding | ❌ needs adding | `summary` ✅ | ❌ needs adding |
| **Body content** | `sections` array | `body` string | ❌ in markdown files | ❌ no body |
| **Sort order** | `weight` | ❌ missing | `weight` | ❌ missing |
| **Image** | `imageWide` + `imageSquare` | `image` ⚠️ | `image` ⚠️ | ❌ |
| **Date** | `project.dateStarted` ⚠️ | `datePublished` | `datePublished` | `startDate` |
| **Author** | ❌ | `author` | `author` | ❌ |
| **External URL** | `url` ⚠️ (internal path) | `url` | `url` | `url` |
| **Topics** | `topics` | `topics` | `topics` | `topics` |
| **Tags** | `tags` | `tags` | `tags` | ❌ missing |
| **Audience** | `audience` | `audience` | `audience` | `audience` |
| **Draft** | ❌ | `draft` | ❌ | ❌ |
| **schema.org type** | `@type` | `@type` | ❌ missing | `@type` |

---

## Questions — All Resolved

1. ✅ **ItemList wrapper for all** — Yes. Publications needs migration.
2. ✅ **Image naming `imageWide`/`imageSquare`** — Yes. Rename `image` → `imageWide` on blog and publications.
3. ✅ **`weight` for all** — Yes. Blog and events need it added.
4. ✅ **`abstract` for all** — Yes. Events needs it added.
5. ✅ **`tags` for all** — Yes. Events needs it added.
6. ✅ **`draft` for all** — Yes. Projects, publications, events need it added.
7. ✅ **Standardize dates to `datePublished`** — Yes. Projects `project.dateStarted` → `datePublished`. Events keep additional `startDate`/`endDate`.
8. ✅ **Publications `body` field** — Yes. JSON must be single source of truth. (Merged from INVESTIGATE-publications-single-source.md)
9. ✅ **Events get `abstract` and `tags`** — Yes.
10. ✅ **Flatten nested fields** — `project.*` flattened. Events `location`/`organizer` stay nested.
11. ✅ **URL field naming** — `url` → `externalUrl`, `project.repository` → `repositoryUrl`, `project.documentation` → `documentationUrl`.
12. ✅ **Keep `summary` field** — Used on 112 items across 5 content types. Add to types that don't have it. Three text fields: `description` (SEO) + `abstract` (display) + `summary` (detailed).

---

## Requirements

### 1. All content types MUST have a schema.org ItemList wrapper

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "...",
  "description": "...",
  "itemListElement": [ ... ]
}
```

### 2. All content types MUST have `body` for single source of truth

The JSON must be the complete source for all content. No content should live only in markdown files.

**Audit result (2026-03-28):**

| Content Type | Body in JSON? | Body in markdown only? | Action needed |
|-------------|:---:|:---:|---|
| **Blog** | ✅ `body` (11/11) | Matches JSON | None |
| **Projects** | ✅ `sections` (11/11) | — | None |
| **Publications** | ❌ 1 of 8 | ⚠️ 7 of 8 have body ONLY in markdown | **Must migrate before CI/CD generation** |
| **Laws** | ❌ 0 of 41 | ⚠️ All 41 have body ONLY in markdown | **Must migrate before CI/CD generation** |
| **Datacenters** | ❌ 0 | ⚠️ 43 pages have body in markdown | **Must migrate before CI/CD generation** |
| **Events** | No body needed | No body | None |
| **Networks** | No body | No body | None |
| **Countries** | No body | No body | None |
| **Personas** | No body | No body | None |

**⚠️ WARNING**: Running `generate:all` in CI/CD before migrating publication, law, and datacenter body content to JSON will NOT destroy content (generators preserve existing markdown body when JSON has no `body` field). However, the JSON is not the single source of truth until this migration is complete.

### 3. Field names follow standards

| Field | Standard | Source | Purpose |
|-------|----------|--------|---------|
| `description` | schema.org, Open Graph | Short SEO text. NOT displayed on page. | ✅ Keep |
| `abstract` | schema.org, Dublin Core | Display summary for summary sections. | ✅ Keep |
| `body` | Common CMS pattern | Full markdown content. Single source of truth. | ✅ Keep |
| `summary` | Non-standard but widely used | Detailed paragraph for highlight cards. Used on 112 items. | ✅ Keep — add to all types |
| `imageWide` | Format-based naming | Rectangular image for social sharing. | ✅ Keep |
| `imageSquare` | Format-based naming | Square image for hero/cards. | ✅ Keep |
| `externalUrl` | Common CMS pattern | Link to external source. | ✅ Rename from `url` |
| `repositoryUrl` | Descriptive | Source code repo URL. Projects only. | ✅ Rename from `project.repository` |
| `documentationUrl` | Descriptive | Documentation site URL. Projects only. | ✅ Rename from `project.documentation` |

---

## Full Field Analysis (All 13 Content Types)

### Text field usage

| Content | Items | `description` | `abstract` | `summary` | `body` |
|---------|-------|:---:|:---:|:---:|:---:|
| **projects** | 11 | 11 | 11 | 0 ❌ | 11 (sections) |
| **blog** | 11 | 11 | 11 | 0 ❌ | 11 |
| **publications** | 8 | 8 | 8 | 8 | 0 ❌ |
| **events** | 18 | 18 | 0 ❌ | 0 ❌ | 0 ❌ |
| **networks** | 23 | 23 | 23 | 4 | 0 ❌ |
| **laws** | 41 | 41 | 41 | 41 | 0 ❌ |
| **countries** | 61 | 61 | 61 | 61 | 0 ❌ |
| **blocs** | 6 | 6 | 6 | 6 | 0 ❌ |
| **datacenters** | 43 | 0 ❌ | 0 ❌ | 0 ❌ | 0 ❌ |
| **networks-actors** | 17 | 17 | 0 ❌ | 0 ❌ | 0 ❌ |
| **networks-places** | 31 | 31 | 0 ❌ | 0 ❌ | 0 ❌ |
| **software** | 41 | 41 (`description`) | 0 ❌ | 0 ❌ | 0 ❌ |

### Standard field coverage

| Content | Wrapper | `weight` | `imageWide` | `topics` | `tags` | `audience` | `draft` | `externalUrl` |
|---------|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **projects** | ✅ ItemList | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ⚠️ as `url` |
| **blog** | ✅ ItemList | ❌ | ⚠️ as `image` | ✅ | ✅ | ✅ | ✅ | ⚠️ as `url` |
| **publications** | ❌ plain array | ✅ | ⚠️ as `image` | ✅ | ✅ | ✅ | ❌ | ⚠️ as `url` |
| **events** | ✅ ItemList | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ⚠️ as `url` |
| **networks** | ❌ plain array | ❌ | ⚠️ as `image` | ✅ | ✅ | ✅ | ❌ | ⚠️ as `url` |
| **laws** | ✅ ItemList | ❌ | ⚠️ as `image` | ✅ | ✅ | ✅ | ❌ | ⚠️ as `url` |
| **countries** | ✅ ItemList | ❌ | ⚠️ as `image` | ❌ | ❌ | ❌ | ❌ | ❌ |
| **blocs** | ✅ ItemList | ❌ | ⚠️ as `image` | ❌ | ❌ | ❌ | ❌ | ❌ |
| **datacenters** | ❌ other | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ as `url` |
| **networks-actors** | ❌ other | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ as `url` |
| **networks-places** | ❌ other | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **software** | ❌ other (`products` array) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Software note**: Uses `products` array (not `itemListElement`), `id`/`slug` (not `identifier`), `vendor_id`, `risk_level`, `assessments`, `alternatives`. Very different structure — product/assessment database, not content pages.

### Content type categories

**Page content** (rendered as standalone pages with designed Stitch layouts):
- projects, blog, publications, events
- All standard fields required
- Already redesigned with heroes, filters, cards

**Data content** (rendered as data-driven pages with tables/maps/charts):
- networks, laws, countries, datacenters, blocs, software
- Standard fields required where they exist — common fields must use standard names
- `body` required (even if empty) so the design can handle it
- May have additional domain-specific fields (risk levels, jurisdictions, coordinates, etc.)

**Lookup data** (not standalone pages, used as references by other pages):
- networks-actors, networks-places
- Minimal standard fields: `identifier`, `name`, `description`, `@type`
- Don't need `body`, `weight`, `audience`, `draft` etc.

---

## Proposed Standard Fields

Every content item MUST have these common fields:

```json
{
  "@type": "string (schema.org type)",
  "identifier": "string (URL slug)",
  "name": "string (display title)",
  "description": "string (short, SEO/meta tags — NOT displayed on page)",
  "abstract": "string (medium, displayed in summary sections on page)",
  "summary": "string (long, detailed explanation for highlight cards, optional)",
  "body": "string (full markdown content — single source of truth)",
  "weight": "number (sort order, lower = first)",
  "imageWide": "string (rectangular image for social sharing)",
  "imageSquare": "string (square image for hero/cards, optional)",
  "datePublished": "string (ISO date)",
  "externalUrl": "string (link to external source, optional)",
  "topics": ["array of topic identifiers"],
  "tags": ["array of free-form tags"],
  "audience": ["array of audience identifiers"],
  "draft": "boolean (optional, default false)"
}
```

Plus content-type-specific fields:
- **Projects**: `sections` (structured body — replaces `body`), `status`, `maturity`, `repositoryUrl`, `documentationUrl`
- **Blog**: `author`
- **Publications**: `author`, `publisher`, `institutions`, `publication_type`, `peer_reviewed`, `open_access`, `academic_publisher`, `edition`, `takeaways`
- **Events**: `startDate`, `endDate`, `location` (nested: name, city, country), `organizer` (nested: name, url), `attendanceMode`, `status`, `nameOriginal`, `itRelevance`
- **Networks, Laws, Countries, etc.**: Need individual analysis

---

## Schemas and Validation

### Missing schemas

| Data file | Schema needed |
|-----------|--------------|
| `data/publications/publications.json` | `publications.schema.json` |
| `data/datacenters/datacenters.json` | `datacenters.schema.json` |
| `data/software/software.json` | `software.schema.json` |

### Validation must run before generation

Today:
```
Edit JSON → Generate (no validation) → Hugo build
```

Should be:
```
Edit JSON → Validate (fail fast) → Generate → Hugo build
```

### CI/CD must run generators

Today's deploy workflow:
```
Checkout → npm ci → Validate → Hugo build → Deploy
```

Should be:
```
Checkout → npm ci → Validate → Generate ALL → Hugo build → Deploy
```

**Problems with current CI:**
- No generation step — generated markdown must be committed manually
- Stale content risk — JSON changes without regeneration deploy old content
- No JSON-markdown mismatch detection

### npm scripts (DONE)

All 13 generators added to `package.json`:
- `npm run generate:all` — runs all generators in sequence
- `npm run build` — runs validate → generate:all

### Consider: stop committing generated files

If CI always regenerates, `content/` files could be `.gitignored`. Trade-off: can't preview without running generator locally.

---

## Decisions Made

1. **All content types use ItemList wrapper** — publications needs migration
2. **All content types have `body`** — single source of truth (projects use `sections` instead)
3. **Keep `summary` field** — used on 112 items across 5 types. Three text fields: `description` (SEO) + `abstract` (display) + `summary` (detailed)
4. **Image naming: `imageWide` + `imageSquare`** — rename `image` → `imageWide` on blog and publications
5. **All content types have `weight`** — for ordering and featured selection
6. **All content types have `abstract`** — for summary section display
7. **All content types have `tags`** — events needs migration
8. **All content types have `draft`** — for draft handling
9. **Standardize date to `datePublished`** — events keep additional `startDate`/`endDate`
10. **Flatten `project` nested object** — `status`, `maturity`, `repositoryUrl`, `documentationUrl`
11. **URL naming** — `url` → `externalUrl`, `project.repository` → `repositoryUrl`, `project.documentation` → `documentationUrl`
12. **Approach: full standardization** — clean migration, update all generators/templates/schemas per content type
13. **All content types have `@type`** — publications and software currently missing it
14. **`showHero`** — this is a template setting (Hugo/Blowfish frontmatter), not content data. Generators set it, not JSON. Keep as generator responsibility, not a standard field.
15. **`body` on all page + data content** — required even if empty. Lookup data (networks-actors, networks-places) doesn't need it.
16. **Three tiers of standardization** — page content: all standard fields required. Data content: standard fields where they exist + body. Lookup data: minimal (identifier, name, description, @type).
17. **`author` stays singular in JSON** — schema.org uses `author` (singular) even for arrays. Generators map to `authors` (plural) in Hugo frontmatter. Both blog and publications already do this consistently. Not a standardization issue — intentional mapping.

---

## Recommendation

**Option A: Full standardization.** All questions are resolved, all decisions made. Create a PLAN file that migrates all content types in phases:

### Suggested migration order

**Phase 1: Page content types (designed with Stitch)**
1. **Publications** — most broken (no wrapper, no body, no schema). Add wrapper, body, summary→keep, image→imageWide.
2. **Blog** — minor changes (image→imageWide, add weight, add summary)
3. **Events** — add abstract, summary, tags, weight, draft, image fields
4. **Projects** — flatten project.*, url→externalUrl, repository→repositoryUrl, documentation→documentationUrl, add summary, draft

**Phase 2: Reference/database content types**
5. **Laws** — add wrapper fields, image→imageWide, url→externalUrl, add weight/draft
6. **Networks** — add wrapper, image→imageWide, url→externalUrl, add weight/draft
7. **Countries** — add topics, tags, audience, url→externalUrl, add weight/draft
8. **Blocs** — add topics, tags, audience, add weight/draft
9. **Datacenters** — add description, abstract, summary, body, image fields
10. **Software** — major restructure needed: `products` array → `itemListElement`, `id`/`slug` → `identifier`, add standard fields. Currently uses completely different structure (product assessments, risk levels, alternatives).

**Phase 3: Lookup data**
11. **Networks-actors** — add wrapper, standardize where applicable
12. **Networks-places** — add wrapper, standardize where applicable

---

## Implementation Plans

One plan per content type. Each plan is independent and leaves the system working after completion. Plans should be created and implemented in this order.

### Plan 0: CI/CD and Build Pipeline — ✅ COMPLETED 2026-03-29
- All 13 generators in npm scripts + `generate:all` + `build`
- Created missing schemas (publications, datacenters, software) — validation now 18/18
- CI/CD updated with generation step (⚠️ blocked until publications/laws/datacenters body content migrated to JSON)
- All 13 generators validate data before generating (`scripts/lib/schema-validator.js`)
- See: `docs/ai-developer/plans/completed/PLAN-standardize-build-pipeline.md`

### Page content types (Stitch-designed)
- **PLAN-standardize-publications.md** — Add ItemList wrapper, add `body` field (move markdown content to JSON), keep `summary`, rename `image` → `imageWide`, add `@type`, `draft`. Schema already created.
- **PLAN-standardize-blog.md** — Rename `image` → `imageWide`, add `weight`, add `summary`, rename `url` → `externalUrl`, remove `showHero` from JSON (generator sets it).
- **PLAN-standardize-events.md** — Add `abstract`, `summary`, `tags`, `weight`, `draft`, `imageWide`, rename `url` → `externalUrl`, add `@type`.
- **PLAN-standardize-projects.md** — Flatten `project.*` → `status`, `maturity`, `repositoryUrl`, `documentationUrl`. Rename `url` → `externalUrl` (or remove — was internal path). Add `summary`, `draft`. Standardize `project.dateStarted` → `datePublished`.

### Data content types
- **PLAN-standardize-laws.md** — Rename `image` → `imageWide`, `url` → `externalUrl`, add `weight`, `draft`, `body`, `@type` if missing.
- **PLAN-standardize-networks.md** — Add ItemList wrapper, rename `image` → `imageWide`, `url` → `externalUrl`, add `weight`, `draft`, add `@type`.
- **PLAN-standardize-countries.md** — Add `topics`, `tags`, `audience`, `externalUrl`, `weight`, `draft`, `body`.
- **PLAN-standardize-blocs.md** — Add `topics`, `tags`, `audience`, `weight`, `draft`, `body`.
- **PLAN-standardize-datacenters.md** — Add `description`, `abstract`, `summary`, `body`, `imageWide`, `weight`, `draft`, `@type`. Create schema.
- **PLAN-standardize-software.md** — Major restructure: `products` → `itemListElement`, `id`/`slug` → `identifier`, add all standard fields. Create schema.

### Lookup data
- **PLAN-standardize-lookup-data.md** — Add ItemList wrapper to networks-actors and networks-places. Add `@type`. Minimal standard fields only.

### After all plans
- [ ] Update `docs/DESIGN-COMPONENTS.md` with standardized field documentation
- [ ] Decide whether to stop committing generated files (`.gitignore` content/)
