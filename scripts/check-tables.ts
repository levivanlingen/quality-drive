import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTables() {
  try {
    console.log('🔍 Checking database...\n');

    // Get database name
    const dbInfo = await prisma.$queryRaw<any[]>`
      SELECT current_database() as database_name;
    `;
    console.log('📊 Current database:', dbInfo[0].database_name);

    // List all schemas
    const schemas = await prisma.$queryRaw<any[]>`
      SELECT schema_name
      FROM information_schema.schemata
      ORDER BY schema_name;
    `;
    console.log('\n📂 Schemas:');
    schemas.forEach(s => console.log(`  - ${s.schema_name}`));

    // List all tables in public schema
    const tables = await prisma.$queryRaw<any[]>`
      SELECT
        table_schema,
        table_name,
        table_type
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    console.log('\n📋 Tables in public schema:');
    if (tables.length === 0) {
      console.log('  ⚠️  NO TABLES FOUND!');
    } else {
      tables.forEach(t => console.log(`  - ${t.table_name} (${t.table_type})`));
    }

    // Check all schemas for our tables
    const allTables = await prisma.$queryRaw<any[]>`
      SELECT
        table_schema,
        table_name
      FROM information_schema.tables
      WHERE table_name IN ('Page', 'Location', '_prisma_migrations')
      ORDER BY table_schema, table_name;
    `;

    console.log('\n🔎 Looking for Page/Location tables in all schemas:');
    if (allTables.length === 0) {
      console.log('  ⚠️  Tables NOT FOUND in any schema!');
    } else {
      allTables.forEach(t => console.log(`  - ${t.table_schema}.${t.table_name}`));
    }

    // Try to count records
    try {
      const pageCount = await prisma.page.count();
      const locationCount = await prisma.location.count();
      console.log('\n✅ Records found:');
      console.log(`  - Pages: ${pageCount}`);
      console.log(`  - Locations: ${locationCount}`);
    } catch (e) {
      console.log('\n❌ Could not count records:', (e as Error).message);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables();
