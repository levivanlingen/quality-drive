const fs = require('fs');

// Load the JSON file
const pages = JSON.parse(fs.readFileSync('pages.json', 'utf-8'));

// Target slugs
const targetSlugs = [
    "motorrijschool-den-haag",
    "motorrijschool-zoetermeer",
    "motorrijschool-delft",
    "motorrijschool-rijswijk",
    "motorrijschool-voorburg",
    "motorrijschool-nootdorp",
    "motorrijschool-wateringen",
    "motorrijschool-leidschenveen",
    "motorrijschool-ypenburg",
    "motorrijschool-lansingerland"
];

// Extract motorrijschool pages
const motorrijschoolPages = {};
for (const page of pages) {
    if (targetSlugs.includes(page.slug)) {
        motorrijschoolPages[page.slug] = page;
    }
}

console.log(`Found ${Object.keys(motorrijschoolPages).length} motorrijschool pages:`);
Object.keys(motorrijschoolPages).forEach(slug => {
    console.log(`  - ${slug}`);
});

// Save for next step
fs.writeFileSync('motorrijschool_pages.json', JSON.stringify(motorrijschoolPages, null, 2));
