/**
 * Generate Simple Pages List
 *
 * Creates a simple markdown file with just a list of all pages
 */

const fs = require('fs');
const path = require('path');

// Read pages.json
const pagesPath = path.join(__dirname, '../data/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Sort pages by title
pages.sort((a, b) => a.title.localeCompare(b.title));

// Generate simple markdown
let markdown = `# Alle Pagina's - Quality Drive\n\n`;
markdown += `Totaal: ${pages.length} pagina's\n\n`;
markdown += `---\n\n`;

// Add simple list
pages.forEach((page, index) => {
  markdown += `${index + 1}. ${page.title} - \`${page.slug}\` - /${page.slug}\n`;
});

markdown += `\n---\n\n`;
markdown += `Gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n`;

// Write to file
const outputPath = path.join(__dirname, '../PAGES_LIST.md');
fs.writeFileSync(outputPath, markdown, 'utf-8');

console.log('✅ Eenvoudige pagina lijst gegenereerd!');
console.log(`📄 Bestand: ${outputPath}`);
console.log(`📊 Totaal: ${pages.length} pagina's`);
