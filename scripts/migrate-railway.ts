import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway'
    }
  }
});

async function runMigration() {
  try {
    console.log('Creating AutorijlesStad table...');

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "AutorijlesStad" (
        "id" SERIAL NOT NULL,
        "locationId" INTEGER NOT NULL,
        "heroTitle" TEXT NOT NULL,
        "heroSubtitle" TEXT NOT NULL,
        "heroImage" TEXT,
        "heroButtonText" TEXT NOT NULL DEFAULT 'Gratis proefles plannen',
        "heroButtonLink" TEXT NOT NULL DEFAULT 'https://calendly.com/qualitydrive/30min',
        "introTitle" TEXT,
        "introText" TEXT,
        "features" JSONB,
        "whyTitle" TEXT NOT NULL DEFAULT 'Waarom kiezen voor Quality Drive?',
        "whyText" TEXT,
        "whyPoints" JSONB,
        "showPricing" BOOLEAN NOT NULL DEFAULT true,
        "pricingTitle" TEXT NOT NULL DEFAULT 'Rijles pakketten',
        "pricingSubtitle" TEXT,
        "packages" JSONB,
        "localTitle" TEXT,
        "localText" TEXT,
        "examLocation" TEXT,
        "popularRoutes" JSONB,
        "showTestimonials" BOOLEAN NOT NULL DEFAULT true,
        "testimonials" JSONB,
        "showFaq" BOOLEAN NOT NULL DEFAULT true,
        "faqTitle" TEXT NOT NULL DEFAULT 'Veelgestelde vragen',
        "faqs" JSONB,
        "ctaTitle" TEXT NOT NULL DEFAULT 'Start vandaag nog!',
        "ctaText" TEXT NOT NULL,
        "ctaButtonText" TEXT NOT NULL DEFAULT 'Gratis proefles plannen',
        "ctaButtonLink" TEXT NOT NULL DEFAULT 'https://calendly.com/qualitydrive/30min',
        "ctaImage" TEXT,
        "studentCount" INTEGER,
        "successRate" DOUBLE PRECISION,
        "yearsActive" INTEGER,
        "instructorCount" INTEGER,
        "seoTitle" TEXT NOT NULL,
        "seoDescription" TEXT NOT NULL,
        "seoKeywords" TEXT,
        "ogImage" TEXT,
        "isPublished" BOOLEAN NOT NULL DEFAULT true,
        "publishedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "AutorijlesStad_pkey" PRIMARY KEY ("id")
      );
    `);

    console.log('✓ Table created');

    console.log('Creating indexes...');
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "AutorijlesStad_locationId_key" ON "AutorijlesStad"("locationId");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AutorijlesStad_locationId_idx" ON "AutorijlesStad"("locationId");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AutorijlesStad_isPublished_idx" ON "AutorijlesStad"("isPublished");`);

    console.log('✓ Indexes created');

    console.log('Adding foreign key...');
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'AutorijlesStad_locationId_fkey'
        ) THEN
          ALTER TABLE "AutorijlesStad" ADD CONSTRAINT "AutorijlesStad_locationId_fkey"
          FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
        END IF;
      END$$;
    `);

    console.log('✓ Foreign key added');
    console.log('✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', (error as Error).message);
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();
