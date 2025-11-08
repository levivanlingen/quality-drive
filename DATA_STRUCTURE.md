# AutorijlesStad Data Structuur

## ✅ Database Schema

De `AutorijlesStad` tabel heeft de volgende kolommen voor gestructureerde content:

### Hero Sectie
- `heroTitle`: "Rijschool Den Haag"
- `heroSubtitle`: Ondertitel tekst
- `heroImage`: URL naar hero afbeelding
- `heroButtonText`: Button tekst
- `heroButtonLink`: Calendly link

### Intro Sectie
- `introTitle`: "Autorijlessen in Den Haag"
- `introText`: Introductie paragraaf

### Features (JSON Array)
```typescript
[
  { title: string, description: string, icon: string },
  ...
]
```

### Waarom Quality Drive
- `whyTitle`: "Waarom kiezen voor Quality Drive?"
- `whyText`: Algemene tekst
- `whyPoints`: JSON array met points

### Pakketten
- `showPricing`: boolean
- `pricingTitle`: Titel
- `pricingSubtitle`: Ondertitel
- `packages`: JSON array met pakket info

### Lokale Info
- `localTitle`: "Rijlessen in [Stad]"
- `localText`: Stad-specifieke informatie
- `examLocation`: CBR locatie
- `popularRoutes`: JSON array met routes

### Testimonials
- `showTestimonials`: boolean
- `testimonials`: JSON array met reviews

### FAQ
- `showFaq`: boolean
- `faqTitle`: Titel
- `faqs`: JSON array met Q&A

### CTA
- `ctaTitle`: "Start vandaag nog!"
- `ctaText`: CTA tekst
- `ctaButtonText`: Button tekst
- `ctaButtonLink`: Calendly link
- `ctaImage`: Background image

### Statistieken
- `studentCount`: Aantal geslaagde leerlingen
- `successRate`: Slagingspercentage (87.5)
- `yearsActive`: Jaar actief (8)
- `instructorCount`: Aantal instructeurs (12)

### SEO
- `seoTitle`: SEO title tag
- `seoDescription`: META description
- `seoKeywords`: Keywords
- `ogImage`: Open Graph image

## 📝 Voorbeeld Data (Den Haag)

Zie `/scripts/seed-autorijles-den-haag.ts` voor volledige voorbeeld data.

## 🎨 Component Mapping

Elke database veld wordt gemapt naar een React component:

| Database Veld | Component | Props |
|--------------|-----------|-------|
| hero* | `<HeroSection>` | title, subtitle, image, button |
| intro* | `<IntroSection>` | title, text |
| features | `<FeaturesGrid>` | features array |
| why* | `<WhySection>` | title, text, points |
| packages | `<PricingSection>` | packages array |
| local* | `<LocalInfoSection>` | title, text, routes |
| testimonials | `<TestimonialsSection>` | testimonials array |
| faqs | `<FAQSection>` | faqs array |
| cta* | `<CTASection>` | title, text, button |

## 🚀 Gebruik in Template

```tsx
const stadData = await prisma.autorijlesStad.findUnique({
  where: { locationId: location.id },
  include: { location: true }
});

return (
  <>
    <HeroSection {...stadData.hero} city={stadData.location.name} />
    <IntroSection {...stadData.intro} />
    <FeaturesGrid features={stadData.features} />
    // etc...
  </>
);
```
