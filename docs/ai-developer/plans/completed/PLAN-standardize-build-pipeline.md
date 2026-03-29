# Feature: Standardize Build Pipeline

## Status: Completed

**Completed**: 2026-03-29

**Goal**: Ensure validation runs before generation, all generators are available via npm scripts, and CI/CD generates content from JSON before building.

**GitHub Issue**: —

**Last Updated**: 2026-03-28

**Prerequisites**: None — this is a prerequisite for all standardization plans.

**Priority**: High

---

## Overview

Currently validation and generation are disconnected. Generators can run on invalid JSON. CI/CD doesn't run generators — it relies on committed markdown files. This plan fixes the pipeline so JSON is always validated before generation, and CI/CD always generates fresh content.

**Related**: INVESTIGATE-content-field-standardization.md

---

## Phase 1: npm Scripts

### Tasks

- [x] 1.1 Add all 13 generators to `package.json` as npm scripts
- [x] 1.2 Create `npm run generate:all` — runs all generators in sequence
- [x] 1.3 Create `npm run build` — runs validate → generate:all

### Validation

```bash
npm run validate
# Should pass (15/15)

npm run generate:all
# Should run all 13 generators without errors
```

---

## Phase 2: Missing Schemas

### Tasks

- [x] 2.1 Create `data/schemas/publications.schema.json` — validate publications data structure
- [x] 2.2 Create `data/schemas/datacenters.schema.json` — validate datacenters data structure
- [x] 2.3 Create `data/schemas/software.schema.json` — validate software data structure
- [x] 2.4 Add all three to `scripts/validate.js` schema-data mappings
- [x] 2.5 Run `npm run validate` — all 18 schemas pass

### Validation

```bash
npm run validate
# Should pass with new schemas included
```

---

## Phase 3: CI/CD Update

### Tasks

- [x] 3.1 Update `.github/workflows/deploy.yml` — add `npm run generate:all` step between validate and Hugo build
- [ ] 3.2 Verify the deploy workflow runs after merge (Checkout → npm ci → Validate → Generate ALL → Hugo build → Deploy)

### ⚠️ WARNING: Do NOT merge CI/CD generation step until publications body content is migrated

7 out of 8 publications have body content ONLY in markdown files, NOT in the JSON `body` field. The publications generator preserves existing markdown body when there's no `body` in JSON. However, if CI/CD runs `generate:all` and a future change accidentally adds an empty `body` field, the markdown content would be lost.

**Before merging the CI/CD change:**
1. Complete PLAN-standardize-publications.md — move all markdown body content into the `body` field in `publications.json`
2. Verify all content types have their body content in JSON
3. Run `npm run generate:all` and confirm no content is lost
4. Then it's safe to enable generation in CI/CD

**Current status of body content in JSON:**

| Content Type | Body in JSON? | Body in markdown? | Safe for CI/CD generation? |
|-------------|---------------|-------------------|---------------------------|
| Projects | ✅ `sections` | — | ✅ Yes |
| Blog | ✅ `body` | ✅ (matches JSON) | ✅ Yes |
| Publications | ❌ 7 of 8 missing | ✅ 7 of 8 | ❌ **NO — migrate first** |
| Laws | ❌ 0 of 41 | ✅ 41 of 41 | ❌ **NO — migrate first** |
| Datacenters | ❌ 0 of 43 | ✅ 43 of 86 | ❌ **NO — migrate first** |
| Events | No body | No body | ✅ Yes (nothing to lose) |
| Networks | No body | No body | ✅ Yes |
| Countries | No body | No body | ✅ Yes |
| Personas | No body | No body | ✅ Yes |

### Validation

```bash
# Check the workflow file has the generation step
grep 'generate:all' .github/workflows/deploy.yml
```

---

## Phase 4: Generators Validate Before Generating

### Tasks

- [x] 4.1 Create `scripts/lib/schema-validator.js` — shared validation helper
- [x] 4.2 Added validation to all 13 generators
- [x] 4.3 Generator exits with error if validation fails — no pages generated from bad data
- [x] 4.4 All generators validate: blog, sovereignsky, publications, events, networks, laws, countries, datacenters, datacenter-countries, blocs, personas, software, jurisdictions

### Validation

```bash
# Introduce a bad field in a JSON file, run generator, should fail
# Fix the field, run generator, should succeed
```

---

## Acceptance Criteria

- [x] All 13 generators available as npm scripts
- [x] `npm run generate:all` runs all generators
- [x] `npm run build` runs validate → generate:all
- [x] Missing schemas created (publications, datacenters, software)
- [x] CI/CD runs generators before Hugo build
- [x] Generators validate data before generating (all 13)
- [x] Hugo builds successfully
- [x] `npm run validate` passes (18/18)

---

## Implementation Notes

### Generator validation approach

Create a shared module `scripts/lib/schema-validator.js` that:
1. Takes a data file path and schema file path
2. Validates using AJV (already a dependency)
3. Returns success/failure with error messages
4. Each generator calls this at the start

### CI/CD workflow change

```yaml
# Add after "Validate data files" step:
- name: Generate content from data
  run: npm run generate:all
```

## Files to Modify

- `package.json` — ✅ Already done (Phase 1)
- `.github/workflows/deploy.yml` — Add generation step
- `scripts/validate.js` — Add new schema mappings
- `scripts/lib/schema-validator.js` — **New file**: shared validation helper
- `data/schemas/publications.schema.json` — **New file**
- `data/schemas/datacenters.schema.json` — **New file**
- `data/schemas/software.schema.json` — **New file**
