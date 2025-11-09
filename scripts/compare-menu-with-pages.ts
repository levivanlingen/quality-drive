import * as fs from 'fs';
import * as path from 'path';

const menuCities = {
  autorijles: [
    'Den Haag', 'Zoetermeer', 'Delft', 'Rijswijk', 'Voorburg', 'Nootdorp',
    'Berkel en Rodenrijs', 'Bergschenhoek', 'Bleiswijk', 'Lansingerland',
    'Pijnacker', 'Wateringen', 'Leidschendam'
  ],
  motorrijles: [
    'Den Haag', 'Zoetermeer', 'Delft', 'Rijswijk', 'Voorburg', 'Nootdorp',
    'Berkel en Rodenrijs', 'Bergschenhoek', 'Bleiswijk', 'Lansingerland',
    'Pijnacker', 'Wateringen', 'Leidschendam'
  ],
  taxiRijles: [
    'Delft', 'Den Haag', 'Lansingerland', 'Leidschenveen', 'Nootdorp',
    'Rijswijk', 'Voorburg', 'Wateringen', 'Ypenburg', 'Zoetermeer'
  ],
  automatRijles: [
    'Delft', 'Den Haag', 'Nootdorp', 'Voorburg', 'Zoetermeer'
  ]
};

console.log('🔍 Vergelijking Menu vs PAGES_LIST.md\n');

const pagesListPath = path.join(process.cwd(), 'PAGES_LIST.md');
const content = fs.readFileSync(pagesListPath, 'utf8');

console.log('📋 AUTORIJLES:\n');
menuCities.autorijles.forEach(city => {
  const slug = `rijschool-${city.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`${exists ? '✅' : '❌'} ${city} (${slug})`);
});

console.log('\n📋 MOTORRIJLES:\n');
menuCities.motorrijles.forEach(city => {
  const slug = `motorrijschool-${city.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`${exists ? '✅' : '❌'} ${city} (${slug})`);
});

console.log('\n📋 TAXI RIJLES:\n');
menuCities.taxiRijles.forEach(city => {
  const slug = `taxi-rijles-${city.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`${exists ? '✅' : '❌'} ${city} (${slug})`);
});

console.log('\n📋 AUTOMAAT RIJLES:\n');
menuCities.automatRijles.forEach(city => {
  const slug = `rijschool-automaat-${city.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`${exists ? '✅' : '❌'} ${city} (${slug})`);
});
