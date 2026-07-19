import type { MetadataRoute } from 'next'
import { staticRoutes } from '@/lib/routes'
import { publishedConditions } from '@/lib/conditions'
import { publishedModalities } from '@/lib/physiotherapy'
import { publishedPosts } from '@/lib/posts'
import { indexablePractitioners } from '@/lib/clinic'
import { SITE_URL } from '@/lib/schema'

/**
 * Draft pages are excluded by construction — `published*()` filters them — so an
 * unfinished page can never be submitted for indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
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
    ...publishedModalities().map((m) => ({
      url: `${SITE_URL}/physiotherapy/${m.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...indexablePractitioners().map((p) => ({
      url: `${SITE_URL}/about-us/${p.slug}`,
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
}
