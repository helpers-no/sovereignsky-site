#!/usr/bin/env node

/**
 * Generate /publications/{publication-id}/ pages from data/publications/publications.json
 *
 * JSON Structure (schema.org ItemList):
 * - Wrapper: { "@type": "ItemList", "itemListElement": [...] }
 * - Fields: @type, identifier, name, description, abstract, summary, body,
 *   imageWide, datePublished, externalUrl, author, publisher, topics, audience, tags, weight, draft
 *
 * Field Mappings (JSON → Frontmatter):
 * - datePublished → date (schema.org → Hugo)
 * - name → title
 * - externalUrl → external_url
 * - author → authors
 *
 * JSON body is the single source of truth — custom markdown content in existing
 * files is NOT preserved. All content must live in publications.json.
 *
 * Image handling:
 * - If image starts with http, downloads from URL
 * - Otherwise, copies from images/publications/{filename}
 * - Saves as featured.{ext} in content folder (preserves original extension)
 *
 * Usage: node scripts/generate-publications-pages.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { validateBeforeGenerate } = require('./lib/schema-validator');

// Validate data before generating
validateBeforeGenerate('data/publications/publications.json', 'data/schemas/publications.schema.json');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data', 'publications');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'publications');
const IMAGES_DIR = path.join(ROOT_DIR, 'images', 'publications');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

/**
 * Copy image from source to destination
 */
