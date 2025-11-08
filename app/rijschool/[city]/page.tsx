import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../../page.module.css';
import cityStyles from './city.module.css';
import StepsSection from './StepsSection';
import ContentSections from './ContentSections';

// Generate static params for all rijschool city pages
export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found during build, skipping static generation');
    return [];
  }

  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_AUTO,
      },
      include: {
        location: true,
      },
    });

    return pages
      .filter(page => page.location)
      .map((page) => ({
        city: page.location!.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const { city } = await params;

  const page = await prisma.page.findFirst({
    where: {
      category: PageCategory.RIJSCHOOL_AUTO,
      location: {
        slug: city,
      },
    },
    include: {
      location: true,
    },
  });

  if (!page) {
    return {
      title: 'Pagina niet gevonden',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl';
  const canonicalUrl = `${siteUrl}/rijschool/${page.location!.slug}`;

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `Autorijlessen in ${page.location?.name}. Professionele rijschool met ervaren instructeurs.`,
    keywords: page.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || '',
      url: canonicalUrl,
      siteName: 'Quality Drive Rijschool',
      images: page.featuredImage ? [
        {
          url: page.featuredImage,
          width: 1200,
          height: 630,
          alt: `${page.title} - Quality Drive Rijschool`,
        }
      ] : [
        {
          url: `${siteUrl}/uploads/quality-drive-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Quality Drive Rijschool',
        }
      ],
      locale: 'nl_NL',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RijschoolCityPage({ params }: { params: { city: string } }) {
  const { city } = await params;

  // Fetch page data from database
  const page = await prisma.page.findFirst({
    where: {
      category: PageCategory.RIJSCHOOL_AUTO,
      location: {
        slug: city,
      },
    },
    include: {
      location: true,
    },
  });

  if (!page || !page.location) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl';

  // Structured Data - LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/rijschool/${page.location.slug}#organization`,
    name: `Quality Drive Rijschool ${page.location.name}`,
    image: page.featuredImage || `${siteUrl}/uploads/quality-drive-og.jpg`,
    description: page.seoDescription || `Autorijlessen in ${page.location.name}`,
    url: `${siteUrl}/rijschool/${page.location.slug}`,
    telephone: '+31-70-123-4567',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: page.location.name,
      addressRegion: 'Zuid-Holland',
      addressCountry: 'NL',
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Autorijles',
        item: `${siteUrl}/autorijles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.location.name,
        item: `${siteUrl}/rijschool/${page.location.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={styles.page}>
        <Header />

        {/* Hero Section - Breadcrumbs en H1 */}
        <section className={cityStyles.hero}>
          <div className={cityStyles.heroContent}>
            {/* Breadcrumb */}
            <nav className={cityStyles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={cityStyles.breadcrumbSeparator} aria-hidden="true">/</span>
              <Link href="/autorijles">Autorijles</Link>
              <span className={cityStyles.breadcrumbSeparator} aria-hidden="true">/</span>
              <span aria-current="page">{page.location.name}</span>
            </nav>

            <h1 className={cityStyles.title}>
              {page.title}
            </h1>
          </div>
        </section>

        {/* Steps Section with Animated Car */}
        <StepsSection />

        {/* Content Section */}
        <section className={cityStyles.contentSection}>
          <div className={cityStyles.contentContainer}>
            <div className={cityStyles.contentGrid}>
              {/* Left: Image */}
              <div className={cityStyles.imageColumn}>
                <h3 className={cityStyles.imageTitle}>Beste goedkope rijschool {page.location.name} en omgeving</h3>
                <img
                  src="/uploads/pexels-element-digital-1051071-scaled.webp"
                  alt={`Beste goedkope rijschool ${page.location.name} en omgeving`}
                  className={cityStyles.contentImage}
                />
              </div>

              {/* Right: Features */}
              <div className={cityStyles.featuresColumn}>
                <p className={cityStyles.featuresLabel}>Van Starter tot Pro</p>
                <h2 className={cityStyles.featuresTitle}>De 6 zekerheden alleen bij Quality Drive</h2>

                <ul className={cityStyles.featuresList}>
                  <li className={cityStyles.featureItem}>Gratis proefles</li>
                  <li className={cityStyles.featureItem}>€ 7,50 korting per rijles</li>
                  <li className={cityStyles.featureItem}>Morgen starten met je rijles</li>
                  <li className={cityStyles.featureItem}>Succesvolle lesmethode</li>
                  <li className={cityStyles.featureItem}>Beoordeling rijinstructeurs 9.1</li>
                  <li className={cityStyles.featureItem}>Theorie ondersteuning tijdens je les</li>
                </ul>

                <div className={cityStyles.ctaButtons}>
                  <a
                    href="https://calendly.com/qualitydrive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cityStyles.rijschoolButton}
                  >
                    Gratis proefles inplannen
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cityStyles.whatsappButton}
                    aria-label="Contact via WhatsApp"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={cityStyles.statsGrid}>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>356</div>
                <div className={cityStyles.statLabel}>Geslaagde leerlingen</div>
              </div>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>13</div>
                <div className={cityStyles.statLabel}>Expert rijinstructeurs</div>
              </div>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>100<span className={cityStyles.statPercent}>%</span></div>
                <div className={cityStyles.statLabel}>Tevreden leerlingen</div>
              </div>
            </div>
          </div>
        </section>

        {/* Text Content Section */}
        <section className={cityStyles.textContentSection}>
          <div className={cityStyles.textContentContainer}>
            {/* Intro Paragraph */}
            <div className={cityStyles.textBlock}>
              <p className={cityStyles.textParagraph}>
                Het rijbewijs, categorie B, heb je nodig om een auto te besturen waarvan de maximale toegelaten massa minder is dan 3,5 ton. Daarnaast mag je, wanneer je in het bezit bent van dit rijbewijs, een wagen besturen met een aanhanger tot 750 kg. Erg handig dus!
              </p>
              <p className={cityStyles.textParagraph}>
                Woon je in {page.location.name}, wil je snel slagen of een spoedcursus rijbewijs volgen maar heb je geen zin in hoge kosten? Bij Quality-Drive ben je dan aan het goede adres! Ons basispakket van 20 rijlessen voor het halen van je rijbewijs in {page.location.name}, heb je al vanaf €780! Start daarom direct!
              </p>
              <p className={cityStyles.textParagraph}>
                Een familiebedrijf dat inmiddels al meerdere jaren bestaat als rijschool Den Haag – Zoetermeer – Delft – Rijswijk – Berkel en Rodenrijs en omgeving. Wij kunnen bij onze autorijschool jouw rijlessen volledig op maat verzorgen. Ben je geïnteresseerd in een spoedpakket of wil je in je eigen tempo de rijlessen opbouwen. Bij autorijschool Quality-Drive kan het allemaal!
              </p>
              <p className={cityStyles.textParagraph}>
                Je kunt naar wens versneld je rijbewijs halen in 10 dagen of de rijlessen helemaal in jouw tempo laten plannen. De keuze is aan jou!
              </p>
            </div>

            {/* ADHD/ADD Section */}
            <div className={cityStyles.textBlock}>
              <h2 className={cityStyles.textSectionTitle}>Ook de beste rijschool voor ADHD - ADD - Faalangst en opfriscursus</h2>
              <p className={cityStyles.textParagraph}>
                Heeft u een lange tijd geen auto gereden of bent u net verhuist van een andere plek of heeft u een andere reden, en bent u toe aan een opfriscursus? Bij rijschool Quality-Drive zorgen wij ervoor dat u binnen enkele lessen weer zelfstandig de weg op durft te rijden. Autorijlessen voor leerlingen met ADHD – ADD of (faal)angst om achter het stuur te kruipen? Bij autorijschool Quality-Drive Den Haag – Zoetermeer – Delft – Rijswijk en omgeving hebben we gespecialiseerde instructeurs met speciale cursussen en trainingen. Zo bent u verzekerd van maatwerk rijlessen. Dit is immers de beste autorijschool van {page.location.name} en omgeving, met persoonlijke aandacht voor elke individu. Uiteraard wordt bij elke les maximaal Quality gegeven, dit vinden we zeer belangrijk bij autorijschool Quality-Drive. En nu met de unieke 6 zekerheden is succes gegarandeerd!
              </p>
              <p className={cityStyles.textHighlight}>
                BIJ ONS HAALT IEDEREEN ZIJN/HAAR RIJBEWIJS!
              </p>
              <p className={cityStyles.textParagraph}>
                Heb jij ook de barstende vraag welke de beste rijschool ADD van Den Haag – Zoetermeer – Delft – Rijswijk – Voorburg – Nootdorp – Berkel en Rodenrijs – Pijnacker – Landsingerland – Scheveningen en omgeving is? Wij hebben een unieke lesmethode ontwikkeld waarbij je elke lespakket kunt vergelijken met een spoedpakket bij onze autorijschool.
              </p>
              <p className={cityStyles.textParagraph}>
                Met de succesvolle Quality-Drive Lesmethode slaag je gegarandeerd bij de beste rijschool van {page.location.name} en omgeving. Deze unieke formule begint met een gratis proefles door een gespecialiseerde proefles rijinstructeur, op basis hiervan wordt een persoonlijk lesadvies opgesteld en een rijcoach toegewezen die het beste bij jou past. Met onze lesmethode leer je alles over alle mogelijke verkeerssituaties waar je in terecht kunt komen.
              </p>
            </div>

            {/* Why Quality Drive Section */}
            <div className={cityStyles.textBlock}>
              <h2 className={cityStyles.textSectionTitle}>Waarom Quality Drive?</h2>

              <div className={cityStyles.whyItem}>
                <h3 className={cityStyles.whyItemTitle}>Succes Gegarandeerd</h3>
                <p className={cityStyles.textParagraph}>
                  Bij Quality Drive bent u verzekerd van succes. Dankzij onze bewezen methodes en ervaren instructeurs heeft u de hoogste kans om uw rijbewijs te behalen. Ons slagingspercentage spreekt voor zich: met Quality Drive slaagt u!
                </p>
              </div>

              <div className={cityStyles.whyItem}>
                <h3 className={cityStyles.whyItemTitle}>Top Instructeurs</h3>
                <p className={cityStyles.textParagraph}>
                  Onze instructeurs zijn deskundig, geduldig en toegewijd aan uw succes. Ze zijn er om u te ondersteunen bij elke stap, u gerust te stellen en uw zelfvertrouwen op te bouwen. Hun persoonlijke aanpak zorgt ervoor dat u zich altijd op uw gemak voelt.
                </p>
              </div>

              <div className={cityStyles.whyItem}>
                <h3 className={cityStyles.whyItemTitle}>Moderne en Veilige Voertuigen</h3>
                <p className={cityStyles.textParagraph}>
                  U leert rijden in goed onderhouden, moderne voertuigen die voorzien zijn van de nieuwste veiligheidsvoorzieningen. Dit zorgt voor een veilige en comfortabele leeromgeving, waardoor u zich volledig kunt concentreren op uw rijvaardigheden.
                </p>
              </div>

              <div className={cityStyles.whyItem}>
                <h3 className={cityStyles.whyItemTitle}>Individueel Aangepaste Lesprogramma&apos;s</h3>
                <p className={cityStyles.textParagraph}>
                  Bij Quality Drive geloven we dat maatwerk de sleutel tot succes is. Onze lesprogramma&apos;s worden aangepast aan uw specifieke behoeften en leerstijl, zodat u zich in uw eigen tempo kunt ontwikkelen en zelfverzekerd naar uw rijexamen kunt toewerken.
                </p>
              </div>

              <div className={cityStyles.whyItem}>
                <h3 className={cityStyles.whyItemTitle}>Uitgebreide Theorieondersteuning</h3>
                <p className={cityStyles.textParagraph}>
                  Wij bieden uitgebreide ondersteuning bij uw theorie-examen. Met onze effectieve cursussen en oefenmateriaal bent u goed voorbereid en heeft u de kennis die nodig is om te slagen.
                </p>
              </div>

              <p className={cityStyles.textCta}>
                Meld je dus nu aan voor jouw gratis proefles.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// Enable static generation (ISR) - revalidate every hour
export const revalidate = 3600;
