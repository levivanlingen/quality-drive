# WordPress naar Next.js Migratie Handleiding
## Quality Drive Rijschool - SEO-Vriendelijke Migratie

---

## 📋 Overzicht

Deze handleiding helpt je om je WordPress website volledig te migreren naar Next.js zonder SEO te verliezen.

### ✅ Wat is al geconfigureerd:

1. **SEO Metadata** - Volledig geconfigureerd in `app/layout.tsx`
2. **Sitemap Generatie** - Automatisch via `next-sitemap`
3. **Robots.txt** - Automatisch gegenereerd
4. **301 Redirects** - Template klaar in `next.config.ts`
5. **Schema.org Structured Data** - LocalBusiness + Website schema
6. **Image Optimization** - Next.js Image component configuratie
7. **Security Headers** - Volledig geconfigureerd
8. **Performance Optimalisatie** - Compression, React strict mode

---

## 🚀 Stap 1: WordPress Content Exporteren

### Optie A: Via WordPress Dashboard (Aanbevolen)

1. Log in op je WordPress admin panel
2. Ga naar **Tools → Export**
3. Selecteer "All content"
4. Download het XML bestand
5. Bewaar als `wordpress-export.xml`

### Optie B: Via WP-CLI (Geavanceerd)

```bash
wp export --dir=./exports --user=admin
```

### Optie C: Via WordPress REST API

Gebruik het script `scripts/fetch-wordpress-content.js`:

```bash
# Installeer dependencies
npm install axios xml2js

# Configureer in .env.local:
WORDPRESS_API_URL=https://jouw-oude-site.nl/wp-json/wp/v2

# Run het script
node scripts/fetch-wordpress-content.js
```

---

## 🗺️ Stap 2: URL Mapping Strategie

### WordPress URL Structuur Analyseren

1. **Check je huidige URLs:**
   - Posts: `/2024/01/15/post-title/` of `/blog/post-title/`
   - Pages: `/over-ons/`, `/contact/`
   - Categories: `/category/nieuws/`
   - Tags: `/tag/rijlessen/`

2. **Maak een URL mapping tabel:**

| WordPress URL | Next.js URL | Redirect Type |
|--------------|-------------|---------------|
| `/2024/01/post-title/` | `/blog/post-title/` | 301 |
| `/category/nieuws/` | `/blog/categorie/nieuws/` | 301 |
| `/over-ons/` | `/over-ons/` | Geen (zelfde) |

### Implementeer Redirects in next.config.ts

```typescript
async redirects() {
  return [
    // WordPress datum-gebaseerde URLs
    {
      source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
    // Categorie redirects
    {
      source: '/category/:slug',
      destination: '/blog/categorie/:slug',
      permanent: true,
    },
  ];
}
```

---

## 📝 Stap 3: Content Migratie

### 3.1 Pages Migreren

Voor elke WordPress page:

1. Maak een nieuwe folder in `app/[page-slug]/`
2. Maak een `page.tsx` bestand
3. Kopieer de content van WordPress
4. Voeg SEO metadata toe

**Voorbeeld:**

```typescript
// app/over-ons/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Ons',
  description: 'Leer meer over Quality Drive Rijschool...',
  openGraph: {
    title: 'Over Ons - Quality Drive',
    description: '...',
  },
};

export default function OverOnsPage() {
  return (
    <div>
      {/* Content van WordPress kopiëren */}
    </div>
  );
}
```

### 3.2 Blog Posts Migreren

1. Maak een `app/blog/` folder
2. Maak een `app/blog/[slug]/page.tsx` voor dynamische routes
3. Importeer je WordPress posts als JSON/MDX

**Optie A: Statische JSON**

```typescript
// data/blog-posts.json
[
  {
    "slug": "gratis-proefles",
    "title": "Gratis Proefles bij Quality Drive",
    "content": "...",
    "date": "2024-01-15",
    "excerpt": "...",
    "seo": {
      "title": "...",
      "description": "..."
    }
  }
]
```

**Optie B: MDX (Aanbevolen)**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

```typescript
// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    title: post.seo.title,
    description: post.seo.description,
  };
}
```

---

## 🖼️ Stap 4: Media & Images Migratie

### 4.1 Download WordPress Media

**Script om alle media te downloaden:**

```bash
# Maak een scripts/download-wordpress-media.js bestand
node scripts/download-wordpress-media.js
```

### 4.2 Image Optimalisatie

1. Plaats alle images in `public/` folder
2. Gebruik Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/uploads/auto-rijles.jpg"
  alt="Auto rijles in Den Haag"
  width={800}
  height={600}
  loading="lazy"
/>
```

### 4.3 WordPress Upload Path Redirects

In `next.config.ts`:

```typescript
async rewrites() {
  return [
    {
      source: '/wp-content/uploads/:path*',
      destination: '/uploads/:path*',
    },
  ];
}
```

---

## 🔍 Stap 5: SEO Metadata Migratie

### 5.1 Yoast SEO / Rank Math Data Exporteren

Als je Yoast SEO of Rank Math gebruikt:

1. Installeer "SEO Data Transporter" plugin
2. Exporteer alle SEO data naar JSON
3. Importeer in Next.js metadata

### 5.2 Per Pagina Metadata Implementeren

```typescript
export const metadata: Metadata = {
  title: 'WordPress page title',
  description: 'WordPress meta description',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'OG Title van WordPress',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
};
```

---

## 🔗 Stap 6: Internal Links Updaten

### 6.1 Find & Replace

Gebruik deze regex patterns om internal links te vinden:

```bash
# Vind alle WordPress links
https://oude-site.nl/(.*)

