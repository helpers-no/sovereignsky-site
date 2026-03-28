# Feature: Standardize Build Pipeline

## Status: Backlog

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

- [ ] 2.1 Create `data/schemas/publications.schema.json` — validate publications data structure
- [ ] 2.2 Create `data/schemas/datacenters.schema.json` — validate datacenters data structure
- [ ] 2.3 Create `data/schemas/software.schema.json` — validate software data structure
- [ ] 2.4 Add all three to `scripts/validate.js` schema-data mappings
- [ ] 2.5 Run `npm run validate` — all schemas pass

### Validation

```bash
npm run validate
# Should pass with new schemas included
```

---

## Phase 3: CI/CD Update

### Tasks

- [ ] 3.1 Update `.github/workflows/deploy.yml` — add `npm run generate:all` step between validate and Hugo build
- [ ] 3.2 Verify the deploy workflow runs: Checkout → npm ci → Validate → Generate ALL → Hugo build → Deploy
- [ ] 3.3 Test by pushing a JSON change and verifying the generated content is correct on the deployed site

### Validation

```bash
# Check the workflow file has the generation step
grep 'generate:all' .github/workflows/deploy.yml
```

---

## Phase 4: Generators Validate Before Generating

### Tasks

- [ ] 4.1 Create a shared validation helper that generators can import
- [ ] 4.2 Each generator validates its data file against its schema before generating
- [ ] 4.3 Generator exits with error if validation fails — no pages generated from bad data
- [ ] 4.4 Test by introducing a deliberate schema error and confirming the generator refuses to run

### Validation

```bash
# Introduce a bad field in a JSON file, run generator, should fail
# Fix the field, run generator, should succeed
```

---

## Acceptance Criteria

- [ ] All 13 generators available as npm scripts
- [ ] `npm run generate:all` runs all generators
- [ ] `npm run build` runs validate → generate:all
- [ ] Missing schemas created (publications, datacenters, software)
- [ ] CI/CD runs generators before Hugo build
- [ ] Generators validate data before generating
- [ ] Hugo builds successfully
- [ ] `npm run validate` passes

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
