import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabaseInfo() {
  try {
    console.log('🔍 Checking which database we are connected to...\n');

    // Get database connection info
    const result = await prisma.$queryRaw<Array<{
      current_database: string;
      current_user: string;
      version: string;
    }>>`
      SELECT
        current_database() as current_database,
        current_user as current_user,
        version() as version;
    `;

    console.log('📊 Database Connection Info:');
    console.log('Database:', result[0].current_database);
    console.log('User:', result[0].current_user);
    console.log('Version:', result[0].version.substring(0, 50) + '...');

    // Check if featuredImageAlt column exists
    const columns = await prisma.$queryRaw<Array<{
      column_name: string;
      data_type: string;
    }>>`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'Page'
      AND column_name = 'featuredImageAlt';
    `;

    console.log('\n🔍 Column Check:');
    if (columns.length > 0) {
      console.log(`✅ featuredImageAlt EXISTS in database "${result[0].current_database}"`);
      console.log('   Data type:', columns[0].data_type);
    } else {
      console.log(`❌ featuredImageAlt NOT FOUND in database "${result[0].current_database}"`);
    }

    // Show DATABASE_URL (masked)
    const dbUrl = process.env.DATABASE_URL || '';
    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@').substring(0, 100);
    console.log('\n🔗 DATABASE_URL (masked):');
    console.log(maskedUrl);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseInfo();
