/**
 * Every static route on the site. Deliberately dependency-free so both the sitemap and
 * the redirect tests can import it without pulling in the nav tree.
 * Dynamic routes (/conditions/[slug] etc.) append themselves in app/sitemap.ts.
 */
export const staticRoutes = [
  '/',
  '/conditions',
  '/chiropractic',
  '/physiotherapy',
  '/what-to-expect',
  '/about-us',
  '/press',
  '/contact-us',
  '/blog',
]
