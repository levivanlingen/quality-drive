'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import autoPakkettenStyles from './auto-pakketten.module.css';
import { Check, Car, Zap, Clock, Shield, Star, Trophy, Award, ChevronDown } from 'lucide-react';

export default function AutoPakkettenPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const highlights = [
    { icon: Zap, text: 'SNEL SLAGEN' },
    { icon: Clock, text: 'GEEN WACHTRIJ' },
    { icon: Check, text: 'DE GOEDKOOPSTE IN DE REGIO' },
  ];

  const packages = [
    {
      id: 'basis',
      title: 'Basis Pakket',
      icon: Car,
      price: '€ 1.099',
      lessons: '20 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '20 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      color: '#0065A6',
      popular: false,
    },
    {
      id: 'actie',
      title: 'Actie Pakket',
      icon: Star,
      price: '€ 1.575',
      lessons: '30 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '30 rijlessen van 60 minuten',
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
      price: '€ 1.799',
      lessons: '35 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '35 rijlessen van 60 minuten',
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
      price: '€ 1.999',
      lessons: '40 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '40 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      color: '#0065A6',
      popular: true,
    },
    {
      id: 'compleet',
      title: 'Compleet Pakket',
      icon: Award,
      price: '€ 2.299',
      lessons: '45 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '45 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      color: '#0065A6',
      popular: false,
    },
    {
      id: 'compleet-plus',
      title: 'Compleet Pakket+',
      icon: Award,
      price: '€ 2.399',
      lessons: '50 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '50 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
        'Extra ondersteuning',
      ],
      color: '#0065A6',
      popular: false,
    },
  ];

  const spoedPackages = [
    {
      id: 'spoed',
      title: 'Spoed Pakket',
      icon: Zap,
      price: '€ 599',
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
      icon: Zap,
      price: '€ 1.250',
      lessons: '25 lessen',
      features: [
        'Gratis proefles t.w.v. €45',
        '25 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      color: '#0065A6',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Wat maakt Quality-Drive uniek?',
      answer: 'Bij Quality-Drive zetten we ons in voor rijonderwijs van de hoogste kwaliteit, waarbij de leerling centraal staat. Onze benadering is uniek: wij bieden een gratis proefles aan, garanderen korting op elke rijles, en passen een bewezen effectieve lesmethode toe. Bovendien bieden we gepersonaliseerde theorie-ondersteuning, afgestemd op de individuele behoeften van elke leerling. Deze combinatie van factoren zorgt ervoor dat elke leerling niet alleen slaagt voor hun rijexamen, maar ook met vertrouwen en kundigheid de weg op gaat.',
    },
    {
      question: 'Biedt Quality-Drive ondersteuning voor speciale behoeften?',
      answer: 'Quality-Drive onderscheidt zich door een inclusieve benadering van rijonderwijs, waarbij elke leerling, ongeacht hun specifieke behoeften, de juiste ondersteuning en aandacht krijgt. Voor leerlingen met ADD, ADHD of faalangst biedt Quality-Drive gespecialiseerde instructeurs die getraind zijn in het bieden van maatwerk rijlessen. Deze instructeurs hebben kennis en ervaring in het omgaan met de unieke uitdagingen die deze leerlingen kunnen ervaren.',
    },
    {
      question: 'Hoe garandeert Quality-Drive de veiligheid?',
      answer: 'Bij Quality-Drive staat veiligheid voorop in alles wat we doen. Wij garanderen de veiligheid van onze leerlingen door gebruik te maken van modern uitgeruste lesvoertuigen, die regelmatig worden onderhouden en gecontroleerd om te voldoen aan de hoogste veiligheidsnormen. Onze rijinstructeurs zijn niet alleen deskundig, maar ook speciaal opgeleid om een veilige, ondersteunende en rustgevende leeromgeving te creëren. Daarnaast leggen we de nadruk op defensief rijden en het bewustzijn van de weg, zodat leerlingen voorbereid zijn op allerlei verkeerssituaties. Bij Quality-Drive is jouw veiligheid onze prioriteit.',
    },
    {
      question: 'Zijn alle instructeurs op VOG gecontroleerd?',
      answer: 'Bij Quality-Drive nemen we de betrouwbaarheid en professionaliteit van ons team zeer serieus. Daarom zorgen we ervoor dat al onze instructeurs grondig zijn gescreend, inclusief een Verklaring Omtrent het Gedrag (VOG). Deze VOG-check verzekert dat onze instructeurs niet alleen uitblinken in hun vak, maar ook betrouwbaar en van onbesproken gedrag zijn. Zo kunnen wij onze leerlingen en hun families de zekerheid bieden dat ze in veilige en betrouwbare handen zijn. Bij Quality-Drive kunt u vertrouwen op een team van professionals die uw veiligheid en succes op de weg waarborgen.',
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={autoPakkettenStyles.hero}>
        <div className={autoPakkettenStyles.heroContent}>
          {/* Breadcrumb */}
          <nav className={autoPakkettenStyles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={autoPakkettenStyles.breadcrumbSeparator}>/</span>
            <Link href="/rijles-pakketten">Pakketten</Link>
            <span className={autoPakkettenStyles.breadcrumbSeparator}>/</span>
            <span>Auto pakketten</span>
          </nav>

          {/* Highlights */}
          <div className={autoPakkettenStyles.highlights}>
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className={autoPakkettenStyles.highlightItem}>
                  <IconComponent size={20} />
                  <span>{highlight.text}</span>
                </div>
              );
            })}
          </div>

          <h1 className={autoPakkettenStyles.heroTitle}>
            Maak Korte Metten met Je auto examen
          </h1>
          <h2 className={autoPakkettenStyles.heroSubtitle}>
            100% geslaagd bij Quality Drive
          </h2>
          <p className={autoPakkettenStyles.heroText}>
            Meld je aan voor de gratis proefles en ervaar zelf waarom ons slagingspercentage zo hoog is
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className={autoPakkettenStyles.packagesSection}>
        <div className={autoPakkettenStyles.packagesContainer}>
          <div className={autoPakkettenStyles.sectionHeader}>
            <h2 className={autoPakkettenStyles.sectionTitle}>
              Kies het pakket dat bij jou past
            </h2>
            <p className={autoPakkettenStyles.sectionSubtitle}>
              Alle pakketten bevatten een gratis proefles
            </p>
          </div>

          <div className={autoPakkettenStyles.packagesGridThree}>
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`${autoPakkettenStyles.packageCard} ${pkg.popular ? autoPakkettenStyles.packageCardPopular : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {pkg.popular && (
                    <div className={autoPakkettenStyles.popularBadge}>
                      MEEST GEKOZEN
                    </div>
                  )}

                  <div className={autoPakkettenStyles.packageIcon}>
                    <IconComponent size={40} strokeWidth={1.5} />
                  </div>

                  <h3 className={autoPakkettenStyles.packageTitle}>
                    {pkg.title}
                  </h3>

                  <div className={autoPakkettenStyles.packagePrice}>
                    {pkg.price}
                  </div>

                  <div className={autoPakkettenStyles.packageLessons}>
                    {pkg.lessons}
                  </div>

                  <ul className={autoPakkettenStyles.packageFeatures}>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className={autoPakkettenStyles.packageFeature}>
                        <Check size={18} className={autoPakkettenStyles.featureIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://calendly.com/qualitydrive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={autoPakkettenStyles.packageButton}
                  >
                    Boek dit pakket
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spoed Packages Section */}
      <section className={autoPakkettenStyles.packagesSection}>
        <div className={autoPakkettenStyles.packagesContainer}>
          <div className={autoPakkettenStyles.sectionHeader}>
            <h2 className={autoPakkettenStyles.sectionTitle}>
              Spoed Pakketten
            </h2>
            <p className={autoPakkettenStyles.sectionSubtitle}>
              Voor wie snel wil starten met rijlessen
            </p>
          </div>

          <div className={autoPakkettenStyles.packagesGridThree}>
            {spoedPackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`${autoPakkettenStyles.packageCard} ${pkg.popular ? autoPakkettenStyles.packageCardPopular : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {pkg.popular && (
                    <div className={autoPakkettenStyles.popularBadge}>
                      MEEST GEKOZEN
                    </div>
                  )}

                  <div className={autoPakkettenStyles.packageIcon}>
                    <IconComponent size={40} strokeWidth={1.5} />
                  </div>

                  <h3 className={autoPakkettenStyles.packageTitle}>
                    {pkg.title}
                  </h3>

                  <div className={autoPakkettenStyles.packagePrice}>
                    {pkg.price}
                  </div>

                  <div className={autoPakkettenStyles.packageLessons}>
                    {pkg.lessons}
                  </div>

                  <ul className={autoPakkettenStyles.packageFeatures}>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className={autoPakkettenStyles.packageFeature}>
                        <Check size={18} className={autoPakkettenStyles.featureIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://calendly.com/qualitydrive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={autoPakkettenStyles.packageButton}
                  >
                    Boek dit pakket
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={autoPakkettenStyles.faqSection}>
        <div className={autoPakkettenStyles.faqContainer}>
          <div className={autoPakkettenStyles.sectionHeader}>
            <h2 className={autoPakkettenStyles.sectionTitle}>
              Veelgestelde Vragen
            </h2>
            <p className={autoPakkettenStyles.sectionSubtitle}>
              Alles wat je moet weten over onze auto pakketten
            </p>
          </div>

          <div className={autoPakkettenStyles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={autoPakkettenStyles.faqItem}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={autoPakkettenStyles.faqQuestion}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={24}
                    className={`${autoPakkettenStyles.faqIcon} ${openFaq === index ? autoPakkettenStyles.faqIconOpen : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className={autoPakkettenStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={autoPakkettenStyles.finalCtaSection}>
        <div className={autoPakkettenStyles.finalCtaContainer}>
          <h2 className={autoPakkettenStyles.finalCtaTitle}>
            Vragen over onze pakketten?
          </h2>
          <p className={autoPakkettenStyles.finalCtaText}>
            Neem contact met ons op voor persoonlijk advies over welk pakket het beste bij jou past
          </p>
          <Link
            href="/contact"
            className={autoPakkettenStyles.finalCtaButton}
          >
            <Car size={20} />
            Neem contact op
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
