/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*', '/api/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      // Als je later blog posts toevoegt:
      // `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-blog.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform functie voor prioriteit en changefreq
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/rijschool/') || path.includes('/taxi-rijles/')) {
      // Stad pagina's zijn cruciaal voor local SEO
      priority = 0.95;
      changefreq = 'weekly';
    } else if (path.includes('/autorijles') || path.includes('/rijopleidingen')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/pakketten') || path.includes('/theorie')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/blog/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
