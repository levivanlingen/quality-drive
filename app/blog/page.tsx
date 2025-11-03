/**
 * Blog Archive Page (Pagina 1)
 *
 * Overzichtspagina met alle blog posts van WordPress
 * Geïmporteerd van quality-drive.nl
 */

'use client';

import postsData from '@/data/posts.json';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BlogList from '@/app/components/BlogList';
import styles from '../page.module.css';

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

export default function BlogPage() {
  // Sorteer posts op datum (nieuwste eerst)
  const sortedPosts = [...posts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Bereken paginatie voor pagina 1
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const currentPosts = sortedPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div className={styles.page}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '8rem 1.5rem 4rem' }}>
        <BlogList
          posts={currentPosts}
          currentPage={1}
          totalPages={totalPages}
          totalPosts={sortedPosts.length}
        />
      </div>

      <Footer />
    </div>
  );
}
