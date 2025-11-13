import { PrismaClient, PageCategory } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Verwachte afbeeldingen per stad
const expectedImages: Record<string, { image: string; alt: string }> = {
  'motorrijschool-den-haag': {
    image: '/uploads/85468_fullimage_wandelaars-op-het-plein-met-op-de-achtergrond-de-skyline-van-den-haag-©-jurjen-drenth-via-the-hague-partners.webp',
    alt: 'Motorrijschool Den Haag - Quality Drive motorrijlessen in Den Haag',
  },
  'motorrijschool-zoetermeer': {
    image: '/uploads/ANWB-Rijopleiding-Motorrijles-shoot-2021-14.webp',
    alt: 'Motorrijschool Zoetermeer - Quality Drive motorrijlessen in Zoetermeer',
  },
  'motorrijschool-delft': {
    image: '/uploads/Delft_shutterstock_581347357.webp',
    alt: 'Motorrijschool Delft - Quality Drive motorrijlessen in Delft',
  },
  'motorrijschool-rijswijk': {
    image: '/uploads/27352_fullimage_rijswijk-211114.webp',
    alt: 'Motorrijschool Rijswijk - Quality Drive motorrijlessen in Rijswijk',
  },
  'motorrijschool-voorburg': {
    image: '/uploads/Het-Sluisje-van-Leidschendam-Voorburg-foto-Sake-Witteveen.webp',
    alt: 'Motorrijschool Voorburg - Quality Drive motorrijlessen in Voorburg',
  },
  'motorrijschool-nootdorp': {
    image: '/uploads/nootdorp.webp',
    alt: 'Motorrijschool Nootdorp - Quality Drive motorrijlessen in Nootdorp',
  },
  'motorrijschool-wateringen': {
    image: '/uploads/Eerste-lange-motorrit.jpg',
    alt: 'Motorrijschool Wateringen - Quality Drive motorrijlessen in Wateringen',
  },
  'motorrijschool-leidschenveen': {
    image: '/uploads/Header-3000-ANWB-Rijopleiding-Motor-4-3000-px.webp',
    alt: 'Motorrijschool Leidschenveen - Quality Drive motorrijlessen in Leidschenveen',
  },
  'motorrijschool-ypenburg': {
    image: '/uploads/Bax-opleidingen-motor-rijbewijs-tilburg-denbosch_20240626165109577.webp',
    alt: 'Motorrijschool Ypenburg - Quality Drive motorrijlessen in Ypenburg',
  },
  'motorrijschool-lansingerland': {
    image: '/uploads/Autorijschool-Motorrijschool-Les4You-Breda-Verkeer-006.webp',
    alt: 'Motorrijschool Lansingerland - Quality Drive motorrijlessen in Lansingerland',
  },
};

async function checkMotorrijschoolImages() {
  console.log('🔍 Checking motorrijschool stad pagina afbeeldingen...\n');
  console.log('='.repeat(80));
  console.log('\n');

  const issues: string[] = [];
  const warnings: string[] = [];
  const success: string[] = [];

  // Check alle steden
  for (const [slug, expected] of Object.entries(expectedImages)) {
    console.log(`\n📍 Checking ${slug}:`);
    console.log('-'.repeat(80));

    // Check database
    const page = await prisma.page.findFirst({
      where: {
        slug: slug,
        category: PageCategory.RIJSCHOOL_MOTOR,
      },
      select: {
        slug: true,
        title: true,
        featuredImage: true,
        featuredImageAlt: true,
      },
    });

    if (!page) {
      console.log(`  ❌ PROBLEEM: Pagina niet gevonden in database`);
      issues.push(`${slug}: Pagina niet gevonden in database`);
      continue;
    }

    console.log(`  ✅ Pagina gevonden: "${page.title}"`);

    // Check featured image
    if (!page.featuredImage) {
      console.log(`  ❌ PROBLEEM: Geen featuredImage in database`);
      issues.push(`${slug}: Geen featuredImage in database`);
    } else if (page.featuredImage !== expected.image) {
      console.log(`  ⚠️  WAARSCHUWING: Verkeerde afbeelding in database`);
      console.log(`     Verwacht: ${expected.image}`);
      console.log(`     In database: ${page.featuredImage}`);
      warnings.push(`${slug}: Verkeerde afbeelding (expected: ${expected.image}, got: ${page.featuredImage})`);
    } else {
      console.log(`  ✅ Correcte featuredImage: ${page.featuredImage}`);
      success.push(`${slug}: Correct`);
    }

    // Check alt text
    if (!page.featuredImageAlt) {
      console.log(`  ⚠️  WAARSCHUWING: Geen alt text in database`);
      warnings.push(`${slug}: Geen alt text`);
    } else if (page.featuredImageAlt !== expected.alt) {
      console.log(`  ⚠️  WAARSCHUWING: Verkeerde alt text`);
      console.log(`     Verwacht: ${expected.alt}`);
      console.log(`     In database: ${page.featuredImageAlt}`);
      warnings.push(`${slug}: Verkeerde alt text`);
    } else {
      console.log(`  ✅ Correcte alt text`);
    }

    // Check of bestand bestaat
    if (page.featuredImage) {
      const imagePath = path.join(process.cwd(), 'public', page.featuredImage);
      if (fs.existsSync(imagePath)) {
        console.log(`  ✅ Bestand bestaat: ${imagePath}`);
      } else {
        console.log(`  ❌ PROBLEEM: Bestand bestaat NIET: ${imagePath}`);
        issues.push(`${slug}: Bestand bestaat niet op pad ${imagePath}`);
      }
    }
  }

  // Samenvatting
  console.log('\n');
  console.log('='.repeat(80));
  console.log('📊 SAMENVATTING');
  console.log('='.repeat(80));
  console.log(`\nTotaal steden: ${Object.keys(expectedImages).length}`);
  console.log(`✅ Correct: ${success.length}`);
  console.log(`⚠️  Waarschuwingen: ${warnings.length}`);
  console.log(`❌ Problemen: ${issues.length}`);

  if (warnings.length > 0) {
    console.log('\n⚠️  WAARSCHUWINGEN:');
    warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
  }

  if (issues.length > 0) {
    console.log('\n❌ PROBLEMEN:');
    issues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n🎉 PERFECT! Alle motorrijschool stad pagina afbeeldingen zijn correct!');
  }

  console.log('\n');
}

checkMotorrijschoolImages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
