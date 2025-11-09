import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";
import BottomNav from "./components/BottomNav";

/**
 * Montserrat Font - design.md compliant
 * 1 font met 3 gewichten voor maximale consistentie:
 * - 400 (Regular) voor body tekst
 * - 600 (SemiBold) voor subkoppen, knoppen, labels
 * - 700 (Bold) voor hoofdheaders
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Quality Drive - Beste Goedkope Rijschool Den Haag | Auto, Automaat & Motor Rijlessen",
    template: "%s | Quality Drive Rijschool"
  },
  description: "Quality Drive is de beste goedkope rijschool in Den Haag en omgeving. Gratis proefles, €7,50 korting per les, ervaren instructeurs. Start morgen al met auto, automaat of motor rijlessen!",
  keywords: ["rijschool Den Haag", "goedkope rijschool", "rijlessen Den Haag", "auto rijlessen", "motor rijlessen", "automaat rijlessen", "proefles", "rijbewijs halen", "Quality Drive"],
  authors: [{ name: "Quality Drive Rijschool" }],
  creator: "Quality Drive Rijschool",
  publisher: "Quality Drive Rijschool",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Quality Drive - Beste Goedkope Rijschool Den Haag",
    description: "Gratis proefles, €7,50 korting per les. Start morgen al met rijlessen in Den Haag!",
    url: '/',
    siteName: 'Quality Drive Rijschool',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/quality-drive-logo.png',
        width: 1200,
        height: 630,
        alt: 'Quality Drive Rijschool Den Haag',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quality Drive - Beste Goedkope Rijschool Den Haag',
    description: 'Gratis proefles, €7,50 korting per les. Start morgen al met rijlessen!',
    images: ['/quality-drive-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'jouw-google-verification-code', // Vervang met je eigen code
    // yandex: 'jouw-yandex-verification-code',
    // bing: 'jouw-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        {/* Resource hints for external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={montserrat.className}>
        <StructuredData type="LocalBusiness" />
        <StructuredData type="WebSite" />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
