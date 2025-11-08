'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import motorPakkettenStyles from './motor-pakketten.module.css';
import { Check, Bike, Zap, Clock, Shield, Star, Trophy, Award, ChevronDown } from 'lucide-react';

export default function MotorPakkettenPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const highlights = [
    { icon: Zap, text: 'SNEL SLAGEN' },
    { icon: Clock, text: 'GEEN WACHTRIJ' },
    { icon: Check, text: 'DE GOEDKOOPSTE IN DE REGIO' },
  ];

  const packages = [
    {
      id: 'spoed',
      title: 'Spoed Pakket',
      icon: Bike,
      price: '€ 499',
      lessons: '10 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '10 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      color: '#0065A6',
      popular: false,
    },
    {
      id: 'spoed-plus',
      title: 'Spoed Pakket+',
      icon: Star,
      price: '€ 649',
      lessons: '15 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '15 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      color: '#0065A6',
      popular: false,
    },
    {
      id: 'tussen',
      title: 'Tussen Pakket',
      icon: Shield,
      price: '€ 749',
      lessons: '18 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '18 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      color: '#0065A6',
      popular: false,
    },
    {
      id: 'garantie',
      title: 'Garantie Pakket',
      icon: Trophy,
      price: '€ 949',
      lessons: '22 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '22 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      color: '#0065A6',
      popular: true,
    },
  ];

  const faqs = [
    {
      question: 'Hoeveel lessen heb ik nodig voor mijn motorrijbewijs?',
      answer: 'Het aantal benodigde lessen verschilt per persoon. Gemiddeld hebben cursisten tussen de 15-25 lessen nodig. Tijdens je proefles kunnen we een inschatting maken van het aantal lessen dat jij nodig hebt.',
    },
    {
      question: 'Wat is inbegrepen bij de pakketten?',
      answer: 'Alle pakketten bevatten rijlessen van 60 minuten, theorie ondersteuning en een persoonlijke instructeur. Bij grotere pakketten krijg je ook een tussentijdse toets, examenaanvraag en onze geld terug garantie.',
    },
    {
      question: 'Hoe snel kan ik starten met rijlessen?',
      answer: 'Je kunt al morgen starten! We hebben geen wachttijden en proberen altijd binnen 1-2 dagen na je aanmelding te beginnen met de lessen.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={motorPakkettenStyles.hero}>
        <div className={motorPakkettenStyles.heroContent}>
          {/* Breadcrumb */}
          <nav className={motorPakkettenStyles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={motorPakkettenStyles.breadcrumbSeparator}>/</span>
            <Link href="/rijles-pakketten">Pakketten</Link>
            <span className={motorPakkettenStyles.breadcrumbSeparator}>/</span>
            <span>Motor</span>
          </nav>

          {/* Highlights */}
          <div className={motorPakkettenStyles.highlights}>
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className={motorPakkettenStyles.highlightItem}>
                  <IconComponent size={20} strokeWidth={2.5} />
                  <span>{highlight.text}</span>
                </div>
              );
            })}
          </div>

          <h1 className={motorPakkettenStyles.heroTitle}>
            Maak Korte Metten met Je motorexamen
          </h1>
          <h2 className={motorPakkettenStyles.heroSubtitle}>
            100% geslaagd bij Quality Drive
          </h2>
          <p className={motorPakkettenStyles.heroText}>
            Meld je aan voor de gratis proefles en ervaar zelf waarom ons slagingspercentage zo hoog is
          </p>
          <a
            href="https://calendly.com/qualitydrive/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={motorPakkettenStyles.ctaButton}
          >
            <Bike size={24} />
            Gratis proefles plannen
          </a>
        </div>
      </section>

      {/* Packages Section */}
      <section className={motorPakkettenStyles.packagesSection}>
        <div className={motorPakkettenStyles.packagesContainer}>
          <div className={motorPakkettenStyles.sectionHeader}>
            <h2 className={motorPakkettenStyles.sectionTitle}>
              De voordeligste pakketten in de regio
            </h2>
            <p className={motorPakkettenStyles.sectionSubtitle}>
              Kies het pakket dat bij jou past
            </p>
          </div>
          <div className={motorPakkettenStyles.packagesGrid}>
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`${motorPakkettenStyles.packageCard} ${
                    pkg.popular ? motorPakkettenStyles.packageCardPopular : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {pkg.popular && (
                    <div className={motorPakkettenStyles.popularBadge}>
                      POPULAIR
                    </div>
                  )}
                  <div className={motorPakkettenStyles.packageIcon}>
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={motorPakkettenStyles.packageTitle}>
                    {pkg.title}
                  </h3>
                  <div className={motorPakkettenStyles.packagePrice}>
                    {pkg.price}
                  </div>
                  <div className={motorPakkettenStyles.packageLessons}>
                    {pkg.lessons}
                  </div>
                  <ul className={motorPakkettenStyles.packageFeatures}>
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={motorPakkettenStyles.packageFeature}
                      >
                        <Check
                          size={18}
                          className={motorPakkettenStyles.featureIcon}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://calendly.com/qualitydrive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={motorPakkettenStyles.packageButton}
                  >
                    Kies dit pakket
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Geslaagde Toppers Section */}
      <section className={motorPakkettenStyles.geslaagdeSection}>
        <div className={motorPakkettenStyles.geslaagdeContent}>
          <h2 className={motorPakkettenStyles.geslaagdeTitle}>Wordt jij de volgende?</h2>
          <p className={motorPakkettenStyles.geslaagdeSubtitle}>De geslaagde motor toppers van Quality Drive</p>

          <div className={motorPakkettenStyles.geslaagdeGrid}>
            <Image
              src="/uploads/2b938a12-ec01-4987-8445-39a3d17bcbb3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/78dde0c3-cad0-4265-8168-a534326d60fb.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/60b901bf-c187-4a41-b331-c5dce0a7064c.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/107972467_1212829972386094_152816382712214096_n.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/aff19a03-b4e5-47c7-aae2-60f429ce8cb1.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-4.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={motorPakkettenStyles.geslaagdePhoto}
            />
          </div>

          <a
            href="https://calendly.com/qualitydrive/30min"
            className={motorPakkettenStyles.geslaagdeCTA}
          >
            Word jij de volgende topper? Start nu!
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={motorPakkettenStyles.faqSection}>
        <div className={motorPakkettenStyles.faqContainer}>
          <div className={motorPakkettenStyles.sectionHeader}>
            <h2 className={motorPakkettenStyles.sectionTitle}>
              Veelgestelde vragen
            </h2>
          </div>
          <div className={motorPakkettenStyles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={motorPakkettenStyles.faqItem}>
                <button
                  className={motorPakkettenStyles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={24}
                    className={`${motorPakkettenStyles.faqIcon} ${
                      openFaq === index ? motorPakkettenStyles.faqIconOpen : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className={motorPakkettenStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={motorPakkettenStyles.finalCtaSection}>
        <div className={motorPakkettenStyles.finalCtaContainer}>
          <h2 className={motorPakkettenStyles.finalCtaTitle}>
            Klaar om te starten met je motorrijbewijs?
          </h2>
          <p className={motorPakkettenStyles.finalCtaText}>
            Plan vandaag nog je gratis proefles en begin morgen met je rijlessen
          </p>
          <a
            href="https://calendly.com/qualitydrive/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={motorPakkettenStyles.finalCtaButton}
          >
            <Bike size={24} />
            Gratis proefles plannen
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
