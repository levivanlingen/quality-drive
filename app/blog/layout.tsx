import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Rijles Tips & Nieuws',
  description: 'Ontdek alles over motorrijden, rijlessen en rijbewijs halen. Praktische tips, guides en nieuws van Quality Drive Rijschool Den Haag.',
  keywords: ['rijlessen blog', 'motorrijden tips', 'rijbewijs halen', 'motortheorie', 'rijschool den haag'],
  openGraph: {
    title: 'Blog - Quality Drive Rijschool Den Haag',
    description: 'Ontdek alles over motorrijden, rijlessen en rijbewijs halen. Praktische tips en guides.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
