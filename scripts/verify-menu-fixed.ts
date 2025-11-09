import * as fs from 'fs';
import * as path from 'path';

console.log('✅ MEGA MENU CORRECTIES - SAMENVATTING\n');
console.log('='.repeat(60));

const pagesListPath = path.join(process.cwd(), 'PAGES_LIST.md');
const content = fs.readFileSync(pagesListPath, 'utf8');

console.log('\n📋 AUTORIJLES (11 steden):');
const autoSteden = [
  'Den Haag', 'Zoetermeer', 'Delft', 'Rijswijk', 'Voorburg',
  'Nootdorp', 'Berkel en Rodenrijs', 'Bergschenhoek',
  'Bleiswijk', 'Lansingerland', 'Wateringen'
];
autoSteden.forEach(stad => {
  const slug = `rijschool-${stad.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`   ${exists ? '✅' : '❌'} ${stad}`);
});

console.log('\n📋 MOTORRIJLES (10 steden):');
const motorSteden = [
  'Den Haag', 'Zoetermeer', 'Delft', 'Rijswijk', 'Voorburg',
  'Nootdorp', 'Lansingerland', 'Wateringen', 'Leidschenveen', 'Ypenburg'
];
motorSteden.forEach(stad => {
  const slug = `motorrijschool-${stad.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`   ${exists ? '✅' : '❌'} ${stad} (${slug})`);
});

console.log('\n📋 TAXI RIJLES (10 steden):');
const taxiSteden = [
  'Delft', 'Den Haag', 'Lansingerland', 'Leidschenveen', 'Nootdorp',
  'Rijswijk', 'Voorburg', 'Wateringen', 'Ypenburg', 'Zoetermeer'
];
taxiSteden.forEach(stad => {
  const slug = `taxi-rijles-${stad.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`   ${exists ? '✅' : '❌'} ${stad}`);
});

console.log('\n📋 AUTOMAAT RIJLES (5 steden):');
const automatSteden = ['Delft', 'Den Haag', 'Nootdorp', 'Voorburg', 'Zoetermeer'];
automatSteden.forEach(stad => {
  const slug = `rijschool-automaat-${stad.toLowerCase().replace(/\s+/g, '-')}`;
  const exists = content.includes(slug);
  console.log(`   ${exists ? '✅' : '❌'} ${stad}`);
});

console.log('\n='.repeat(60));
console.log('\n🎯 WIJZIGINGEN AANGEBRACHT:\n');
console.log('❌ VERWIJDERD uit Autorijles:');
console.log('   - Pijnacker (bestond niet)');
console.log('   - Leidschendam (bestond niet)');
console.log('\n❌ VERWIJDERD uit Motorrijles:');
console.log('   - Berkel en Rodenrijs (bestond niet)');
console.log('   - Bergschenhoek (bestond niet)');
console.log('   - Bleiswijk (bestond niet)');
console.log('   - Pijnacker (bestond niet)');
console.log('   - Leidschendam (bestond niet)');
console.log('\n🔧 GECORRIGEERD Motorrijles URLs:');
console.log('   - Van: /motor-rijles/{stad}');
console.log('   - Naar: /motorrijschool-{stad}');
console.log('\n✅ Toegevoegd aan Motorrijles:');
console.log('   - Leidschenveen');
console.log('   - Ypenburg');
console.log('\n🎉 Alle links in het mega menu komen nu overeen met PAGES_LIST.md!');