# Replace met:
/$1
```

### 6.2 Script om Links te Checken

```bash
# Installeer broken-link-checker
npm install -g broken-link-checker

# Check na deployment
blc https://quality-drive.nl -ro
```

---

## 📊 Stap 7: Google Search Console & Analytics

### 7.1 URL Changes Indienen

1. Log in op **Google Search Console**
2. Ga naar **Settings → Change of address**
3. Selecteer nieuwe property (quality-drive.nl)
4. Volg de wizard

### 7.2 Sitemap Indienen

1. Build je Next.js app: `npm run build`
2. Upload naar server
3. Dien in bij Search Console:
   ```
   https://quality-drive.nl/sitemap.xml
   ```

### 7.3 Google Analytics Migreren

```typescript
// app/layout.tsx - voeg Google Analytics toe
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

## ✅ Stap 8: Pre-Launch Checklist

- [ ] Alle paginas gemigreerd en content gecontroleerd
- [ ] SEO metadata voor elke pagina geconfigureerd
- [ ] 301 redirects getest (gebruik redirect-checker.org)
- [ ] Images geoptimaliseerd en correct geïmporteerd
- [ ] Internal links werken allemaal
- [ ] Sitemap.xml gegenereerd en toegankelijk
- [ ] Robots.txt correct geconfigureerd
- [ ] Google Search Console geverifieerd
- [ ] Google Analytics werkend
- [ ] Schema.org structured data getest (schema.org/validator)
- [ ] Mobile responsiveness getest
- [ ] Core Web Vitals scores getest (PageSpeed Insights)
- [ ] SSL certificaat actief (HTTPS)
- [ ] Backup van oude WordPress site

---

## 🚀 Stap 9: Launch & Go-Live

### 9.1 DNS Wijzigen

1. **Wacht tot Next.js app 100% klaar is**
2. Update DNS A-record naar nieuwe server
3. Wacht 24-48 uur voor DNS propagatie
4. Houd oude WordPress site minimaal 2 weken online als backup

### 9.2 Post-Launch Monitoring

#### Week 1:
- Check Google Search Console dagelijks voor errors
- Monitor Core Web Vitals in Search Console
- Check 404 errors en voeg redirects toe waar nodig

#### Week 2-4:
- Monitor organic traffic in Google Analytics
- Check indexatie status in Search Console
- Analyseer rankings voor belangrijkste keywords

---

## 🛠️ Scripts & Tools

### fetch-wordpress-content.js

```javascript
const axios = require('axios');
const fs = require('fs');

async function fetchWordPressContent() {
  const baseURL = process.env.WORDPRESS_API_URL;

  try {
    // Fetch posts
    const posts = await axios.get(`${baseURL}/posts?per_page=100`);
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts.data, null, 2));

    // Fetch pages
    const pages = await axios.get(`${baseURL}/pages?per_page=100`);
    fs.writeFileSync('./data/pages.json', JSON.stringify(pages.data, null, 2));

    // Fetch media
    const media = await axios.get(`${baseURL}/media?per_page=100`);
    fs.writeFileSync('./data/media.json', JSON.stringify(media.data, null, 2));

    console.log('✅ WordPress content succesvol geëxporteerd!');
  } catch (error) {
    console.error('❌ Fout bij exporteren:', error.message);
  }
}

fetchWordPressContent();
```

### download-wordpress-media.js

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadMedia() {
  const media = require('./data/media.json');

  for (const item of media) {
    const url = item.source_url;
    const filename = path.basename(url);
    const filepath = path.join(__dirname, '../public/uploads', filename);

    try {
      const response = await axios.get(url, { responseType: 'stream' });
      response.data.pipe(fs.createWriteStream(filepath));
      console.log(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error(`❌ Failed: ${filename}`, error.message);
    }
  }
}

downloadMedia();
```

---

## 📚 Nuttige Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Redirect Checker](https://httpstatus.io/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## 🆘 Troubleshooting

### SEO Rankings Dalen Na Migratie?

1. Check of alle 301 redirects correct zijn
2. Controleer of sitemap.xml correct is ingediend
3. Kijk naar Coverage errors in Search Console
4. Vergelijk oude vs nieuwe page titles/descriptions

### Images Laden Niet?

1. Check of paden correct zijn in `public/` folder
2. Controleer Next.js Image configuration
3. Test of externe WordPress URLs nog redirecten

### 404 Errors in Search Console?

1. Voeg 301 redirects toe in `next.config.ts`
2. Update internal links
3. Dien nieuwe sitemap in

---

## 📞 Support

Vragen over de migratie? Check de Next.js docs of neem contact op.

**Good luck met je migratie! 🚀**
