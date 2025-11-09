"use client";

import { useState } from 'react';
import { Trophy, Users, Car, Settings, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import pageStyles from '../../page.module.css';
import styles from './city.module.css';

interface ContentSectionsProps {
  cityName: string;
  cityImage?: string | null;
  cityImageAlt?: string | null;
}

export default function ContentSections({ cityName, cityImage, cityImageAlt }: ContentSectionsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: `Beste Rijschool ${cityName}`,
      content: [
        `Het rijbewijs, categorie B, heb je nodig om een auto te besturen waarvan de maximale toegelaten massa minder is dan 3,5 ton. Daarnast mag je, wanneer je in het bezit bent van dit rijbewijs, een wagen besturen met een aanhanger tot 750 kg. erg handig dus!`,
        `Woon je in ${cityName}, wil je snel slagen of een spoedcursus rijbewijs volgen maar heb je geen zin in hoge kosten? Bij Quality-Drive ben je dan aan het goede adres! ons basispakket van 20! rijlessen voor het halen van je rijbewijs in ${cityName}, heb je al vanaf €780! start daarom direct!`,
        `Een familiebedrijf dat inmiddels al meerdere jaren bestaat als rijschool Den Haag – Zoetermeer – Delft – Rijswijk – Berkel en Rodenrijs  en omgeving. Wij kunnen bij onze autorijschool jouw rijlessen volledig op maat verzorgen. Ben je geïnteresseerd in een spoedpakket of wil je in je eigen tempo de rijlessen opbouwen. Bij autorijschool Quality-Drive kan het allemaal!`,
        `Je kunt naar wens versneld je rijbewijs halen in 10 dagen of de rijlessen helemaal in jouw tempo laten plannen. De keuze is aan jou!`
      ]
    },
    {
      title: "Ook de beste rijschool voor ADHD - ADD - Faalangst en opfriscursus",
      content: [
        `Heeft u een lange tijd geen auto gereden of bent u net verhuist van een andere plek of heeft u een andere reden, en bent u toe aan een opfriscursus? Bij rijschool Quality-Drive zorgen wij ervoor dat u binnen enkele lessen weer zelfstandig de weg op durft te rijden. Autorijlessen voor leerlingen met ADHD – ADD of (faal)angst om achter het stuur te kruipen? Bij autorijschool Quality-Drive Den Haag – Zoetermeer – Delft – Rijswijk en omgeving hebben we gespecialiseerde instructeurs met speciale cursussen en trainingen. Zo bent u verzekerd van maatwerk rijlessen. Dit is immers de beste autorijschool van ${cityName} en omgeving, met persoonlijke aandacht voor elke individu. Uiteraard wordt bij elke les maximaal Quality gegeven, dit vinden we zeer belangrijk bij autorijschool Quality-Drive. En nu met de unieke 6 zekerheden is succes gegarandeerd!`
      ]
    },
    {
      title: "BIJ ONS HAALT IEDEREEN ZIJN/HAAR RIJBEWIJS!",
      content: [
        `Heb jij ook de barstende vraag welke de beste rijschool ADD van Den Haag – Zoetermeer – Delft – Rijswijk – Voorburg – Nootdorp – Berkel en Rodenrijs – Pijnacker – Landsingerland – Scheveningen en omgeving is? Wij hebben een unieke lesmethode ontwikkeld waarbij je elke lespakket kunt vergelijken met een spoedpakket bij onze autorijschool.`,
        `Met de succesvolle Quality-Drive Lesmethode slaag je gegarandeerd bij de beste rijschool van ${cityName} en omgeving. Deze unieke formule begint met een gratis proefles door een gespecialiseerde proefles rijinstructeur, op basis hiervan wordt een persoonlijk lesadvies opgesteld en een rijcoach toegewezen die het beste bij jou past. Met onze lesmethode leer je alles over alle mogelijke verkeerssituaties waar je in terecht kunt komen.`
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Carousel Section */}
      <section className={styles.carouselSection}>
        <div className={styles.carouselContainer}>
          <h2 className={styles.carouselMainTitle}>Over rijschool {cityName}</h2>

          <div className={styles.carouselContent}>
            <div className={styles.carouselSlide}>
              <h3>{slides[currentSlide].title}</h3>
              {slides[currentSlide].content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {/* Show city image only on first slide - BELOW text */}
              {cityImage && (
                <div
                  className={styles.carouselImageWrapper}
                  style={{ display: currentSlide === 0 ? 'block' : 'none' }}
                >
                  <img
                    src={cityImage}
                    alt={cityImageAlt || `Rijschool ${cityName}`}
                    className={styles.carouselImage}
                  />
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
              onClick={prevSlide}
              aria-label="Vorige slide"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
              onClick={nextSlide}
              aria-label="Volgende slide"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className={styles.carouselDots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselDot} ${index === currentSlide ? styles.carouselDotActive : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ga naar slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Waarom Quality Drive Section */}
      <section className={styles.waaromQDSection}>
        <div className={styles.waaromQDContent}>
          <h2 className={pageStyles.sectionHeaderTitle}>Waarom Quality Drive?</h2>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Trophy size={40} strokeWidth={1.5} />
              </div>
              <h3>Succes Gegarandeerd</h3>
              <p>
                Bij Quality Drive bent u verzekerd van succes. Dankzij onze bewezen methodes en ervaren instructeurs heeft u de hoogste kans om uw rijbewijs te behalen. Ons slagingspercentage spreekt voor zich: met Quality Drive slaagt u!
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Users size={40} strokeWidth={1.5} />
              </div>
              <h3>Top Instructeurs</h3>
              <p>
                Onze instructeurs zijn deskundig, geduldig en toegewijd aan uw succes. Ze zijn er om u te ondersteunen bij elke stap, u gerust te stellen en uw zelfvertrouwen op te bouwen. Hun persoonlijke aanpak zorgt ervoor dat u zich altijd op uw gemak voelt.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Car size={40} strokeWidth={1.5} />
              </div>
              <h3>Moderne en Veilige Voertuigen</h3>
              <p>
                U leert rijden in goed onderhouden, moderne voertuigen die voorzien zijn van de nieuwste veiligheidsvoorzieningen. Dit zorgt voor een veilige en comfortabele leeromgeving, waardoor u zich volledig kunt concentreren op uw rijvaardigheden.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Settings size={40} strokeWidth={1.5} />
              </div>
              <h3>Individueel Aangepaste Lesprogramma&apos;s</h3>
              <p>
                Bij Quality Drive geloven we dat maatwerk de sleutel tot succes is. Onze lesprogramma&apos;s worden aangepast aan uw specifieke behoeften en leerstijl, zodat u zich in uw eigen tempo kunt ontwikkelen en zelfverzekerd naar uw rijexamen kunt toewerken.
              </p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <BookOpen size={40} strokeWidth={1.5} />
              </div>
              <h3>Uitgebreide Theorieondersteuning</h3>
              <p>
                Wij bieden uitgebreide ondersteuning bij uw theorie-examen. Met onze effectieve cursussen en oefenmateriaal bent u goed voorbereid en heeft u de kennis die nodig is om te slagen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
