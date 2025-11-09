/**
 * Check Missing Pages
 *
 * Compares PAGES_LIST.md with data/pages.json to find missing pages
 */

const fs = require('fs');
const path = require('path');

// Read the desired pages from PAGES_LIST.md
const listPath = path.join(__dirname, '../PAGES_LIST.md');
const listContent = fs.readFileSync(listPath, 'utf-8');

// Read existing pages from pages.json
const pagesPath = path.join(__dirname, '../data/pages.json');
const existingPages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Extract slugs from PAGES_LIST.md
const desiredSlugs = new Set();
const lines = listContent.split('\n');

for (const line of lines) {
  // Match patterns like: `slug` or slug - /slug
  const match = line.match(/`([^`]+)`/);
  if (match) {
    desiredSlugs.add(match[1]);
  }
  // Also check for home - /
  if (line.includes('home - /')) {
    desiredSlugs.add('home');
  }
}

// Get existing slugs
const existingSlugs = new Set(existingPages.map(p => p.slug));

// Find missing pages
const missingPages = [];
for (const slug of desiredSlugs) {
  if (!existingSlugs.has(slug)) {
    missingPages.push(slug);
  }
}

// Find extra pages (in pages.json but not in list)
const extraPages = [];
for (const page of existingPages) {
  if (!desiredSlugs.has(page.slug)) {
    extraPages.push({
      slug: page.slug,
      title: page.title
    });
  }
}

// Generate report
let report = `# Ontbrekende Pagina's Rapport\n\n`;
report += `Gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n\n`;
report += `---\n\n`;

report += `## Samenvatting\n\n`;
report += `- **Gewenste pagina's:** ${desiredSlugs.size}\n`;
report += `- **Bestaande pagina's:** ${existingPages.length}\n`;
report += `- **Ontbrekende pagina's:** ${missingPages.length}\n`;
report += `- **Extra pagina's (niet in lijst):** ${extraPages.length}\n\n`;

report += `---\n\n`;

if (missingPages.length > 0) {
  report += `## ❌ Ontbrekende Pagina's (${missingPages.length})\n\n`;
  report += `Deze pagina's staan in PAGES_LIST.md maar bestaan nog niet:\n\n`;

  missingPages.sort();
  missingPages.forEach((slug, index) => {
    report += `${index + 1}. \`${slug}\` - /${slug}\n`;
  });

  report += `\n---\n\n`;
} else {
  report += `## ✅ Geen Ontbrekende Pagina's\n\n`;
  report += `Alle pagina's uit PAGES_LIST.md bestaan al!\n\n`;
  report += `---\n\n`;
}

if (extraPages.length > 0) {
  report += `## ℹ️ Extra Pagina's (${extraPages.length})\n\n`;
  report += `Deze pagina's bestaan wel maar staan niet in PAGES_LIST.md:\n\n`;

  extraPages.sort((a, b) => a.title.localeCompare(b.title));
  extraPages.forEach((page, index) => {
    report += `${index + 1}. ${page.title} - \`${page.slug}\` - /${page.slug}\n`;
  });

  report += `\n---\n\n`;
}

report += `## Acties\n\n`;
if (missingPages.length > 0) {
  report += `- [ ] Maak ${missingPages.length} ontbrekende pagina's aan\n`;
}
if (extraPages.length > 0) {
  report += `- [ ] Controleer of ${extraPages.length} extra pagina's toegevoegd moeten worden aan PAGES_LIST.md\n`;
}

report += `\n`;

// Write report
const reportPath = path.join(__dirname, '../MISSING_PAGES_REPORT.md');
fs.writeFileSync(reportPath, report, 'utf-8');

// Console output
console.log('📊 Pagina Vergelijking\n');
console.log('✅ Bestaande pagina\'s:', existingPages.length);
console.log('📋 Gewenste pagina\'s:', desiredSlugs.size);
console.log('❌ Ontbrekende pagina\'s:', missingPages.length);
console.log('ℹ️  Extra pagina\'s:', extraPages.length);
console.log('\n📄 Rapport opgeslagen in:', reportPath);

if (missingPages.length > 0) {
  console.log('\n❌ Ontbrekende pagina\'s:');
  missingPages.forEach(slug => console.log(`   - ${slug}`));
}
