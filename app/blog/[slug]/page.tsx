/**
 * Blog Post Detail Page
 *
 * Dynamische route voor individuele blog posts van WordPress
 * Met volledige SEO optimalisatie en Schema.org
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import postsData from '@/data/posts.json';
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

// Helper functie om content URLs te vervangen
function replaceContentUrls(content: string): string {
  let updatedContent = content;

  // Vervang alle WordPress image URLs met de gemapte lokale URLs
  Object.entries(imageMapping).forEach(([wpUrl, localUrl]) => {
    updatedContent = updatedContent.replace(new RegExp(wpUrl, 'g'), localUrl);
  });

  // Vervang overige WordPress URLs
  updatedContent = updatedContent.replace(/https:\/\/quality-drive\.nl\//g, '/');

  return updatedContent;
}

// Type definitie
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

const blogPosts = postsData as Post[];

// Generate static params voor alle blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata voor elke blog post
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post niet gevonden',
    };
  }

  const ogImage = post.seo.ogImage ? getImageUrl(post.seo.ogImage) : '/quality-drive-logo.png';

  return {
    title: post.seo.title || post.title,
    description: post.seo.description,
    keywords: post.seo.keywords ? post.seo.keywords.split(',') : post.tags,
    authors: [{ name: post.author || 'Quality Drive' }],
    openGraph: {
      title: post.seo.title || post.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author || 'Quality Drive'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title || post.title,
      description: post.seo.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seo.description || post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    "image": post.featuredImage ? `https://quality-drive.nl${getImageUrl(post.featuredImage)}` : "https://quality-drive.nl/quality-drive-logo.png",
    "datePublished": post.date,
    "dateModified": post.modified,
    "author": {
      "@type": "Organization",
      "name": post.author || "Quality Drive Rijschool",
      "url": "https://quality-drive.nl"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quality Drive Rijschool",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quality-drive.nl/quality-drive-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://quality-drive.nl/blog/${post.slug}`
    },
    "articleSection": post.categories.join(', '),
    "keywords": post.tags.join(', ')
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Breadcrumbs */}
        <nav style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
          {' '}/{' '}
          <Link href="/blog" style={{ color: '#3b82f6', textDecoration: 'none' }}>Blog</Link>
          {' '}/{' '}
          <span style={{ color: '#6b7280' }}>{post.title}</span>
        </nav>

        {/* Post Header */}
        <header style={{ marginBottom: '3rem' }}>
          {post.categories.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                background: '#eff6ff',
                color: '#3b82f6',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}>
                {post.categories[0]}
              </span>
            </div>
          )}

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: '0.875rem',
          }}>
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            marginBottom: '3rem',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <Image
              src={getImageUrl(post.featuredImage)}
              alt={getImageAlt(post.featuredImage, post.title)}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="blog-content"
          style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: '#374151',
          }}
          dangerouslySetInnerHTML={{ __html: replaceContentUrls(post.content) }}
        />

        {/* Tags */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e5e7eb',
        }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6b7280' }}>
            Tags:
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: '#f3f4f6',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  color: '#4b5563',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Klaar om te starten met rijlessen?
          </h3>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            Plan vandaag nog je gratis proefles bij Quality Drive!
          </p>
          <Link
            href="/#contact"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#3b82f6',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            Gratis Proefles Inplannen
          </Link>
        </div>

        {/* Back to Blog */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            ← Terug naar Blog
          </Link>
        </div>
      </article>
    </>
  );
}
