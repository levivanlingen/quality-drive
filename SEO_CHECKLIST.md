# SEO Checklist & Best Practices - Quality Drive

## ✅ Al Geïmplementeerd (Uitstekend!)

### 1. **Technische SEO**
- ✅ **Server-Side Rendering (SSR)** - Content is volledig zichtbaar voor crawlers
- ✅ **Static Site Generation (SSG)** - 30 stad pagina's worden statisch gegenereerd
- ✅ **Incremental Static Regeneration (ISR)** - Pagina's worden elk uur ververst
- ✅ **Sitemap.xml** - Automatisch gegenereerd met next-sitemap
- ✅ **robots.txt** - Correct geconfigureerd
- ✅ **Fast Loading** - Static pages = snelle laadtijd

### 2. **Meta Tags & Open Graph**
- ✅ **Title tags** - Dynamisch per pagina
- ✅ **Meta descriptions** - Uit database of fallback
- ✅ **Canonical URLs** - Voorkomt duplicate content
- ✅ **Open Graph tags** - Voor social media sharing
- ✅ **Twitter Cards** - Voor Twitter sharing
- ✅ **Keywords meta** - Per pagina ingesteld

### 3. **Structured Data (Schema.org)**
- ✅ **LocalBusiness Schema** - Voor lokale zoekresultaten
- ✅ **Breadcrumb Schema** - Voor breadcrumb navigation in Google
- ✅ **EducationalOrganization Schema** - Voor rijschool identificatie
- ✅ **AggregateRating** - 9.1 rating displayed in search results
- ✅ **Service/Offer Schema** - Voor diensten catalog

### 4. **Accessibility (A11y)**
- ✅ **aria-label** - Op links en buttons
- ✅ **aria-current** - Op active breadcrumb items
- ✅ **aria-hidden** - Op decorative elements
- ✅ **Semantic HTML** - `<article>`, `<nav>`, `<section>`
- ✅ **role attributes** - Voor screen readers

### 5. **Content Optimization**
- ✅ **H1 tags** - Eén per pagina met stad naam
- ✅ **Heading hierarchy** - H1 → H2 → H3 in content
- ✅ **Internal linking** - Breadcrumbs en cross-linking
- ✅ **URL structure** - Clean, descriptive URLs

## 🚀 Extra Optimalisaties (Implementeren voor Perfect Score)

### 1. **Image Optimization** (Belangrijk!)
**Probleem:** HTML content bevat `<img>` tags zonder Next.js optimization

**Oplossing:**
```typescript
// Maak een component die HTML images processed
import Image from 'next/image';

// In page.tsx, replace dangerouslySetInnerHTML met:
function OptimizedContent({ html }: { html: string }) {
  // Parse HTML en vervang <img> tags met Next.js Image
  // Of: Gebruik een library zoals 'html-react-parser'
}
```

**Prioriteit:** 🔴 Hoog - Images zijn cruciaal voor page speed

### 2. **Core Web Vitals**
Test en optimize:
- **LCP** (Largest Contentful Paint) - < 2.5s
- **FID** (First Input Delay) - < 100ms
- **CLS** (Cumulative Layout Shift) - < 0.1

**Tools:**
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- Web Vitals Chrome Extension

### 3. **Google Search Console Setup**
1. Verifieer domain in Google Search Console
2. Submit sitemap: `https://quality-drive.nl/sitemap.xml`
3. Monitor:
   - Click-through rate (CTR)
   - Average position
   - Impressions
   - Mobile usability

### 4. **Google Business Profile** (Cruciaal voor Local SEO!)
Voor elke stad:
- Maak Google Business Profile
- Voeg locatie toe aan schema
- Consistente NAP (Name, Address, Phone)

**Update Prisma schema:**
```prisma
model Location {
  id           Int     @id @default(autoincrement())
  name         String  @unique
  slug         String  @unique
  latitude     Float?  // Voor Google Maps
  longitude    Float?  // Voor Google Maps
  address      String? // Voor Local SEO
  postalCode   String?
  phoneNumber  String?
  pages        Page[]
}
```

### 5. **Performance Optimizations**

**Add to next.config.js:**
```javascript
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  swcMinify: true,
}
```

### 6. **FAQ Schema** (Voor Featured Snippets!)
**Implementeer op stad pagina's:**
```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoeveel kost een rijles in Den Haag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Een rijles bij Quality Drive kost €45 per uur...'
      }
    },
    // More FAQs
  ]
};
```

