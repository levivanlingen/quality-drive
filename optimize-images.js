#!/usr/bin/env node

/**
 * Quality Drive - Image Optimizer
 * Gebruikt Sharp (Node.js) om images te optimaliseren
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

console.log('🖼️  Quality Drive Image Optimizer');
console.log('===================================\n');

// Configuration
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 85;
const PNG_QUALITY = 85;

// Directories to process
const directories = [
  'public',
  'public/uploads'
];

// Stats
let stats = {
  processed: 0,
  totalSizeBefore: 0,
  totalSizeAfter: 0,
  files: []
};

/**
 * Get file size in bytes
 */
function getFileSize(filepath) {
  try {
    return fs.statSync(filepath).size;
  } catch (e) {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Optimize single image
 */
async function optimizeImage(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  const dir = path.dirname(filepath);
  const basename = path.basename(filepath, ext);

  // Skip if already processed or is a WebP/AVIF
  if (ext === '.webp' || ext === '.avif') {
    return;
  }

  const sizeBefore = getFileSize(filepath);

  try {
    const image = sharp(filepath);
    const metadata = await image.metadata();

    // Resize if too large
    let needsResize = false;
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      needsResize = true;
      image.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Process based on format
    if (ext === '.png') {
      // Optimize PNG
      await image
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(filepath + '.tmp');

      // Replace original
      fs.renameSync(filepath + '.tmp', filepath);

      // Create WebP version
      const webpPath = path.join(dir, basename + '.webp');
      await sharp(filepath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPEG
      await image
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(filepath + '.tmp');

      // Replace original
      fs.renameSync(filepath + '.tmp', filepath);

      // Create WebP version
      const webpPath = path.join(dir, basename + '.webp');
      await sharp(filepath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
    }

    const sizeAfter = getFileSize(filepath);
    const savings = sizeBefore - sizeAfter;
    const savingsPercent = Math.round((savings / sizeBefore) * 100);

    stats.processed++;
    stats.totalSizeBefore += sizeBefore;
    stats.totalSizeAfter += sizeAfter;

    const action = needsResize ? 'Resized & Optimized' : 'Optimized';
    console.log(`✅ ${action}: ${path.basename(filepath)}`);
    console.log(`   ${formatBytes(sizeBefore)} → ${formatBytes(sizeAfter)} (-${savingsPercent}%)`);

    // Check if WebP was created
    const webpPath = path.join(dir, basename + '.webp');
    const webpSize = getFileSize(webpPath);
    if (webpSize > 0) {
      const webpSavings = Math.round((1 - webpSize / sizeBefore) * 100);
      console.log(`   WebP: ${formatBytes(webpSize)} (-${webpSavings}%)`);
      stats.totalSizeAfter += webpSize;
    }

    stats.files.push({
      file: path.basename(filepath),
      before: sizeBefore,
      after: sizeAfter,
      savings: savingsPercent
    });

  } catch (error) {
    console.error(`❌ Error processing ${filepath}:`, error.message);
  }
}

/**
 * Process directory
 */
async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      continue; // Don't recurse into subdirectories for now
    }

    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      await optimizeImage(filepath);
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log('📊 Scanning directories...\n');

  for (const dir of directories) {
    console.log(`Processing: ${dir}`);
    await processDirectory(dir);
    console.log('');
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Files processed: ${stats.processed}`);
  console.log(`Total size before: ${formatBytes(stats.totalSizeBefore)}`);
  console.log(`Total size after: ${formatBytes(stats.totalSizeAfter)}`);

  const totalSavings = stats.totalSizeBefore - stats.totalSizeAfter;
  const totalSavingsPercent = Math.round((totalSavings / stats.totalSizeBefore) * 100);

  console.log(`Total savings: ${formatBytes(totalSavings)} (-${totalSavingsPercent}%)`);

  // Top 5 biggest savings
  if (stats.files.length > 0) {
    console.log('\n🏆 Top 5 Biggest Savings:');
    const sorted = stats.files.sort((a, b) => (b.before - b.after) - (a.before - a.after));
    sorted.slice(0, 5).forEach((file, i) => {
      const savings = file.before - file.after;
      console.log(`${i + 1}. ${file.file}: ${formatBytes(savings)} (-${file.savings}%)`);
    });
  }

  console.log('\n✅ Optimization complete!');
  console.log('\n💡 Next steps:');
  console.log('1. Check the optimized images');
  console.log('2. Commit changes: git add public/ && git commit -m "Optimize images"');
  console.log('3. Deploy to Railway');
  console.log('4. Enjoy faster website! 🚀');
}

// Run
main().catch(console.error);
