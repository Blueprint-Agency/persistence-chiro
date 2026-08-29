/**
 * Site navigation. Derived from the content modules so a draft page can never leak into
 * the nav — and so the nav and the sitemap can't disagree about what exists.
 */
import { clinic } from './clinic'
import { publishedConditionsFor } from './conditions'
import { publishedServicesFor } from './services'
import { type Locale, pathFor } from './i18n'
import type { Dictionary } from '../dictionaries/types'

export type NavItem = {
  href: string
  label: string
  children?: NavItem[]
  /** Off-site. Renders as a plain <a> with target/rel rather than a client-routed <Link>. */
  external?: boolean
  /**
   * Small marker after the label, e.g. "(Coming Soon)". Rendered verbatim, parentheses and
   * all, so what is written here is exactly what appears. Submenu rows only — a top-level
   * item has no room for one.
   *
   * It sits inside the link, so it is part of the accessible name and a screen reader reads
   * "Integrative Dry Needling (Coming Soon)" as one destination rather than announcing a
   * decoration separately.
   */
  badge?: string
}

export const mainNav = (locale: Locale, dict: Dictionary): NavItem[] => [
  {
    href: pathFor(locale, '/services'),
    label: dict.nav.services,
    children: publishedServicesFor(locale).map((s) => ({
      href: pathFor(locale, `/services/${s.slug}`),
      label: s.title.split(' in ')[0],
      badge: s.navBadge,
    })),
  },
  {
    href: pathFor(locale, '/conditions'),
    label: dict.nav.conditions,
    children: publishedConditionsFor(locale).map((c) => ({
      href: pathFor(locale, `/conditions/${c.slug}`),
      label: c.title.split(' in ')[0],
    })),
  },
  { href: pathFor(locale, '/what-to-expect'), label: dict.nav.whatToExpect },
  {
    // /press was reachable only from the sitemap — orphaned from the nav entirely. It
    // groups here rather than taking a top-level slot: both answer "who are these people".
    // Practitioners are deliberately not listed here. Their pages are reached by clicking
    // a card on /about, where the photo and role give the name context a bare dropdown
    // row cannot. Listing them twice made the menu long without making anything findable.
    href: pathFor(locale, '/about'),
    label: dict.nav.about,
    children: [
      { href: pathFor(locale, '/about'), label: dict.nav.ourTeam },
      { href: pathFor(locale, '/press'), label: dict.nav.press },
      { href: pathFor(locale, '/partner-with-us'), label: dict.nav.partnerWithUs },
    ],
  },
  // Blog stays English-only and unprefixed regardless of locale — it lives outside the
  // `[locale]` tree entirely (see proxy.ts).
  { href: '/blog', label: dict.nav.blog },
  /**
   * Points off-site to SweetPew, at the client's request (2026-08-01). It used to go to
   * /book-now.
   *
   * ⚠️ /book-now is still a real, indexed page and still in the sitemap — it carries the
   * NAP, the map and the directions, and the Wix version of it ranked #13 for "chiro
   * cheras" (see the note in redirects.ts). Losing its nav link drops it to ONE internal
   * link sitewide, the "Directions & contact" button on the homepage. That is thin for a
   * page with history. If it starts slipping, the fix is a second internal link from
   * /what-to-expect or the footer, not reverting this.
   */
  { href: clinic.bookingUrl, label: dict.nav.bookNow, external: true },
]
