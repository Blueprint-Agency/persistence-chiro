/**
 * Legacy Wix URL -> new URL. Single source of truth for the redirect map.
 *
 * Every legacy URL that was in the Wix sitemap must appear here. A 404 on any of
 * them throws away crawl history and whatever equity the 40 referring domains carry.
 *
 * These emit a literal **301**, set via `statusCode`.
 *
 * Next's `permanent: true` shorthand would emit 308 instead. Google consolidates signals
 * identically for both, so 308 would not have cost ranking — but 301 is what the redirect
 * map promises the client, what an auditor checking response headers expects to see, and
 * what older directory crawlers and link checkers reliably understand.
 *
 * Next accepts `statusCode` or `permanent`, never both on the same rule.
 *
 * ⚠️ These only apply on a Node/edge host. `redirects()` is unsupported under
 * `output: 'export'` — if the site ever moves to a pure static export, this list has to be
 * regenerated as host-level rules (`vercel.json`, Netlify `_redirects`, nginx). That is
 * why the data lives here as plain objects rather than inline in next.config.ts.
 */

export type Redirect = { source: string; destination: string; statusCode: 301 }

/** Blog posts keep their slug byte-identical; only the prefix changes. */
export const LEGACY_POST_SLUGS = [
  'a-deeper-understanding-of-scoliosis',
  'chiropractic-care-through-the-stages-of-a-woman-s-life',
  'chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries',
  'spike-higher-play-longer',
  'blog-boost-your-bone-health-webinar',
  'derek-s-journey-with-gonstead-chiropractic-care',
  'three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community',
  'less-pain-more-gain-with-regular-chiropractic-care',
  'sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep',
  'chiropractic-care-charity-talk-for-ti-ratana-welfare',
  'what-to-expect-when-going-to-the-chiropractor-for-the-first-time',
  'are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say',
  'health-benefits-of-ergonomic-chairs',
  'chiropractic-care-a-fresh-perspective-on-migraine-relief',
] as const

const PAGE_REDIRECTS: Redirect[] = [
  { source: '/our-services', destination: '/conditions', statusCode: 301 },
  { source: '/press-and-publications', destination: '/press', statusCode: 301 },
  { source: '/going-places-magazine-september-feature', destination: '/press', statusCode: 301 },
  // NOT in the Wix sitemap — found only by following a "Read More" link off
  // /press-and-publications. current-url-structure.md is therefore incomplete; there may
  // be more orphaned pages that the sitemap never listed. Worth a crawl before launch.
  {
    source: '/big-pharmacy-less-pain-more-gain-with-regular-chiropractic',
    destination: '/press',
    statusCode: 301,
  },
  { source: '/our-partners', destination: '/about-us#partners', statusCode: 301 },
  { source: '/book-now', destination: '/contact-us', statusCode: 301 },
  { source: '/landingpage', destination: '/', statusCode: 301 },
]

/**
 * Posts held back from republication. Their legacy URLs must NOT fall through to the
 * wildcard — /blog/<slug> doesn't exist for them, so the wildcard would 301 a crawler
 * into a 404. Send them to the blog index instead, which is a real page on the same topic.
 *
 * Order matters: Next applies the first matching rule, so these must precede the wildcard.
 * Keep in sync with `draft: true` entries in lib/posts.ts — content.test.ts enforces it.
 */
export const HELD_POST_SLUGS = [
  'blog-boost-your-bone-health-webinar',
  'health-benefits-of-ergonomic-chairs',
] as const

const HELD_POST_REDIRECTS: Redirect[] = HELD_POST_SLUGS.map((slug) => ({
  source: `/post/${slug}`,
  destination: '/blog',
  statusCode: 301,
}))

// ponytail: one wildcard rule instead of 12 rows. Slugs are preserved byte-identical,
// so :slug passes straight through. Keep LEGACY_POST_SLUGS for the redirect-map
// deliverable and the tests — Next never needs the explicit list.
const POST_REDIRECT: Redirect = {
  source: '/post/:slug',
  destination: '/blog/:slug',
  statusCode: 301,
}

export const redirects: Redirect[] = [...PAGE_REDIRECTS, ...HELD_POST_REDIRECTS, POST_REDIRECT]

/** Legacy URLs that must resolve, for the check script. */
export const allLegacyUrls = (): string[] => [
  ...PAGE_REDIRECTS.map((r) => r.source),
  ...LEGACY_POST_SLUGS.map((s) => `/post/${s}`),
]
