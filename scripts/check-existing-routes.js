/**
 * Check Existing Routes
 *
 * Compares pages.json with actual file system routes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read existing pages from pages.json
const pagesPath = path.join(__dirname, '../data/pages.json');
const allPages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Get all existing page.tsx files
const findCommand = 'find /home/runner/workspace/app -name "page.tsx" -type f | grep -v node_modules';
const routeFiles = execSync(findCommand).toString().split('\n').filter(Boolean);

// Extract route patterns from file paths
const existingRoutes = new Set();
routeFiles.forEach(file => {
  const route = file
    .replace('/home/runner/workspace/app', '')
    .replace('/page.tsx', '')
    .replace(/^\//, '');

  if (route === '') {
    existingRoutes.add('home');
  } else {
    existingRoutes.add(route);
  }
});

// Check which pages have routes
const pagesWithRoutes = [];
const pagesWithoutRoutes = [];

allPages.forEach(page => {
  const slug = page.slug;
  let hasRoute = false;

  // Direct match
  if (existingRoutes.has(slug)) {
    hasRoute = true;
  }
  // Check dynamic routes
  else if (slug.startsWith('rijschool-') && existingRoutes.has('rijschool/[city]')) {
    hasRoute = true;
  }
  else if (slug.startsWith('taxi-rijles-') && existingRoutes.has('taxi-rijles/[city]')) {
    hasRoute = true;
  }
  else if (slug.startsWith('post-') && existingRoutes.has('blog/[slug]')) {
    hasRoute = true;
  }
  else if (slug.includes('blog') && slug !== 'blog' && existingRoutes.has('blog/[slug]')) {
    hasRoute = true;
  }

  if (hasRoute) {
    pagesWithRoutes.push(page);
  } else {
    pagesWithoutRoutes.push(page);
  }
});

// Generate report
let report = `# Routes Analyse Rapport\n\n`;
report += `Gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n\n`;
report += `---\n\n`;

report += `## Samenvatting\n\n`;
report += `- **Totaal pagina's in database:** ${allPages.length}\n`;
report += `- **Pagina's met routes:** ${pagesWithRoutes.length}\n`;
report += `- **Pagina's ZONDER routes:** ${pagesWithoutRoutes.length}\n`;
report += `- **Fysieke route bestanden:** ${routeFiles.length}\n\n`;

report += `---\n\n`;

report += `## ✅ Bestaande Routes (${routeFiles.length})\n\n`;
routeFiles.sort().forEach((file, index) => {
  const route = file.replace('/home/runner/workspace/app', '').replace('/page.tsx', '') || '/';
  report += `${index + 1}. \`${route}\`\n`;
});

report += `\n---\n\n`;

if (pagesWithoutRoutes.length > 0) {
  report += `## ❌ Pagina's Zonder Routes (${pagesWithoutRoutes.length})\n\n`;
  report += `Deze pagina's staan in de database maar hebben geen route:\n\n`;

  // Group by type
  const groups = {
    'Algemeen': [],
    'Motorrijschool Steden': [],
    'Motor Snelcursus': [],
    'Automaat Rijschool Steden': [],
    'Overige': []
  };

  pagesWithoutRoutes.forEach(page => {
    if (page.slug.includes('motorrijschool-')) {
      groups['Motorrijschool Steden'].push(page);
    } else if (page.slug.includes('snel-je-motorrijbewijs')) {
      groups['Motor Snelcursus'].push(page);
    } else if (page.slug.includes('rijschool-automaat-')) {
      groups['Automaat Rijschool Steden'].push(page);
    } else if (['actie', 'algemene-voorwaarden', 'reviews', 'team', 'vacature', 'veelgestelde-vragen'].includes(page.slug)) {
      groups['Algemeen'].push(page);
    } else {
      groups['Overige'].push(page);
    }
  });

  for (const [groupName, pages] of Object.entries(groups)) {
    if (pages.length > 0) {
      report += `### ${groupName} (${pages.length})\n\n`;
      pages.sort((a, b) => a.title.localeCompare(b.title));
      pages.forEach(page => {
        report += `- **${page.title}** - \`${page.slug}\` - /${page.slug}\n`;
      });
      report += `\n`;
    }
  }
}

report += `---\n\n`;

report += `## 📋 Benodigde Acties\n\n`;
report += `Om alle pagina's toegankelijk te maken, moeten de volgende routes aangemaakt worden:\n\n`;

if (pagesWithoutRoutes.some(p => p.slug === 'motorrijles')) {
  report += `1. **Motorrijles hoofdpagina** - \`app/motorrijles/page.tsx\`\n`;
}
if (pagesWithoutRoutes.some(p => p.slug === 'automaat-rijles')) {
  report += `2. **Automaat rijles hoofdpagina** - \`app/automaat-rijles/page.tsx\`\n`;
}
if (pagesWithoutRoutes.some(p => p.slug.includes('motorrijschool-'))) {
  report += `3. **Motor steden (dynamisch)** - \`app/motor-rijles/[city]/page.tsx\` of \`app/motorrijschool/[city]/page.tsx\`\n`;
}
if (pagesWithoutRoutes.some(p => p.slug.includes('rijschool-automaat-'))) {
  report += `4. **Automaat steden (dynamisch)** - \`app/automaat-rijles/[city]/page.tsx\`\n`;
}
if (pagesWithoutRoutes.some(p => ['actie', 'algemene-voorwaarden', 'reviews', 'team', 'vacature', 'veelgestelde-vragen'].includes(p.slug))) {
  report += `5. **Statische pagina's** - Voor elke algemene pagina een aparte route\n`;
}

report += `\n`;

// Write report
const reportPath = path.join(__dirname, '../ROUTES_ANALYSIS.md');
fs.writeFileSync(reportPath, report, 'utf-8');

// Console output
console.log('📊 Routes Analyse\n');
console.log('📄 Totaal pagina\'s in database:', allPages.length);
console.log('✅ Pagina\'s met routes:', pagesWithRoutes.length);
console.log('❌ Pagina\'s ZONDER routes:', pagesWithoutRoutes.length);
console.log('\n📝 Rapport opgeslagen in:', reportPath);

if (pagesWithoutRoutes.length > 0) {
  console.log('\n❌ Top 10 ontbrekende routes:');
  pagesWithoutRoutes.slice(0, 10).forEach(page => {
    console.log(`   - ${page.title} (${page.slug})`);
  });
  if (pagesWithoutRoutes.length > 10) {
    console.log(`   ... en ${pagesWithoutRoutes.length - 10} meer`);
  }
}
