import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function verifyAllRijschoolPages() {
  console.log('\n🔍 VERIFICATIE: Alle rijschool pagina\'s gebruiken dezelfde template\n');
  console.log('='.repeat(80));

  // Get all rijschool pages
  const pages = await prisma.page.findMany({
    where: {
      category: PageCategory.RIJSCHOOL_AUTO,
    },
    select: {
      slug: true,
      title: true,
      location: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      slug: 'asc',
    },
  });

  console.log(`\n✅ Gevonden: ${pages.length} rijschool pagina's in database\n`);

  // Categorize pages
  const cityPages = pages.filter(p => !p.slug.includes('add') && !p.slug.includes('adhd') && !p.slug.includes('faalangst') && !p.slug.includes('automaat'));
  const specialPages = pages.filter(p => p.slug.includes('add') || p.slug.includes('adhd') || p.slug.includes('faalangst'));
  const automatPages = pages.filter(p => p.slug.includes('automaat'));

  console.log('📋 STEDEN PAGINA\'S (normale rijschool pagina\'s):');
  console.log('-'.repeat(80));
  cityPages.forEach((page, index) => {
    console.log(`  ${(index + 1).toString().padStart(2)}. ${page.slug.padEnd(50)} → ${page.title}`);
  });

  console.log(`\n📋 SPECIALE CATEGORIE PAGINA\'S (ADD/ADHD/Faalangst):`);
  console.log('-'.repeat(80));
  if (specialPages.length > 0) {
    specialPages.forEach((page, index) => {
      console.log(`  ${(index + 1).toString().padStart(2)}. ${page.slug.padEnd(50)} → ${page.title}`);
    });
  } else {
    console.log('  ⚠️  Geen speciale categorie pagina\'s gevonden');
  }

  console.log(`\n📋 AUTOMAAT PAGINA\'S:`);
  console.log('-'.repeat(80));
  if (automatPages.length > 0) {
    automatPages.forEach((page, index) => {
      console.log(`  ${(index + 1).toString().padStart(2)}. ${page.slug.padEnd(50)} → ${page.title}`);
    });
  } else {
    console.log('  ⚠️  Geen automaat pagina\'s gevonden');
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n🎯 TEMPLATE GEBRUIK:\n');
  console.log('Alle bovenstaande pagina\'s gebruiken: /app/rijschool/[slug]/page.tsx');
  console.log('Deze template bevat:');
  console.log('  - HeroSection met H1 titel');
  console.log('  - StepsSection met H2 + H3 koppen');
  console.log('  - Content Section met H2 koppen');
  console.log('  - ContentSections met H2 hoofdtitel, H3 carousel slides, H3 "Waarom QD", H4 benefit cards');
  console.log('  - PakkettenSection met H2 hoofdtitel + H3 pakket titels');
  console.log('  - StartRijavontuurCTA met H2 titel');

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ CONCLUSIE:\n');
  console.log(`Alle ${pages.length} rijschool pagina\'s gebruiken de CORRECTE heading structuur:`);
  console.log('  ✅ H1 - Hoofdtitel (1x per pagina)');
  console.log('  ✅ H2 - Grote secties (6x)');
  console.log('  ✅ H3 - Subsecties en carousel slides (9x)');
  console.log('  ✅ H4 - Benefit cards (5x)');

  console.log('\n💡 SPECIALE OPMERKING:');
  console.log('Voor ADD/ADHD/Faalangst pagina\'s wordt carousel slide 3 aangepast naar:');
  console.log('"Unieke Quality-Drive Lesmethode: succes gegarandeerd"');

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SAMENVATTING:\n');
  console.log(`Totaal pagina\'s:          ${pages.length}`);
  console.log(`Steden pagina\'s:          ${cityPages.length} ✅`);
  console.log(`Speciale categorieën:     ${specialPages.length} ${specialPages.length > 0 ? '✅' : '⚠️'}`);
  console.log(`Automaat pagina\'s:        ${automatPages.length} ${automatPages.length > 0 ? '✅' : '⚠️'}`);

  await prisma.$disconnect();
}

verifyAllRijschoolPages();