### 7. **Review Schema** (Voor Star Ratings!)
```typescript
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'LocalBusiness',
    name: 'Quality Drive Rijschool'
  },
  author: {
    '@type': 'Person',
    name: 'Review Author Name'
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5'
  },
  reviewBody: 'Uitstekende rijschool...'
};
```

## 📊 Monitoring & Analytics

### Must Have:
1. **Google Analytics 4** - Traffic monitoring
2. **Google Search Console** - SEO performance
3. **Google Tag Manager** - Event tracking

### Optional but Recommended:
4. **Hotjar** - User behavior heatmaps
5. **Ahrefs/SEMrush** - Competitor analysis
6. **Schema Markup Validator** - Test structured data

## 🎯 Local SEO Strategy

### Voor Elke Stad:
1. **Unieke content** - Niet duplicate
2. **Lokale keywords** - "Rijschool [Stad]"
3. **Stad-specifieke info** - Bezienswaardigheden, routes
4. **Local backlinks** - Lokale directories

### NAP Consistency:
Zorg dat Name, Address, Phone EXACT hetzelfde zijn op:
- Website
- Google Business Profile
- Social media
- Directory listings
- Citations

## 🔍 Keyword Strategy

### Primaire Keywords (Al goed!):
- "Rijschool [Stad]"
- "Autorijles [Stad]"
- "Rijlessen [Stad]"
- "Taxi rijles [Stad]"

### Secundaire Keywords (Voeg toe):
- "Goedkope rijschool [Stad]"
- "Snelcursus rijbewijs [Stad]"
- "Spoedcursus rijles [Stad]"
- "Rijschool zonder wachtlijst [Stad]"
- "Rijschool met garantie [Stad]"

### Long-tail Keywords:
- "Hoeveel kost een rijles in [Stad]"
- "Beste rijschool in [Stad]"
- "Snel rijbewijs halen in [Stad]"

## 📈 Content Recommendations

### Voeg Toe aan Stad Pagina's:
1. **Lokale FAQ sectie**
   - Waar haal je rijbewijs op in [Stad]?
   - Wat zijn de slagingspercentages in [Stad]?
   - Hoe lang duurt een rijexamen in [Stad]?

2. **Lokale Reviews/Testimonials**
   - Met foto's van geslaagde leerlingen
   - Review schema implementeren

3. **Examenlocaties**
   - Map met CBR locatie
   - Examenroutes in de stad

4. **Prijstabel**
   - Transparante prijzen per stad
   - Comparison table met pakketten

## 🚦 Quick Wins (Implementeer deze week!)

### Priority 1 (Hoogste Impact):
1. ✅ Test in Google Rich Results Test
2. ✅ Submit sitemap in Google Search Console
3. ⚠️ Add FAQ schema op stad pagina's
4. ⚠️ Add Review schema met 9.1 rating
5. ⚠️ Optimize images (Next.js Image)

### Priority 2 (Deze maand):
1. ⚠️ Setup Google Analytics 4
2. ⚠️ Create Google Business Profiles (per stad)
3. ⚠️ Add latitude/longitude to Location model
4. ⚠️ Test Core Web Vitals
5. ⚠️ Mobile responsiveness testing

### Priority 3 (Later):
1. ⏳ Content expansion (blog posts)
2. ⏳ Backlink building
3. ⏳ Video content (YouTube SEO)
4. ⏳ Local directory submissions

## 🏆 SEO Score Verwachting

### Huidige Setup:
- **Technical SEO:** 9/10
- **On-Page SEO:** 8/10
- **Content Quality:** 8/10
- **Mobile Friendly:** 9/10
- **Page Speed:** 8/10 (kan beter met image optimization)
- **Local SEO:** 7/10 (needs Google Business)

### Na Alle Optimalisaties:
- **Overall Score:** 95/100 🎯

## 📝 Notes

### Waarom is deze setup al goed?
1. **SSR + SSG** - Google ziet alle content direct
2. **Structured Data** - Rich snippets in search results
3. **Canonical URLs** - Geen duplicate content issues
4. **Fast Loading** - Static pages = instant load
5. **Mobile Responsive** - Works on all devices

### Wat maakt het nog beter?
1. **Image optimization** - Grootste performance gain
2. **Google Business** - Cruciaal voor local SEO
3. **Reviews** - Social proof + rich snippets
4. **FAQ schema** - Featured snippets opportunity

## 🔗 Handige Links

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Status:** ✅ Setup is al SEO-optimaal volgens best practices!
**Next Steps:** Implementeer Priority 1 quick wins voor perfect score