function copyImage(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

/**
 * Download image from URL to destination
 * Returns a promise
 */
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

/**
 * Handle image for a publication
 * - Downloads from URL or copies from images folder
 * - Saves as featured.{ext} in content folder (preserves original extension)
 */
async function handleImage(pub, pubDir) {
  if (!pub.imageWide) return false;

  // Determine extension from source
  const ext = path.extname(pub.imageWide) || '.png';
  const destPath = path.join(pubDir, `featured${ext}`);

  // Remove any existing featured.* files with different extensions
  const existingFiles = fs.readdirSync(pubDir).filter(f => f.startsWith('featured.'));
  existingFiles.forEach(f => {
    const existingPath = path.join(pubDir, f);
    if (existingPath !== destPath) {
      fs.unlinkSync(existingPath);
    }
  });

  // Check if it's a URL
  if (pub.imageWide.startsWith('http://') || pub.imageWide.startsWith('https://')) {
    try {
      await downloadImage(pub.imageWide, destPath);
      console.log(`  Downloaded image for: ${pub.identifier}`);
      return true;
    } catch (err) {
      console.warn(`  Warning: Failed to download image for ${pub.identifier}: ${err.message}`);
      return false;
    }
  }

  // It's a local filename - copy from images folder
  const srcPath = path.join(IMAGES_DIR, pub.imageWide);
  if (copyImage(srcPath, destPath)) {
    console.log(`  Copied image for: ${pub.identifier}`);
    return true;
  } else {
    console.warn(`  Warning: Image not found for ${pub.identifier}: ${srcPath}`);
    return false;
  }
}

function yamlEscapeString(s) {
  return String(s ?? '').replace(/"/g, '\\"');
}

function yamlString(s) {
  return `"${yamlEscapeString(s)}"`;
}

function yamlStringList(key, arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const out = [`${key}:`];
  arr.forEach(item => {
    if (item === null || item === undefined) return;
    out.push(`  - ${yamlString(item)}`);
  });
  return out.length > 1 ? out : [];
}

// Build frontmatter from publication data
// Maps schema.org field names to Hugo field names (see Field Mappings in header)
function buildFrontmatter(pub) {
  const lines = [
    `title: ${yamlString(pub.name)}`,           // name → title
    `description: ${yamlString(pub.description)}`,
    `date: ${pub.datePublished}`,               // datePublished → date
    `external_url: ${yamlString(pub.externalUrl)}`,     // externalUrl → external_url
    `publisher: ${yamlString(pub.publisher)}`
  ];

  // Weight for sorting
  if (pub.weight !== undefined) {
    lines.push(`weight: ${pub.weight}`);
  }

  // Authors (optional - some reports don't have named authors)
  if (pub.author && pub.author.length > 0) {
    lines.push(...yamlStringList('authors', pub.author));
  }

  // Topics
  if (pub.topics && pub.topics.length > 0) {
    lines.push(...yamlStringList('topics', pub.topics));
  }

  // Audience (for persona filtering)
  if (pub.audience && pub.audience.length > 0) {
    lines.push(...yamlStringList('audience', pub.audience));
  }

  // Tags
  if (pub.tags && pub.tags.length > 0) {
    lines.push(...yamlStringList('tags', pub.tags));
  }

  // Abstract and summary for template access
  if (pub.abstract) {
    lines.push(`abstract: ${yamlString(pub.abstract)}`);
  }
  if (pub.summary) {
    lines.push(`summary: ${yamlString(pub.summary)}`);
  }

  // Institutions
  if (pub.institutions && pub.institutions.length > 0) {
    lines.push(...yamlStringList('institutions', pub.institutions));
  }

  // Credibility flags
  if (pub.peer_reviewed) lines.push(`peer_reviewed: true`);
  if (pub.open_access) lines.push(`open_access: true`);
  if (pub.academic_publisher) lines.push(`academic_publisher: true`);

  // Edition
  if (pub.edition) lines.push(`edition: ${yamlString(pub.edition)}`);

  // Publication type
  if (pub.publication_type) lines.push(`publication_type: ${yamlString(pub.publication_type)}`);

  // Takeaways
  if (pub.takeaways && pub.takeaways.length > 0) {
    lines.push(...yamlStringList('takeaways', pub.takeaways));
  }

  // Hugo type
  lines.push(`type: publications`);

  // Hero settings (big banner image like sovereignsky pages)
  lines.push(`showHero: true`);
  lines.push(`heroStyle: "big"`);

  return lines.join('\n');
}

// Build the body content from JSON
// Note: abstract and summary are now in frontmatter and displayed by the template,
// so they are NOT included in the body to avoid duplication.
function buildAbstractAndSummary(pub) {
  const parts = [];

  // Add body content if present (full markdown content)
  // Remove all standalone --- lines (horizontal rules) — they add visual noise
  // in the new design where sections are already visually separated
  if (pub.body) {
    const cleaned = pub.body.replace(/^\s*---\s*$/gm, '').replace(/\n{3,}/g, '\n\n');
    parts.push(cleaned.trim());
  }

  return parts.join('\n\n');
}

// Build default body content for new pages (no custom content)
function buildDefaultBody(pub) {
  const abstractSummary = buildAbstractAndSummary(pub);
  if (abstractSummary) {
    return abstractSummary;
  }
  // Fallback if no abstract/summary in JSON
  return `## Summary\n\n*Content from ${pub.publisher}.*`;
}

async function main() {
  console.log('Generating /publications/ pages from data/publications/publications.json...\n');

  const data = readJson(path.join(DATA_DIR, 'publications.json'));
  const publications = data.itemListElement;

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const pub of publications) {
    // Skip drafts
    if (pub.draft) {
      console.log(`  SKIP (draft): ${pub.identifier}`);
      skipped++;
      continue;
    }

    const pubDir = path.join(CONTENT_DIR, pub.identifier);
    const indexPath = path.join(pubDir, 'index.md');

    ensureDir(pubDir);

    // Handle image (copy or download)
    await handleImage(pub, pubDir);

    // JSON body is the single source of truth
    const body = buildAbstractAndSummary(pub);

    if (fs.existsSync(indexPath)) {
      updated++;
    } else {
      created++;
    }

    const frontmatter = buildFrontmatter(pub);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  }

  // Generate _index.md for the list page
  const listIndexPath = path.join(CONTENT_DIR, '_index.md');
  const listIndexContent = `---
title: "Publications"
description: "Curated references to authoritative sources on digital sovereignty, data protection, and humanitarian technology"
---

{{< page-stats section="publications" >}}
`;

  const listIndexIsNew = !fs.existsSync(listIndexPath);
  fs.writeFileSync(listIndexPath, listIndexContent);
  if (listIndexIsNew) {
    console.log(`CREATE: _index.md`);
    created++;
  } else {
    console.log(`UPDATE: _index.md`);
    updated++;
  }

  console.log(`\nCreated: ${created} new publication pages`);
  console.log(`Updated: ${updated} existing publication pages`);
  if (skipped) console.log(`Skipped: ${skipped} drafts`);
  console.log(`Total: ${publications.length} publications in /publications/{id}/index.md`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
