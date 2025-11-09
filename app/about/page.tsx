'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, FeaturesImageSection } from '@/app/components/sections';
import styles from '../page.module.css';
import { Award, Users, Target, Heart, Shield, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Over ons"
        subtitle="Al meerdere jaren de rijschool waar kwaliteit centraal staat"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Over Ons' }
        ]}
      />

      {/* Hero Section */}
      <section className={styles.rijschoolSection}>
        <div className={styles.rijschoolContent}>
          <p className={styles.rijschoolLabel}>Over ons</p>
          <h1 className={styles.sectionHeaderTitle}>Al meerdere jaren de rijschool waar kwaliteit en hoge slagingspercentage bij CBR centraal staat</h1>
          <p className={styles.rijschoolText}>
            Heb jij ook de barstende vraag welke de beste rijschool van Den Haag – Zoetermeer – Delft – Rijswijk en omgeving is?
            Dagelijks streven wij als autorijschool Quality-Drive ernaar om aan onze leerlingen elke dag weer top kwaliteit te leveren.
            Dit doen we door in het begin van de lessen al meteen een lesplan op te stellen tot aan je praktijkexamen en hierdoor elke rijles telt.
            Aan het einde van elke autorijles krijgen de leerlingen de doelstelling van de volgende les al mee zodat ze zich door middel van video's – trainingen e.d. mentaal kunnen voorbereiden.
          </p>
          <p className={styles.rijschoolText}>
            Snel slagen voor je rijbewijs doe je bij Quality-Drive. Onze gescreende kwalitatieve instructeurs hebben maar één doel: behalen van jouw rijbewijs.
            Of je kiest voor een maatwerk pakket of een spoedcursus, onze instructeurs blijven altijd vriendelijk en servicegericht.
            Bij rijschool Quality-Drive krijgen de leerlingen persoonlijke aandacht voor elke type rijlessen.
          </p>
        </div>
      </section>

      {/* ADHD/ADD Section */}
      <section className={styles.services} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className={styles.sectionHeaderTitle}>Rijschool voor ADHD - ADD - faalangst en opfriscursus</h2>

        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4a5568', textAlign: 'center', marginBottom: '2rem' }}>
            Heeft u een lange tijd geen auto gereden of bent u net verhuist van een andere plek of heeft u een andere reden, en bent u toe aan een opfriscursus?
            Bij rijschool Quality-Drive zorgen wij ervoor dat u binnen enkele lessen zelfstandig de weg op durft te rijden.
          </p>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4a5568', textAlign: 'center' }}>
            Autorijlessen voor leerlingen met ADHD – ADD of (faal)angst om achter het stuur te kruipen?
            Bij autorijschool Quality-Drive Den Haag – Zoetermeer – Delft – Rijswijk en omgeving hebben we gespecialiseerde instructeurs met speciale cursussen en trainingen.
            Zo bent u verzekerd van maatwerk rijlessen. Dit is immers de beste autorijschool van Den Haag – Zoetermeer en omgeving, met persoonlijke aandacht voor elke individu.
          </p>
        </div>
      </section>

      {/* 6 Zekerheden Section */}
      <FeaturesImageSection
        label="Van Starter tot Pro"
        featuresTitle="De 6 zekerheden alleen bij Quality Drive"
        imageTitle="Beste goedkope rijschool"
        imageAlt="Beste goedkope rijschool"
      />

      {/* Rijlessen op maat Section */}
      <section className={styles.services} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className={styles.sectionHeaderTitle}>Rijlessen op maat</h2>
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4a5568', textAlign: 'center' }}>
            Wij heten je van harte welkom bij Quality-Drive in Zuid-Holland. Een familiebedrijf dat inmiddels al meerdere jaren bestaat.
            Wij kunnen bij onze autorijschool jouw rijlessen volledig op maat verzorgen. Heb je al enige rijervaring of minder of helemaal geen rijervaring?
            Bij Quality-Drive kan het allemaal. Kies voor rijlessen op maat en jouw Quality-Drive rijinstructeur geeft je en passende advies.
          </p>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4a5568', textAlign: 'center', marginTop: '1.5rem' }}>
            Je kunt ook naar wens versneld je rijbewijs halen in 10 dagen of de rijlessen helemaal in jouw tempo laten plannen. De keuze is aan jou!
          </p>
        </div>
      </section>

      {/* Lesmethode Section */}
      <section className={styles.rijschoolSection}>
        <div className={styles.rijschoolContent}>
          <h2 className={styles.sectionHeaderTitle}>Unieke Quality-Drive Lesmethode: succes gegarandeerd</h2>
          <p className={styles.rijschoolText}>
            Met de succesvolle Quality-Drive Lesmethode slaag je gegarandeerd! Deze unieke formule begint met een vrijblijvende proefles.
            Op basis hiervan wordt een persoonlijk lesadvies opgesteld en een rijcoach toegewezen die het beste bij jou past.
            Met onze lesmethode leer je alles over alle mogelijke verkeerssituaties waar je in terecht kunt komen.
          </p>
          <p className={styles.rijschoolText}>
            Wij zijn zelfs zo overtuigd van de Quality-Drive lesmethode, dat wij een Quality-Drive Examengarantie bieden.
            Mocht je dus niet slagen na het aantal aanbevolen lessen, dan betalen wij jouw 1e herexamen.
            Meld je dus nu aan voor jouw vrijblijvende proefles.
          </p>
        </div>
      </section>

      {/* Voordelen Section */}
      <section className={styles.services} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className={styles.sectionHeaderTitle}>Voordelen van Quality-Drive</h2>

        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Heart size={40} strokeWidth={1.5} />
            </div>
            <h3>Gratis proefles</h3>
            <p>Start vrijblijvend met een gratis proefles en maak kennis met onze instructeurs en lesmethode.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Shield size={40} strokeWidth={1.5} />
            </div>
            <h3>Quality-Drive examengarantie</h3>
            <p>Niet geslaagd na aanbevolen lessen? Wij betalen je eerste herexamen.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Target size={40} strokeWidth={1.5} />
            </div>
            <h3>Snel slagen voor je rijbewijs</h3>
            <p>Met onze efficiënte lesmethode behaal je snel je rijbewijs.</p>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Award size={40} strokeWidth={1.5} />
            </div>
            <h3>Theorie ondersteuning tijdens je les</h3>
            <p>We helpen je ook met de theorie tijdens je praktijklessen.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.rijschoolSection} style={{ background: '#f9fafb' }}>
        <div className={styles.rijschoolContent}>
          <h2 className={styles.sectionHeaderTitle}>Wat onze leerlingen zeggen</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Ik had echt een faalangst tijdens het rijden. ontstaan door een aanrijding bij een andere rijschool.
                Ik durfde niet meer te rijden maar uiteindelijk toch wederom de stap genomen met angst.
                Quality-Drive heeft mij echt correct opgevangen en ze hebben ook rijinstructeurs opgeleid met faalangst.
                Ik heb onlangs mijn rijbewijs in ontvangst mogen nemen. Ik zal Quality-Drive echt bij iedereen aanraden om mij heen."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Noé Dobbelsteen</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Werkelijk de beste rijschool van Den Haag. Erg fijne lessen gehad. De rijinstructeur was erg geduldig en leerzaam.
                Waar nodig ook strikt. Heb mijn rijbewijs in 1x gehaald."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Rafael</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Na twee keer overgestapt te zijn van rijscholen kreeg ik via via te horen over autorijschool Quality-Drive in Zoetermeer.
                De rijinstructeur heeft mij een veilige en een positief gevoel gegeven."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Maud van den Berg</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Echt toffe rijinstructeurs. ze luisteren naar je en geven je oprechte lessen waar je iedere les wat leert."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Hidde Verstappen</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Ik was inmiddels 3 keer gezakt bij een andere rijschool. Voornamelijk op voertuigbeheersing en mijn kijkgedrag.
                Nadat ik overgestapt was naar Quality-Drive kwam de instructeur bij de proefles al achter waar de fouten lagen.
                Er werden mij 5 lessen geadviseerd en VOILA ik ben GESLAAGD!! ben helemaal HAPPY. Geweldig! Echt een aanrader..."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Sadaf Saeed</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4a5568', marginBottom: '1.5rem' }}>
                "Tijdens de proefles een advies gegeven van 15 lessen had er uiteindelijk maar 13 nodig gehad en ben in 1 keer geslaagd.
                Ik kreeg resterende 2 lessen netjes teruggestort op mijn bank. Echt Gaaf dit.
                aan te raden als de beste rijschool van Den Haag en omgeving."
              </p>
              <div style={{ fontWeight: '700', color: '#0065A6' }}>Peter Malila</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leerling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Werken bij Quality Drive Section */}
      <section className={styles.careerSection}>
        <div className={styles.careerContent}>
          <div className={styles.careerTextArea}>
            <h2 className={styles.sectionHeaderTitle}>Werken bij Quality Drive</h2>
            <h3 className={styles.sectionHeaderSubtitle}>Vacature: Rijinstructeur</h3>
            <p className={styles.careerText}>
              Bij Quality Drive zijn we op zoek naar gemotiveerde en gepassioneerde collega's om ons team te versterken. We zijn een gerenommeerde rijschool die staat voor kwaliteit, veiligheid en persoonlijke aandacht. Wil jij deel uitmaken van een enthousiast team dat elke dag streeft naar het beste voor onze leerlingen? Neem dan nu snel contact op!
            </p>
            <div className={styles.careerButtons}>
              <Link href="/contact" className={styles.careerButtonPrimary}>
                Neem Contact Op
              </Link>
              <Link href="/vacatures" className={styles.careerButtonSecondary}>
                Meer Informatie →
              </Link>
            </div>
          </div>
          <div className={styles.careerImage}>
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-36-3.jpg"
              alt="Rijinstructeur bij Quality Drive"
              fill
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
