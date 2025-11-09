'use client';

import styles from './veelgestelde-vragen.module.css';

const faqs = [
  {
    question: 'Is een automaat makkelijker dan schakel?',
    answer: 'Ja, een automaat is over het algemeen makkelijker te leren dan een handgeschakelde auto. Bij een automaat hoef je niet te schakelen en geen koppeling te bedienen, waardoor je je volledig kunt concentreren op het verkeer en je rijvaardigheden. Dit maakt het leerproces vaak sneller en minder stressvol. Echter, met een automaat rijbewijs mag je alleen automatische auto\'s besturen, terwijl je met een schakel rijbewijs beide mag rijden.'
  },
  {
    question: 'Hoe boek ik mijn praktijkexamen?',
    answer: 'Je rijinstructeur helpt je met het boeken van je praktijkexamen bij het CBR. Wanneer je instructeur en jij samen vinden dat je klaar bent voor het examen, zal de instructeur een datum en tijd voor je reserveren. Je kunt ook zelf online een examen boeken via de website van het CBR, maar we raden aan dit in overleg met je instructeur te doen om er zeker van te zijn dat je optimaal voorbereid bent.'
  },
  {
    question: 'Hoeveel lessen heb ik nodig?',
    answer: 'Het aantal benodigde rijlessen varieert per persoon en hangt af van verschillende factoren zoals je leeftijd, leervermogen, eerdere rijervaring en beschikbaarheid. Gemiddeld hebben de meeste leerlingen tussen de 25 en 40 lessen nodig. Na je gratis proefles kan je instructeur een persoonlijk lesadvies opstellen en een inschatting maken van het aantal lessen dat jij nodig hebt.'
  },
  {
    question: 'Zal ik schakel of automaat leren rijden?',
    answer: 'De keuze tussen schakel en automaat hangt af van je persoonlijke voorkeuren en toekomstplannen. Schakel biedt meer flexibiliteit omdat je met dit rijbewijs zowel handgeschakelde als automatische auto\'s mag besturen. Automaat is makkelijker te leren en ideaal als je alleen automatische auto\'s wilt rijden. Overweeg welke auto\'s je in de toekomst wilt besturen en bespreek je situatie met onze instructeurs tijdens de gratis proefles.'
  },
  {
    question: 'Wanneer ben ik gereed voor het examen bij CBR?',
    answer: 'Je bent klaar voor het CBR-examen wanneer je alle verkeersregels beheerst, veilig en zelfstandig kunt rijden in verschillende verkeerssituaties, en de juiste rijtechnieken onder de knie hebt. Je instructeur volgt je voortgang nauwkeurig en zal samen met jou bepalen wanneer je optimaal voorbereid bent. Bij Quality Drive gebruiken we een bewezen lesmethode die ervoor zorgt dat je pas examen doet wanneer je echt klaar bent, wat je slagingskans aanzienlijk verhoogt.'
  },
  {
    question: 'Krijg ik theorie ondersteuning tijdens het les?',
    answer: 'Ja! Bij Quality Drive bieden we uitgebreide theorie-ondersteuning tijdens je rijlessen. Je instructeur zal tijdens de praktijklessen relevante theorie uitleggen en toepassen op echte verkeerssituaties. Dit helpt je om de theorie beter te begrijpen en te onthouden. Daarnaast bieden we ook aparte theorie-ondersteuning en oefenmaterialen om je optimaal voor te bereiden op je theorieexamen.'
  },
  {
    question: 'Hoe zit het met herexamen?',
    answer: 'Mocht je helaas niet slagen bij je eerste poging, dan kun je een herexamen aanvragen. Je moet minimaal 5 werkdagen wachten voordat je opnieuw examen mag doen. Deze periode geeft je de kans om te oefenen met de aandachtspunten uit je eerste examen. Je instructeur zal met je bespreken wat er beter kan en extra lessen inplannen om je goed voor te bereiden op je herexamen. Bij Quality Drive helpen we je totdat je slaagt!'
  }
];

export default function FAQClient() {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={(e) => {
              const content = e.currentTarget.nextElementSibling;
              const isOpen = content?.classList.contains(styles.faqAnswerOpen);

              // Close all others
              document.querySelectorAll('.' + styles.faqAnswer).forEach(el => {
                el.classList.remove(styles.faqAnswerOpen);
              });
              document.querySelectorAll('.' + styles.faqQuestion).forEach(el => {
                el.classList.remove(styles.faqQuestionActive);
              });

              // Toggle current
              if (!isOpen) {
                content?.classList.add(styles.faqAnswerOpen);
                e.currentTarget.classList.add(styles.faqQuestionActive);
              }
            }}
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
  );
}
