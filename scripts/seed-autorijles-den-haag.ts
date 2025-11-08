import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway'
    }
  }
});

async function seedDenHaag() {
  console.log('🌱 Seeding AutorijlesStad data voor Den Haag...\n');

  try {
    // Vind of maak Den Haag location
    const denHaag = await prisma.location.upsert({
      where: { slug: 'den-haag' },
      update: {},
      create: {
        name: 'Den Haag',
        slug: 'den-haag'
      }
    });

    console.log('✅ Location found:', denHaag.name);

    // Maak AutorijlesStad entry
    const autorijlesStad = await prisma.autorijlesStad.upsert({
      where: { locationId: denHaag.id },
      update: {
        // Hero Sectie
        heroTitle: 'Rijschool Den Haag',
        heroSubtitle: 'Professionele autorijlessen in Den Haag en omgeving. Start vandaag nog met je gratis proefles!',
        heroImage: '/uploads/hero-den-haag.jpg',
        heroButtonText: 'Gratis proefles plannen',
        heroButtonLink: 'https://calendly.com/qualitydrive/30min',

        // Introductie
        introTitle: 'Autorijlessen in Den Haag',
        introText: 'Ben je op zoek naar een betrouwbare rijschool in Den Haag? Bij Quality Drive krijg je professionele rijlessen van ervaren instructeurs. Of je nu helemaal opnieuw begint of al enige rijervaring hebt, wij passen onze lessen aan jouw niveau aan.',

        // Features
        features: [
          {
            title: 'Gratis proefles',
            description: 'Start met een gratis proefles van 60 minuten om kennis te maken',
            icon: 'gift'
          },
          {
            title: 'Geen wachtrij',
            description: 'Morgen al starten met je rijlessen, zonder wachtlijst',
            icon: 'zap'
          },
          {
            title: '100% Geslaagd garantie',
            description: 'Slaag je niet in één keer? Dan krijg je extra lessen gratis',
            icon: 'shield'
          },
          {
            title: 'Moderne lesauto\'s',
            description: 'Leer rijden in goed onderhouden, moderne auto\'s',
            icon: 'car'
          },
          {
            title: 'Flexibele planning',
            description: 'Plan je lessen wanneer het jou uitkomt',
            icon: 'calendar'
          },
          {
            title: 'Ervaren instructeurs',
            description: 'Al onze instructeurs zijn volledig gecertificeerd met jarenlange ervaring',
            icon: 'user-check'
          }
        ],

        // Waarom Quality Drive
        whyTitle: 'Waarom kiezen voor Quality Drive in Den Haag?',
        whyText: 'Quality Drive is dé rijschool van Den Haag en omgeving. Met onze bewezen lesmethode en ervaren instructeurs heb je de beste kans om snel en veilig je rijbewijs te halen.',
        whyPoints: [
          {
            title: 'Lokale kennis',
            description: 'Onze instructeurs kennen Den Haag als hun broekzak en bereiden je perfect voor op je examen'
          },
          {
            title: 'Hoog slagingspercentage',
            description: 'Maar liefst 87% van onze leerlingen slaagt in één keer'
          },
          {
            title: 'Persoonlijke aanpak',
            description: 'Elke leerling is uniek. Wij passen ons tempo aan jouw leerstijl aan'
          }
        ],

        // Pakketten
        showPricing: true,
        pricingTitle: 'Onze rijles pakketten in Den Haag',
        pricingSubtitle: 'Kies het pakket dat bij jou past',
        packages: [
          {
            name: 'Basis Pakket',
            price: 1099,
            lessons: 20,
            popular: false,
            features: [
              '20 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Persoonlijke instructeur',
              'Flexibele planning'
            ],
            note: 'Exclusief praktijkexamen CBR'
          },
          {
            name: 'Actie Pakket',
            price: 1575,
            lessons: 30,
            popular: true,
            features: [
              '30 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Tussentijdse toets',
              'Persoonlijke instructeur',
              '€180 korting'
            ],
            note: 'Exclusief praktijkexamen CBR'
          },
          {
            name: 'Garantie Pakket',
            price: 1999,
            lessons: 40,
            popular: false,
            features: [
              '40 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Tussentijdse toets',
              'Examenaanvraag inclusief',
              'Geld terug garantie'
            ],
            note: 'Inclusief praktijkexamen CBR'
          }
        ],

        // Lokale info
        localTitle: 'Rijlessen in Den Haag',
        localText: 'Den Haag heeft diverse CBR examenlocaties en een gevarieerd wegennet. Van drukke stadscentra tot rustige woonwijken - wij bereiden je voor op alle situaties. Onze instructeurs kennen de populaire examenroutes en laten je kennismaken met alle aspecten van het verkeer in Den Haag.',
        examLocation: 'CBR Den Haag - Binckhorstlaan',
        popularRoutes: [
          'Centrum Den Haag - Buitenhof',
          'Scheveningen - Kust route',
          'Bezuidenhout - Woonwijken',
          'Loosduinen - Industriegebied'
        ],

        // Testimonials
        showTestimonials: true,
        testimonials: [
          {
            name: 'Sarah M.',
            text: 'Super rijschool! Dankzij Quality Drive heb ik in één keer mijn rijbewijs gehaald. De instructeur was geduldig en professioneel.',
            rating: 5,
            location: 'Den Haag Centrum'
          },
          {
            name: 'Mohammed A.',
            text: 'Ik had al bij een andere rijschool gezeten maar kwam niet verder. Bij Quality Drive kreeg ik eindelijk de begeleiding die ik nodig had.',
            rating: 5,
            location: 'Scheveningen'
          },
          {
            name: 'Lisa van D.',
            text: 'Flexibele planning en goede uitleg. Aanrader voor iedereen die in Den Haag rijles wil nemen!',
            rating: 5,
            location: 'Bezuidenhout'
          }
        ],

        // FAQ
        showFaq: true,
        faqTitle: 'Veelgestelde vragen over rijlessen in Den Haag',
        faqs: [
          {
            question: 'Hoeveel kost een rijles in Den Haag?',
            answer: 'Een losse rijles kost €45 per uur. Maar met onze pakketten profiteer je van aantrekkelijke kortingen. Het Basis Pakket (20 lessen) kost bijvoorbeeld €1.099, wat neerkomt op €54,95 per les inclusief gratis proefles.'
          },
          {
            question: 'Hoe snel kan ik starten met rijlessen?',
            answer: 'Je kunt al morgen starten! Wij hebben geen wachtlijst en kunnen vrijwel direct een instructeur voor je regelen in Den Haag.'
          },
          {
            question: 'Waar vinden de rijlessen plaats?',
            answer: 'We halen je op bij een locatie naar keuze in Den Haag en omgeving. Dit kan bij je thuis, werk of school zijn.'
          },
          {
            question: 'Wat is het slagingspercentage in Den Haag?',
            answer: 'Ons gemiddeld slagingspercentage bij het CBR in Den Haag ligt op 87%, ruim boven het landelijk gemiddelde van 49%.'
          },
          {
            question: 'Welke auto\'s gebruiken jullie?',
            answer: 'We rijden in moderne, goed onderhouden lesauto\'s. Momenteel gebruiken we Toyota Yaris en Volkswagen Polo\'s met dubbele bediening.'
          },
          {
            question: 'Krijg ik dezelfde instructeur?',
            answer: 'Ja! We vinden het belangrijk dat je een vaste instructeur hebt die je leerstijl kent en je vooruitgang kan volgen.'
          }
        ],

        // CTA
        ctaTitle: 'Klaar om te starten in Den Haag?',
        ctaText: 'Plan vandaag nog je gratis proefles en ontdek waarom zoveel mensen in Den Haag voor Quality Drive kiezen. Geen wachtrij, geen verborgen kosten, gewoon goede rijlessen!',
        ctaButtonText: 'Gratis proefles plannen',
        ctaButtonLink: 'https://calendly.com/qualitydrive/30min',
        ctaImage: '/uploads/cta-background.jpg',

        // Statistieken
        studentCount: 1250,
        successRate: 87.5,
        yearsActive: 8,
        instructorCount: 12,

        // SEO
        seoTitle: 'Rijschool Den Haag | Quality Drive | Gratis Proefles',
        seoDescription: 'Zoek je een rijschool in Den Haag? ✓ Gratis proefles ✓ Geen wachtrij ✓ 87% slagingspercentage ✓ Ervaren instructeurs. Start vandaag nog!',
        seoKeywords: 'rijschool den haag, autorijles den haag, rijlessen den haag, goedkope rijschool den haag, snel rijbewijs halen den haag',
        ogImage: '/uploads/og-den-haag.jpg',

        // Status
        isPublished: true,
        publishedAt: new Date()
      },
      create: {
        locationId: denHaag.id,

        // Hero Sectie
        heroTitle: 'Rijschool Den Haag',
        heroSubtitle: 'Professionele autorijlessen in Den Haag en omgeving. Start vandaag nog met je gratis proefles!',
        heroImage: '/uploads/hero-den-haag.jpg',
        heroButtonText: 'Gratis proefles plannen',
        heroButtonLink: 'https://calendly.com/qualitydrive/30min',

        // Introductie
        introTitle: 'Autorijlessen in Den Haag',
        introText: 'Ben je op zoek naar een betrouwbare rijschool in Den Haag? Bij Quality Drive krijg je professionele rijlessen van ervaren instructeurs. Of je nu helemaal opnieuw begint of al enige rijervaring hebt, wij passen onze lessen aan jouw niveau aan.',

        // Features
        features: [
          {
            title: 'Gratis proefles',
            description: 'Start met een gratis proefles van 60 minuten om kennis te maken',
            icon: 'gift'
          },
          {
            title: 'Geen wachtrij',
            description: 'Morgen al starten met je rijlessen, zonder wachtlijst',
            icon: 'zap'
          },
          {
            title: '100% Geslaagd garantie',
            description: 'Slaag je niet in één keer? Dan krijg je extra lessen gratis',
            icon: 'shield'
          },
          {
            title: 'Moderne lesauto\'s',
            description: 'Leer rijden in goed onderhouden, moderne auto\'s',
            icon: 'car'
          },
          {
            title: 'Flexibele planning',
            description: 'Plan je lessen wanneer het jou uitkomt',
            icon: 'calendar'
          },
          {
            title: 'Ervaren instructeurs',
            description: 'Al onze instructeurs zijn volledig gecertificeerd met jarenlange ervaring',
            icon: 'user-check'
          }
        ],

        // Waarom Quality Drive
        whyTitle: 'Waarom kiezen voor Quality Drive in Den Haag?',
        whyText: 'Quality Drive is dé rijschool van Den Haag en omgeving. Met onze bewezen lesmethode en ervaren instructeurs heb je de beste kans om snel en veilig je rijbewijs te halen.',
        whyPoints: [
          {
            title: 'Lokale kennis',
            description: 'Onze instructeurs kennen Den Haag als hun broekzak en bereiden je perfect voor op je examen'
          },
          {
            title: 'Hoog slagingspercentage',
            description: 'Maar liefst 87% van onze leerlingen slaagt in één keer'
          },
          {
            title: 'Persoonlijke aanpak',
            description: 'Elke leerling is uniek. Wij passen ons tempo aan jouw leerstijl aan'
          }
        ],

        // Pakketten
        showPricing: true,
        pricingTitle: 'Onze rijles pakketten in Den Haag',
        pricingSubtitle: 'Kies het pakket dat bij jou past',
        packages: [
          {
            name: 'Basis Pakket',
            price: 1099,
            lessons: 20,
            popular: false,
            features: [
              '20 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Persoonlijke instructeur',
              'Flexibele planning'
            ],
            note: 'Exclusief praktijkexamen CBR'
          },
          {
            name: 'Actie Pakket',
            price: 1575,
            lessons: 30,
            popular: true,
            features: [
              '30 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Tussentijdse toets',
              'Persoonlijke instructeur',
              '€180 korting'
            ],
            note: 'Exclusief praktijkexamen CBR'
          },
          {
            name: 'Garantie Pakket',
            price: 1999,
            lessons: 40,
            popular: false,
            features: [
              '40 rijlessen van 60 minuten',
              'Gratis proefles t.w.v. €45',
              'Theorie ondersteuning',
              'Tussentijdse toets',
              'Examenaanvraag inclusief',
              'Geld terug garantie'
            ],
            note: 'Inclusief praktijkexamen CBR'
          }
        ],

        // Lokale info
        localTitle: 'Rijlessen in Den Haag',
        localText: 'Den Haag heeft diverse CBR examenlocaties en een gevarieerd wegennet. Van drukke stadscentra tot rustige woonwijken - wij bereiden je voor op alle situaties. Onze instructeurs kennen de populaire examenroutes en laten je kennismaken met alle aspecten van het verkeer in Den Haag.',
        examLocation: 'CBR Den Haag - Binckhorstlaan',
        popularRoutes: [
          'Centrum Den Haag - Buitenhof',
          'Scheveningen - Kust route',
          'Bezuidenhout - Woonwijken',
          'Loosduinen - Industriegebied'
        ],

        // Testimonials
        showTestimonials: true,
        testimonials: [
          {
            name: 'Sarah M.',
            text: 'Super rijschool! Dankzij Quality Drive heb ik in één keer mijn rijbewijs gehaald. De instructeur was geduldig en professioneel.',
            rating: 5,
            location: 'Den Haag Centrum'
          },
          {
            name: 'Mohammed A.',
            text: 'Ik had al bij een andere rijschool gezeten maar kwam niet verder. Bij Quality Drive kreeg ik eindelijk de begeleiding die ik nodig had.',
            rating: 5,
            location: 'Scheveningen'
          },
          {
            name: 'Lisa van D.',
            text: 'Flexibele planning en goede uitleg. Aanrader voor iedereen die in Den Haag rijles wil nemen!',
            rating: 5,
            location: 'Bezuidenhout'
          }
        ],

        // FAQ
        showFaq: true,
        faqTitle: 'Veelgestelde vragen over rijlessen in Den Haag',
        faqs: [
          {
            question: 'Hoeveel kost een rijles in Den Haag?',
            answer: 'Een losse rijles kost €45 per uur. Maar met onze pakketten profiteer je van aantrekkelijke kortingen. Het Basis Pakket (20 lessen) kost bijvoorbeeld €1.099, wat neerkomt op €54,95 per les inclusief gratis proefles.'
          },
          {
            question: 'Hoe snel kan ik starten met rijlessen?',
            answer: 'Je kunt al morgen starten! Wij hebben geen wachtlijst en kunnen vrijwel direct een instructeur voor je regelen in Den Haag.'
          },
          {
            question: 'Waar vinden de rijlessen plaats?',
            answer: 'We halen je op bij een locatie naar keuze in Den Haag en omgeving. Dit kan bij je thuis, werk of school zijn.'
          },
          {
            question: 'Wat is het slagingspercentage in Den Haag?',
            answer: 'Ons gemiddeld slagingspercentage bij het CBR in Den Haag ligt op 87%, ruim boven het landelijk gemiddelde van 49%.'
          },
          {
            question: 'Welke auto\'s gebruiken jullie?',
            answer: 'We rijden in moderne, goed onderhouden lesauto\'s. Momenteel gebruiken we Toyota Yaris en Volkswagen Polo\'s met dubbele bediening.'
          },
          {
            question: 'Krijg ik dezelfde instructeur?',
            answer: 'Ja! We vinden het belangrijk dat je een vaste instructeur hebt die je leerstijl kent en je vooruitgang kan volgen.'
          }
        ],

        // CTA
        ctaTitle: 'Klaar om te starten in Den Haag?',
        ctaText: 'Plan vandaag nog je gratis proefles en ontdek waarom zoveel mensen in Den Haag voor Quality Drive kiezen. Geen wachtrij, geen verborgen kosten, gewoon goede rijlessen!',
        ctaButtonText: 'Gratis proefles plannen',
        ctaButtonLink: 'https://calendly.com/qualitydrive/30min',
        ctaImage: '/uploads/cta-background.jpg',

        // Statistieken
        studentCount: 1250,
        successRate: 87.5,
        yearsActive: 8,
        instructorCount: 12,

        // SEO
        seoTitle: 'Rijschool Den Haag | Quality Drive | Gratis Proefles',
        seoDescription: 'Zoek je een rijschool in Den Haag? ✓ Gratis proefles ✓ Geen wachtrij ✓ 87% slagingspercentage ✓ Ervaren instructeurs. Start vandaag nog!',
        seoKeywords: 'rijschool den haag, autorijles den haag, rijlessen den haag, goedkope rijschool den haag, snel rijbewijs halen den haag',
        ogImage: '/uploads/og-den-haag.jpg',

        // Status
        isPublished: true,
        publishedAt: new Date()
      }
    });

    console.log('✅ AutorijlesStad created/updated for:', denHaag.name);
    console.log('\n📊 Stats:');
    console.log('  - Features:', (autorijlesStad.features as any[])?.length || 0);
    console.log('  - Packages:', (autorijlesStad.packages as any[])?.length || 0);
    console.log('  - FAQs:', (autorijlesStad.faqs as any[])?.length || 0);
    console.log('  - Testimonials:', (autorijlesStad.testimonials as any[])?.length || 0);
    console.log('  - Success Rate:', autorijlesStad.successRate + '%');
    console.log('\n🎉 Seed completed successfully!');

  } catch (error: any) {
    console.error('❌ Error seeding:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDenHaag();
