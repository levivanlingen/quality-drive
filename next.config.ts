import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuratie
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Als je WordPress media moet importeren van externe URL:
      // {
      //   protocol: 'https',
      //   hostname: 'jouw-wordpress-site.nl',
      //   port: '',
      //   pathname: '/wp-content/uploads/**',
      // },
    ],
  },

  // 301 Redirects voor WordPress URLs -> Next.js URLs
  async redirects() {
    return [
      // Voorbeeld WordPress redirects - pas deze aan op basis van je WordPress URL structuur

      // WordPress blog post redirects (als je WordPress posts had op /2024/01/post-title/)
      // {
      //   source: '/:year(\\d{4})/:month(\\d{2})/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true, // 301 redirect
      // },

      // WordPress page redirects
      // {
      //   source: '/over-ons',
      //   destination: '/over-ons',
      //   permanent: true,
      // },

      // WordPress categorie/tag redirects
      // {
      //   source: '/category/:slug',
      //   destination: '/blog/categorie/:slug',
      //   permanent: true,
      // },

      // WordPress author redirects
      // {
      //   source: '/author/:slug',
      //   destination: '/blog',
      //   permanent: true,
      // },

      // WordPress feed redirects
      {
        source: '/feed',
        destination: '/api/rss.xml',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/api/rss.xml',
        permanent: true,
      },

      // WordPress wp-admin redirects (blokkeren)
      {
        source: '/wp-admin/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/404',
        permanent: true,
      },
    ];
  },

  // Headers voor SEO en performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // Cache headers voor 3D modellen
      {
        source: '/source/:path*.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        source: '/source motor/:path*.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ];
  },

  // Compiler optimalisaties
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimalisaties
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Optimize for production
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons', '@react-three/fiber', '@react-three/drei'],
  },

  // Turbopack configuration (Next.js 16+)
  turbopack: {},

  // Webpack optimizations (fallback for webpack mode)
  webpack: (config, { isServer }) => {
    // Optimize three.js bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': 'three/build/three.module.js',
      };
    }

    return config;
  },
};

export default nextConfig;
