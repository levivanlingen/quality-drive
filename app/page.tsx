"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Car, Settings, Bike, BookOpen, Disc3, MessageCircle, Trophy, Users, ThumbsUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PackageBuilderDialog from "./components/PackageBuilderDialog";
import GooglePlacesReviews from "./components/GooglePlacesReviews";
import InfoCarousel from "./components/InfoCarousel";
import postsData from '@/data/posts.json';
import imageMapping from '@/data/image-url-mapping.json';

// Helper functie om WordPress image URLs te vervangen
function getImageUrl(wpUrl: string | null): string {
  if (!wpUrl) return '/quality-drive-logo.png';

  // Check of we een exacte match hebben in de mapping
  if (imageMapping[wpUrl as keyof typeof imageMapping]) {
    return imageMapping[wpUrl as keyof typeof imageMapping];
  }

  // Fallback: extraheer alleen de bestandsnaam uit de URL
  const filename = wpUrl.split('/').pop();
  return `/uploads/${filename}`;
}

// Helper functie om HTML te strippen voor excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...').substring(0, 150) + '...';
}

import Lazy3DCard from "./components/Lazy3DCard";

export default function Home() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isAutoCardHovered, setIsAutoCardHovered] = useState(false);
  const [isAutomatCardHovered, setIsAutomatCardHovered] = useState(false);
  const [isMotorCardHovered, setIsMotorCardHovered] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'auto' | 'automaat' | 'motor'>('auto');
  const [pricingCategory, setPricingCategory] = useState<'auto' | 'motor'>('auto');

  // Get the 3 most recent blog posts
  const recentPosts = [...postsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      const rotation = window.scrollY * 0.2;
      setScrollRotation(rotation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              De Snelste Route naar jouw Rijbewijs
            </h1>
            <p className={styles.heroSubtitle}>
              Vraag je proefles aan, start met rijlessen en behaal gegarandeerd
              je rijbewijs
            </p>

            {/* Ride Request Card */}
            <div className={styles.rideCard}>
              <div className={styles.cardTabs}>
                <button className={`${styles.tab} ${styles.tabActive}`}>
                  Proefles
                </button>
                <button className={styles.tab}>Prijzen</button>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <div className={styles.dotIcon}></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Ophaal locatie"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.inputIcon}>
                    <div className={styles.squareIcon}></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Datum"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <button className={styles.searchButton}>Gratis Proefles inplannen</button>
            </div>
          </div>

          <div className={styles.heroRight}>
            <Image
              src="/volkswagen-golf-2021-1-0-etsi-milde-hybride-304650-1920.png"
              alt="Volkswagen Golf"
              width={800}
              height={600}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <CheckCircle2 className={styles.checkIcon} />
            <span>Also in English</span>
          </div>
          <div className={styles.featureItem}>
            <CheckCircle2 className={styles.checkIcon} />
            <span>Ook voor ADD & ADHD</span>
          </div>
          <div className={styles.featureItem}>
            <CheckCircle2 className={styles.checkIcon} />
            <span>Nu € 7,50 korting per les</span>
          </div>
          <div className={styles.featureItem}>
            <CheckCircle2 className={styles.checkIcon} />
            <span>Start morgen al je proefles</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2 className={styles.sectionTitle}>Stel jouw pakket samen</h2>
        <p className={styles.sectionSubtitle}>Kies jouw rijles type en begin vandaag nog met je rijbewijs</p>
        <div className={styles.serviceGrid}>
          <div
            className={styles.serviceCard}
            onMouseEnter={() => setIsAutoCardHovered(true)}
            onMouseLeave={() => setIsAutoCardHovered(false)}
            onClick={() => {
              setDialogType('auto');
              setDialogOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.serviceIcon3D}>
              {/* Only load 3D canvas when hovered to reduce GPU load */}
              {isAutoCardHovered ? (
                <Lazy3DCard type="car" isHovered={true} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px'
                }}>
                  <div style={{ textAlign: 'center', color: '#0065A6' }}>
                    <div style={{ fontSize: '3rem' }}>🚗</div>
                  </div>
                </div>
              )}
            </div>
            <h3>Auto</h3>
            <p>Leer rijden in een handgeschakelde auto met onze ervaren instructeurs.</p>
            <span className={styles.serviceLink}>
              Pakket Samenstellen →
            </span>
          </div>

          <div
            className={styles.serviceCard}
            onMouseEnter={() => setIsAutomatCardHovered(true)}
            onMouseLeave={() => setIsAutomatCardHovered(false)}
            onClick={() => {
              setDialogType('automaat');
              setDialogOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.serviceIcon3D}>
              {/* Only load 3D canvas when hovered to reduce GPU load */}
              {isAutomatCardHovered ? (
                <Lazy3DCard type="car" isHovered={true} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px'
                }}>
                  <div style={{ textAlign: 'center', color: '#0065A6' }}>
                    <div style={{ fontSize: '3rem' }}>🚗</div>
                  </div>
                </div>
              )}
            </div>
            <h3>Automaat</h3>
            <p>Haal je rijbewijs op een automatische transmissie.</p>
            <span className={styles.serviceLink}>
              Pakket Samenstellen →
            </span>
          </div>

          <div
            className={styles.serviceCard}
            onMouseEnter={() => setIsMotorCardHovered(true)}
            onMouseLeave={() => setIsMotorCardHovered(false)}
            onClick={() => {
              setDialogType('motor');
              setDialogOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.serviceIcon3D}>
              {/* Only load 3D canvas when hovered to reduce GPU load */}
              {isMotorCardHovered ? (
                <Lazy3DCard type="motor" isHovered={true} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px'
                }}>
                  <div style={{ textAlign: 'center', color: '#0065A6' }}>
                    <div style={{ fontSize: '3rem' }}>🏍️</div>
                  </div>
                </div>
              )}
            </div>
            <h3>Motor</h3>
            <p>Motorrijlessen voor alle niveaus en motorrijbewijs categorieën.</p>
            <span className={styles.serviceLink}>
              Pakket Samenstellen →
            </span>
          </div>
        </div>
      </section>

      {/* Beste goedkope rijschool Section */}
      <section className={styles.rijschoolSection}>
        <div className={styles.rijschoolContent}>
          <p className={styles.rijschoolLabel}>Jouw Rijbewijs, Onze Missie</p>
          <h2 className={styles.sectionTitle}>Beste goedkope rijschool Den Haag en omgeving</h2>
          <p className={styles.rijschoolText}>
            Wij als beste goedkope rijschool Den Haag geloven in de kracht van elke leerling.
            Niet alleen leerlingen die hun rijbewijs willen halen kunnen gebruik maken van de rijlessen.
            Mensen die al een tijd in het bezit zijn van hun rijbewijs en bijvoorbeeld last hebben van
            faalangst kunnen een opfriscursus volgen. Voor een spoedopleiding voor je rijbewijs kun je
            ook bij ons terecht.
          </p>

          <div className={styles.rijschoolCards}>
            <div className={styles.rijschoolCard}>
              <div className={styles.rijschoolCardIcon}>
                <Car size={40} strokeWidth={1.5} />
              </div>
              <h3>Auto</h3>
              <p>Leer rijden in een handgeschakelde auto met professionele begeleiding</p>
            </div>

            <div className={styles.rijschoolCard}>
              <div className={styles.rijschoolCardIcon}>
                <Car size={40} strokeWidth={1.5} />
              </div>
              <h3>Automaat</h3>
              <p>Rijlessen in een automatische auto voor een comfortabele leerervaring</p>
            </div>

            <div className={styles.rijschoolCard}>
              <div className={styles.rijschoolCardIcon}>
                <Bike size={40} strokeWidth={1.5} />
              </div>
              <h3>Motor</h3>
              <p>Motorrijlessen voor alle niveaus en rijbewijs categorieën</p>
            </div>
          </div>

          <button className={styles.rijschoolButton}>Gratis proefles inplannen</button>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon} style={{ transform: `rotate(${scrollRotation}deg)` }}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Zekerheden Section */}
      <section className={styles.zekerhedenSection}>
        <div className={styles.zekerhedenContent}>
          <p className={styles.zekerhedenLabel}>Van Starter tot Pro</p>
          <h2 className={styles.sectionTitle}>De 6 zekerheden alleen bij Quality Drive​</h2>

          <div className={styles.zekerhedenGrid}>
            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>1</div>
              <h3>Gratis proefles</h3>
              <p>Start vrijblijvend met een gratis proefles en ervaar onze professionele begeleiding</p>
            </div>

            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>2</div>
              <h3>€ 7,50 korting per rijles</h3>
              <p>Profiteer van onze scherpe tarieven met maar liefst € 7,50 korting per les</p>
            </div>

            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>3</div>
              <h3>Morgen starten met je rijles</h3>
              <p>Geen lange wachtlijsten - begin al morgen met jouw rijlessen</p>
            </div>

            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>4</div>
              <h3>Succesvolle lesmethode</h3>
              <p>Bewezen effectieve lesmethode waarmee duizenden leerlingen hun rijbewijs haalden</p>
            </div>

            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>5</div>
              <h3>Beoordeling rijinstructeurs 9.1</h3>
              <p>Onze rijinstructeurs scoren gemiddeld een 9.1 van onze tevreden leerlingen</p>
            </div>

            <div className={styles.zekerheidCard}>
              <div className={styles.zekerheidNumber}>6</div>
              <h3>Theorie ondersteuning tijdens je les</h3>
              <p>Ontvang persoonlijke theorie begeleiding tijdens je praktijklessen</p>
            </div>
          </div>

          <div className={styles.zekerhedenButtons}>
            <button className={styles.rijschoolButton}>Gratis proefles inplannen</button>
            <a
              href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
              title="WhatsApp ons"
            >
              <FaWhatsapp size={30} />
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon} style={{ transform: `rotate(${scrollRotation}deg)` }}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContent}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Trophy size={48} strokeWidth={1.5} />
            </div>
            <div className={styles.statNumber}>3.356</div>
            <div className={styles.statLabel}>Geslaagde leerlingen</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Users size={48} strokeWidth={1.5} />
            </div>
            <div className={styles.statNumber}>13</div>
            <div className={styles.statLabel}>Expert rijinstructeurs</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <ThumbsUp size={48} strokeWidth={1.5} />
            </div>
            <div className={styles.statNumber}>
              100<span className={styles.statPercent}>%</span>
            </div>
            <div className={styles.statLabel}>Tevreden leerlingen</div>
          </div>
        </div>
      </section>

      {/* Rijlessen Op Maat Carousel Section */}
      <section className={styles.rijlessenOpMaatSection}>
        <div className={styles.rijlessenOpMaatContent}>
          <h2 className={styles.rijlessenOpMaatTitle}>Over Quality Drive</h2>

          <InfoCarousel />
        </div>
      </section>

      {/* Waarom Quality Drive Section */}
      <section className={styles.waaromQDSection}>
        <div className={styles.waaromQDContent}>
          <h2 className={styles.sectionTitle}>Waarom Quality Drive?</h2>

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
              <h3>Individueel Aangepaste Lesprogramma's</h3>
              <p>
                Bij Quality Drive geloven we dat maatwerk de sleutel tot succes is. Onze lesprogramma's worden aangepast aan uw specifieke behoeften en leerstijl, zodat u zich in uw eigen tempo kunt ontwikkelen en zelfverzekerd naar uw rijexamen kunt toewerken.
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

      {/* Populaire Pakketten Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingContent}>
          <h2 className={styles.sectionTitle}>Populaire Pakketten</h2>
          <p className={styles.sectionSubtitle}>Kies het pakket dat bij jou past en start vandaag nog</p>

          {/* Category Selector */}
          <div className={styles.pricingTabs}>
            <button
              className={`${styles.pricingTab} ${pricingCategory === 'auto' ? styles.pricingTabActive : ''}`}
              onClick={() => setPricingCategory('auto')}
            >
              <Car size={20} />
              <span>Auto Rijlessen</span>
            </button>
            <button
              className={`${styles.pricingTab} ${pricingCategory === 'motor' ? styles.pricingTabActive : ''}`}
              onClick={() => setPricingCategory('motor')}
            >
              <Bike size={20} />
              <span>Motor Rijlessen</span>
            </button>
          </div>

          <div className={styles.pricingGrid}>
            {pricingCategory === 'auto' ? (
              <>
                {/* Auto: Basis Pakket */}
                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <h3>Basis Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 120</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.099</span>
                  </div>
                  <div className={styles.pricingLessons}>20 lessen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>20 Rijlessen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles t.w.v. €45</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                    <li className={styles.featureNote}>
                      <span>Exclusief praktijkexamen CBR</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Gratis proefles inplannen
                  </button>
                </div>

                {/* Auto: Actie Pakket - Featured */}
                <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
                  <div className={styles.featuredBadge}>Populair</div>
                  <div className={styles.pricingHeader}>
                    <h3>Actie Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 180</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.575</span>
                  </div>
                  <div className={styles.pricingLessons}>30 lessen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>30 Rijlessen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles t.w.v. €45</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                    <li className={styles.featureNote}>
                      <span>Exclusief praktijkexamen CBR</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Gratis proefles inplannen
                  </button>
                </div>

                {/* Auto: Tussen Pakket */}
                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <h3>Tussen Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 172</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.799</span>
                  </div>
                  <div className={styles.pricingLessons}>35 lessen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>35 Rijlessen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles t.w.v. €45</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Geld Terug Garantie</span>
                    </li>
                    <li className={styles.featureNote}>
                      <span>Exclusief Praktijkexamen CBR</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Gratis proefles inplannen
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Motor: Spoed Pakket */}
                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <h3>Spoed Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 59</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>998</span>
                  </div>
                  <div className={styles.pricingLessons}>10 lessen</div>
                  <div className={styles.pricingPayment}>€ 499 × 2 delen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Binnen 4 weken op examen CBR</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVD Praktijk examen t.w.v. €300</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVB examen t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis AVB her examen CBR t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Motorkleding inbegrepen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Nu rijbewijs halen
                  </button>
                </div>

                {/* Motor: Spoed Pakket+ */}
                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <h3>Spoed Pakket+</h3>
                    <div className={styles.pricingBadge}>Bespaar € 75</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.298</span>
                  </div>
                  <div className={styles.pricingLessons}>15 lessen</div>
                  <div className={styles.pricingPayment}>€ 649 × 2 delen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Binnen 4 weken op examen CBR</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVD Praktijk examen t.w.v. €300</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVB examen t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis AVB her examen CBR t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Motorkleding inbegrepen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Nu rijbewijs halen
                  </button>
                </div>

                {/* Motor: Actie Pakket - Featured */}
                <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
                  <div className={styles.featuredBadge}>Populair</div>
                  <div className={styles.pricingHeader}>
                    <h3>Actie Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 83</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.498</span>
                  </div>
                  <div className={styles.pricingLessons}>20 lessen</div>
                  <div className={styles.pricingPayment}>€ 749 × 2 delen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Binnen 4 weken op examen CBR</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVD Praktijk examen t.w.v. €300</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVB examen t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis AVB her examen CBR t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Motorkleding inbegrepen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Nu rijbewijs halen
                  </button>
                </div>

                {/* Motor: Garantie Pakket */}
                <div className={styles.pricingCard}>
                  <div className={styles.pricingHeader}>
                    <h3>Garantie Pakket</h3>
                    <div className={styles.pricingBadge}>Bespaar € 90</div>
                  </div>
                  <div className={styles.pricingPrice}>
                    <span className={styles.currency}>€</span>
                    <span className={styles.amount}>1.898</span>
                  </div>
                  <div className={styles.pricingLessons}>25 lessen</div>
                  <div className={styles.pricingPayment}>€ 949 × 2 delen</div>
                  <ul className={styles.pricingFeatures}>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis proefles</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Binnen 4 weken op examen CBR</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVD Praktijk examen t.w.v. €300</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>AVB examen t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Gratis AVB her examen CBR t.w.v. €225</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Motorkleding inbegrepen</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Theorie ondersteuning</span>
                    </li>
                  </ul>
                  <button className={styles.pricingButton}>
                    Nu rijbewijs halen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Geslaagde Toppers Section */}
      <section className={styles.geslaagdeSection}>
        <div className={styles.geslaagdeContent}>
          <h2 className={styles.geslaagdeTitle}>Wordt jij de volgende?</h2>
          <p className={styles.geslaagdeSubtitle}>De geslaagde motor toppers van Quality Drive</p>

          <div className={styles.geslaagdeGrid}>
            <Image
              src="/uploads/2b938a12-ec01-4987-8445-39a3d17bcbb3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/78dde0c3-cad0-4265-8168-a534326d60fb.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/60b901bf-c187-4a41-b331-c5dce0a7064c.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/107972467_1212829972386094_152816382712214096_n.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/aff19a03-b4e5-47c7-aae2-60f429ce8cb1.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-4.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              className={styles.geslaagdePhoto}
            />
          </div>

          <button className={styles.geslaagdeCTA}>
            Word jij de volgende topper? Start nu!
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContent}>
          <h2 className={styles.faqTitle}>Veelgestelde vragen</h2>
          <p className={styles.faqSubtitle}>Alles wat je moet weten over rijlessen bij Quality Drive</p>

          <div className={styles.faqList}>
            <div className={styles.faqItem}>
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
                <span>Wat maakt Quality-Drive uniek?</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>Bij Quality-Drive zetten we ons in voor rijonderwijs van de hoogste kwaliteit, waarbij de leerling centraal staat. Onze benadering is uniek: wij bieden een gratis proefles aan, garanderen korting op elke rijles, en passen een bewezen effectieve lesmethode toe. Bovendien bieden we gepersonaliseerde theorie-ondersteuning, afgestemd op de individuele behoeften van elke leerling. Deze combinatie van factoren zorgt ervoor dat elke leerling niet alleen slaagt voor hun rijexamen, maar ook met vertrouwen en kundigheid de weg op gaat.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
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
                <span>Biedt Quality-Drive ondersteuning voor speciale behoeften?</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>Quality-Drive onderscheidt zich door een inclusieve benadering van rijonderwijs, waarbij elke leerling, ongeacht hun specifieke behoeften, de juiste ondersteuning en aandacht krijgt. Voor leerlingen met ADD, ADHD of faalangst biedt Quality-Drive gespecialiseerde instructeurs die getraind zijn in het bieden van maatwerk rijlessen. Deze instructeurs hebben kennis en ervaring in het omgaan met de unieke uitdagingen die deze leerlingen kunnen ervaren.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
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
                <span>Hoe garandeert Quality-Drive de veiligheid?</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>Bij Quality-Drive staat veiligheid voorop in alles wat we doen. Wij garanderen de veiligheid van onze leerlingen door gebruik te maken van modern uitgeruste lesvoertuigen, die regelmatig worden onderhouden en gecontroleerd om te voldoen aan de hoogste veiligheidsnormen. Onze rijinstructeurs zijn niet alleen deskundig, maar ook speciaal opgeleid om een veilige, ondersteunende en rustgevende leeromgeving te creëren. Daarnaast leggen we de nadruk op defensief rijden en het bewustzijn van de weg, zodat leerlingen voorbereid zijn op allerlei verkeerssituaties. Bij Quality-Drive is jouw veiligheid onze prioriteit.</p>
              </div>
            </div>

            <div className={styles.faqItem}>
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
                <span>Zijn alle instructeurs op VOG gecontroleerd?</span>
                <span className={styles.faqIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>Bij Quality-Drive nemen we de betrouwbaarheid en professionaliteit van ons team zeer serieus. Daarom zorgen we ervoor dat al onze instructeurs grondig zijn gescreend, inclusief een Verklaring Omtrent het Gedrag (VOG). Deze VOG-check verzekert dat onze instructeurs niet alleen uitblinken in hun vak, maar ook betrouwbaar en van onbesproken gedrag zijn. Zo kunnen wij onze leerlingen en hun families de zekerheid bieden dat ze in veilige en betrouwbare handen zijn. Bij Quality-Drive kunt u vertrouwen op een team van professionals die uw veiligheid en succes op de weg waarborgen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recente Blogs Section */}
      <section className={styles.blogsSection}>
        <div className={styles.blogsContent}>
          <h2 className={styles.blogsTitle}>Recente Blogs</h2>
          <p className={styles.blogsSubtitle}>Blijf op de hoogte van het laatste nieuws en tips</p>

          <div className={styles.blogsGrid}>
            {recentPosts.map((post: any) => (
              <article key={post.id} className={styles.blogCard}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={styles.blogImageWrapper}>
                    {post.featuredImage ? (
                      <Image
                        src={getImageUrl(post.featuredImage)}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.blogImage}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.1) 0%, rgba(0, 101, 166, 0.05) 100%)',
                        color: '#0065A6',
                        fontSize: '3rem',
                      }}>
                        🚗
                      </div>
                    )}
                  </div>
                  <div className={styles.blogContent}>
                    <div className={styles.blogMeta}>
                      <span className={styles.blogDate}>
                        {new Date(post.date).toLocaleDateString('nl-NL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      {post.categories.length > 0 && (
                        <span className={styles.blogCategory}>{post.categories[0]}</span>
                      )}
                    </div>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogExcerpt}>
                      {stripHtml(post.excerpt)}
                    </p>
                    <span className={styles.blogLink}>
                      Lees meer →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.blogsFooter}>
            <Link href="/blog" className={styles.allBlogsButton}>
              Bekijk alle blogs →
            </Link>
          </div>
        </div>
      </section>

      {/* Werken bij Quality Drive Section */}
      <section className={styles.careerSection}>
        <div className={styles.careerContent}>
          <div className={styles.careerTextArea}>
            <h2 className={styles.careerTitle}>Werken bij Quality Drive</h2>
            <h3 className={styles.careerSubtitle}>Vacature: Rijinstructeur</h3>
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
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Package Builder Dialog */}
      <PackageBuilderDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />
    </div>
  );
}
