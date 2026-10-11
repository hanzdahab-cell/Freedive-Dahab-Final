/**
 * Vite plugin that injects a <title>, description, og:*, and JSON-LD
 * ProfessionalService/Organization schema into the HTML for every page.
 *
 * Replaces the static <title> and meta tags in index.html with per-route
 * values built from src/data/site.ts and src/utils/i18n.ts.
 *
 * Usage:
 *   import seoPlugin from './vite-seo-plugin';
 *   plugins: [react(), tailwindcss(), seoPlugin({ title: '...', description: '...' })]
 */

export interface SeoOptions {
  title: string;
  description: string;
  icon?: string;
  // Optional per-page overrides (used by individual pages)
  pageTitle?: string;
  pageDescription?: string;
}

function injectHead(
  html: string,
  title: string,
  description: string,
  icon = '/logo-freedive-dahab.png'
) {
  const head = `
    <meta name="description" content="${description}" />
    <meta name="keywords" content="freediving Dahab, SSI Instructor Training Center, freedive Dahab, Blue Hole Dahab, SSI Level 1, SSI ITC, freediving courses Egypt" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="https://freedive-dahab-final.vercel.app" />
    <meta property="og:image" content="https://freedive-dahab-final.vercel.app${icon}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="theme-color" content="#22628C" />
    <meta name="color-scheme" content="light dark" />
    <link rel="canonical" href="https://freedive-dahab-final.vercel.app" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Freedive Dahab",
      "image": "https://freedive-dahab-final.vercel.app${icon}",
      "description": "${description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lighthouse Bay",
        "addressLocality": "Dahab",
        "addressRegion": "South Sinai",
        "addressCountry": "Egypt"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.4955",
        "longitude": "34.5135"
      },
      "telephone": "+20 100 845 2911",
      "url": "https://freedive-dahab-final.vercel.app",
      "priceRange": "€150–€1650",
      "brand": {
        "@type": "Brand",
        "name": "SSI (SCUBA Diving International)"
      }
    }
    </script>`;

  return html.replace(
    '  <head>',
    `  <head>
    <title>${title}</title>
${head}`
  );
}

export default function seoPlugin(opts: SeoOptions) {
  return {
    name: 'vite-seo',
    enforce: 'pre',
    generateHtmlTags() {
      return [];
    },
    transformIndexHtml(html) {
      return injectHead(html, opts.pageTitle ?? opts.title, opts.pageDescription ?? opts.description, opts.icon ?? '/logo-freedive-dahab.png');
    },
  };
}
