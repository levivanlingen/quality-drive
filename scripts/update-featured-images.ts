import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Update featured images for rijschool pages based on city-specific images
 */
async function updateFeaturedImages() {
  console.log('🖼️  Updating featured images for rijschool pages...\n');

  // Map of slug to featured image (using city-specific images)
  const imageMap: Record<string, string> = {
    'rijschool-den-haag': '/uploads/denhaag2-e1648990540767.webp',
    'rijschool-zoetermeer': '/uploads/zoetermeer-e1648991751494.webp',
    'rijschool-delft': '/uploads/delft-e1648992232754.webp',
    'rijschool-rijswijk': '/uploads/rijswijk-e1648993185158.webp',
    'rijschool-voorburg': '/uploads/voorburg.webp',
    'rijschool-nootdorp': '/uploads/nootdorp.webp',
    'rijschool-berkel-en-rodenrijs': '/uploads/Berkel-en-Rodenrijs-e1648995072944.webp',
    'rijschool-bergschenhoek': '/uploads/bergschenhoek_plaatsnaambord_kopie.webp',
    'rijschool-bleiswijk': '/uploads/buro_loo_lansingerland_masterplan_bleiswijk.webp',
    'rijschool-lansingerland': '/uploads/DCMR-Lansingerland-5-2.webp',

    // Automaat pages
    'rijschool-automaat-den-haag': '/uploads/82645_fullimage_scheveningen-en-den-haag-gezien-vanaf-de-zee-©-the-hague-convention-bureau_1150x663_622x564.webp',
    'rijschool-automaat-zoetermeer': '/uploads/u10-zoetermeer-10-2021-hi-res-154.webp',
    'rijschool-automaat-delft': '/uploads/Delft_shutterstock_581347357.webp',
    'rijschool-automaat-voorburg': '/uploads/Het-Sluisje-van-Leidschendam-Voorburg-foto-Sake-Witteveen.webp',
    'rijschool-automaat-nootdorp': '/uploads/nootdorp.webp',
  };

  let updated = 0;
  let errors = 0;

  for (const [slug, imagePath] of Object.entries(imageMap)) {
    try {
      const result = await prisma.page.updateMany({
        where: {
          slug: slug,
        },
        data: {
          featuredImage: imagePath,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated ${slug}: ${imagePath}`);
        updated++;
      } else {
        console.log(`⚠️  Page not found: ${slug}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${Object.keys(imageMap).length}`);
}

updateFeaturedImages()
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
