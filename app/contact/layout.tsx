import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Quality Drive Rijschool',
  description: 'Neem contact op met Quality Drive Rijschool in Den Haag. Bel ons op +31 6 20817325 of stuur een bericht voor vragen over auto, automaat of motorrijlessen.',
  openGraph: {
    title: 'Contact | Quality Drive Rijschool',
    description: 'Neem contact op met Quality Drive Rijschool in Den Haag. Bel ons of stuur een bericht voor vragen over rijlessen.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
