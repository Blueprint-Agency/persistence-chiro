/**
 * Every static route on the site. Deliberately dependency-free so both the sitemap and
 * the redirect tests can import it without pulling in the nav tree.
 * Dynamic routes (/conditions/[slug] etc.) append themselves in app/sitemap.ts.
 *
 * Structure follows `seo-proposal.html` — seven main pages plus a /services namespace.
 * /conditions is an eighth hub the proposal does not count separately; it is kept because
 * eight condition pages need a parent for the internal-linking model the proposal itself
 * describes (service <-> problem cross-linking).
 */
export const staticRoutes = [
  '/',
  '/services',
  '/services/chiropractic-care',
  '/conditions',
  '/what-to-expect',
  // English-only: not in STATIC_LOCALIZED_PATHS, so `pathExistsIn` keeps it out of the
  // zh/ms sitemap and out of the language switcher. See the note in its route file.
  '/female-chiropractor',
  '/about',
  '/press',
  '/blog',
  '/locate-us',
  '/partner-with-us',
]
