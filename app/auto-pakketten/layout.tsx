import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto pakketten | Quality Drive Rijschool',
  description: 'Bekijk onze auto rijles pakketten. Snel slagen, geen wachtrij en de goedkoopste in de regio. 100% geslaagd bij Quality Drive.',
  keywords: 'auto pakketten, autorijles, rijlessen auto, Den Haag, Zoetermeer, Delft, Rijswijk',
  openGraph: {
    title: 'Auto pakketten | Quality Drive Rijschool',
    description: 'Bekijk onze auto rijles pakketten. 100% geslaagd bij Quality Drive.',
    type: 'website',
  },
};

export default function AutoPakkettenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
