# Database Setup - Quality Drive

## Overzicht

Dit project gebruikt PostgreSQL met Prisma ORM om pagina's dynamisch te beheren en te renderen met Server-Side Rendering (SSR) voor optimale SEO.

## Database Structuur

### Models

#### `Page`
Bevat alle pagina content (rijschool, taxi, theorie, etc.)
- `id` - Unieke identifier
- `wordpressId` - Originele WordPress ID (voor migratie)
- `slug` - URL-vriendelijke identifier (bijv. `den-haag`, `wateringen`)
- `title` - Pagina titel
- `content` - HTML content
- `category` - Type pagina (RIJSCHOOL_AUTO, RIJSCHOOL_TAXI, etc.)
- `locationId` - Link naar locatie (voor stad-specifieke pagina's)
- `seoTitle`, `seoDescription`, `seoKeywords` - SEO metadata

#### `Location`
Bevat alle steden/locaties
- `id` - Unieke identifier
- `name` - Stad naam (bijv. "Den Haag")
- `slug` - URL slug (bijv. "den-haag")

#### `PageCategory` (Enum)
- `RIJSCHOOL_AUTO` - Auto rijschool pagina's
- `RIJSCHOOL_TAXI` - Taxi rijles pagina's
- `RIJSCHOOL_MOTOR` - Motor rijschool pagina's
- `RIJSCHOOL_AUTOMAAT` - Automaat rijles pagina's
- `THEORIE` - Theorie pagina's
- `BLOG` - Blog posts
- `CONTACT` - Contact pagina
- `ABOUT` - Over ons pagina's
- `GENERAL` - Algemene pagina's

## Belangrijke Scripts

```bash
# Database schema pushen naar database
npm run db:push

# Data importeren uit pages.json
npm run db:seed

# Prisma Studio openen (database browser)
npm run db:studio
```

## Dynamische Pagina's

### Rijschool Pagina's

**URL Pattern:** `/rijschool/[city]`

Voorbeeld URLs:
- `/rijschool/den-haag`
- `/rijschool/zoetermeer`
- `/rijschool/delft`

**Bestand:** `app/rijschool/[city]/page.tsx`

Deze route:
- ✅ Genereert automatisch static pages voor alle steden
- ✅ Haalt data op uit de database met SSR
- ✅ Heeft optimale SEO metadata
- ✅ Revalidatie elke uur (ISR)

### Taxi Rijles Pagina's

**URL Pattern:** `/taxi-rijles/[city]`

Voorbeeld URLs:
- `/taxi-rijles/wateringen`
- `/taxi-rijles/den-haag`

**Bestand:** `app/taxi-rijles/[city]/page.tsx`

## Nieuwe Pagina Toevoegen

### Methode 1: Via Database

```typescript
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';

// 1. Maak een nieuwe locatie (indien nodig)
const location = await prisma.location.create({
  data: {
    name: 'Pijnacker',
    slug: 'pijnacker',
  },
});

// 2. Maak een nieuwe pagina
const page = await prisma.page.create({
  data: {
    slug: 'rijschool-pijnacker',
    title: 'Rijschool Pijnacker',
    content: '<p>Welkom bij Quality Drive Pijnacker...</p>',
    category: PageCategory.RIJSCHOOL_AUTO,
    locationId: location.id,
    seoTitle: 'Rijschool Pijnacker | Quality Drive',
    seoDescription: 'De beste rijschool in Pijnacker',
  },
});
```

### Methode 2: Via Seed Script

Voeg data toe aan `data/pages.json` en run:

```bash
npm run db:seed
```

## Nieuwe Dynamische Route Maken

Voor een nieuwe categorie (bijv. motor rijles):

1. **Maak directory:**
   ```bash
   mkdir -p app/motor-rijles/[city]
   ```

2. **Maak page.tsx:**
   ```typescript
   // app/motor-rijles/[city]/page.tsx
   import prisma from '@/lib/prisma';
   import { PageCategory } from '@prisma/client';

   export async function generateStaticParams() {
     const pages = await prisma.page.findMany({
       where: { category: PageCategory.RIJSCHOOL_MOTOR },
       include: { location: true },
     });

     return pages
       .filter(page => page.location)
       .map((page) => ({
         city: page.location!.slug,
       }));
   }

   export default async function MotorRijlesPage({ params }) {
     const { city } = await params;

     const page = await prisma.page.findFirst({
       where: {
         category: PageCategory.RIJSCHOOL_MOTOR,
         location: { slug: city },
       },
       include: { location: true },
     });

     // Render page...
   }
   ```

## Data Ophalen

### Alle pagina's van een categorie
```typescript
const rijschoolPages = await prisma.page.findMany({
  where: {
    category: PageCategory.RIJSCHOOL_AUTO,
  },
  include: {
    location: true,
  },
});
```

### Pagina ophalen voor specifieke stad
```typescript
const page = await prisma.page.findFirst({
  where: {
    category: PageCategory.RIJSCHOOL_AUTO,
    location: {
      slug: 'den-haag',
    },
  },
  include: {
    location: true,
  },
});
```

### Alle locaties ophalen
```typescript
const locations = await prisma.location.findMany({
  include: {
    _count: {
      select: { pages: true },
    },
  },
});
```

## SEO Voordelen

✅ **Static Generation** - Pagina's worden bij build time gegenereerd
✅ **ISR (Incremental Static Regeneration)** - Pagina's worden elke uur ververst
✅ **Metadata** - Automatische SEO metadata per pagina
✅ **Structured Data** - Database-gedreven content
✅ **Performance** - Snelle laadtijden door static pages

## Development Workflow

1. **Data toevoegen:**
   ```bash
   # Via Prisma Studio (visuele editor)
   npm run db:studio

   # Of via seed script
   npm run db:seed
   ```

2. **Pages genereren:**
   ```bash
   npm run build
   ```

3. **Testen:**
   ```bash
   npm run dev
   ```

## Productie

Bij deployment:
1. Database migrations worden automatisch toegepast
2. Prisma Client wordt gegenereerd bij build
3. Static pages worden gegenereerd voor alle routes

## Database URL

De database connection string staat in `.env.local`:
```
DATABASE_URL=postgresql://...
```

## Troubleshooting

### Prisma Client niet gevonden
```bash
npx prisma generate
```

### Schema out of sync
```bash
npm run db:push
```

### Data opnieuw importeren
```bash
npm run db:seed
```

### Database resetten (LET OP: verwijdert alle data!)
```bash
npx prisma migrate reset
```
