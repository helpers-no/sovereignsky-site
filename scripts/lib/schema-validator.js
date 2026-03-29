/**
 * Shared schema validation helper for generators.
 *
 * Usage in a generator:
 *   const { validateBeforeGenerate } = require('./lib/schema-validator');
 *   validateBeforeGenerate('data/blog/blog.json', 'data/schemas/blog.schema.json');
 *   // Exits with error if validation fails
 */

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

/**
 * Validate a data file against a schema.
 * Exits with error code 1 if validation fails.
 *
 * @param {string} dataPath - Relative path to data file (from project root)
 * @param {string} schemaPath - Relative path to schema file (from project root)
 */
function validateBeforeGenerate(dataPath, schemaPath) {
  const root = path.join(__dirname, '..', '..');
  const dataFile = path.join(root, dataPath);
  const schemaFile = path.join(root, schemaPath);

  // Check files exist
  if (!fs.existsSync(schemaFile)) {
    console.warn(`  Warning: No schema found at ${schemaPath} — skipping validation`);
    return;
  }

  if (!fs.existsSync(dataFile)) {
    console.error(`  Error: Data file not found: ${dataPath}`);
    process.exit(1);
  }

  // Load and validate
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error(`\n  ✗ Validation failed for ${dataPath}:`);
    validate.errors.slice(0, 5).forEach(err => {
      console.error(`    ${err.instancePath}: ${err.message}`);
    });
    if (validate.errors.length > 5) {
      console.error(`    ... and ${validate.errors.length - 5} more errors`);
    }
    console.error(`\n  Fix the data file before generating. Aborting.\n`);
    process.exit(1);
  }

  console.log(`  ✓ Validated ${dataPath}`);
}

module.exports = { validateBeforeGenerate };
