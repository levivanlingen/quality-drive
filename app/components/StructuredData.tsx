/**
 * Schema.org Structured Data Component
 * Voor betere SEO en Rich Snippets in Google Search
 */

export interface LocalBusinessSchema {
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  image?: string;
  priceRange?: string;
  openingHours?: string[];
}

interface StructuredDataProps {
  type?: 'LocalBusiness' | 'Organization' | 'WebSite' | 'Article';
  data?: any;
}

export default function StructuredData({ type = 'LocalBusiness', data }: StructuredDataProps) {
  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": "https://quality-drive.nl/#organization",
    "name": "Quality Drive Rijschool",
    "description": "Quality Drive is de beste goedkope rijschool in Den Haag en omgeving. Gratis proefles, ervaren instructeurs voor auto, automaat en motor rijlessen.",
    "url": "https://quality-drive.nl",
    "telephone": "+31620817325",
    "email": "info@quality-drive.nl",
    "image": "https://quality-drive.nl/quality-drive-logo.png",
    "logo": {
      "@type": "ImageObject",
      "url": "https://quality-drive.nl/quality-drive-logo.png",
      "width": 200,
      "height": 60
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Den Haag",
      "addressRegion": "Zuid-Holland",
      "addressCountry": "NL"
    },
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.1",
      "bestRating": "10",
      "worstRating": "1",
      "ratingCount": "3356"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "52.0705",
        "longitude": "4.3007"
      },
      "geoRadius": "25000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rijlessen Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Rijlessen",
            "description": "Rijlessen in een handgeschakelde auto"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automaat Rijlessen",
            "description": "Rijlessen in een automatische auto"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Motor Rijlessen",
            "description": "Motorrijlessen voor alle niveaus"
          }
        }
      ]
    },
    "sameAs": [
      // Voeg hier je social media links toe
      // "https://www.facebook.com/quality-drive",
      // "https://www.instagram.com/quality-drive",
      // "https://www.linkedin.com/company/quality-drive",
    ]
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://quality-drive.nl/#website",
    "url": "https://quality-drive.nl",
    "name": "Quality Drive Rijschool",
    "description": "Beste goedkope rijschool in Den Haag",
    "publisher": {
      "@id": "https://quality-drive.nl/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://quality-drive.nl/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  });

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://quality-drive.nl/#organization",
    "name": "Quality Drive Rijschool",
    "url": "https://quality-drive.nl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://quality-drive.nl/quality-drive-logo.png"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+31620817325",
      "contactType": "customer service",
      "availableLanguage": ["nl", "en"]
    }
  });

  const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  let schemaData;

  switch (type) {
    case 'LocalBusiness':
      schemaData = getLocalBusinessSchema();
      break;
    case 'Organization':
      schemaData = getOrganizationSchema();
      break;
    case 'WebSite':
      schemaData = getWebsiteSchema();
      break;
    case 'Article':
      schemaData = data;
      break;
    default:
      schemaData = getLocalBusinessSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
