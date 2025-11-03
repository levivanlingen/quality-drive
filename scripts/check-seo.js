/**
 * SEO Checker Script
 *
 * Test je Next.js site voor SEO problemen
 *
 * Run: node scripts/check-seo.js https://quality-drive.nl
 */

const axios = require('axios');

const siteUrl = process.argv[2] || 'http://localhost:5000';

async function checkSEO() {
  console.log('🔍 SEO Check voor:', siteUrl);
  console.log('='.repeat(60));

  const checks = {
    passed: [],
    failed: [],
    warnings: [],
  };

  try {
    // 1. Check sitemap.xml
    try {
      const sitemap = await axios.get(`${siteUrl}/sitemap.xml`);
      if (sitemap.status === 200 && sitemap.data.includes('</urlset>')) {
        checks.passed.push('✅ Sitemap.xml is toegankelijk');
      }
    } catch {
      checks.failed.push('❌ Sitemap.xml niet gevonden');
    }

    // 2. Check robots.txt
    try {
      const robots = await axios.get(`${siteUrl}/robots.txt`);
      if (robots.status === 200) {
        checks.passed.push('✅ Robots.txt is toegankelijk');
        if (robots.data.includes('Sitemap:')) {
          checks.passed.push('✅ Sitemap URL staat in robots.txt');
        } else {
          checks.warnings.push('⚠️  Sitemap URL ontbreekt in robots.txt');
        }
      }
    } catch {
      checks.failed.push('❌ Robots.txt niet gevonden');
    }

    // 3. Check homepage metadata
    try {
      const homepage = await axios.get(siteUrl);
      const html = homepage.data;

      // Title tag
      if (html.includes('<title>') && !html.includes('<title>Create Next App</title>')) {
        checks.passed.push('✅ Title tag aanwezig en gecustomized');
      } else {
        checks.failed.push('❌ Title tag ontbreekt of is standaard');
      }

      // Meta description
      if (html.includes('meta name="description"')) {
        checks.passed.push('✅ Meta description aanwezig');
      } else {
        checks.failed.push('❌ Meta description ontbreekt');
      }

      // Open Graph tags
      if (html.includes('og:title') && html.includes('og:description')) {
        checks.passed.push('✅ Open Graph tags aanwezig');
      } else {
        checks.warnings.push('⚠️  Open Graph tags ontbreken');
      }

      // Canonical URL
      if (html.includes('rel="canonical"')) {
        checks.passed.push('✅ Canonical URL aanwezig');
      } else {
        checks.warnings.push('⚠️  Canonical URL ontbreekt');
      }

      // Schema.org
      if (html.includes('"@context":"https://schema.org"') || html.includes('"@context": "https://schema.org"')) {
        checks.passed.push('✅ Schema.org structured data aanwezig');
      } else {
        checks.warnings.push('⚠️  Schema.org structured data ontbreekt');
      }

      // Lang attribute
      if (html.includes('<html lang="nl"') || html.includes('<html lang=')) {
        checks.passed.push('✅ HTML lang attribute aanwezig');
      } else {
        checks.failed.push('❌ HTML lang attribute ontbreekt');
      }

      // Viewport meta tag
      if (html.includes('name="viewport"')) {
        checks.passed.push('✅ Viewport meta tag aanwezig');
      } else {
        checks.failed.push('❌ Viewport meta tag ontbreekt');
      }

    } catch (error) {
      checks.failed.push(`❌ Kan homepage niet ophalen: ${error.message}`);
    }

    // 4. Check SSL/HTTPS
    if (siteUrl.startsWith('https://')) {
      checks.passed.push('✅ Site gebruikt HTTPS');
    } else {
      checks.warnings.push('⚠️  Site gebruikt geen HTTPS (vereist voor productie)');
    }

  } catch (error) {
    console.error('Fout tijdens SEO check:', error.message);
  }

  // Print resultaten
  console.log('\n📊 SEO Check Resultaten:\n');

  if (checks.passed.length > 0) {
    console.log('PASSED:');
    checks.passed.forEach(check => console.log('  ' + check));
    console.log('');
  }

  if (checks.warnings.length > 0) {
    console.log('WARNINGS:');
    checks.warnings.forEach(check => console.log('  ' + check));
    console.log('');
  }

  if (checks.failed.length > 0) {
    console.log('FAILED:');
    checks.failed.forEach(check => console.log('  ' + check));
    console.log('');
  }

  console.log('='.repeat(60));
  console.log(`Score: ${checks.passed.length}/${checks.passed.length + checks.failed.length + checks.warnings.length}`);
  console.log('='.repeat(60));

  // Aanbevelingen
  console.log('\n💡 Aanbevelingen:');
  console.log('1. Test je site op https://pagespeed.web.dev');
  console.log('2. Valideer Schema.org op https://validator.schema.org');
  console.log('3. Test mobile-friendly op https://search.google.com/test/mobile-friendly');
  console.log('4. Check Search Console voor indexatie status');
  console.log('');
}

checkSEO().catch(console.error);
