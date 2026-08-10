import type { MetadataRoute } from 'next'
import { staticRoutes } from '@/lib/routes'
import { publishedConditions } from '@/lib/conditions'
import { publishedServices } from '@/lib/services'
import { publishedPosts } from '@/lib/posts'
import { indexablePractitioners } from '@/lib/clinic'
import { SITE_URL } from '@/lib/schema'

/**
 * Draft pages are excluded by construction — `published*()` filters them — so an
 * unfinished page can never be submitted for indexing.
 *
 * ⚠️ `lastModified` IS ONLY EVER A REAL DATE, NEVER THE BUILD TIME.
 *
 * Every entry here except the blog used to stamp `new Date()`, which told Google that all
 * thirty-odd pages changed at the moment of the build — on every build, including one that
 * only touched a stylesheet. `lastmod` is a hint a crawler learns to distrust when it is
 * always "now", and the pages that most need it believed are the condition and service
 * pages this rebuild exists to rank.
 *
 * Where a real date exists, it is used: `lastReviewed` for conditions and services (the
 * date a practitioner actually checked the clinical copy), `datePublished` for posts. Where
 * no real date exists — the static routes and the practitioner profiles — the field is
 * OMITTED. An absent hint costs nothing; a false one costs the credibility of the rest.
 *
 * If you find yourself wanting `new Date()` here, add a real date to the source data
 * instead.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // /services/chiropractic-care is in BOTH staticRoutes (it has a hand-built route
  // file) and publishedServices (it is a service). Listing a URL twice in a sitemap is
  // invalid, so the last-write-wins dedupe below is load-bearing, not defensive.
  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...publishedConditions().map((c) => ({
      url: `${SITE_URL}/conditions/${c.slug}`,
      // The date the clinical copy was last reviewed by a practitioner. Real, and exactly
      // what lastmod is for — it moves when the content moves and not otherwise.
      ...(c.lastReviewed ? { lastModified: new Date(c.lastReviewed) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...publishedServices().map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      ...(s.lastReviewed ? { lastModified: new Date(s.lastReviewed) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...indexablePractitioners().map((p) => ({
      url: `${SITE_URL}/about/${p.slug}`,
      // No date on the source data, so no claim. Bios change rarely and the yearly
      // changeFrequency already says so.
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...publishedPosts().map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      // The original publish date, not the migration date — resetting these would tell
      // Google 14 old posts are brand new.
      lastModified: new Date(p.datePublished),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]

  // Keep the service entry (priority 0.7) over the generic static one (0.8): a service
  // page's priority should come from its own collection.
  const seen = new Map<string, MetadataRoute.Sitemap[number]>()
  for (const e of entries) seen.set(e.url, e)
  return [...seen.values()]
}
