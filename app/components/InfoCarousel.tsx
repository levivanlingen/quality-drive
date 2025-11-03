'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function InfoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Rijlessen Op Maat",
      content: [
        "Het rijbewijs, categorie B, heb je nodig om een auto te besturen waarvan de maximale toegelaten massa minder is dan 3,5 ton. Daarnaast mag je, wanneer je in het bezit bent van dit rijbewijs, een wagen besturen met een aanhanger tot 750 kg. erg handig dus!",
        "Woon je in Den Haag – Zoetermeer – Delft – Rijswijk of omgeving, wil je snel slagen of een spoedcursus rijbewijs volgen maar heb je geen zin in hoge kosten? Bij Quality-Drive ben je dan aan het goede adres! Ons basispakket van 20(!) rijlessen voor het halen van je rijbewijs, heb je al vanaf €780! Start daarom direct!",
        "Wij heten je van harte welkom bij autorijschool Quality-Drive in Zuid-Holland. Een familiebedrijf dat inmiddels al meerdere jaren bestaat als rijschool in Den Haag, Zoetermeer, Delft, Rijswijk, Berkel en Rodenrijs en omgeving. Wij kunnen bij onze autorijschool jouw rijlessen volledig op maat verzorgen. Ben je geïnteresseerd in een spoedpakket of wil je in je eigen tempo de rijlessen opbouwen. Bij autorijschool Quality-Drive kan het allemaal!",
        "Je kunt naar wens versneld je rijbewijs halen in 10 dagen of de rijlessen helemaal in jouw tempo laten plannen. De keuze is aan jou!"
      ]
    },
    {
      title: "Ook de beste rijschool voor ADHD - ADD - Faalangst en opfriscursus",
      content: [
        "Heeft u een lange tijd geen auto gereden of bent u net verhuist van een andere plek of heeft u een andere reden, en bent u toe aan een opfriscursus? Bij rijschool Quality-Drive zorgen wij ervoor dat u binnen enkele lessen weer zelfstandig de weg op durft te rijden.",
        "Autorijlessen voor leerlingen met ADHD – ADD of (faal)angst om achter het stuur te kruipen? Bij ons hebben we gespecialiseerde instructeurs met speciale afgeronde cursussen en trainingen. Zo bent u verzekerd van maatwerk rijlessen. Dit is immers de beste autorijschool van Den Haag – Zoetermeer en omgeving, met persoonlijke aandacht voor elke individu.",
        "Uiteraard wordt bij elke les maximaal Quality gegeven, dit vinden we zeer belangrijk bij autorijschool Quality-Drive.",
        "En nu met de unieke 6 zekerheden is succes gegarandeerd!"
      ]
    },
    {
      title: "Unieke Quality-Drive Lesmethode: succes gegarandeerd",
      content: [
        "Heb jij ook de barstende vraag welke de beste rijschool van Den Haag – Zoetermeer – Delft – Rijswijk en omgeving is? Wij hebben een unieke lesmethode ontwikkeld waarbij je elke lespakket kunt vergelijken met een spoedpakket bij onze autorijschool.",
        "Met de succesvolle Quality-Drive Lesmethode slaag je gegarandeerd bij de beste rijschool van Den Haag en omgeving. Deze unieke formule begint met een gratis proefles door een gespecialiseerde proefles rijinstructeur, op basis hiervan wordt een persoonlijk lesadvies opgesteld en een rijcoach toegewezen die het beste bij jou past. Met onze lesmethode leer je alles over alle mogelijke verkeerssituaties waar je in terecht kunt komen."
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
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="carousel-slide">
          <h3>{slides[currentSlide].title}</h3>
          {slides[currentSlide].content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Vorige slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Volgende slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ga naar slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .carousel-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .carousel-content {
          position: relative;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          border-radius: 24px;
          padding: 3rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
          min-height: 400px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .carousel-content:hover {
          box-shadow: 0 20px 60px rgba(0, 101, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.6);
        }

        .carousel-slide {
          flex: 1;
          padding: 0 4rem;
        }

        .carousel-slide h3 {
          font-size: 2rem;
          font-weight: 700;
          color: #0065A6;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        .carousel-slide p {
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          color: #4a5568;
          line-height: 1.8;
        }

        .carousel-slide p:last-child {
          margin-bottom: 0;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 101, 166, 0.1);
          border: 2px solid rgba(0, 101, 166, 0.3);
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #0065A6;
          z-index: 10;
        }

        .carousel-arrow:hover {
          background: rgba(0, 101, 166, 0.2);
          border-color: #0065A6;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 101, 166, 0.2);
        }

        .carousel-arrow-left {
          left: 1rem;
        }

        .carousel-arrow-right {
          right: 1rem;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 101, 166, 0.2);
          border: 2px solid rgba(0, 101, 166, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .carousel-dot:hover {
          background: rgba(0, 101, 166, 0.4);
          transform: scale(1.2);
        }

        .carousel-dot.active {
          background: #0065A6;
          border-color: #0065A6;
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .carousel-content {
            padding: 2rem 1rem;
            min-height: 500px;
          }

          .carousel-slide {
            padding: 0 3rem;
          }

          .carousel-slide h3 {
            font-size: 1.5rem;
          }

          .carousel-slide p {
            font-size: 1rem;
          }

          .carousel-arrow {
            width: 44px;
            height: 44px;
          }

          .carousel-arrow-left {
            left: 0.5rem;
          }

          .carousel-arrow-right {
            right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
