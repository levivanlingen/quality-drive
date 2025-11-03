/**
 * WordPress Media Downloader
 *
 * Dit script download alle media files van je WordPress site
 * naar de Next.js public/uploads folder.
 *
 * Setup:
 * 1. npm install axios
 * 2. Run eerst: node scripts/fetch-wordpress-content.js
 * 3. Run: node scripts/download-wordpress-media.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stream = require('stream');

const pipeline = promisify(stream.pipeline);

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuratie
const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_DIR = path.join(__dirname, '../public/uploads');
const CONCURRENT_DOWNLOADS = 5; // Aantal gelijktijdige downloads

// Zorg dat output directory bestaat
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created directory: ${OUTPUT_DIR}`);
}

/**
 * Download een enkel bestand
 */
async function downloadFile(url, filepath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000, // 30 seconden timeout
    });

    await pipeline(response.data, fs.createWriteStream(filepath));
    return { success: true, url };
  } catch (error) {
    return {
      success: false,
      url,
      error: error.message
    };
  }
}

/**
 * Download files in batches
 */
async function downloadInBatches(items, batchSize) {
  const results = {
    success: [],
    failed: [],
    skipped: [],
  };

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(items.length / batchSize);

    console.log(`\n📦 Processing batch ${batchNumber}/${totalBatches} (${batch.length} files)...`);

    const promises = batch.map(async (item) => {
      const filepath = path.join(OUTPUT_DIR, item.filename);

      // Skip als bestand al bestaat
      if (fs.existsSync(filepath)) {
        console.log(`⏭️  Skipped (already exists): ${item.filename}`);
        results.skipped.push(item.filename);
        return;
      }

      const result = await downloadFile(item.sourceUrl, filepath);

      if (result.success) {
        console.log(`✅ Downloaded: ${item.filename}`);
        results.success.push(item.filename);
      } else {
        console.log(`❌ Failed: ${item.filename} - ${result.error}`);
        results.failed.push({
          filename: item.filename,
          url: item.sourceUrl,
          error: result.error,
        });
      }
    });

    await Promise.all(promises);
  }

  return results;
}

/**
 * Genereer image import mapping
 */
function generateImageMapping(mediaItems) {
  const mapping = {};

  mediaItems.forEach(item => {
    const oldUrl = item.sourceUrl;
    const newUrl = `/uploads/${item.filename}`;

    mapping[oldUrl] = newUrl;
  });

  fs.writeFileSync(
    path.join(DATA_DIR, 'image-url-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );

  console.log('✅ Generated image URL mapping!');

  // Genereer ook een find-replace lijst
  let findReplaceText = 'Find & Replace Lijst voor Image URLs:\n\n';
  findReplaceText += Object.entries(mapping)
    .map(([oldUrl, newUrl]) => `${oldUrl} → ${newUrl}`)
    .join('\n');

  fs.writeFileSync(
    path.join(DATA_DIR, 'image-find-replace.txt'),
    findReplaceText
  );

  console.log('   Saved find-replace list to data/image-find-replace.txt');
}

/**
 * Optimaliseer images (optioneel - vereist sharp)
 */
async function optimizeImages() {
  try {
    const sharp = require('sharp');
    console.log('\n🎨 Optimizing images with sharp...');

    const files = fs.readdirSync(OUTPUT_DIR);
    const imageFiles = files.filter(f =>
      f.match(/\.(jpg|jpeg|png|webp)$/i)
    );

    for (const file of imageFiles) {
      const filepath = path.join(OUTPUT_DIR, file);
      const ext = path.extname(file).toLowerCase();

      try {
        let image = sharp(filepath);

        // Optimalisatie opties per formaat
        if (ext === '.jpg' || ext === '.jpeg') {
          await image
            .jpeg({ quality: 85, progressive: true })
            .toFile(filepath + '.tmp');
        } else if (ext === '.png') {
          await image
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(filepath + '.tmp');
        } else if (ext === '.webp') {
          await image
            .webp({ quality: 85 })
            .toFile(filepath + '.tmp');
        }

        // Vervang origineel met geoptimaliseerde versie
        fs.renameSync(filepath + '.tmp', filepath);
        console.log(`   ✓ Optimized: ${file}`);

      } catch (err) {
        console.log(`   ✗ Failed to optimize: ${file}`);
      }
    }

    console.log('✅ Image optimization complete!');

  } catch (error) {
    console.log('\n⚠️  Sharp not installed, skipping image optimization');
    console.log('   Install with: npm install sharp');
  }
}

/**
 * Main functie
 */
async function main() {
  console.log('🖼️  Starting WordPress media download...\n');

  // Lees media.json
  const mediaPath = path.join(DATA_DIR, 'media.json');

  if (!fs.existsSync(mediaPath)) {
    console.error('❌ Error: media.json not found!');
    console.error('   Please run "node scripts/fetch-wordpress-content.js" first.');
    process.exit(1);
  }

  const mediaItems = JSON.parse(fs.readFileSync(mediaPath, 'utf-8'));
  console.log(`📊 Found ${mediaItems.length} media files to download\n`);

  // Download alle media
  const results = await downloadInBatches(mediaItems, CONCURRENT_DOWNLOADS);

  // Print resultaten
  console.log('\n' + '='.repeat(60));
  console.log('📊 Download Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully downloaded: ${results.success.length}`);
  console.log(`⏭️  Skipped (already exist): ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('='.repeat(60));

  // Als er failures zijn, sla ze op
  if (results.failed.length > 0) {
    fs.writeFileSync(
      path.join(DATA_DIR, 'failed-downloads.json'),
      JSON.stringify(results.failed, null, 2)
    );
    console.log('\n⚠️  Failed downloads saved to: data/failed-downloads.json');
  }

  // Genereer URL mapping
  console.log('');
  generateImageMapping(mediaItems);

  // Optimaliseer images (optioneel)
  await optimizeImages();

  console.log('\n✨ Media download complete!');
  console.log('\nNext steps:');
  console.log('1. Review downloaded files in public/uploads/');
  console.log('2. Use image-url-mapping.json to update image URLs in content');
  console.log('3. Test images in your Next.js app with the Image component');
}

// Run het script
main().catch(console.error);
