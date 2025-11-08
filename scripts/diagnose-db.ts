import prisma from '../lib/prisma';

async function diagnoseDatabaseIssues() {
  console.log('🔍 Comprehensive Database Diagnosis\n');
  console.log('='.repeat(60));

  try {
    // 1. Check database connection
    console.log('\n1️⃣ CONNECTION TEST');
    await prisma.$connect();
    const dbInfo = await prisma.$queryRaw<any[]>`
      SELECT
        current_database() as database,
        current_schema() as schema,
        version() as version
    `;
    console.log('✅ Connected to:', dbInfo[0].database);
    console.log('   Schema:', dbInfo[0].schema);
    console.log('   Version:', dbInfo[0].version.split('\n')[0]);

    // 2. Check table structure
    console.log('\n2️⃣ TABLE STRUCTURE');
    const tables = await prisma.$queryRaw<any[]>`
      SELECT
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    console.log('Tables found:', tables.length);
    tables.forEach(t => {
      console.log(`   - ${t.table_name} (${t.column_count} columns)`);
    });

    // 3. Check Page table columns
    console.log('\n3️⃣ PAGE TABLE COLUMNS');
    const pageColumns = await prisma.$queryRaw<any[]>`
      SELECT
        column_name,
        data_type,
        character_maximum_length,
        is_nullable
      FROM information_schema.columns
      WHERE table_name = 'Page'
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;

    console.log('Page table columns:', pageColumns.length);
    pageColumns.forEach(col => {
      const type = col.character_maximum_length
        ? `${col.data_type}(${col.character_maximum_length})`
        : col.data_type;
      console.log(`   - ${col.column_name}: ${type} ${col.is_nullable === 'YES' ? '(nullable)' : ''}`);
    });

    // 4. Check constraints and indexes
    console.log('\n4️⃣ CONSTRAINTS & INDEXES');
    const constraints = await prisma.$queryRaw<any[]>`
      SELECT
        conname as constraint_name,
        contype as constraint_type
      FROM pg_constraint
      WHERE conrelid = '"Page"'::regclass;
    `;

    console.log('Constraints:', constraints.length);
    constraints.forEach(c => {
      const types: any = { p: 'PRIMARY KEY', f: 'FOREIGN KEY', u: 'UNIQUE', c: 'CHECK' };
      console.log(`   - ${c.constraint_name}: ${types[c.constraint_type] || c.constraint_type}`);
    });

    const indexes = await prisma.$queryRaw<any[]>`
      SELECT
        indexname,
        indexdef
      FROM pg_indexes
      WHERE tablename = 'Page'
      AND schemaname = 'public';
    `;

    console.log('\nIndexes:', indexes.length);
    indexes.forEach(idx => {
      console.log(`   - ${idx.indexname}`);
    });

    // 5. Check for problematic data
    console.log('\n5️⃣ DATA INTEGRITY CHECKS');

    // Check for NULL in required fields
    const nullChecks = await prisma.$queryRaw<any[]>`
      SELECT
        COUNT(*) FILTER (WHERE slug IS NULL) as null_slugs,
        COUNT(*) FILTER (WHERE title IS NULL) as null_titles,
        COUNT(*) FILTER (WHERE content IS NULL) as null_content,
        COUNT(*) FILTER (WHERE category IS NULL) as null_categories
      FROM "Page";
    `;
    console.log('NULL values:');
    console.log(`   - slug: ${nullChecks[0].null_slugs}`);
    console.log(`   - title: ${nullChecks[0].null_titles}`);
    console.log(`   - content: ${nullChecks[0].null_content}`);
    console.log(`   - category: ${nullChecks[0].null_categories}`);

    // Check for duplicate slugs
    const duplicates = await prisma.$queryRaw<any[]>`
      SELECT slug, COUNT(*) as count
      FROM "Page"
      GROUP BY slug
      HAVING COUNT(*) > 1;
    `;

    if (duplicates.length > 0) {
      console.log('\n❌ DUPLICATE SLUGS FOUND:', duplicates.length);
      duplicates.forEach(d => {
        console.log(`   - "${d.slug}": ${d.count} times`);
      });
    } else {
      console.log('\n✅ No duplicate slugs');
    }

    // Check foreign key issues
    const fkIssues = await prisma.$queryRaw<any[]>`
      SELECT COUNT(*) as broken_fks
      FROM "Page" p
      WHERE p."locationId" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM "Location" l WHERE l.id = p."locationId"
      );
    `;

    if (parseInt(fkIssues[0].broken_fks) > 0) {
      console.log(`\n❌ BROKEN FOREIGN KEYS: ${fkIssues[0].broken_fks} pages reference non-existent locations`);
    } else {
      console.log('✅ All foreign keys valid');
    }

    // 6. Check encoding
    console.log('\n6️⃣ ENCODING CHECK');
    const encoding = await prisma.$queryRaw<any[]>`
      SELECT
        pg_encoding_to_char(encoding) as encoding,
        datcollate as collation,
        datctype as ctype
      FROM pg_database
      WHERE datname = current_database();
    `;
    console.log('Database encoding:', encoding[0].encoding);
    console.log('Collation:', encoding[0].collation);
    console.log('Character type:', encoding[0].ctype);

    // 7. Try to fetch one page
    console.log('\n7️⃣ SAMPLE DATA FETCH TEST');
    try {
      const samplePage = await prisma.page.findFirst({
        select: {
          id: true,
          slug: true,
          title: true,
        },
      });
      console.log('✅ Can fetch page data:', samplePage?.slug);

      // Try fetching with content
      const pageWithContent = await prisma.page.findFirst({
        where: { id: samplePage?.id },
        select: {
          id: true,
          slug: true,
          content: true,
        },
      });
      console.log('✅ Can fetch page with content');
      console.log(`   Content length: ${pageWithContent?.content?.length || 0} bytes`);
    } catch (err: any) {
      console.log('❌ Error fetching page:', err.message);
    }

    // 8. Check table size
    console.log('\n8️⃣ TABLE SIZE');
    const tableSize = await prisma.$queryRaw<any[]>`
      SELECT
        pg_size_pretty(pg_total_relation_size('"Page"')) as total_size,
        pg_size_pretty(pg_relation_size('"Page"')) as table_size,
        pg_size_pretty(pg_indexes_size('"Page"')) as indexes_size
    `;
    console.log('Page table total size:', tableSize[0].total_size);
    console.log('Table data size:', tableSize[0].table_size);
    console.log('Indexes size:', tableSize[0].indexes_size);

    console.log('\n' + '='.repeat(60));
    console.log('✅ Diagnosis complete!\n');

  } catch (error: any) {
    console.error('\n❌ CRITICAL ERROR:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

diagnoseDatabaseIssues();
