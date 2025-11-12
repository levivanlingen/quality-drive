'use client';

import { useState } from 'react';
import styles from './faq.module.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Wat zijn de vereisten om te beginnen met motorrijlessen bij Quality Drive?',
      answer: 'Om te starten met motorrijlessen heb je een geldig theoriecertificaat (of geslaagd theorie-examen) nodig. Je moet minimaal 18 jaar oud zijn voor een A-rijbewijs. Daarnaast heb je een geldig legitimatiebewijs nodig. Wij zorgen voor de motor, helm en beschermende kleding tijdens de lessen.',
    },
    {
      question: 'Hoe lang duurt het gemiddeld om mijn motorrijbewijs te halen?',
      answer: 'Gemiddeld duurt het 4 tot 8 weken om je motorrijbewijs te halen, afhankelijk van je lestempo en beschikbaarheid. Bij Quality Drive bieden we spoedpakketten aan waarmee je binnen 4 weken examen kunt doen. Het exacte aantal lessen hangt af van je rijervaring en leervermogen.',
    },
    {
      question: 'Hoe garandeert Quality-Drive de veiligheid?',
      answer: 'Bij Quality Drive staat veiligheid voorop. Wij garanderen de veiligheid door gebruik te maken van moderne, goed onderhouden motoren die regelmatig worden gecontroleerd. Onze rijinstructeurs zijn niet alleen deskundig, maar ook speciaal opgeleid om een veilige leeromgeving te creëren. We bieden volledige beschermende kleding en helmen, en leggen de nadruk op defensief rijden en het bewustzijn van de weg.',
    },
    {
      question: 'Zijn alle instructeurs op VOG gecontroleerd?',
      answer: 'Ja, bij Quality Drive nemen we de betrouwbaarheid en professionaliteit van ons team zeer serieus. Alle instructeurs zijn grondig gescreend, inclusief een Verklaring Omtrent het Gedrag (VOG). Deze VOG-check verzekert dat onze instructeurs niet alleen uitblinken in hun vak, maar ook betrouwbaar en van onbesproken gedrag zijn.',
    },
    {
      question: 'Wat is de minimale leeftijd om motorrijlessen te volgen?',
      answer: 'Je kunt al vanaf 16 jaar en 9 maanden beginnen met motorrijlessen voor een A1 of A2 rijbewijs. Voor het volledige A-rijbewijs moet je minimaal 20 jaar oud zijn (met A2 ervaring) of 24 jaar (directe toegang). Je mag maximaal 3 maanden voor je verjaardag beginnen met lessen.',
    },
    {
      question: 'Wat is het verschil tussen AVB en AVD?',
      answer: 'AVB (Algemene Verkeerskennis en Basishandelingen) is het eerste praktijkexamen waarbij je verkeerskennis en basisvaardigheden zoals slalommen, optrekken en remmen worden getest. AVD (Algemene Verkeersdeelname) is het tweede praktijkexamen waarbij je daadwerkelijk in het verkeer rijdt. Je moet eerst AVB halen voordat je AVD mag doen.',
    },
    {
      question: 'Hoe lang is mijn theorie geldig?',
      answer: 'Je theorie-examen is 18 maanden geldig vanaf de datum waarop je bent geslaagd. Binnen deze periode moet je je praktijkexamen (zowel AVB als AVD) succesvol hebben afgerond. Het is daarom verstandig om snel na je theorie te beginnen met praktijklessen.',
    },
    {
      question: 'Wat kom ik te weten na mijn proefles?',
      answer: 'Na je gratis proefles krijg je een persoonlijk lesadvies van onze gespecialiseerde instructeur. We bepalen samen hoeveel lessen je ongeveer nodig zult hebben, welk pakket het beste bij jou past, en welke instructeur het beste aansluit bij jouw leerstijl. Ook krijg je een goed beeld van hoe de lessen verlopen en wat je kunt verwachten.',
    },
    {
      question: 'Is het goedkoper om auto of motor te leren rijden?',
      answer: 'Over het algemeen is een motorrijbewijs iets goedkoper dan een autorijbewijs. Voor een motor heb je meestal minder lessen nodig (gemiddeld 10-20 lessen versus 30-40 lessen voor auto). Bij Quality Drive beginnen onze motorpakketten vanaf €998 inclusief examens, terwijl autopakketten doorgaans iets hoger liggen.',
    },
    {
      question: 'Wat kost een motorrijbewijs in 2024?',
      answer: 'De kosten voor een motorrijbewijs in 2024 variëren tussen de €1.000 en €2.000, afhankelijk van het aantal lessen en het gekozen pakket. Bij Quality Drive bieden we complete pakketten aan vanaf €998 (Spoed Pakket, 10 lessen) tot €1.898 (Garantie Pakket, 25 lessen). Alle pakketten zijn inclusief AVB en AVD examens, motorkleding en theorie-ondersteuning.',
    },
    {
      question: 'Hoe lang duurt het om een motorrijbewijs te halen?',
      answer: 'Met onze spoedpakketten kun je binnen 4 weken je motorrijbewijs halen. Gemiddeld duurt het 4 tot 8 weken, afhankelijk van je beschikbaarheid, leertempo en het aantal lessen dat je per week volgt. Bij Quality Drive regelen we alles zo snel mogelijk, zodat je binnen de kortst mogelijke tijd de weg op kunt.',
    },
    {
      question: 'Is motorrijden duur?',
      answer: 'Motorrijden hoeft niet duur te zijn. Bij Quality Drive bieden we scherpe tarieven en betaalbare pakketten vanaf €998. Je kunt ook in termijnen betalen (2 delen). Daarnaast zijn de onderhouds- en brandstofkosten van een motor vaak lager dan die van een auto, en motorverzekeringen zijn meestal voordeliger.',
    },
    {
      question: 'Hoeveel cc mag je rijden met een A2 rijbewijs?',
      answer: 'Met een A2 rijbewijs mag je motoren rijden met een maximaal vermogen van 35 kW (ongeveer 48 pk) en een vermogen/gewicht verhouding van maximaal 0,2 kW/kg. Er is geen cc-limiet, maar wel een vermogenslimiet. De motor mag ook niet zijn afgevoerd van een motor met meer dan 70 kW.',
    },
    {
      question: 'Wat kost een motorrijbewijs automaat?',
      answer: 'Er bestaat geen apart "automaat" motorrijbewijs. Alle motoren hebben een handgeschakelde versnellingsbak (met koppeling), in tegenstelling tot auto\'s waar automaat een optie is. Als je examen doet op een motor met automatische transmissie (zeer zeldzaam), krijg je wel een beperking op je rijbewijs.',
    },
    {
      question: 'Heb je theorie nodig voor een motorrijbewijs?',
      answer: 'Ja, je hebt een geldig theoriecertificaat nodig om te mogen starten met praktijklessen voor je motorrijbewijs. Als je al een autorijbewijs B hebt, ben je vrijgesteld van het theorie-examen. De theorie bestaat uit 65 vragen waarvan je er minimaal 44 goed moet hebben.',
    },
    {
      question: 'Wat is code 80?',
      answer: 'Code 80 is een beperking op je rijbewijs die aangeeft dat je alleen motoren met een automatische transmissie mag besturen. Deze code wordt op je rijbewijs geplaatst als je examen doet op een motor met automaat. In de praktijk komen automatische motoren bijna niet voor, dus code 80 is zeer zeldzaam bij motorrijbewijzen.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContent}>
        <h2 className={styles.sectionHeaderTitle}>Veelgestelde vragen</h2>
        <p className={styles.sectionHeaderSubtitle}>
          Alles wat je moet weten over motorrijlessen bij Quality Drive
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${
                  openIndex === index ? styles.faqQuestionActive : ''
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openIndex === index ? styles.faqAnswerOpen : ''
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
