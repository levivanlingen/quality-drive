/**
 * WordPress Content Fetcher
 *
 * Dit script haalt alle content op van je WordPress site via de REST API
 * en slaat het op als JSON bestanden voor Next.js import.
 *
 * Setup:
 * 1. npm install axios
 * 2. Configureer WORDPRESS_API_URL in .env.local
 * 3. Run: node scripts/fetch-wordpress-content.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuratie
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://quality-drive.nl/wp-json/wp/v2';
const OUTPUT_DIR = path.join(__dirname, '../data');

// Zorg dat data directory bestaat
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetch alle posts van WordPress
 */
async function fetchPosts() {
  console.log('📝 Fetching WordPress posts...');

  try {
    let allPosts = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(`${WORDPRESS_API_URL}/posts`, {
        params: {
          per_page: 100,
          page: page,
          _embed: true, // Include featured images en andere embedded data
          _fields: 'id,slug,title,content,excerpt,date,modified,link,author,categories,tags,featured_media,yoast_head_json,rank_math,_embedded,_links',
        }
      });

      allPosts = allPosts.concat(response.data);

      // Check of er meer paginas zijn
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
      hasMore = page < totalPages;
      page++;

      console.log(`   - Fetched page ${page - 1} of ${totalPages}`);
    }

    // Transform naar Next.js friendly format
    const transformedPosts = allPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      date: post.date,
      modified: post.modified,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || [],
      tags: post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [],
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      seo: {
        // Rank Math SEO data (prioriteit) of fallback naar Yoast of standaard
        title: post.rank_math?.title || post.yoast_head_json?.title || post.title.rendered,
        description: post.rank_math?.description || post.yoast_head_json?.description || post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
        ogImage: post.rank_math?.og_image || post.yoast_head_json?.og_image?.[0]?.url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        keywords: post.rank_math?.focus_keyword || post.yoast_head_json?.focus_keyword || '',
      },
      // Bewaar originele URL voor redirects
      originalUrl: post.link,
    }));

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'posts.json'),
      JSON.stringify(transformedPosts, null, 2)
    );

    console.log(`✅ Successfully fetched ${transformedPosts.length} posts!`);
    return transformedPosts;

  } catch (error) {
    console.error('❌ Error fetching posts:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
    return [];
  }
}

/**
 * Fetch alle pages van WordPress
 */
async function fetchPages() {
  console.log('📄 Fetching WordPress pages...');

  try {
    let allPages = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(`${WORDPRESS_API_URL}/pages`, {
        params: {
          per_page: 100,
          page: page,
          _embed: true,
          _fields: 'id,slug,title,content,date,modified,parent,link,featured_media,yoast_head_json,rank_math,_embedded,_links',
        }
      });

      allPages = allPages.concat(response.data);

      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
      hasMore = page < totalPages;
      page++;

      console.log(`   - Fetched page ${page - 1} of ${totalPages}`);
    }

    const transformedPages = allPages.map(page => ({
      id: page.id,
      slug: page.slug,
      title: page.title.rendered,
      content: page.content.rendered,
      date: page.date,
      modified: page.modified,
      parent: page.parent,
      featuredImage: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      seo: {
        title: page.rank_math?.title || page.yoast_head_json?.title || page.title.rendered,
        description: page.rank_math?.description || page.yoast_head_json?.description || '',
        ogImage: page.rank_math?.og_image || page.yoast_head_json?.og_image?.[0]?.url || page._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        keywords: page.rank_math?.focus_keyword || page.yoast_head_json?.focus_keyword || '',
      },
      originalUrl: page.link,
    }));

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'pages.json'),
      JSON.stringify(transformedPages, null, 2)
    );

    console.log(`✅ Successfully fetched ${transformedPages.length} pages!`);
    return transformedPages;

  } catch (error) {
    console.error('❌ Error fetching pages:', error.message);
    return [];
  }
}

/**
 * Fetch alle media van WordPress
 */
async function fetchMedia() {
  console.log('🖼️  Fetching WordPress media...');

  try {
    let allMedia = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(`${WORDPRESS_API_URL}/media`, {
        params: {
          per_page: 100,
          page: page,
        }
      });

      allMedia = allMedia.concat(response.data);

      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
      hasMore = page < totalPages;
      page++;

      console.log(`   - Fetched page ${page - 1} of ${totalPages}`);
    }

    const transformedMedia = allMedia.map(item => ({
      id: item.id,
      filename: path.basename(item.source_url),
      sourceUrl: item.source_url,
      mimeType: item.mime_type,
      alt: item.alt_text || '',
      caption: item.caption?.rendered || '',
      width: item.media_details?.width,
      height: item.media_details?.height,
    }));

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'media.json'),
      JSON.stringify(transformedMedia, null, 2)
    );

    console.log(`✅ Successfully fetched ${transformedMedia.length} media files!`);
    return transformedMedia;

  } catch (error) {
    console.error('❌ Error fetching media:', error.message);
    return [];
  }
}

/**
 * Genereer redirect mapping
 */
function generateRedirectMapping(posts, pages) {
  console.log('🔗 Generating redirect mapping...');

  const redirects = [];

  // Posts redirects
  posts.forEach(post => {
    if (post.originalUrl) {
      const oldPath = new URL(post.originalUrl).pathname;
      const newPath = `/blog/${post.slug}`;

      redirects.push({
        source: oldPath,
        destination: newPath,
        permanent: true,
      });
    }
  });

  // Pages redirects
  pages.forEach(page => {
    if (page.originalUrl) {
      const oldPath = new URL(page.originalUrl).pathname;
      const newPath = `/${page.slug}`;

      // Alleen toevoegen als paths verschillen
      if (oldPath !== newPath) {
        redirects.push({
          source: oldPath,
          destination: newPath,
          permanent: true,
        });
      }
    }
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'redirects.json'),
    JSON.stringify(redirects, null, 2)
  );

  console.log(`✅ Generated ${redirects.length} redirects!`);

  // Genereer ook een next.config.ts snippet
  const configSnippet = `
  // Voeg deze redirects toe aan je next.config.ts:
  async redirects() {
    return ${JSON.stringify(redirects, null, 4)};
  }
  `;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'next-config-redirects.txt'),
    configSnippet
  );

  console.log('   Saved redirect config snippet to data/next-config-redirects.txt');
}

/**
 * Main functie
 */
async function main() {
  console.log('🚀 Starting WordPress content migration...\n');
  console.log(`📍 WordPress API: ${WORDPRESS_API_URL}\n`);

  const posts = await fetchPosts();
  console.log('');

  const pages = await fetchPages();
  console.log('');

  const media = await fetchMedia();
  console.log('');

  generateRedirectMapping(posts, pages);
  console.log('');

  console.log('✨ Migration complete! Files saved to:', OUTPUT_DIR);
  console.log('\nNext steps:');
  console.log('1. Review the generated JSON files in the data/ folder');
  console.log('2. Run "node scripts/download-wordpress-media.js" to download images');
  console.log('3. Copy redirects from data/next-config-redirects.txt to next.config.ts');
  console.log('4. Start implementing your pages and blog posts!');
}

// Run de migratie
main().catch(console.error);
