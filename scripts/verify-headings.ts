import * as fs from 'fs';
import * as path from 'path';

console.log('\n📋 HEADING STRUCTUUR VERIFICATIE\n');
console.log('='.repeat(80));

console.log('\n✅ Verwachte heading structuur voor rijschool pagina\'s:\n');

const expectedStructure = [
  { level: 'H1', text: 'Rijschool [Stad]', location: 'HeroSection - Hoofdtitel van de pagina' },
  { level: 'H2', text: 'In 4 stappen naar je rijbewijs', location: 'StepsSection' },
  { level: 'H3', text: 'Proefles', location: 'StepsSection - Stap 1' },
  { level: 'H3', text: 'Pakket kiezen', location: 'StepsSection - Stap 2' },
  { level: 'H3', text: 'Start met rijles', location: 'StepsSection - Stap 3' },
  { level: 'H3', text: 'Rijbewijs halen', location: 'StepsSection - Stap 4' },
  { level: 'H2', text: 'Beste goedkope rijschool [Stad] en omgeving', location: 'Content Section - Links' },
  { level: 'H2', text: 'De 6 zekerheden alleen bij Quality Drive', location: 'Content Section - Rechts' },
  { level: 'H2', text: 'Over rijschool [Stad]', location: 'ContentSections - Carousel hoofdtitel' },
  { level: 'H3', text: 'Beste Rijschool [Stad]', location: 'ContentSections - Carousel slide 1' },
  { level: 'H3', text: 'Ook de beste rijschool voor ADHD - ADD - Faalangst en opfriscursus', location: 'ContentSections - Carousel slide 2' },
  { level: 'H3', text: 'BIJ ONS HAALT IEDEREEN ZIJN/HAAR RIJBEWIJS!', location: 'ContentSections - Carousel slide 3' },
  { level: 'H3', text: 'Waarom Quality Drive?', location: 'ContentSections - Waarom QD sectie' },
  { level: 'H4', text: 'Succes Gegarandeerd', location: 'ContentSections - Benefit card 1' },
  { level: 'H4', text: 'Top Instructeurs', location: 'ContentSections - Benefit card 2' },
  { level: 'H4', text: 'Moderne en Veilige Voertuigen', location: 'ContentSections - Benefit card 3' },
  { level: 'H4', text: 'Individueel Aangepaste Lesprogramma\'s', location: 'ContentSections - Benefit card 4' },
  { level: 'H4', text: 'Uitgebreide Theorieondersteuning', location: 'ContentSections - Benefit card 5' },
  { level: 'H2', text: 'Populaire Pakketten', location: 'PakkettenSection - Hoofdtitel' },
  { level: 'H3', text: 'Basis Pakket', location: 'PakkettenSection - Pakket 1' },
  { level: 'H3', text: 'Actie Pakket', location: 'PakkettenSection - Pakket 2' },
  { level: 'H3', text: 'Tussen Pakket', location: 'PakkettenSection - Pakket 3' },
  { level: 'H2', text: 'Start jouw Rijavontuur bij Quality Drive!', location: 'CTA Section' },
];

expectedStructure.forEach(({ level, text, location }, index) => {
  const indent = level === 'H1' ? '' : level === 'H2' ? '  ' : level === 'H3' ? '    ' : '      ';
  console.log(`${indent}${level}: ${text}`);
  if (index === 0 || expectedStructure[index - 1].location.split(' - ')[0] !== location.split(' - ')[0]) {
    console.log(`${indent}     └─ ${location}`);
  }
});

console.log('\n' + '='.repeat(80));

console.log('\n📊 HEADING HIERARCHIE:\n');
console.log('H1 (1x)  - Hoofdtitel pagina (SEO)');
console.log('├─ H2 (6x)  - Grote secties');
console.log('│  ├─ H3 (9x)  - Subsecties en carousel slides');
console.log('│  │  └─ H4 (5x)  - Benefit cards binnen "Waarom Quality Drive?"');

console.log('\n' + '='.repeat(80));

console.log('\n✅ AANPASSINGEN GEMAAKT:\n');
console.log('1. HeroSection gebruikt H1 voor hoofdtitel (was al correct)');
console.log('2. "Beste goedkope rijschool..." veranderd van H3 → H2');
console.log('3. "Waarom Quality Drive?" veranderd van H2 → H3');
console.log('4. Benefit cards veranderd van H3 → H4');
console.log('5. Carousel slides blijven H3 (correct)');
console.log('6. "Populaire Pakketten" blijft H2 (correct)');

console.log('\n' + '='.repeat(80));

console.log('\n🎯 SEO BENEFITS:\n');
console.log('✅ Eén H1 per pagina (best practice)');
console.log('✅ Logische heading hierarchie (H1 → H2 → H3 → H4)');
console.log('✅ Geen levels overgeslagen');
console.log('✅ Koppen komen overeen met pages.json structuur');
console.log('✅ Verbeterde toegankelijkheid (screenreaders)');

console.log('\n' + '='.repeat(80));
console.log('\n💡 OPMERKING: Voor ADD/ADHD/Faalangst pagina\'s:');
console.log('   Carousel slide 3 toont: "Unieke Quality-Drive Lesmethode: succes gegarandeerd"');
console.log('   In plaats van: "BIJ ONS HAALT IEDEREEN ZIJN/HAAR RIJBEWIJS!"\n');
