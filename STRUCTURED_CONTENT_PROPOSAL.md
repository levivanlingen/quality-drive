# Gestructureerde Content Architectuur - Voorstel

## 🎯 Doel
In plaats van één grote HTML blob, willen we specifieke velden die gemapped worden naar React components.

## 📊 Verbeterd Database Schema

### Optie 1: Extra Velden aan Page Model (Simpel)

```prisma
model Page {
  // ... bestaande velden ...

  // Hero Section
  heroTitle       String?
  heroSubtitle    String?
  heroImage       String?
  heroButtonText  String?
  heroButtonLink  String?

  // Features Section
  features        Json?  // Array van { title, description, icon }

  // Benefits/USPs
  benefits        Json?  // Array van { title, description }

  // Pricing (optioneel, kan ook aparte Package model)
  packages        Json?  // Array van { name, price, features[], popular: boolean }

  // Testimonials
  testimonials    Json?  // Array van { name, text, rating, image }

  // FAQ
  faqs            Json?  // Array van { question, answer }

  // CTA Section
  ctaTitle        String?
  ctaText         String?
  ctaButtonText   String?
  ctaButtonLink   String?

  // Legacy (voor backward compatibility)
  content         String?  @db.Text
}
```

### Optie 2: Separate Content Blocks (Flexibel, Best Practice)

```prisma
model Page {
  id            Int           @id @default(autoincrement())
  title         String
  slug          String        @unique
  category      PageCategory
  location      Location?     @relation(fields: [locationId], references: [id])
  locationId    Int?

  // Relations naar content blocks
  contentBlocks ContentBlock[]

  // SEO blijft hetzelfde
  seoTitle      String?
  seoDescription String?
  // ...
}

model ContentBlock {
  id        Int              @id @default(autoincrement())
  page      Page             @relation(fields: [pageId], references: [id])
  pageId    Int

  type      ContentBlockType // HERO, FEATURES, PRICING, FAQ, CTA, etc.
  order     Int              // Volgorde op pagina
  data      Json             // Flexibele data per block type

  isVisible Boolean          @default(true)

  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt

  @@index([pageId, order])
}

enum ContentBlockType {
  HERO
  FEATURES
  BENEFITS
  PRICING
  TESTIMONIALS
  FAQ
  CTA
  TEXT_CONTENT
  IMAGE_GALLERY
  CONTACT_FORM
}
```

## 🎨 Component Architectuur

### Voorbeeld: Den Haag Stad Pagina

```tsx
// app/rijschool/[city]/page.tsx
export default async function RijschoolCityPage({ params }) {
  const page = await prisma.page.findFirst({
    where: { location: { slug: params.city } },
    include: {
      location: true,
      contentBlocks: {
        where: { isVisible: true },
        orderBy: { order: 'asc' }
      }
    }
  });

  return (
    <div>
      <Header />

      {/* Dynamische content blocks */}
      {page.contentBlocks.map((block) => (
        <ContentBlockRenderer key={block.id} block={block} />
      ))}

      <Footer />
    </div>
  );
}

// Component renderer
function ContentBlockRenderer({ block }) {
  switch (block.type) {
    case 'HERO':
      return <HeroSection {...block.data} />;
    case 'FEATURES':
      return <FeaturesSection features={block.data.features} />;
    case 'PRICING':
      return <PricingSection packages={block.data.packages} />;
    case 'FAQ':
      return <FAQSection faqs={block.data.faqs} />;
    case 'CTA':
      return <CTASection {...block.data} />;
    default:
      return null;
  }
}
```

### Voorbeeld Components:

