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
import { type Locale, LOCALE_TAG, OG_LOCALE, DEFAULT_LOCALE, pathFor } from './i18n'

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
  /**
   * Root-relative, UNPREFIXED (`/conditions/back-pain`, never `/zh/conditions/back-pain`).
   * The helper applies the locale prefix itself via `pathFor()` — pass the bare path here.
   */
  path: string
  /** The locale this exact call is building metadata for. */
  locale: Locale
  /**
   * Every locale this exact page (same slug/path) exists in — drives `alternates.languages`
   * (hreflang). Always include `locale` itself. Omit a locale whose version of this page
   * doesn't exist yet (still `draft`, or absent from that locale's data file) — an
   * alternate pointing at a URL that 404s is worse than no alternate at all.
   */
  availableIn: readonly Locale[]
  /** Overrides the default social card. Give width/height or the crop is left to the scraper. */
  image?: { url: string; width?: number; height?: number; alt: string }
  /** 'article' on blog posts, so they render as articles rather than generic pages. */
  type?: 'website' | 'article'
  /** ISO date — only meaningful alongside type: 'article'. */
  publishedTime?: string
  /** Reachable but not submitted for indexing. Used for pages still awaiting real copy. */
  noindex?: boolean
  /**
   * Set `false` to omit the ` | Persistence Chiropractic` suffix.
   *
   * ONE CONSUMER: /blog/[slug]. Every other route should keep the brand — on a money page
   * the suffix is worth its 25 characters, because a searcher scanning a local SERP is
   * partly choosing between clinics by name.
   *
   * Blog posts are the exception because their titles are real editorial headlines rather
   * than composed SEO strings, so the suffix pushes them past what Google renders and the
   * brand is what gets cut anyway. Eleven of the thirteen posts exceeded 60 characters
   * before this existed; "Making a Difference in the Community: Chiropractic Care & Charity
   * Talk for Ti-Ratana Welfare" reached 123 and was truncated mid-phrase.
   *
   * Do NOT reach for this to fix a long title on a hub or money page. There the right fix
   * is a shorter title — the suffix is not the problem.
   */
  brand?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  locale,
  availableIn,
  image = OG_IMAGE,
  type = 'website',
  publishedTime,
  noindex,
  brand = true,
}: PageMetadataInput): Metadata {
  const fullTitle = brand ? `${title} | ${BRAND}` : title

  // One entry per locale this page actually exists in, keyed by the BCP-47 tag hreflang
  // expects. `x-default` always points at English — the site's unprefixed, canonical
  // identity — regardless of which locale is rendering.
  const languages: Record<string, string> = {}
  for (const loc of availableIn) languages[LOCALE_TAG[loc]] = pathFor(loc, path)
  languages['x-default'] = pathFor(DEFAULT_LOCALE, path)

  return {
    // `absolute` rather than leaning on the root layout's title template, because the
    // template does NOT apply to app/page.tsx — that file shares the root segment, so the
    // homepage would silently be the one page without a brand suffix. Appending here makes
    // every route behave the same way and keeps og:title in step with <title>.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: pathFor(locale, path), languages },
    openGraph: {
      type,
      locale: OG_LOCALE[locale],
      siteName: 'Persistence Chiropractic Care',
      url: pathFor(locale, path),
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
