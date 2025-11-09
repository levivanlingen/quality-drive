'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, PopulairePakkettenSection, FeaturesImageSection } from '@/app/components/sections';
import { StartRijavontuurCTA } from '@/app/components/sections/StartRijavontuurCTA';
import styles from '../page.module.css';
import { CheckCircle2, Bike, Disc3 } from 'lucide-react';

export default function MotorPakkettenPage() {
  const packages = [
    {
      name: 'Spoed Pakket',
      price: 499,
      lessons: 10,
      savings: 59,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. 300',
        'AVB examen t.w.v. 225',
        'Gratis AVB her examen CBR t.w.v. 225',
        'Motorkleding inbegrepen',
        'In 2 delen betalen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
    {
      name: 'Spoed Pakket+',
      price: 649,
      lessons: 15,
      savings: 75,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. 300',
        'AVB examen t.w.v. 225',
        'Gratis AVB her examen CBR t.w.v. 225',
        'Motorkleding inbegrepen',
        'In 2 delen betalen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
    {
      name: 'Actie Pakket',
      price: 749,
      lessons: 20,
      savings: 83,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. 300',
        'AVB examen t.w.v. 225',
        'Gratis AVB her examen CBR t.w.v. 225',
        'Motorkleding inbegrepen',
        'In 2 delen betalen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
    {
      name: 'Garantie Pakket',
      price: 949,
      lessons: 25,
      savings: 90,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. 300',
        'AVB examen t.w.v. 225',
        'Gratis AVB her examen CBR t.w.v. 225',
        'Motorkleding inbegrepen',
        'In 2 delen betalen',
        'Theorie ondersteuning',
      ],
      featured: true,
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Motor Pakketten"
        subtitle="Kies het pakket dat bij jou past"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Motor Pakketten' }
        ]}
      />

      {/* Packages Section */}
      <PopulairePakkettenSection
        title="Motor Rijles Pakketten"
        subtitle="Kies het pakket dat bij jou past en start vandaag nog"
        packages={packages}
        buttonLink="https://calendly.com/qualitydrive/30min"
        priceSuffix="2x"
      />

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Geslaagde Toppers Section */}
      <section className={styles.geslaagdeSection}>
        <div className={styles.geslaagdeContent}>
          <h2 className={styles.sectionHeaderTitle}>Wordt jij de volgende?</h2>
          <p className={styles.sectionHeaderSubtitle}>De geslaagde motor toppers van Quality Drive</p>

          <div className={styles.geslaagdeGrid}>
            <Image
              src="/uploads/2b938a12-ec01-4987-8445-39a3d17bcbb3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/78dde0c3-cad0-4265-8168-a534326d60fb.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/60b901bf-c187-4a41-b331-c5dce0a7064c.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/107972467_1212829972386094_152816382712214096_n.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/aff19a03-b4e5-47c7-aae2-60f429ce8cb1.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-4.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
          </div>

          <button className={styles.geslaagdeCTA}>
            Word jij de volgende topper? Start nu!
          </button>
        </div>
      </section>

      {/* Features Image Section - 6 Zekerheden */}
      <FeaturesImageSection
        imageTitle="Beste goedkope motorrijschool"
        imageAlt="Beste goedkope motorrijschool"
      />

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
