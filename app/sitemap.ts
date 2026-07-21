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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // /services/chiropractic-treatment is in BOTH staticRoutes (it has a hand-built route
  // file) and publishedServices (it is a service). Listing a URL twice in a sitemap is
  // invalid, so the last-write-wins dedupe below is load-bearing, not defensive.
  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
    })),
    ...publishedConditions().map((c) => ({
      url: `${SITE_URL}/conditions/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...publishedServices().map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...indexablePractitioners().map((p) => ({
      url: `${SITE_URL}/about/${p.slug}`,
      lastModified: now,
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
