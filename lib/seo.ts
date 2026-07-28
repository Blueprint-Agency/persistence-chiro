/**
 * One builder for every route's `metadata` export.
 *
 * It exists because Next.js merges `openGraph` and `twitter` SHALLOWLY: a page that sets
 * its own `openGraph` to get a per-page og:url replaces the root layout's object outright
 * and silently loses og:site_name, og:locale, og:type and the default og:image. Before this
 * helper, /conditions/* and /services/* emitted three OG tags each while /about emitted six
 * — and every page that *didn't* set openGraph inherited the root's `url: "/"`, so the whole
 * site reported the homepage as its canonical social URL.
 *
 * Route files should not hand-write `openGraph` blocks. Call `pageMetadata()`.
 */

import type { Metadata } from 'next'

/**
 * Sitewide social card. 1200x630 is the size Facebook, WhatsApp and LinkedIn all crop to;
 * anything squarer gets letterboxed. JPEG rather than WebP because WhatsApp's link-preview
 * fetcher is still unreliable with WebP, and WhatsApp is a primary conversion path here.
 *
 * Source: public/img/clinic-exterior.webp, top-cropped so the shopfront sign stays legible
 * at thumbnail size — the sign is the strongest brand and local-recognition asset we have.
 */
export const OG_IMAGE = {
  url: '/og-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Shopfront of Persistence Chiropractic Care at Signature 2, Sunway Velocity, Cheras, Kuala Lumpur',
} as const

/** Appended to every <title> and og:title. The one place the brand suffix is spelled. */
const BRAND = 'Persistence Chiropractic'

type PageMetadataInput = {
  /**
   * <title> WITHOUT the brand — the helper appends it. Aim for ~45 characters so the
   * finished title stays inside the ~60 Google renders before truncating.
   */
  title: string
  description: string
  /** Root-relative, no trailing slash. Drives both the canonical and og:url. */
  path: string
  /** Overrides the default social card. Give width/height or the crop is left to the scraper. */
  image?: { url: string; width?: number; height?: number; alt: string }
  /** 'article' on blog posts, so they render as articles rather than generic pages. */
  type?: 'website' | 'article'
  /** ISO date — only meaningful alongside type: 'article'. */
  publishedTime?: string
  /** Reachable but not submitted for indexing. Used for pages still awaiting real copy. */
  noindex?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = 'website',
  publishedTime,
  noindex,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${BRAND}`

  return {
    // `absolute` rather than leaning on the root layout's title template, because the
    // template does NOT apply to app/page.tsx — that file shares the root segment, so the
    // homepage would silently be the one page without a brand suffix. Appending here makes
    // every route behave the same way and keeps og:title in step with <title>.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'en_MY',
      siteName: 'Persistence Chiropractic Care',
      url: path,
      title: fullTitle,
      description,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      // 'summary' (the default) renders a 120px thumbnail and wastes a 1200x630 image.
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
