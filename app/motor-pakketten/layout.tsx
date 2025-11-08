import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motor pakketten | Quality Drive Rijschool',
  description: 'Bekijk onze motor rijles pakketten. Snel slagen, geen wachtrij en de goedkoopste in de regio. 100% geslaagd bij Quality Drive.',
  keywords: 'motor pakketten, motorrijles, rijlessen motor, Den Haag, Zoetermeer, Delft, Rijswijk',
  openGraph: {
    title: 'Motor pakketten | Quality Drive Rijschool',
    description: 'Bekijk onze motor rijles pakketten. 100% geslaagd bij Quality Drive.',
    type: 'website',
  },
};

export default function MotorPakkettenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
