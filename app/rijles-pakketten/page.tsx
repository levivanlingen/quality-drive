'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import pakkettenStyles from './pakketten.module.css';
import { Car, Bike, Shield, Check, Disc3 } from 'lucide-react';

export default function RijlesPakkettenPage() {
  const packages = [
    {
      id: 'auto',
      title: 'Auto pakketten',
      icon: Car,
      description: 'Bekijk onze auto rijles pakketten',
      link: '/auto-pakketten',
      color: '#0065A6',
    },
    {
      id: 'motor',
      title: 'Motor pakketten',
      icon: Bike,
      description: 'Bekijk onze motor rijles pakketten',
      link: '/motor-pakketten',
      color: '#0065A6',
    },
  ];

  const guarantees = [
    'Gratis proefles',
    '€ 7,50 korting per rijles',
    'Morgen starten met je rijles',
    'Succesvolle lesmethode',
    'Beoordeling rijinstructeurs 9.1',
    'Theorie ondersteuning tijdens je les',
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={pakkettenStyles.hero}>
        <div className={pakkettenStyles.heroContent}>
          {/* Breadcrumb */}
          <nav className={pakkettenStyles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={pakkettenStyles.breadcrumbSeparator}>/</span>
            <span>Pakketten</span>
          </nav>

          <h1 className={pakkettenStyles.heroTitle}>
            Pakketten
          </h1>
        </div>
      </section>

      {/* Packages Section */}
      <section className={pakkettenStyles.packagesSection}>
        <div className={pakkettenStyles.packagesContainer}>
          <div className={pakkettenStyles.sectionHeader}>
            <h2 className={pakkettenStyles.sectionTitle}>
              Bekijk onze pakketten
            </h2>
            <p className={pakkettenStyles.sectionSubtitle}>
              Kies je pakket categorie
            </p>
          </div>
          <div className={pakkettenStyles.packagesGrid}>
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              return (
                <Link
                  key={pkg.id}
                  href={pkg.link}
                  className={pakkettenStyles.packageCard}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className={pakkettenStyles.packageLabel}>Start nu</div>
                  <div
                    className={pakkettenStyles.packageIcon}
                    style={{ background: pkg.color }}
                  >
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={pakkettenStyles.packageTitle}>
                    {pkg.title}
                  </h3>
                  <div className={pakkettenStyles.packageArrow}>
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={pakkettenStyles.contentSection}>
        <div className={pakkettenStyles.contentContainer}>
          <h2 className={pakkettenStyles.contentTitle}>
            Pakketten rijles Den Haag - Zoetermeer - Rijswijk - Delft en omgeving
          </h2>

          <div className={pakkettenStyles.contentText}>
            <p>
              Ben je 16,5? Sta je te popelen voor je rijbewijs? Dan ben je hier aan het juiste adres.
              Bij rijschool Quality-Drive Den Haag – Zoetermeer – Rijswijk – Delft en omgeving verzorgen
              we je alleen de beste rijlessen op maat. Onze ervaren en gedreven rijinstructeurs zullen je
              professioneel en met enthousiasme opvangen en begeleiden met het behalen van je rijbewijs.
              De leeftijd is zoals vele zeggen maar een cijfer, wij bij de autorijschool Quality-Drive
              Den Haag – Zoetermeer en omgeving geloven en vertrouwen in de kwaliteit die geleverd wordt
              door onze ervaren rijinstructeurs voor jong en oud en bieden zelfs een examengarantie aan.
            </p>
            <p>
              Heb je helemaal geen rijervaring? Of al enige rijervaring? Ga je voor een rijles spoedcursus
              in Den Haag – Zoetermeer – Rijswijk – Delft of omgeving? Of kies je toch voor Maatwerk?
              Bij de Quality-Drive hebben we het allemaal! Met de 6 zekerheden alleen bij Quality-Drive
              kun je uitgaan van een gegarandeerde succesvolle rijervaring.
            </p>
          </div>

          <div className={pakkettenStyles.guaranteesSection}>
            <h3 className={pakkettenStyles.guaranteesTitle}>
              De 6 zekerheden alleen bij Quality-Drive
            </h3>
            <ul className={pakkettenStyles.guaranteesList}>
              {guarantees.map((guarantee, index) => (
                <li key={index} className={pakkettenStyles.guaranteeItem}>
                  <Check size={20} className={pakkettenStyles.guaranteeIcon} />
                  <span>{guarantee}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* CTA Section */}
      <section className={pakkettenStyles.ctaSection}>
        <div className={pakkettenStyles.ctaContainer}>
          <div className={pakkettenStyles.ctaContent}>
            <p className={pakkettenStyles.ctaLabel}>Begin vandaag nog</p>
            <h2 className={pakkettenStyles.ctaTitle}>
              Start jouw Rijavontuur bij Quality Drive!
            </h2>
            <p className={pakkettenStyles.ctaTextBox}>
              Hierboven kun je een keuze maken tussen de verschillende rijopleidingen.
              Wij werken in <strong>Den Haag, Zoetermeer, Delft, Rijswijk</strong> en omgeving.
            </p>
            <p className={pakkettenStyles.ctaTextBox}>
              Als je vragen hebt kun je geheel vrijblijvend contact met ons opnemen,
              we helpen je graag verder.
            </p>

            <div className={pakkettenStyles.guaranteeBox}>
              <h3 className={pakkettenStyles.guaranteeBoxTitle}>
                <Shield size={28} />
                Onze Zekerheid aan jou
              </h3>
              <p className={pakkettenStyles.guaranteeBoxText}>
                Bij Quality Drive zorgen we ervoor dat je met zekerheid jouw rijbewijs haalt.
                Wij bieden niet alleen uitstekende rijlessen, maar ook de garantie dat je goed
                voorbereid en vol vertrouwen je rijexamen aflegt.
              </p>
            </div>

            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={pakkettenStyles.ctaButton}
            >
              <Car size={20} />
              Gratis proefles plannen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
