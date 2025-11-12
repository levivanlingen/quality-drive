import styles from './warom.module.css';

interface WaromSectionProps {
  cityName: string;
}

export default function WaromSection({ cityName }: WaromSectionProps) {
  const cards = [
    {
      title: 'Ervaren Instructeurs',
      description: 'Bij Quality Drive werken we uitsluitend met ervaren en gecertificeerde instructeurs die een passie hebben voor motorrijden en onderwijs. Onze instructeurs hebben jarenlange ervaring en beschikken over de nodige kwalificaties om jou veilig en effectief te begeleiden. Ze begrijpen dat elke leerling uniek is en passen hun lesmethoden aan op jouw individuele behoeften en leerstijl.',
    },
    {
      title: 'Hoog Slagingspercentage',
      description: 'Een van onze grootste trotsen is ons hoge slagingspercentage. Bij Quality Drive streven we ernaar dat onze leerlingen niet alleen slagen voor hun examen, maar ook zelfverzekerd en vaardig de weg op gaan. Ons slagingspercentage ligt ver boven het landelijk gemiddelde, wat getuigt van de kwaliteit van onze lessen en de toewijding van onze instructeurs.',
    },
    {
      title: 'Moderne Lesmethoden',
      description: 'Wij maken gebruik van de meest moderne en effectieve lesmethoden om ervoor te zorgen dat je snel en veilig leert rijden. Onze lessen zijn ontworpen met de nieuwste inzichten en technieken op het gebied van motoronderwijs. We gebruiken up-to-date lesmaterialen en motorrijtuigen om een realistische en leerzame ervaring te bieden, zodat je goed voorbereid bent op alle situaties op de weg.',
    },
    {
      title: 'Flexibele Lesuren',
      description: 'Wij begrijpen dat iedereen een druk leven heeft en dat flexibiliteit belangrijk is. Daarom biedt Quality Drive flexibele lesuren aan die passen bij jouw schema. Of je nu liever \'s ochtends, \'s avonds, of in het weekend lessen wilt volgen, wij maken het mogelijk. We werken samen met jou om een lesrooster te creëren dat jouw beschikbaarheid respecteert en tegelijkertijd zorgt voor regelmatige en consistente vooruitgang.',
    },
  ];

  return (
    <section className={styles.waromSection}>
      <div className={styles.waromContainer}>
        <h2 className={styles.waromTitle}>
          Waarom Kiezen voor Motorrijschool {cityName}?
        </h2>

        <div className={styles.cardsGrid}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
