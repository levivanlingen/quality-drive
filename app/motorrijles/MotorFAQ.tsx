'use client';

import styles from '../page.module.css';
import motorrijlesStyles from './motorrijles.module.css';

export default function MotorFAQ() {
  return (
    <section className={motorrijlesStyles.faqSection}>
      <div className={motorrijlesStyles.faqContainer}>
        <h2 className={styles.sectionHeaderTitle}>Veelgestelde vragen over motorrijles</h2>
        <p className={styles.sectionHeaderSubtitle}>Alles wat je moet weten over motorrijlessen bij Quality Drive</p>

        <div className={motorrijlesStyles.faqList}>
          <div className={motorrijlesStyles.faqItem}>
            <button
              className={motorrijlesStyles.faqQuestion}
              onClick={(e) => {
                const content = e.currentTarget.nextElementSibling;
                const isOpen = content?.classList.contains(motorrijlesStyles.faqAnswerOpen);

                // Close all others
                document.querySelectorAll('.' + motorrijlesStyles.faqAnswer).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqAnswerOpen);
                });
                document.querySelectorAll('.' + motorrijlesStyles.faqQuestion).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqQuestionActive);
                });

                // Toggle current
                if (!isOpen) {
                  content?.classList.add(motorrijlesStyles.faqAnswerOpen);
                  e.currentTarget.classList.add(motorrijlesStyles.faqQuestionActive);
                }
              }}
            >
              <span>Wat zijn de vereisten om te beginnen met motorrijlessen bij Quality Drive?</span>
              <span className={motorrijlesStyles.faqIcon}>+</span>
            </button>
            <div className={motorrijlesStyles.faqAnswer}>
              <p>Om te beginnen met motorrijlessen bij Quality Drive, moet je minimaal 18 jaar oud zijn voor de categorie A1, 20 jaar voor A2, en 24 jaar voor de categorie A (of 22 jaar met twee jaar rijervaring in A2). Daarnaast moet je in het bezit zijn van een geldig identiteitsbewijs en een theoriecertificaat voor de motor.</p>
            </div>
          </div>

          <div className={motorrijlesStyles.faqItem}>
            <button
              className={motorrijlesStyles.faqQuestion}
              onClick={(e) => {
                const content = e.currentTarget.nextElementSibling;
                const isOpen = content?.classList.contains(motorrijlesStyles.faqAnswerOpen);

                // Close all others
                document.querySelectorAll('.' + motorrijlesStyles.faqAnswer).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqAnswerOpen);
                });
                document.querySelectorAll('.' + motorrijlesStyles.faqQuestion).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqQuestionActive);
                });

                // Toggle current
                if (!isOpen) {
                  content?.classList.add(motorrijlesStyles.faqAnswerOpen);
                  e.currentTarget.classList.add(motorrijlesStyles.faqQuestionActive);
                }
              }}
            >
              <span>Hoe lang duurt het gemiddeld om mijn motorrijbewijs te halen?</span>
              <span className={motorrijlesStyles.faqIcon}>+</span>
            </button>
            <div className={motorrijlesStyles.faqAnswer}>
              <p>De tijd die nodig is om je motorrijbewijs te halen, varieert per persoon en hangt af van je leervermogen, beschikbaarheid en rijvaardigheid. Gemiddeld hebben de meeste leerlingen tussen de 20 en 30 lesuren nodig om goed voorbereid te zijn op het examen.</p>
            </div>
          </div>

          <div className={motorrijlesStyles.faqItem}>
            <button
              className={motorrijlesStyles.faqQuestion}
              onClick={(e) => {
                const content = e.currentTarget.nextElementSibling;
                const isOpen = content?.classList.contains(motorrijlesStyles.faqAnswerOpen);

                // Close all others
                document.querySelectorAll('.' + motorrijlesStyles.faqAnswer).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqAnswerOpen);
                });
                document.querySelectorAll('.' + motorrijlesStyles.faqQuestion).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqQuestionActive);
                });

                // Toggle current
                if (!isOpen) {
                  content?.classList.add(motorrijlesStyles.faqAnswerOpen);
                  e.currentTarget.classList.add(motorrijlesStyles.faqQuestionActive);
                }
              }}
            >
              <span>Hoe garandeert Quality-Drive de veiligheid?</span>
              <span className={motorrijlesStyles.faqIcon}>+</span>
            </button>
            <div className={motorrijlesStyles.faqAnswer}>
              <p>Bij Quality-Drive staat veiligheid voorop in alles wat we doen. Wij garanderen de veiligheid van onze leerlingen door gebruik te maken van modern uitgeruste lesmotoren, die regelmatig worden onderhouden en gecontroleerd om te voldoen aan de hoogste veiligheidsnormen. Onze motorrijinstructeurs zijn niet alleen deskundig, maar ook speciaal opgeleid om een veilige, ondersteunende en rustgevende leeromgeving te creëren. Daarnaast leggen we de nadruk op defensief rijden en het bewustzijn van de weg, zodat leerlingen voorbereid zijn op allerlei verkeerssituaties. Bij Quality-Drive is jouw veiligheid onze prioriteit.</p>
            </div>
          </div>

          <div className={motorrijlesStyles.faqItem}>
            <button
              className={motorrijlesStyles.faqQuestion}
              onClick={(e) => {
                const content = e.currentTarget.nextElementSibling;
                const isOpen = content?.classList.contains(motorrijlesStyles.faqAnswerOpen);

                // Close all others
                document.querySelectorAll('.' + motorrijlesStyles.faqAnswer).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqAnswerOpen);
                });
                document.querySelectorAll('.' + motorrijlesStyles.faqQuestion).forEach(el => {
                  el.classList.remove(motorrijlesStyles.faqQuestionActive);
                });

                // Toggle current
                if (!isOpen) {
                  content?.classList.add(motorrijlesStyles.faqAnswerOpen);
                  e.currentTarget.classList.add(motorrijlesStyles.faqQuestionActive);
                }
              }}
            >
              <span>Zijn alle instructeurs op VOG gecontroleerd?</span>
              <span className={motorrijlesStyles.faqIcon}>+</span>
            </button>
            <div className={motorrijlesStyles.faqAnswer}>
              <p>Bij Quality-Drive nemen we de betrouwbaarheid en professionaliteit van ons team zeer serieus. Daarom zorgen we ervoor dat al onze instructeurs grondig zijn gescreend, inclusief een Verklaring Omtrent het Gedrag (VOG). Deze VOG-check verzekert dat onze instructeurs niet alleen uitblinken in hun vak, maar ook betrouwbaar en van onbesproken gedrag zijn. Zo kunnen wij onze leerlingen en hun families de zekerheid bieden dat ze in veilige en betrouwbare handen zijn. Bij Quality-Drive kunt u vertrouwen op een team van professionals die uw veiligheid en succes op de weg waarborgen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
