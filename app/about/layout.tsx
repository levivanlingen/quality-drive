import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Ons | Quality Drive Rijschool',
  description: 'Leer meer over Quality Drive Rijschool in Den Haag. Onze missie, visie en het team van ervaren rijinstructeurs dat je helpt je rijbewijs te halen.',
  openGraph: {
    title: 'Over Ons | Quality Drive Rijschool',
    description: 'Leer meer over Quality Drive Rijschool in Den Haag. Onze missie, visie en het team van ervaren rijinstructeurs.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
