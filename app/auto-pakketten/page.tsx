'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, PopulairePakkettenSection, FeaturesImageSection, FAQSection } from '@/app/components/sections';
import { StartRijavontuurCTA } from '@/app/components/sections/StartRijavontuurCTA';
import styles from '../page.module.css';
import { CheckCircle2, Car, Disc3 } from 'lucide-react';

export default function AutoPakkettenPage() {
  const packages = [
    {
      name: 'Basis Pakket',
      price: 1099,
      lessons: 20,
      savings: 120,
      features: [
        '20 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      note: 'Exclusief praktijkexamen CBR',
      featured: false,
    },
    {
      name: 'Actie Pakket',
      price: 1575,
      lessons: 30,
      savings: 180,
      features: [
        '30 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      note: 'Exclusief praktijkexamen CBR',
      featured: false,
    },
    {
      name: 'Tussen Pakket',
      price: 1799,
      lessons: 35,
      savings: 172,
      features: [
        '35 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Exclusief Praktijkexamen CBR',
      featured: true,
    },
    {
      name: 'Garantie Pakket',
      price: 1999,
      lessons: 40,
      savings: 200,
      features: [
        '40 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Inclusief praktijkexamen CBR',
      featured: false,
    },
    {
      name: 'Compleet Pakket',
      price: 2299,
      lessons: 45,
      savings: 225,
      features: [
        '45 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Inclusief praktijkexamen CBR',
      featured: false,
    },
    {
      name: 'Compleet Pakket+',
      price: 2399,
      lessons: 50,
      savings: 250,
      features: [
        '50 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
        'Extra ondersteuning',
      ],
      note: 'Inclusief praktijkexamen CBR',
      featured: false,
    },
  ];

  const spoedPackages = [
    {
      name: 'Spoed Pakket',
      price: 599,
      lessons: 10,
      savings: 60,
      features: [
        'Gratis proefles t.w.v. €45',
        '10 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      featured: false,
    },
    {
      name: 'Spoed Pakket+',
      price: 1250,
      lessons: 25,
      savings: 125,
      features: [
        'Gratis proefles t.w.v. €45',
        '25 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      featured: false,
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Auto Pakketten"
        subtitle="Kies het pakket dat bij jou past"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Auto Pakketten' }
        ]}
      />

      {/* Packages Section */}
      <PopulairePakkettenSection
        title="Auto Rijles Pakketten"
        subtitle="Kies het pakket dat bij jou past en start vandaag nog"
        packages={packages}
        buttonLink="https://calendly.com/qualitydrive/30min"
      />

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Spoed Packages Section */}
      <PopulairePakkettenSection
        title="Spoed Pakketten"
        subtitle="Voor wie snel wil starten met rijlessen"
        packages={spoedPackages}
        buttonLink="https://calendly.com/qualitydrive/30min"
      />

      {/* Features Image Section - 6 Zekerheden */}
      <FeaturesImageSection
        imageTitle="Beste goedkope rijschool voor autopakketten"
        imageAlt="Beste goedkope rijschool voor autopakketten"
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Start Rijavontuur CTA */}
      <StartRijavontuurCTA />

      <Footer />
    </div>
  );
}
