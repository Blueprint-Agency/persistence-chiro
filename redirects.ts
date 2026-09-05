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
  { source: '/our-services', destination: '/services', statusCode: 301 },
  /**
   * The team page. In the live Wix `pages-sitemap.xml` and returning 200 today, so it is
   * indexed and carries whatever the clinic's referring domains point at — it is the
   * strongest E-E-A-T page on the old site.
   *
   * MISSING UNTIL 2026-08-10, when the legacy sitemap was reconciled against this file
   * during an SEO audit. Nothing caught it because the coverage test below did not exist:
   * the blog side was fully guarded by the `/post/:slug` wildcard tests while the page side
   * was a hand-maintained list with no assertion that it was complete.
   */
  { source: '/about-us', destination: '/about', statusCode: 301 },
  /**
   * ⚠️ AN EARLIER NOTE IN THIS FILE CLAIMED /contact-us "never launched publicly, so no
   * redirect is owed to it". THAT WAS WRONG. It is in the live Wix `pages-sitemap.xml` and
   * returns 200, so it is public, crawlable and indexed. Do not remove this rule on the
   * strength of that assumption returning.
   *
   * The Locate Us page is the right destination rather than /: it absorbed the NAP, map, hours
   * and booking content /contact-us held, so the intent is preserved rather than diluted.
   *
   * Repointed from /book-now to /locate-us on 2026-09-06 when that page was renamed. It must
   * name the FINAL path: chaining /contact-us -> /book-now -> /locate-us would still resolve,
   * and is exactly how a redirect map decays into hops nobody dares delete.
   */
  { source: '/contact-us', destination: '/locate-us', statusCode: 301 },
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
  { source: '/our-partners', destination: '/partner-with-us', statusCode: 301 },
  { source: '/landingpage', destination: '/', statusCode: 301 },
  /**
   * NOT a Wix legacy URL — a URL this rebuild published and then renamed, 2026-08-01, when
   * the client banned "treatment" from the site (see the non-negotiable in AGENTS.md).
   *
   * It is the only page whose *address* carried the word. Renaming a live, indexed page is
   * not free: /services/chiropractic-treatment is the destination of internal links from the
   * homepage, /conditions, /what-to-expect and five condition pages, and it is the service
   * page with the most equity pointed at it. All of those links were repointed at the new
   * URL in the same change, so nothing on the site relies on this rule — it exists for
   * Google's index, external links and anyone's bookmark, and it needs to stay indefinitely.
   */
  {
    source: '/services/chiropractic-treatment',
    destination: '/services/chiropractic-care',
    statusCode: 301,
  },
  /**
   * Renamed 2026-09-06. The path said "book" while the page showed the address, hours, map and
   * the three photo walkthroughs, and the nav item above it had already been relabelled "Locate
   * Us" — so the URL was the last thing still claiming the page did something it does not.
   *
   * THIS REVERSES A DECISION MADE THE DAY BEFORE, and the reason is that its evidence had
   * expired. That note said the Wix /book-now ranked #13 for "chiro cheras" and renaming would
   * throw the ranking away. GSC over the 90 days to 2026-09-05 says the page sits at position
   * 15.5 for that query on 35 impressions and ZERO clicks, while the homepage holds 4.4 and
   * takes the clicks. All six clicks this URL earned in 90 days were brand queries at position
   * 1.8, and brand queries follow a 301 without difficulty.
   *
   * `/locate-us` rather than the keyword-loaded slug that was also considered: the homepage is
   * this site's Cheras page, and a second URL carrying "cheras" in its path invites exactly the
   * cannibalisation the architecture forbids. This page already competes weakly with the
   * homepage on that query; there was no reason to arm it further.
   */
  { source: '/book-now', destination: '/locate-us', statusCode: 301 },
]

/**
 * `/book-now` IS redirected again, as of 2026-09-06. See the rule above for the evidence.
 *
 * History, because this path has now flipped three times and the next session deserves the
 * whole arc: the earlier Wix architecture 301'd /book-now to /contact-us; the rebuild restored
 * it as a real page to keep the equity behind its "chiro cheras" ranking; and it is now a
 * redirect once more, because that ranking turned out to be position 15.5 with no clicks. The
 * page itself did not go anywhere. It lives at /locate-us with the same content, and
 * /contact-us points straight there rather than through here.
 */

/**
 * Every page URL the live Wix site publishes, taken verbatim from its `pages-sitemap.xml`
 * on 2026-08-10 and each one confirmed to return 200.
 *
 * This exists so `content.test.ts` can assert the redirect map is COMPLETE, not merely
 * well-formed. Two URLs (/about-us, /contact-us) were missing for the whole life of the
 * rebuild because every existing test checked redirect *shape* — that each rule is a 301
 * pointing at a real route — and none checked that every legacy URL had a rule at all.
 *
 * A URL belongs here if Wix serves it. It is satisfied either by a redirect rule or by the
 * rebuild publishing the same path (/, /blog, /book-now, /what-to-expect all do).
 *
 * ⚠️ NOT the blog posts. Those are `LEGACY_POST_SLUGS`, covered by the /post/:slug wildcard
 * and its own tests. Keep the two lists separate; they are guarded differently.
 */
export const LEGACY_PAGE_URLS = [
  '/',
  '/about-us',
  '/blog',
  '/book-now',
  '/contact-us',
  '/going-places-magazine-september-feature',
  '/landingpage',
  '/our-partners',
  '/our-services',
  '/press-and-publications',
  '/what-to-expect',
] as const

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
