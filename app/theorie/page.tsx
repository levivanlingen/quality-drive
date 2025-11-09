'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, StartRijavontuurCTA } from '@/app/components/sections';
import styles from '../page.module.css';
import theorieStyles from './theorie.module.css';
import { BookOpen, Car, Check, Shield, Disc3 } from 'lucide-react';

export default function TheoriePage() {
  const features = [
    'Theorieondersteuning bij iedere rijles',
    'Verkeersborden en voorrangsregels',
    'Complexe situaties oefenen',
    'Up-to-date met CBR theorie-vragen',
    'Persoonlijke begeleiding',
    'Online en boeken beschikbaar',
  ];

  const examComponents = [
    'Gevaarherkenning - 25 vragen',
    'Verkeersregels - 12 vragen',
    'Verkeersinzicht - 28 vragen',
  ];

  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Theorie"
        subtitle="Alles wat je moet weten voor je theorie-examen categorie B"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Theorie' }
        ]}
      />

      {/* Main Content Section */}
      <section className={theorieStyles.contentSection}>
        <div className={theorieStyles.contentContainer}>
          <h2 className={styles.sectionHeaderTitle}>
            Theorieondersteuning, de eerste stap naar jouw rijbewijs! Categorie B
          </h2>

          <div className={theorieStyles.contentText}>
            <p>
              Naast je praktijkondersteuning krijg je bij Quality-Drive rijschool ook je theorieondersteuning
              van auto categorie B bij iedere rijles. Wij zorgen samen ervoor dat jij ook klaargestoomd wordt
              voor je theorie-examen van CBR. Tijdens de rijles behandelen we de verkeersborden – kruispunten
              – voorrangsregels – vertragen of remmen bij complexe situaties en veel meer! Zo ben jij zeker
              dat je goed klaargestoomd ben voor je theorie examen van CBR.
            </p>

            <p>
              Bij Quality-Drive geloven wij in aanpassen tot elke individu en zijn onze rijinstructeurs getraind
              en up to date van theorie vragen van CBR… kortom jouw theorie!
            </p>

            <p>
              Je mag al theorie-examen doen als je 16 jaar bent.
            </p>

            <div className={theorieStyles.highlightBox}>
              <h3 className={theorieStyles.highlightTitle}>
                Moet je dan ook wachten met het nemen van rijlessen?
              </h3>
              <p>
                Gelukkig niet. Je hoef niet te wachten met het nemen van rijlessen; je mag gewoon beginnen
                zonder dat je jouw theoriecertificaat hebt. Pas bij het aanvragen van je praktijkexamen moet
                het theoriecertificaat behaald zijn. Het is altijd beter om te combineren met enkele lessen
                voordat je voor je theorie examen bij het CBR gaat, zo heb je ook praktijkervaring op zak die
                je uiteraard zal helpen om je theorie makkelijker te behalen voor je theorie-examen. Met deze
                kennis op zak is autorijden een stuk eenvoudiger!
              </p>
            </div>
          </div>

          <div className={theorieStyles.featuresList}>
            <h3 className={theorieStyles.featuresTitle}>
              Wat krijg je bij Quality-Drive?
            </h3>
            <ul className={theorieStyles.features}>
              {features.map((feature, index) => (
                <li key={index} className={theorieStyles.featureItem}>
                  <Check size={20} className={theorieStyles.featureIcon} />
                  <span>{feature}</span>
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

      {/* Learning Methods Section */}
      <section className={theorieStyles.methodsSection}>
        <div className={theorieStyles.contentContainer}>
          <h2 className={styles.sectionHeaderTitle}>
            Theorie leren
          </h2>
          <p className={styles.sectionHeaderSubtitle}>
            Je kunt bij Quality-Drive op twee verschillende manieren leren voor jouw theorie. We bieden studie
            van je theorielessen zowel online als uit boeken aan. Voor de een is theorie leren vanuit boeken
            fijner en voor de ander online achter je laptop-tablet or smartphone. Zo heb jij je keuze, lekker
            makkelijk!
          </p>

          <div className={theorieStyles.methodsGrid}>
            {/* Online Method */}
            <div className={theorieStyles.methodCard}>
              <div className={theorieStyles.methodIcon}>
                <BookOpen size={48} strokeWidth={1.5} />
              </div>
              <h3 className={theorieStyles.methodTitle}>
                Theorie-examen; Online studeren voor je theorie
              </h3>
              <div className={theorieStyles.methodContent}>
                <p>
                  De online-methode gaat via theorie-examen.nl. De online studiemethode kost eenmalig
                  en heeft een hoog slagingspercentage.
                </p>
                <p className={theorieStyles.methodPrice}>
                  De online-methode kost <strong>€ 37,-</strong> en kan je via jouw rijinstructeur kopen
                  of via het kantoor van Quality-Drive.
                </p>
                <p>
                  Het fijne van online studeren is dat je zelf je studietempo bepaalt. Je kunt waar en
                  wanneer je maar wilt inloggen en oefenen!
                </p>
                <h4 className={theorieStyles.methodSubtitle}>Het werkt heel eenvoudig:</h4>
                <ul className={theorieStyles.methodList}>
                  <li>Je ontvangt van ons een email met daarin een unieke inlogcode</li>
                  <li>In 4 overzichtelijke hoofdstukken leer je stapsgewijs alles wat je moet weten</li>
                  <li>Oefenen en leren, waar en wanneer jij wilt</li>
                  <li>Begeleiding van je theorie tijdens praktijklessen</li>
                  <li>Bij vragen of opmerkingen kan je je rijinstructeur contacteren</li>
                </ul>
              </div>
            </div>

            {/* Book Method */}
            <div className={theorieStyles.methodCard}>
              <div className={theorieStyles.methodIcon}>
                <BookOpen size={48} strokeWidth={1.5} />
              </div>
              <h3 className={theorieStyles.methodTitle}>
                Boeken; Theorie leren
              </h3>
              <div className={theorieStyles.methodContent}>
                <p>
                  Natuurlijk is het ook mogelijk om uit boeken je theorielessen te volgen.
                </p>
                <p className={theorieStyles.methodPrice}>
                  Theorieboek t.w.v. <strong>€ 36,95</strong>
                </p>
                <p>
                  Voor de leerlingen die het fijn vinden om zichzelf klaar te stomen voor hun CBR
                  theorie-examen door middel van boeken. Je krijgt 2 theorieboeken van het jaar en wordt
                  altijd up-to-date gehouden. Zo ben jij zeker dat je geen vraag mist en alle kennis in
                  huis hebt om makkelijk te slagen.
                </p>
                <h4 className={theorieStyles.methodSubtitle}>Wat kan je verwachten?</h4>
                <ul className={theorieStyles.methodList}>
                  <li>Theorieboek t.w.v. €36,95</li>
                  <li>Begeleiding voor je theorie tijdens praktijklessen</li>
                  <li>Bij vragen of opmerkingen je rijinstructeur kunnen contacten</li>
                </ul>
                <p>
                  Alles wat je moet weten om je theorie te behalen wordt ook tijdens je proefles behandeld.
                  Tijdens de opleiding wordt goed bijgehouden hoe snel je de theorie verwerkt. De behaalde
                  resultaten worden uitgebreid besproken én je krijgt examentraining.
                </p>
              </div>
            </div>
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

      {/* Exam Section */}
      <section className={theorieStyles.examSection}>
        <div className={theorieStyles.contentContainer}>
          <h2 className={styles.sectionHeaderTitle}>
            Theorie examen, een spannend moment!
          </h2>

          <div className={theorieStyles.contentText}>
            <p>
              Het theorie-examen is en blijft een spannend moment; toch is het belangrijk om niet te nerveus
              te zijn. Vertrouw op jezelf, als het goed is heb je via één van onze mogelijkheden goed
              gestudeerd en ben je klaar voor het examen. Het examen kan je zelf aanvragen via de website
              van het CBR.
            </p>
            <p>
              In de meeste gevallen wordt het theorie-examen klassikaal afgenomen. Echter zijn er meerdere
              uitzonderingen mogelijk. Zo kan je het examen ook in het Engels of een andere taal afleggen.
              Ook is het mogelijk om meer tijd aan te vragen doordat je bijvoorbeeld last hebt van dyslexie.
              Wanneer je last hebt van bijvoorbeeld faalangst kan je een individueel begeleid examen
              aanvragen, dit kan enkel als je eerder een examen met extra tijd hebt afgelegd. Voor de actuele
              regelgeving over het aanvragen van speciale theorie-examens raden we je aan op de website van
              het CBR te kijken.
            </p>

            <div className={theorieStyles.examInfo}>
              <h3 className={theorieStyles.examInfoTitle}>
                Sinds 2020 bestaat het theorie-examen uit de volgende componenten:
              </h3>
              <ul className={theorieStyles.examComponents}>
                {examComponents.map((component, index) => (
                  <li key={index} className={theorieStyles.examComponent}>
                    <Check size={20} className={theorieStyles.examIcon} />
                    <span>{component}</span>
                  </li>
                ))}
              </ul>
            </div>
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
      <StartRijavontuurCTA />

      <Footer />
    </div>
  );
}
