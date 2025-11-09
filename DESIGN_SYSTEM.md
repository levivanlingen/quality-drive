# Quality Drive Design System

Welkom bij het Quality Drive Design System! Dit document legt uit hoe je de herbruikbare componenten gebruikt voor consistente styling door de hele website.

## 📋 Inhoudsopgave

1. [Design Tokens](#design-tokens)
2. [Section Componenten](#section-componenten)
3. [Gebruik Voorbeelden](#gebruik-voorbeelden)
4. [Best Practices](#best-practices)

---

## 🎨 Design Tokens

Alle design tokens zijn gedefinieerd in `/app/globals.css`. Deze tokens zorgen voor consistente kleuren, spacing, typography, shadows, etc. door de hele website.

### Kleuren

```css
/* Brand kleuren */
--color-primary: #0065A6;        /* Hoofdkleur blauw */
--color-primary-dark: #004d7a;   /* Donker blauw */
--color-accent: #C11517;         /* Rode CTA kleur */
--color-accent-dark: #a00f11;    /* Donker rood */
--color-highlight: #FFD700;      /* Goud voor badges */

/* Neutrale kleuren */
--color-white: #ffffff;
--color-black: #000000;
--color-gray-50 tot --color-gray-900
```

### Spacing

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-4: 1rem;      /* 16px */
--spacing-8: 2rem;      /* 32px */
/* ... tot spacing-32 */
```

### Typography

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg tot --text-7xl
```

**Gebruik in je CSS:**
```css
.myElement {
  color: var(--color-primary);
  padding: var(--spacing-4);
  font-size: var(--text-lg);
}
```

---

## 📦 Section Componenten

Alle section componenten zijn beschikbaar in `/app/components/sections/`.

### Beschikbare Sections

| Component | Beschrijving | Gebruikt op |
|-----------|--------------|-------------|
| `HeroSection` | Hero met breadcrumbs en titel | Rijopleidingen pagina |
| `SterkePuntenBanner` | Banner met checkmarks | Homepage |
| `StappenSection` | 4 stappen naar je rijbewijs | Rijschool city pages |
| `ZekerhedenSection` | 6 zekerheden met cards | Homepage |
| `WaaromQualityDriveSection` | 5 benefits met iconen | Homepage & city pages |
| `PopulairePakkettenSection` | Pricing cards | Rijschool city pages |
| `OverQualityDriveCarousel` | Content carousel | Rijschool city pages |
| `StartRijavontuurCTA` | CTA met achtergrond | Rijschool city pages |

---

## 🏷️ Label + Title Patroon

Alle section componenten ondersteunen nu een **optionele `label` prop** voor het homepage standaard patroon:

```
Van Starter tot Pro (label - klein, uppercase)
De 6 zekerheden alleen bij Quality Drive (title - groot, bold)
```

Dit patroon is overal consistent toegepast met:
- Label: 0.95rem, uppercase, primary color, letter-spacing
- Title: 2.5rem (40px) - homepage standaard

---

## 💡 Gebruik Voorbeelden

### Voorbeeld 1: Hero met Label

```tsx
import { HeroSection } from '@/app/components/sections';

export default function MijnPagina() {
  return (
    <HeroSection
      label="Autorijles"
      title="Rijlessen in Amsterdam"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Autorijles', href: '/autorijles' },
        { label: 'Amsterdam' }
      ]}
    />
  );
}
```

### Voorbeeld 2: Sterke Punten Banner

```tsx
import { SterkePuntenBanner } from '@/app/components/sections';

export default function MijnPagina() {
  return (
    <SterkePuntenBanner
      features={[
        'Start morgen al je proefles',
        'Also in English',
        'Nu € 7,50 korting per les',
        'Ook voor ADD & ADHD'
      ]}
    />
  );
}
```

### Voorbeeld 3: 4 Stappen Sectie met Label

```tsx
import { StappenSection } from '@/app/components/sections';

// Met default content:
<StappenSection />

// OF met label + custom content:
<StappenSection
  label="Hoe werkt het?"
  title="In 4 stappen naar je rijbewijs"
  steps={[
    { number: 1, title: 'Proefles', description: '...' },
    { number: 2, title: 'Pakket kiezen', description: '...' },
    { number: 3, title: 'Start met rijles', description: '...' },
    { number: 4, title: 'Rijbewijs halen', description: '...' }
  ]}
/>
```

### Voorbeeld 4: Zekerheden Sectie

```tsx
import { ZekerhedenSection } from '@/app/components/sections';

// Met default 6 zekerheden:
<ZekerhedenSection />

// OF met custom zekerheden:
<ZekerhedenSection
  label="Onze Voordelen"
  title="3 Redenen om voor ons te kiezen"
  zekerheden={[
    { number: 1, title: 'Snel', description: '...' },
    { number: 2, title: 'Goedkoop', description: '...' },
    { number: 3, title: 'Kwaliteit', description: '...' }
  ]}
/>
```

### Voorbeeld 5: Populaire Pakketten met Label

```tsx
import { PopulairePakkettenSection } from '@/app/components/sections';

<PopulairePakkettenSection
  label="Onze Aanbiedingen"
  title="Populaire Pakketten"
  subtitle="Kies wat bij jou past"
  packages={[
    {
      name: 'Basis',
      price: 1099,
      lessons: 20,
      savings: 120,
      features: ['20 lessen', 'Gratis proefles'],
      note: 'Exclusief examen',
      featured: false
    },
    {
      name: 'Premium',
      price: 1575,
      lessons: 30,
      savings: 180,
      features: ['30 lessen', 'Gratis proefles', 'Extra support'],
      featured: true  // <- Krijgt "Populair" badge
    }
  ]}
/>
```

### Voorbeeld 6: Waarom Quality Drive met Label

```tsx
import { WaaromQualityDriveSection } from '@/app/components/sections';

// Met default 5 benefits:
<WaaromQualityDriveSection />

// OF met label + custom benefits:
<WaaromQualityDriveSection
  label="Onze Voordelen"
  title="Waarom kiezen voor Quality Drive?"
  benefits={[
    { icon: 'trophy', title: 'Succes', description: '...' },
    { icon: 'users', title: 'Team', description: '...' },
    { icon: 'car', title: 'Auto\'s', description: '...' }
  ]}
/>
```

### Voorbeeld 7: Carousel (met stadsnaam)

```tsx
import { OverQualityDriveCarousel } from '@/app/components/sections';

<OverQualityDriveCarousel
  cityName="Den Haag"
  // Gebruikt default slides met ${cityName} erin verwerkt
/>

// OF met custom slides:
<OverQualityDriveCarousel
  cityName="Rotterdam"
  slides={[
    {
      title: 'Slide 1',
      content: ['Paragraph 1', 'Paragraph 2']
    },
    {
      title: 'Slide 2',
      content: ['Paragraph 1']
    }
  ]}
/>
```

### Voorbeeld 8: CTA Sectie

```tsx
import { StartRijavontuurCTA } from '@/app/components/sections';

<StartRijavontuurCTA
  label="Begin vandaag nog"
  title="Start jouw Rijavontuur bij Quality Drive!"
  text="Klaar om te beginnen? Schrijf je in!"
  buttonText="Gratis proefles"
  buttonLink="https://calendly.com/qualitydrive/30min"
  backgroundImage="/uploads/my-background.jpg"
/>
```

### Volledige Pagina Voorbeeld (met Labels)

```tsx
import {
  HeroSection,
  SterkePuntenBanner,
  StappenSection,
  ZekerhedenSection,
  WaaromQualityDriveSection,
  PopulairePakkettenSection,
  OverQualityDriveCarousel,
  StartRijavontuurCTA
} from '@/app/components/sections';

export default function AutorijlesAmsterdam() {
  return (
    <>
      <HeroSection
        label="Autorijles"
        title="Rijlessen in Amsterdam"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Autorijles', href: '/autorijles' },
          { label: 'Amsterdam' }
        ]}
      />

      <SterkePuntenBanner
        features={[
          'Start morgen al',
          'English available',
          '€ 7,50 korting'
        ]}
      />

      <StappenSection
        label="Hoe werkt het?"
      />

      <ZekerhedenSection
        label="Van Starter tot Pro"
      />

      <WaaromQualityDriveSection
        label="Onze Voordelen"
      />

      <PopulairePakkettenSection
        label="Onze Aanbiedingen"
      />

      <OverQualityDriveCarousel cityName="Amsterdam" />

      <StartRijavontuurCTA
        label="Begin vandaag nog"
      />
    </>
  );
}
```

---

## ✅ Best Practices

### 1. **Gebruik altijd de section componenten**
```tsx
// ✅ GOED
import { StappenSection } from '@/app/components/sections';
<StappenSection />

// ❌ SLECHT - Niet zelf opnieuw bouwen
<section className={styles.mySteps}>...</section>
```

### 2. **Gebruik design tokens in custom CSS**
```css
/* ✅ GOED */
.myCustomElement {
  color: var(--color-primary);
  padding: var(--spacing-4);
}

/* ❌ SLECHT - Hardcoded waardes */
.myCustomElement {
  color: #0065A6;
  padding: 1rem;
}
```

### 3. **Props zijn optioneel**
Alle sections hebben sensible defaults. Je hoeft alleen props mee te geven als je iets wilt aanpassen.

```tsx
// Met defaults (meest gebruikt):
<ZekerhedenSection />

// Met overrides (als je iets wilt aanpassen):
<ZekerhedenSection
  title="Mijn Custom Titel"
  showButtons={false}
/>
```

### 4. **Consistentie**
Gebruik dezelfde sections op vergelijkbare pagina's voor consistentie:
- Alle city pages: Zelfde structuur
- Alle opleiding pages: Zelfde structuur
- Homepage: Uniek maar met herbruikbare sections

---

## 🚀 Snel Starten

1. **Import de section:**
```tsx
import { HeroSection } from '@/app/components/sections';
```

2. **Gebruik in je pagina:**
```tsx
<HeroSection title="Mijn Titel" />
```

3. **Pas aan via props (optioneel):**
```tsx
<HeroSection
  title="Custom Titel"
  breadcrumbs={[...]}
/>
```

---

## 📞 Hulp Nodig?

Alle componenten hebben:
- ✅ TypeScript types voor auto-completion
- ✅ JSDoc comments voor documentatie
- ✅ Sensible defaults (je hoeft meestal niks aan te passen)

Bekijk de component files in `/app/components/sections/` voor alle beschikbare props!
