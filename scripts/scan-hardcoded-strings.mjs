import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('src');
const EXCLUDE_DIRS = ['i18n', 'data', 'lib', 'assets', 'config'];

const SUSPICIOUS_PATTERNS = [
  /aria-label="([A-Z][a-zA-Z\s]{4,})"/g,
  /<button[^>]*>([A-Z][a-zA-Z\s]{4,})<\/button>/g,
  /<Badge[^>]*>([A-Z][a-zA-Z\s]{4,})<\/Badge>/g,
  /placeholder="([A-Z][a-zA-Z\s]{4,})"/g,
  /title="([A-Z][a-zA-Z\s]{4,})"/g,
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(SRC_DIR, filePath);
  const issues = [];

  for (const regex of SUSPICIOUS_PATTERNS) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Ignore if inside curly braces, or template string, or technical term
      const matchedText = match[1];
      if (
        !matchedText.includes('{') &&
        !['GitHub', 'LinkedIn', 'WhatsApp', 'Telegram', 'Vite', 'React'].includes(
          matchedText.trim()
        )
      ) {
        issues.push({
          pattern: regex.source,
          match: matchedText,
          line: content.substring(0, match.index).split('\n').length,
        });
      }
    }
  }

  return { relPath, issues };
}

function walkDir(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry.name)) {
        results.push(...walkDir(fullPath));
      }
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      results.push(scanFile(fullPath));
    }
  }
  return results;
}

const allResults = walkDir(SRC_DIR).filter((r) => r.issues.length > 0);
console.log(`Found ${allResults.length} files with suspicious hardcoded patterns:\n`);
for (const file of allResults) {
  console.log(`File: ${file.relPath}`);
  for (const issue of file.issues) {
    console.log(`  Line ${issue.line}: "${issue.match}"`);
  }
}
