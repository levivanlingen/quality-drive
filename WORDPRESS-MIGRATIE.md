# WordPress naar Next.js Migratie - Quality Drive
## Compleet SEO-Vriendelijke Migratie Setup

---

## 🎉 Wat is er al geconfigureerd?

Je Next.js app is nu **volledig voorbereid** voor een SEO-vriendelijke WordPress migratie! Hier is alles wat al voor je is ingesteld:

### ✅ SEO Fundamentals

1. **Complete Metadata** (`app/layout.tsx`)
   - Title templates voor alle paginas
   - Meta descriptions
   - Open Graph tags (Facebook/LinkedIn)
   - Twitter Card tags
   - Keywords
   - Canonical URLs
   - Taal ingesteld op Nederlands (`lang="nl"`)

2. **Schema.org Structured Data** (`app/components/StructuredData.tsx`)
   - LocalBusiness schema voor rijschool
   - Website schema
   - Organization schema
   - Klaar voor Article/BlogPosting schema
   - FAQPage en Breadcrumb helpers

3. **Sitemap & Robots**
   - `next-sitemap` geconfigureerd
   - Automatische sitemap.xml generatie bij elke build
   - Robots.txt automatisch gegenereerd
   - Custom prioriteiten per pagina type

4. **301 Redirects** (`next.config.ts`)
   - Template voor WordPress URL redirects
   - Voorbeelden voor posts, categories, tags
   - Security redirects (wp-admin, wp-login blokkeren)

5. **Performance Optimalisatie**
   - Image optimization (AVIF + WebP)
   - Security headers (HSTS, XSS Protection, etc.)
   - Compression enabled
   - React strict mode
   - Console.log removal in productie

6. **WordPress Import Scripts** (`scripts/`)
   - WordPress content fetcher via REST API
   - Media downloader met batch processing
   - Automatische redirect mapping generatie
   - SEO checker script

---

## 📁 Project Structuur

```
quality-drive/
├── app/
│   ├── layout.tsx              ← SEO metadata + Schema.org
│   ├── page.tsx                ← Homepage
│   ├── blog/
│   │   ├── page.tsx            ← Blog overzicht (voorbeeld)
│   │   └── [slug]/
│   │       └── page.tsx        ← Blog post detail (voorbeeld)
│   └── components/
│       └── StructuredData.tsx  ← Schema.org component
├── scripts/
│   ├── wordpress-migration-guide.md     ← Complete handleiding
│   ├── fetch-wordpress-content.js       ← WordPress API import
│   ├── download-wordpress-media.js      ← Media downloader
│   └── check-seo.js                     ← SEO validator
├── next-sitemap.config.js      ← Sitemap configuratie
├── next.config.ts              ← Redirects + optimalisaties
└── .env.local                  ← Environment variables
```

---

## 🚀 Aan de Slag - Volgende Stappen

### Stap 1: Configureer je WordPress URL

Open `.env.local` en update:

```bash
NEXT_PUBLIC_SITE_URL=https://quality-drive.nl
WORDPRESS_API_URL=https://jouw-oude-wordpress-site.nl/wp-json/wp/v2
```

### Stap 2: Exporteer WordPress Content

```bash
# Installeer dependencies (al gedaan als je axios hebt)
npm install

# Fetch alle WordPress content
node scripts/fetch-wordpress-content.js
```

Dit maakt aan:
- `data/posts.json` - Alle blog posts met SEO metadata
- `data/pages.json` - Alle paginas met SEO metadata
- `data/media.json` - Alle media bestanden
- `data/redirects.json` - Automatische 301 redirect mapping
- `data/next-config-redirects.txt` - Ready to copy redirects

### Stap 3: Download Media

```bash
# Download alle WordPress media naar public/uploads/
node scripts/download-wordpress-media.js
```

Dit maakt aan:
- `public/uploads/` - Alle gedownloade media
- `data/image-url-mapping.json` - URL mapping voor find & replace
- `data/image-find-replace.txt` - Leesbare lijst voor URL updates

### Stap 4: Implementeer Redirects

1. Open `data/next-config-redirects.txt`
2. Kopieer de redirects naar `next.config.ts`
3. Test met een build: `npm run build`

### Stap 5: Migreer Content

**Optie A: Handmatig (voor kleine sites)**
- Maak paginas aan in `app/[page-slug]/page.tsx`
- Kopieer content uit `data/pages.json` of `data/posts.json`
- Gebruik de voorbeelden in `app/blog/` als template

**Optie B: Automatisch (aanbevolen)**
- Gebruik de JSON data om dynamisch paginas te genereren
- Implementeer `generateStaticParams()` voor alle routes
- Zie `app/blog/[slug]/page.tsx` als voorbeeld

### Stap 6: Test SEO

```bash
# Start development server
npm run dev

# In een andere terminal, test SEO
node scripts/check-seo.js http://localhost:5000
```

### Stap 7: Build & Deploy

