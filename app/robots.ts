import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/schema'
import { isStagingDeployment } from '@/lib/deployment'

/**
 * The staging domain must not be crawlable.
 *
 * `*.vercel.app` was serving the whole site with `Allow: /` and no noindex, which is two
 * problems at once. The smaller one is that it carries placeholder reviews. The larger one
 * is duplicate content: a second complete copy of every page competing with the domain this
 * rebuild exists to rank, on a project already fighting from DA 6.
 *
 * Attaching persistencechiropractic.com flips this back to `Allow: /` on its own — the
 * check reads the domain Vercel will serve, not a flag.
 */
export default function robots(): MetadataRoute.Robots {
  if (isStagingDeployment) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
