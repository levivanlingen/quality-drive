import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listDatabases() {
  try {
    // List all databases
    const databases = await prisma.$queryRaw<any[]>`
      SELECT datname FROM pg_database
      WHERE datistemplate = false
      ORDER BY datname;
    `;

    console.log('📊 Available databases on server:');
    databases.forEach(db => console.log(`  - ${db.datname}`));

    console.log('\n🔗 Current DATABASE_URL from env:');
    console.log(process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@'));

    console.log('\n📍 Currently connected to:');
    const current = await prisma.$queryRaw<any[]>`SELECT current_database();`;
    console.log(`  ${current[0].current_database}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listDatabases();
