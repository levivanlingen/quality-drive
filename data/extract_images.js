const fs = require('fs');

// Load the motorrijschool pages
const motorrijschoolPages = JSON.parse(fs.readFileSync('motorrijschool_pages.json', 'utf-8'));

// City names for reference
const cityMap = {
    'motorrijschool-den-haag': 'Den Haag',
    'motorrijschool-zoetermeer': 'Zoetermeer',
    'motorrijschool-delft': 'Delft',
    'motorrijschool-rijswijk': 'Rijswijk',
    'motorrijschool-voorburg': 'Voorburg',
    'motorrijschool-nootdorp': 'Nootdorp',
    'motorrijschool-wateringen': 'Wateringen',
    'motorrijschool-leidschenveen': 'Leidschenveen',
    'motorrijschool-ypenburg': 'Ypenburg',
    'motorrijschool-lansingerland': 'Lansingerland'
};

const imageMapping = {};

// Process each motorrijschool page
for (const [slug, pageData] of Object.entries(motorrijschoolPages)) {
    const content = pageData.content || '';
    const cityName = cityMap[slug];

    // Find all img tags
    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*>/gi;
    let match;
    const images = [];

    while ((match = imgRegex.exec(content)) !== null) {
        const srcUrl = match[1];
        const altText = match[2] || '';

        images.push({
            url: srcUrl,
            alt: altText
        });
    }

    console.log(`\n${slug} (${cityName}):`);
    console.log(`  Found ${images.length} images`);

    // Try to find city-specific images
    let cityImage = null;

    // First, try to find images with city name in URL or alt text
    for (const img of images) {
        const urlLower = img.url.toLowerCase();
        const altLower = img.alt.toLowerCase();
        const cityLower = cityName.toLowerCase();

        if (urlLower.includes(cityLower) || altLower.includes(cityLower)) {
            cityImage = img.url;
            console.log(`  City match (url/alt): ${img.url}`);
            break;
        }
    }

    // If no exact city match, look for non-motorcycle/non-lesson images
    if (!cityImage && images.length > 0) {
        for (const img of images) {
            const urlLower = img.url.toLowerCase();
            const altLower = img.alt.toLowerCase();

            // Exclude motorcycle, driving, lesson related images
            const excludePatterns = ['motor', 'moto', 'bike', 'rijles', 'lesson', 'auto', 'car', 'driving', 'course'];
            const isExcluded = excludePatterns.some(pattern =>
                urlLower.includes(pattern) || altLower.includes(pattern)
            );

            if (!isExcluded) {
                // This might be a city/landmark image
                cityImage = img.url;
                console.log(`  Non-motor image: ${img.url}`);
                break;
            }
        }
    }

    if (!cityImage && images.length > 0) {
        // As fallback, take the first image
        cityImage = images[0].url;
        console.log(`  Fallback (first image): ${cityImage}`);
    }

    imageMapping[slug] = cityImage;
}

// Output the final mapping
console.log('\n\n=== FINAL MAPPING ===\n');
for (const slug of [
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
]) {
    const image = imageMapping[slug];
    if (image) {
        console.log(`${slug}: ${image}`);
    } else {
        console.log(`${slug}: NO IMAGE FOUND`);
    }
}

// Save the mapping
fs.writeFileSync('image_mapping.json', JSON.stringify(imageMapping, null, 2));
