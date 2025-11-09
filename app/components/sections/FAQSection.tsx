'use client';

import styles from './FAQSection.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  className?: string;
}

const defaultFAQs: FAQItem[] = [
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
    answer: 'Bij Quality-Drive staat veiligheid voorop in alles wat we doen. Wij garanderen de veiligheid van onze leerlingen door gebruik te maken van modern uitgeruste lesvoertuigen, die regelmatig worden onderhouden en gecontroleerd om te voldoen aan de hoogste veiligheidsnormen. Onze rijinstructeurs zijn niet alleen deskundig, maar ook speciaal opgeleid om een veilige, ondersteunende en rustgevende leeromgeving te creeren. Daarnaast leggen we de nadruk op defensief rijden en het bewustzijn van de weg, zodat leerlingen voorbereid zijn op allerlei verkeerssituaties. Bij Quality-Drive is jouw veiligheid onze prioriteit.',
  },
  {
    question: 'Zijn alle instructeurs op VOG gecontroleerd?',
    answer: 'Bij Quality-Drive nemen we de betrouwbaarheid en professionaliteit van ons team zeer serieus. Daarom zorgen we ervoor dat al onze instructeurs grondig zijn gescreend, inclusief een Verklaring Omtrent het Gedrag (VOG). Deze VOG-check verzekert dat onze instructeurs niet alleen uitblinken in hun vak, maar ook betrouwbaar en van onbesproken gedrag zijn. Zo kunnen wij onze leerlingen en hun families de zekerheid bieden dat ze in veilige en betrouwbare handen zijn. Bij Quality-Drive kunt u vertrouwen op een team van professionals die uw veiligheid en succes op de weg waarborgen.',
  },
];

export function FAQSection({
  title = 'Veelgestelde vragen',
  subtitle = 'Alles wat je moet weten over rijlessen bij Quality Drive',
  faqs = defaultFAQs,
  className = '',
}: FAQSectionProps) {
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const content = e.currentTarget.nextElementSibling;
    const isOpen = content?.classList.contains(styles.faqAnswerOpen);

    document.querySelectorAll('.' + styles.faqAnswer).forEach(el => {
      el.classList.remove(styles.faqAnswerOpen);
    });
    document.querySelectorAll('.' + styles.faqQuestion).forEach(el => {
      el.classList.remove(styles.faqQuestionActive);
    });

    if (!isOpen) {
      content?.classList.add(styles.faqAnswerOpen);
      e.currentTarget.classList.add(styles.faqQuestionActive);
    }
  };

  return (
    <section className={`${styles.faqSection} ${className}`}>
      <div className={styles.faqContent}>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
        <p className={styles.sectionHeaderSubtitle}>{subtitle}</p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={handleToggle}
              >
                <span>{faq.question}</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
