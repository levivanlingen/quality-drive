/**
 * Generate Pages Overview
 *
 * This script reads the pages.json file and creates a categorized
 * markdown overview of all pages in the website.
 */

const fs = require('fs');
const path = require('path');

// Read pages.json
const pagesPath = path.join(__dirname, '../data/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Helper function to determine category
function determineCategory(slug) {
  // Home page
  if (slug === 'home' || slug === '') return '🏠 Home';

  // Specialisaties - Check these BEFORE autorijles steden
  if (slug === 'rijschool-faalangst' || slug === 'rijschool-adhd' || slug === 'rijschool-add') {
    return '🎯 Specialisaties';
  }

  // Auto rijles - Main page
  if (slug === 'autorijles') return '🚗 Autorijles - Hoofdpagina';

  // Auto rijles - Stad pagina's
  if (slug.startsWith('rijschool-')) return '🚗 Autorijles - Steden';

  // Automaat rijles
  if (slug === 'automaat-rijles') return '🚙 Automaat Rijles - Hoofdpagina';
  if (slug.startsWith('automaat-rijles-')) return '🚙 Automaat Rijles - Steden';
  if (slug.startsWith('automaat-')) return '🚙 Automaat Rijles - Steden';

  // Motor rijles
  if (slug === 'motorrijles') return '🏍️ Motor Rijles - Hoofdpagina';
  if (slug.startsWith('motor-rijles-')) return '🏍️ Motor Rijles - Steden';
  if (slug.startsWith('motor-pakketten')) return '🏍️ Motor Rijles - Pakketten';
  if (slug.includes('motorrijschool-') || slug.includes('motorrijbewijs')) return '🏍️ Motor Rijles - Steden';

  // Taxi rijles
  if (slug.startsWith('taxi-') || slug.startsWith('taxi-rijles-')) return '🚕 Taxi Rijles - Steden';

  // Theorie
  if (slug.includes('theorie')) return '📚 Theorie';

  // Blog
  if (slug.includes('blog') || slug.startsWith('post-')) return '📝 Blog';

  // Contact
  if (slug === 'contact') return '📞 Contact';

  // Over Ons
  if (slug === 'about' || slug === 'over-ons') return 'ℹ️ Over Ons';

  // Pakketten
  if (slug.includes('pakket') && !slug.includes('motor')) return '📦 Pakketten';

  // Rijopleidingen
  if (slug === 'rijopleidingen') return '🎓 Rijopleidingen';

  // Overige
  return '📄 Overige';
}

// Categorize pages
const categorizedPages = {};

pages.forEach(page => {
  const category = determineCategory(page.slug);

  if (!categorizedPages[category]) {
    categorizedPages[category] = [];
  }

  categorizedPages[category].push({
    id: page.id,
    slug: page.slug,
    title: page.title,
    url: `/${page.slug}`,
  });
});

// Custom category order
const categoryOrder = [
  '🏠 Home',
  '🚗 Autorijles - Hoofdpagina',
  '🚗 Autorijles - Steden',
  '🚙 Automaat Rijles - Hoofdpagina',
  '🚙 Automaat Rijles - Steden',
  '🏍️ Motor Rijles - Hoofdpagina',
  '🏍️ Motor Rijles - Steden',
  '🏍️ Motor Rijles - Pakketten',
  '🚕 Taxi Rijles - Steden',
  '🎯 Specialisaties',
  '🎓 Rijopleidingen',
  '📦 Pakketten',
  '📚 Theorie',
  '📝 Blog',
  'ℹ️ Over Ons',
  '📞 Contact',
  '📄 Overige',
];

// Sort categories by custom order
const sortedCategories = Object.keys(categorizedPages).sort((a, b) => {
  const indexA = categoryOrder.indexOf(a);
  const indexB = categoryOrder.indexOf(b);

  // If both are in the order array, sort by that
  if (indexA !== -1 && indexB !== -1) return indexA - indexB;

  // If only one is in the order array, prioritize it
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;

  // Otherwise, sort alphabetically
  return a.localeCompare(b);
});

// Generate markdown
let markdown = `# Pagina Overzicht - Quality Drive

> Gegenereerd op: ${new Date().toLocaleString('nl-NL')}
> Totaal aantal pagina's: ${pages.length}

---

## Inhoudsopgave

`;

// Add table of contents
sortedCategories.forEach(category => {
  const count = categorizedPages[category].length;
  markdown += `- [${category}](#${category.toLowerCase().replace(/\s+/g, '-')}) (${count} pagina's)\n`;
});

markdown += `\n---\n\n`;

// Add detailed sections
sortedCategories.forEach(category => {
  const categoryPages = categorizedPages[category];

  markdown += `## ${category}\n\n`;
  markdown += `Totaal: **${categoryPages.length}** pagina's\n\n`;

  // Sort pages by title
  categoryPages.sort((a, b) => a.title.localeCompare(b.title));

  // Create table
  markdown += `| # | Titel | Slug | URL |\n`;
  markdown += `|---|-------|------|-----|\n`;

  categoryPages.forEach((page, index) => {
    markdown += `| ${index + 1} | ${page.title} | \`${page.slug}\` | \`${page.url}\` |\n`;
  });

  markdown += `\n---\n\n`;
});

// Add statistics section
markdown += `## Statistieken\n\n`;
markdown += `| Categorie | Aantal Pagina's | Percentage |\n`;
markdown += `|-----------|----------------|------------|\n`;

sortedCategories.forEach(category => {
  const count = categorizedPages[category].length;
  const percentage = ((count / pages.length) * 100).toFixed(1);
  markdown += `| ${category} | ${count} | ${percentage}% |\n`;
});

markdown += `\n**Totaal:** ${pages.length} pagina's\n\n`;

// Add insights
markdown += `## Inzichten\n\n`;

// Find largest category
const largestCategory = sortedCategories.reduce((max, cat) =>
  categorizedPages[cat].length > categorizedPages[max].length ? cat : max
);

markdown += `- **Grootste categorie:** ${largestCategory} (${categorizedPages[largestCategory].length} pagina's)\n`;

// Count autorijles pages
const autorijlesSteden = categorizedPages['🚗 Autorijles - Steden'] ? categorizedPages['🚗 Autorijles - Steden'].length : 0;
markdown += `- **Autorijles steden:** ${autorijlesSteden}\n`;

// Count motor pages
const motorSteden = categorizedPages['🏍️ Motor Rijles - Steden'] ? categorizedPages['🏍️ Motor Rijles - Steden'].length : 0;
markdown += `- **Motor rijles steden:** ${motorSteden}\n`;

// Count automaat pages
const automaatSteden = categorizedPages['🚙 Automaat Rijles - Steden'] ? categorizedPages['🚙 Automaat Rijles - Steden'].length : 0;
markdown += `- **Automaat rijles steden:** ${automaatSteden}\n`;

// Count taxi pages
const taxiSteden = categorizedPages['🚕 Taxi Rijles - Steden'] ? categorizedPages['🚕 Taxi Rijles - Steden'].length : 0;
markdown += `- **Taxi rijles steden:** ${taxiSteden}\n`;

// Total stad pages
const totalCityPages = autorijlesSteden + motorSteden + automaatSteden + taxiSteden;
markdown += `- **Totaal stad-specifieke pagina's:** ${totalCityPages}\n`;

// Count specialisaties
const specialisaties = categorizedPages['🎯 Specialisaties'] ? categorizedPages['🎯 Specialisaties'].length : 0;
markdown += `- **Specialisaties (ADD, ADHD, Faalangst):** ${specialisaties}\n`;

// Count blog pages
const blogPages = categorizedPages['📝 Blog'] ? categorizedPages['📝 Blog'].length : 0;
markdown += `- **Blog artikelen:** ${blogPages}\n`;

markdown += `\n---\n\n`;
markdown += `*Dit overzicht is automatisch gegenereerd uit data/pages.json*\n`;

// Write to file
const outputPath = path.join(__dirname, '../PAGES_OVERVIEW.md');
fs.writeFileSync(outputPath, markdown, 'utf-8');

console.log('✅ Pagina overzicht gegenereerd!');
console.log(`📄 Bestand: ${outputPath}`);
console.log(`📊 Totaal aantal pagina's: ${pages.length}`);
console.log(`📁 Aantal categorieën: ${sortedCategories.length}`);
console.log('\n📋 Categorieën:');
sortedCategories.forEach(cat => {
  console.log(`   - ${cat}: ${categorizedPages[cat].length} pagina's`);
});
