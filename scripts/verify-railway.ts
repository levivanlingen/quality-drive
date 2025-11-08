import prisma from '../lib/prisma';

async function verify() {
  console.log('🔍 Verifying Railway database connection...\n');

  const dbUrl = process.env.DATABASE_URL;
  console.log('📍 DATABASE_URL points to:', dbUrl?.includes('railway') ? '✅ Railway' : '❌ Replit (helium)');

  const pageCount = await prisma.page.count();
  const locationCount = await prisma.location.count();

  console.log('\n📊 Data in database:');
  console.log(`  Pages: ${pageCount}`);
  console.log(`  Locations: ${locationCount}`);

  if (pageCount === 62 && locationCount === 23) {
    console.log('\n✅ Perfect! Data is in Railway database!');
  } else {
    console.log('\n⚠️  Data mismatch - check DATABASE_URL in Secrets');
  }

  await prisma.$disconnect();
}

verify();
