import fs from 'fs';
import path from 'path';

// Verwachte afbeeldingen volgens het mapping script
const expectedImages: Record<string, string> = {
  'motorrijschool-den-haag': '/uploads/85468_fullimage_wandelaars-op-het-plein-met-op-de-achtergrond-de-skyline-van-den-haag-©-jurjen-drenth-via-the-hague-partners.webp',
  'motorrijschool-zoetermeer': '/uploads/ANWB-Rijopleiding-Motorrijles-shoot-2021-14.webp',
  'motorrijschool-delft': '/uploads/Delft_shutterstock_581347357.webp',
  'motorrijschool-rijswijk': '/uploads/27352_fullimage_rijswijk-211114.webp',
  'motorrijschool-voorburg': '/uploads/Het-Sluisje-van-Leidschendam-Voorburg-foto-Sake-Witteveen.webp',
  'motorrijschool-nootdorp': '/uploads/nootdorp.webp',
  'motorrijschool-wateringen': '/uploads/Eerste-lange-motorrit.jpg',
  'motorrijschool-leidschenveen': '/uploads/Header-3000-ANWB-Rijopleiding-Motor-4-3000-px.webp',
  'motorrijschool-ypenburg': '/uploads/Bax-opleidingen-motor-rijbewijs-tilburg-denbosch_20240626165109577.webp',
  'motorrijschool-lansingerland': '/uploads/Autorijschool-Motorrijschool-Les4You-Breda-Verkeer-006.webp',
};

console.log('🔍 Checking of verwachte afbeeldingsbestanden bestaan...\n');
console.log('='.repeat(80));
console.log('\n');

const missing: string[] = [];
const exists: string[] = [];

for (const [slug, imagePath] of Object.entries(expectedImages)) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  const fileExists = fs.existsSync(fullPath);

  console.log(`\n📍 ${slug}:`);
  console.log(`   Verwacht bestand: ${imagePath}`);

  if (fileExists) {
    const stats = fs.statSync(fullPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ✅ Bestand bestaat (${fileSizeKB} KB)`);
    exists.push(slug);
  } else {
    console.log(`   ❌ Bestand bestaat NIET: ${fullPath}`);
    missing.push(slug);
  }
}

console.log('\n');
console.log('='.repeat(80));
console.log('📊 SAMENVATTING');
console.log('='.repeat(80));
console.log(`\nTotaal steden: ${Object.keys(expectedImages).length}`);
console.log(`✅ Bestanden aanwezig: ${exists.length}`);
console.log(`❌ Bestanden ontbreken: ${missing.length}`);

if (missing.length > 0) {
  console.log('\n❌ ONTBREKENDE BESTANDEN:');
  missing.forEach((slug, i) => {
    console.log(`  ${i + 1}. ${slug}: ${expectedImages[slug]}`);
  });
}

console.log('\n');
