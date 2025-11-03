import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ pageNum: string }> }): Promise<Metadata> {
  const { pageNum } = await params;
  const currentPage = parseInt(pageNum, 10);

  return {
    title: `Blog - Pagina ${currentPage} | Quality Drive`,
    description: `Bekijk pagina ${currentPage} van onze blog met tips en guides over motorrijden en rijlessen.`,
  };
}

export default function BlogPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
