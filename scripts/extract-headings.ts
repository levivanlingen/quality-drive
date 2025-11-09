import * as fs from 'fs';
import * as path from 'path';

// Simple HTML tag extractor
function extractHeadings(html: string): Array<{ level: string; text: string }> {
  const headings: Array<{ level: string; text: string }> = [];

  // Match h1-h6 tags with their content
  const headingRegex = /<(h[1-6])[^>]*>(.*?)<\/\1>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = match[1].toUpperCase(); // h1, h2, h3, etc.
    let text = match[2];

    // Remove HTML tags from text
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'");

    // Clean up whitespace
    text = text.trim();

    if (text) {
      headings.push({ level, text });
    }
  }

  return headings;
}

// Read pages.json
const pagesJsonPath = path.join(process.cwd(), 'data', 'pages.json');
const pagesData = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));

// Get the slug from command line or use default
const targetSlug = process.argv[2] || 'rijschool-den-haag';

// Find the page
const page = pagesData.find((p: any) => p.slug === targetSlug);

if (!page) {
  console.error(`❌ Pagina niet gevonden: ${targetSlug}`);
  process.exit(1);
}

console.log(`\n📄 Koppen extractie voor: ${page.title} (${targetSlug})\n`);
console.log('='.repeat(80));

// Extract headings from content
const headings = extractHeadings(page.content || '');

if (headings.length === 0) {
  console.log('\n⚠️  Geen koppen gevonden in deze pagina.');
} else {
  console.log(`\n✅ Gevonden: ${headings.length} koppen\n`);

  // Group by level
  const grouped: Record<string, string[]> = {};

  headings.forEach(({ level, text }) => {
    if (!grouped[level]) {
      grouped[level] = [];
    }
    grouped[level].push(text);
  });

  // Display grouped by level
  ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].forEach(level => {
    if (grouped[level] && grouped[level].length > 0) {
      console.log(`\n${level} (${grouped[level].length}):`);
      console.log('-'.repeat(80));
      grouped[level].forEach((text, index) => {
        console.log(`  ${index + 1}. ${text}`);
      });
    }
  });

  // Display in order
  console.log('\n\n📋 In volgorde van voorkomen:\n');
  console.log('='.repeat(80));
  headings.forEach(({ level, text }, index) => {
    const indent = '  '.repeat(parseInt(level[1]) - 1);
    console.log(`${indent}${level}: ${text}`);
  });
}

console.log('\n' + '='.repeat(80));
console.log(`\n💡 Tip: Gebruik het script met een andere slug:`);
console.log(`   npx tsx scripts/extract-headings.ts rijschool-zoetermeer\n`);
