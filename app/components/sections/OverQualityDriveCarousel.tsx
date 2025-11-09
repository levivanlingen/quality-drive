'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './OverQualityDriveCarousel.module.css';

interface Slide {
  title: string;
  content: string[];
}

interface OverQualityDriveCarouselProps {
  /** Stadsnaam voor dynamische content */
  cityName: string;
  /** Custom slides (optioneel) */
  slides?: Slide[];
  /** Hoofd titel */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Over Quality Drive Carousel
 * Exact zoals gebruikt op rijschool city pages
 *
 * @param cityName - De naam van de stad voor in de content
 */
export function OverQualityDriveCarousel({
  cityName,
  slides,
  title,
  className = '',
}: OverQualityDriveCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides: Slide[] = [
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
        `Heeft u een lange tijd geen auto gereden of bent u net verhuist van een andere plek of heeft u een andere reden, en bent u toe aan een opfriscursus? Bij rijschool Quality-Drive zorgen wij ervoor dat u binnen enkele lessen weer zelfstandig de weg op durft te rijden. Autorijlessen voor leerlingen met ADHD – ADD of (faal)angst om achter het stuur te kruipen? Bij autorijschool Quality-Drive Den Haag – Zoetermeer – Delft – Rijswijk en omgeving hebben we gespecialiseerde instructeurs met speciale cursussen en trainingen. Zo bent u verzekerd van maatwerk rijlessen. Dit is immers de beste autorijschool van ${cityName} en omgeving, met persoonlijke aandacht voor elke individu. Uiteraard wordt bij elke les maximaal Quality gegeven, dit vinden we zeer belangrijk bij autorijschool Quality-Drive. En nu met de unieke 6 zekerheden is succes gegarandeerd!`,
        `BIJ ONS HAALT IEDEREEN ZIJN/HAAR RIJBEWIJS!`
      ]
    },
    {
      title: "Unieke Quality-Drive Lesmethode",
      content: [
        `Heb jij ook de barstende vraag welke de beste rijschool ADD van Den Haag – Zoetermeer – Delft – Rijswijk – Voorburg – Nootdorp – Berkel en Rodenrijs – Pijnacker – Landsingerland – Scheveningen en omgeving is? Wij hebben een unieke lesmethode ontwikkeld waarbij je elke lespakket kunt vergelijken met een spoedpakket bij onze autorijschool.`,
        `Met de succesvolle Quality-Drive Lesmethode slaag je gegarandeerd bij de beste rijschool van ${cityName} en omgeving. Deze unieke formule begint met een gratis proefles door een gespecialiseerde proefles rijinstructeur, op basis hiervan wordt een persoonlijk lesadvies opgesteld en een rijcoach toegewezen die het beste bij jou past. Met onze lesmethode leer je alles over alle mogelijke verkeerssituaties waar je in terecht kunt komen.`
      ]
    }
  ];

  const slidesData = slides || defaultSlides;
  const mainTitle = title || `Over Quality Drive in ${cityName}`;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={`${styles.carouselSection} ${className}`}>
      <div className={styles.carouselContainer}>
        <h2 className={styles.carouselMainTitle}>{mainTitle}</h2>

        <div className={styles.carouselContent}>
          <div className={styles.carouselSlide}>
            <h3>{slidesData[currentSlide].title}</h3>
            {slidesData[currentSlide].content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
          {slidesData.map((_, index) => (
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
  );
}
