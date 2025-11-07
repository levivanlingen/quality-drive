'use client';

import Link from 'next/link';
import Image from 'next/image';
import imageMapping from '@/data/image-url-mapping.json';
import altTextMapping from '@/data/image-alt-mapping.json';

// Helper functie om WordPress image URLs te vervangen
function getImageUrl(wpUrl: string | null): string {
  if (!wpUrl) return '/quality-drive-logo.png';

  // Check of we een exacte match hebben in de mapping
  if (imageMapping[wpUrl as keyof typeof imageMapping]) {
    return imageMapping[wpUrl as keyof typeof imageMapping];
  }

  // Fallback: extraheer alleen de bestandsnaam uit de URL
  const filename = wpUrl.split('/').pop();
  return `/uploads/${filename}`;
}

// Helper functie om alt text te krijgen
function getImageAlt(wpUrl: string | null, fallbackTitle: string): string {
  if (!wpUrl) return fallbackTitle;

  // Check of we alt text hebben voor deze URL
  if (altTextMapping[wpUrl as keyof typeof altTextMapping]) {
    return altTextMapping[wpUrl as keyof typeof altTextMapping];
  }

  // Fallback naar post title
  return fallbackTitle;
}

// Helper functie om HTML te strippen voor excerpt
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\[&hellip;\]/g, '...').substring(0, 180) + '...';
}

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

interface BlogListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export default function BlogList({ posts, currentPage, totalPages, totalPosts }: BlogListProps) {
  return (
    <>
      {/* Header */}
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
          Quality Drive Blog
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '1rem' }}>
          Tips, guides en nieuws over motorrijden en rijlessen
        </p>
        <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
          {totalPosts} artikelen over rijlessen, motorrijden en verkeersveiligheid
        </div>
      </header>

      {/* Blog Posts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.2s',
              cursor: 'pointer',
              background: 'white',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {/* Featured Image */}
              <div style={{ position: 'relative', width: '100%', height: '220px', background: '#f3f4f6' }}>
                {post.featuredImage ? (
                  <Image
                    src={getImageUrl(post.featuredImage)}
                    alt={getImageAlt(post.featuredImage, post.title)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: 'white',
                    fontSize: '3rem',
                  }}>
                    🚗
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Category Badge */}
                {post.categories.length > 0 && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#3b82f6',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {post.categories[0]}
                  </div>
                )}

                {/* Title */}
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                  color: '#1f2937',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p style={{
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.6',
                  fontSize: '0.9375rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {stripHtml(post.excerpt)}
                </p>

                {/* Meta Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f3f4f6',
                }}>
                  <div style={{ fontSize: '0.8125rem', color: '#9ca3af' }} suppressHydrationWarning>
                    {new Date(post.date).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    color: '#3b82f6',
                    fontWeight: '600',
                  }}>
                    Lees meer →
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Paginatie Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {/* Previous Button */}
        {currentPage > 1 && (
          <Link
            href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s',
            }}
          >
            ← Vorige
          </Link>
        )}
        {currentPage === 1 && (
          <span style={{
            padding: '0.75rem 1.5rem',
            background: '#e5e7eb',
            color: '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'not-allowed',
          }}>
            ← Vorige
          </span>
        )}

        {/* Page Numbers */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isCurrentPage = currentPage === pageNum;
            const href = pageNum === 1 ? '/blog' : `/blog/page/${pageNum}`;

            if (isCurrentPage) {
              return (
                <span
                  key={pageNum}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    minWidth: '45px',
                    textAlign: 'center',
                  }}
                >
                  {pageNum}
                </span>
              );
            }

            return (
              <Link
                key={pageNum}
                href={href}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'white',
                  color: '#4b5563',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontWeight: '600',
                  minWidth: '45px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.2s',
                }}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages && (
          <Link
            href={`/blog/page/${currentPage + 1}`}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s',
            }}
          >
            Volgende →
          </Link>
        )}
        {currentPage === totalPages && (
          <span style={{
            padding: '0.75rem 1.5rem',
            background: '#e5e7eb',
            color: '#9ca3af',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'not-allowed',
          }}>
            Volgende →
          </span>
        )}
      </div>

      {/* Pagina Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        color: '#6b7280',
        fontSize: '0.9375rem',
      }}>
        Pagina {currentPage} van {totalPages} ({totalPosts} artikelen totaal)
      </div>

      {/* CTA Section */}
      <div style={{
        marginTop: '2rem',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderRadius: '16px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h3 style={{ fontSize: '1.875rem', marginBottom: '1rem', fontWeight: '700' }}>
          Klaar om te starten met rijlessen?
        </h3>
        <p style={{ marginBottom: '2rem', opacity: 0.9, fontSize: '1.125rem' }}>
          Plan vandaag nog je gratis proefles bij Quality Drive in Den Haag
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/#contact"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#3b82f6',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1rem',
            }}
          >
            Gratis Proefles Inplannen
          </Link>
          <Link
            href="/motorrijles"
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              border: '2px solid white',
            }}
          >
            Bekijk Onze Lessen
          </Link>
        </div>
      </div>
    </>
  );
}
