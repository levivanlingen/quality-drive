import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rijles Pakketten | Quality Drive Rijschool',
  description: 'Bekijk onze rijles pakketten voor auto en motor in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving. Kies het pakket dat bij jou past.',
  keywords: 'rijles pakketten, auto pakketten, motor pakketten, rijlessen Den Haag, Zoetermeer, Delft, Rijswijk',
  openGraph: {
    title: 'Rijles Pakketten | Quality Drive Rijschool',
    description: 'Bekijk onze rijles pakketten voor auto en motor.',
    type: 'website',
  },
};

export default function RijlesPakkettenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
