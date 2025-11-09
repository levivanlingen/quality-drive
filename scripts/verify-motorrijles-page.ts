import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function verifyMotorrijlesPage() {
  console.log('\n🏍️  MOTORRIJLES PAGINA VERIFICATIE\n');
  console.log('='.repeat(80));

  // Expected motor cities from menu
  const expectedCities = [
    'Den Haag',
    'Zoetermeer',
    'Delft',
    'Rijswijk',
    'Voorburg',
    'Nootdorp',
    'Lansingerland',
    'Wateringen',
    'Leidschenveen',
    'Ypenburg',
  ];

  console.log('\n📋 Verwachte motorsteden (10):');
  console.log('-'.repeat(80));
  expectedCities.forEach((city, index) => {
    console.log(`  ${(index + 1).toString().padStart(2)}. ${city}`);
  });

  // Get all motor pages from database
  const motorPages = await prisma.page.findMany({
    where: {
      category: PageCategory.RIJSCHOOL_MOTOR,
    },
    include: {
      location: true,
    },
    orderBy: {
      slug: 'asc',
    },
  });

  console.log(`\n📊 Database resultaten:`);
  console.log('-'.repeat(80));
  console.log(`Totaal motorrijschool pagina's: ${motorPages.length}`);

  if (motorPages.length === 0) {
    console.log('\n❌ FOUT: Geen motorrijschool pagina\'s gevonden in database!');
    console.log('    De motorrijles pagina zal geen steden tonen.');
    await prisma.$disconnect();
    return;
  }

  console.log('\n📋 Gevonden motorrijschool pagina\'s:');
  console.log('-'.repeat(80));
  motorPages.forEach((page, index) => {
    const locationName = page.location?.name || 'GEEN LOCATIE';
    console.log(`  ${(index + 1).toString().padStart(2)}. ${page.slug.padEnd(40)} → ${locationName}`);
  });

  // Check which expected cities exist
  const existingCities = motorPages
    .filter(p => p.location)
    .map(p => p.location!.name);

  const missingCities = expectedCities.filter(city => !existingCities.includes(city));
  const extraCities = existingCities.filter(city => !expectedCities.includes(city));

  console.log('\n✅ AANWEZIGE STEDEN:');
  console.log('-'.repeat(80));
  expectedCities.forEach(city => {
    const exists = existingCities.includes(city);
    console.log(`  ${exists ? '✅' : '❌'} ${city}`);
  });

  if (missingCities.length > 0) {
    console.log('\n⚠️  ONTBREKENDE STEDEN:');
    console.log('-'.repeat(80));
    missingCities.forEach(city => {
      console.log(`  - ${city}`);
    });
  }

  if (extraCities.length > 0) {
    console.log('\n📌 EXTRA STEDEN (niet in verwachte lijst):');
    console.log('-'.repeat(80));
    extraCities.forEach(city => {
      console.log(`  + ${city}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n🎯 PAGINA INFORMATIE:\n');
  console.log('URL: /motorrijles');
  console.log('Template: app/motorrijles/page.tsx');
  console.log('Stijl: app/motorrijles/motorrijles.module.css');
  console.log('\nStructuur:');
  console.log('  - H1: Motorrijles (HeroSection)');
  console.log('  - H2: Motorrijles in [X] steden');
  console.log('  - H3: [Stad naam] (per stad card)');
  console.log('  - H2: Motorrijlessen bij Quality Drive');
  console.log('  - H3: Feature titels (3x)');
  console.log('  - H2: Start jouw Rijavontuur bij Quality Drive! (CTA)');

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ CONCLUSIE:\n');

  if (missingCities.length === 0) {
    console.log(`Alle ${expectedCities.length} verwachte motorsteden zijn aanwezig in de database! 🎉`);
    console.log('De motorrijles pagina zal correct werken.');
  } else {
    console.log(`⚠️  ${missingCities.length} steden ontbreken in de database.`);
    console.log('De motorrijles pagina zal werken, maar niet alle steden tonen.');
  }

  await prisma.$disconnect();
}

verifyMotorrijlesPage();