```tsx
// components/sections/HeroSection.tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function HeroSection({ title, subtitle, image, buttonText, buttonLink }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {buttonText && (
          <Link href={buttonLink || '#'} className={styles.button}>
            {buttonText}
          </Link>
        )}
      </div>
      {image && (
        <Image src={image} alt={title} width={800} height={600} />
      )}
    </section>
  );
}

// components/sections/FeaturesSection.tsx
interface Feature {
  title: string;
  description: string;
  icon: string;
}

export function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <section className={styles.features}>
      <div className={styles.grid}>
        {features.map((feature, i) => (
          <div key={i} className={styles.featureCard}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## 📝 Data Structuur Voorbeelden

### Hero Block Data:
```json
{
  "type": "HERO",
  "order": 1,
  "data": {
    "title": "Rijschool Den Haag",
    "subtitle": "Professionele rijlessen met ervaren instructeurs",
    "image": "/uploads/hero-den-haag.jpg",
    "buttonText": "Gratis proefles plannen",
    "buttonLink": "https://calendly.com/qualitydrive/30min"
  }
}
```

### Features Block Data:
```json
{
  "type": "FEATURES",
  "order": 2,
  "data": {
    "title": "Waarom Quality Drive?",
    "features": [
      {
        "title": "Gratis proefles",
        "description": "Start met een gratis proefles van 60 minuten",
        "icon": "gift"
      },
      {
        "title": "Geen wachtrij",
        "description": "Morgen al starten met je rijlessen",
        "icon": "zap"
      },
      {
        "title": "100% Geslaagd garantie",
        "description": "Of je krijgt je geld terug",
        "icon": "shield"
      }
    ]
  }
}
```

### FAQ Block Data:
```json
{
  "type": "FAQ",
  "order": 5,
  "data": {
    "title": "Veelgestelde vragen",
    "faqs": [
      {
        "question": "Hoeveel kost een rijles in Den Haag?",
        "answer": "Een rijles bij Quality Drive kost €45 per uur. Bij pakketkorting betaal je minder per les."
      },
      {
        "question": "Hoe snel kan ik starten?",
        "answer": "Je kunt al morgen starten! Wij hebben geen wachtlijst."
      }
    ]
  }
}
```

## 🚀 Implementatie Stappenplan

### Fase 1: Schema Migratie (1-2 dagen)
1. ✅ Kies tussen Optie 1 (simpel) of Optie 2 (flexibel)
2. ✅ Update Prisma schema
3. ✅ Run migrations
4. ✅ Parse bestaande HTML content naar gestructureerde data
5. ✅ Populate nieuwe velden

### Fase 2: Components Bouwen (2-3 dagen)
1. ✅ HeroSection component
2. ✅ FeaturesSection component
3. ✅ PricingSection component
4. ✅ FAQSection component
5. ✅ CTASection component
6. ✅ TestimonialsSection component
7. ✅ ContentBlockRenderer

### Fase 3: Page Templates Update (1 dag)
1. ✅ Update `/rijschool/[city]/page.tsx`
2. ✅ Update `/taxi-rijles/[city]/page.tsx`
3. ✅ Test met 2-3 steden
4. ✅ Deploy

### Fase 4: Content Migration (1-2 dagen)
1. ✅ Script om oude HTML te parsen
2. ✅ Extract relevante secties
3. ✅ Convert naar JSON structure
4. ✅ Bulk update database

## 💡 Voordelen van deze Aanpak

### ✅ **Performance**
- Geen 169KB HTML dumps
- Components laden alleen wat nodig is
- Next.js Image optimization werkt
- Betere Core Web Vitals

### ✅ **SEO**
- Structured data per sectie mogelijk
- Schema.org per block type
- Betere semantic HTML
- Crawlers begrijpen structuur

### ✅ **Maintainability**
- Wijzigingen in één component = overal geupdate
- A/B testing mogelijk
- Makkelijk nieuwe secties toevoegen
- Type-safe met TypeScript

### ✅ **Flexibiliteit**
- Content editors kunnen secties toevoegen/verwijderen
- Volgorde aanpasbaar per pagina
- Verschillende layouts per stad mogelijk
- Personalisatie mogelijk

### ✅ **Reusability**
- Components herbruikbaar over pagina's
- Consistente UI/UX
- Design system mogelijk
- Storybook voor documentation

## 🎯 Aanbeveling

**Start met Optie 1** (Extra velden aan Page model):
- Sneller te implementeren
- Minder complex
- Genoeg flexibiliteit voor nu
- Later naar Optie 2 als nodig

**Migreer naar Optie 2** wanneer:
- Je > 10 verschillende content types hebt
- Content editors zelf secties willen toevoegen
- Je A/B testing wilt doen
- Je multi-language support nodig hebt

## 📊 Voorbeeld Database Queries

### Haal pagina op met alle data:
```typescript
const page = await prisma.page.findFirst({
  where: {
    category: PageCategory.RIJSCHOOL_AUTO,
    location: { slug: 'den-haag' }
  },
  include: {
    location: true
  },
  select: {
    id: true,
    title: true,
    heroTitle: true,
    heroSubtitle: true,
    heroImage: true,
    features: true,
    packages: true,
    faqs: true,
    testimonials: true,
    ctaTitle: true,
    ctaText: true,
    seoTitle: true,
    seoDescription: true,
    location: {
      select: {
        name: true,
        slug: true
      }
    }
  }
});
```

### Render de pagina:
```tsx
<HeroSection
  title={page.heroTitle}
  subtitle={page.heroSubtitle}
  image={page.heroImage}
/>

<FeaturesSection features={page.features as Feature[]} />

<PricingSection packages={page.packages as Package[]} />

<FAQSection faqs={page.faqs as FAQ[]} />

<CTASection
  title={page.ctaTitle}
  text={page.ctaText}
/>
```

## 🔧 Migration Script Voorbeeld

```typescript
// scripts/migrate-content-to-structured.ts
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

async function migrateContent() {
  const pages = await prisma.page.findMany({
    where: { category: 'RIJSCHOOL_AUTO' }
  });

  for (const page of pages) {
    const $ = cheerio.load(page.content);

    // Extract hero data
    const heroTitle = $('h1').first().text();
    const heroSubtitle = $('h1').next('p').text();

    // Extract features
    const features = $('.feature').map((i, el) => ({
      title: $(el).find('h3').text(),
      description: $(el).find('p').text(),
      icon: $(el).data('icon')
    })).get();

    // Update database
    await prisma.page.update({
      where: { id: page.id },
      data: {
        heroTitle,
        heroSubtitle,
        features: JSON.stringify(features),
        // etc...
      }
    });
  }
}

migrateContent();
```

## ✅ Conclusie

**Ja, dit is absoluut mogelijk en zelfs de beste aanpak!**

De setup ondersteunt dit volledig. We moeten alleen:
1. Schema uitbreiden met gestructureerde velden
2. Components maken per sectie type
3. Bestaande HTML content migreren

Dit geeft je:
- ✅ Volledige controle over UI
- ✅ Betere performance
- ✅ Betere SEO
- ✅ Makkelijker onderhoud
- ✅ Type-safety met TypeScript
