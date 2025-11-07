import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rijopleidingen | Quality Drive Rijschool',
  description: 'Bekijk onze rijopleidingen in Den Haag en omgeving. Van autorijles en motorrijles tot gespecialiseerde opleidingen voor faalangst, ADD en ADHD. Voor welke rijopleiding ga jij?',
  keywords: 'rijopleidingen, autorijles, motorrijles, automaat rijles, taxi rijles, faalangst rijles, ADD rijles, ADHD rijles, Den Haag, Zoetermeer, Delft, Rijswijk',
  openGraph: {
    title: 'Rijopleidingen | Quality Drive Rijschool',
    description: 'Bekijk onze rijopleidingen in Den Haag en omgeving. Van autorijles en motorrijles tot gespecialiseerde opleidingen.',
    type: 'website',
  },
};

export default function RijopleidingenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
