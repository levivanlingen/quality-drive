/**
 * Blog Pagination Page
 *
 * Dynamische route voor gepagineerde blog posts
 * URL structuur: /blog/page/2, /blog/page/3, etc.
 */

import { notFound } from 'next/navigation';
import postsData from '@/data/posts.json';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogList from '@/app/components/BlogList';
import styles from '../../../page.module.css';

// Type definitie voor Post
interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  author: string;
  categories: string[];
  tags: string[];
  featuredImage: string | null;
  seo: {
    title: string;
    description: string;
    ogImage: string | null;
    keywords: string;
  };
  originalUrl: string;
}

const posts = postsData as Post[];
const POSTS_PER_PAGE = 10;

// Sorteer posts op datum (nieuwste eerst)
const sortedPosts = [...posts].sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

// Generate static params voor alle pagina's (2 t/m totalPages)
export async function generateStaticParams() {
  const pages = [];
  for (let i = 2; i <= totalPages; i++) {
    pages.push({ pageNum: i.toString() });
  }
  return pages;
}

interface PageProps {
  params: Promise<{ pageNum: string }>;
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { pageNum } = await params;
  const currentPage = parseInt(pageNum, 10);

  // Redirect naar /blog als iemand probeert naar pagina 1 te gaan
  if (currentPage === 1) {
    notFound();
  }

  // Check of de pagina bestaat
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  // Bereken welke posts te tonen
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.page}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 1.5rem 4rem' }}>
        <BlogList
          posts={currentPosts}
          currentPage={currentPage}
          totalPages={totalPages}
          totalPosts={sortedPosts.length}
        />
      </div>

      <Footer />
    </div>
  );
}