```bash
# Build de applicatie (genereert ook sitemap.xml)
npm run build

# Test de production build lokaal
npm start

# Deploy naar je hosting (Vercel, Netlify, etc.)
```

---

## 📊 SEO Checklist Pre-Launch

Gebruik deze checklist voor je live gaat:

- [ ] Alle WordPress content gemigreerd
- [ ] SEO metadata voor elke pagina geconfigureerd
- [ ] 301 redirects geïmplementeerd en getest
- [ ] Images geoptimaliseerd en geïmporteerd
- [ ] Internal links werken (geen broken links)
- [ ] Sitemap.xml toegankelijk op `/sitemap.xml`
- [ ] Robots.txt correct geconfigureerd
- [ ] Schema.org structured data gevalideerd
- [ ] Google Search Console geverifieerd
- [ ] Google Analytics geconfigureerd
- [ ] SSL certificaat actief (HTTPS)
- [ ] Mobile responsiveness getest
- [ ] Core Web Vitals score > 90 (PageSpeed Insights)
- [ ] Backup van oude WordPress site gemaakt

---

## 🛠️ Nuttige Commands

```bash
# Development
npm run dev              # Start dev server op http://localhost:5000

# Build & Deploy
npm run build           # Build + genereer sitemap.xml
npm start               # Start production server

# WordPress Import
node scripts/fetch-wordpress-content.js      # Fetch content
node scripts/download-wordpress-media.js     # Download media
node scripts/check-seo.js http://localhost:5000  # Test SEO

# Lint
npm run lint            # Check code quality
```

---

## 🔧 Configuratie Aanpassen

### Google Search Console Verificatie

Update in `app/layout.tsx`:

```typescript
verification: {
  google: 'jouw-google-verification-code',
}
```

### Social Media Links

Update in `app/components/StructuredData.tsx`:

```typescript
"sameAs": [
  "https://www.facebook.com/quality-drive",
  "https://www.instagram.com/quality-drive",
  // etc...
]
```

### Site URL

Update in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://jouw-domein.nl
```

---

## 📚 Belangrijke Bestanden

### SEO Configuratie
- `app/layout.tsx` - Global metadata en Schema.org
- `app/components/StructuredData.tsx` - Schema.org helper component
- `next-sitemap.config.js` - Sitemap generatie instellingen

### Redirects & Optimalisatie
- `next.config.ts` - 301 redirects, image config, headers
- `.env.local` - Environment variables

### WordPress Migratie
- `scripts/wordpress-migration-guide.md` - Complete handleiding
- `scripts/fetch-wordpress-content.js` - Content import
- `scripts/download-wordpress-media.js` - Media download
- `scripts/check-seo.js` - SEO validator

---

## 🎯 SEO Best Practices

### 1. Page-Specific Metadata

Elke pagina moet eigen metadata hebben:

```typescript
// app/jouw-pagina/page.tsx
export const metadata: Metadata = {
  title: 'Specifieke Pagina Titel',
  description: 'Unieke beschrijving voor deze pagina...',
  openGraph: { ... },
};
```

### 2. Schema.org Structured Data

Voor speciale paginas (bijv. FAQ, Contact):

```typescript
import StructuredData from '@/app/components/StructuredData';

<StructuredData type="FAQPage" data={faqSchema} />
```

### 3. Image Optimization

Gebruik altijd Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/uploads/image.jpg"
  alt="Beschrijvende alt text"
  width={800}
  height={600}
  loading="lazy"
/>
```

### 4. Internal Linking

Link naar andere paginas voor betere SEO:

```typescript
import Link from 'next/link';

<Link href="/blog">Lees onze blog</Link>
```

---

## 🔍 SEO Testing Tools

Na deployment, test met deze tools:

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev
   - Target: Score > 90 voor Mobile & Desktop

2. **Schema.org Validator**
   - https://validator.schema.org
   - Test structured data

3. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly

4. **Google Search Console**
   - https://search.google.com/search-console
   - Dien sitemap in: `https://quality-drive.nl/sitemap.xml`

5. **Redirect Checker**
   - https://httpstatus.io
   - Test alle 301 redirects

---

## ⚠️ Veelvoorkomende Problemen

### Sitemap.xml niet gevonden?
```bash
# Zorg dat postbuild script runt na build
npm run build
# Check public/sitemap.xml
```

### Images laden niet?
```bash
# Check of images in public/uploads/ staan
ls -la public/uploads/

# Check next.config.ts image configuration
```

### 404 errors na deployment?
```bash
# Voeg redirects toe in next.config.ts
# Test lokaal eerst met: npm run build && npm start
```

---

## 📞 Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Google Search Central**: https://developers.google.com/search
- **Complete Handleiding**: `scripts/wordpress-migration-guide.md`

---

## 🎊 Je Bent Klaar!

Je Next.js app is nu volledig voorbereid voor een SEO-vriendelijke WordPress migratie.

**Volgende stap**: Begin met het importeren van je WordPress content met de scripts in de `scripts/` folder!

Veel succes met je migratie! 🚀

---

**Laatst bijgewerkt**: 2025-11-02
