/**
 * Site navigation. Derived from the content modules so a draft page can never leak into
 * the nav — and so the nav and the sitemap can't disagree about what exists.
 */
import { clinic } from './clinic'
import { publishedConditionsFor } from './conditions'
import { publishedServicesFor } from './services'
import { type Locale, pathFor, shortTitle } from './i18n'
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
      // NOT `s.title.split(' in ')[0]` — that only works for English's "X in Cheras,
      // Kuala Lumpur" title shape. zh titles are locality-FIRST ("Cheras, Kuala Lumpur X"),
      // so splitting on " in " found nothing and returned the whole string unchanged,
      // showing "Cheras, Kuala Lumpur 腰酸背痛护理" instead of "腰酸背痛护理" in the nav
      // dropdown. `shortTitle` already knows each locale's title shape — see lib/i18n.ts.
      label: shortTitle(locale, s.title),
      badge: s.navBadge,
    })),
  },
  {
    href: pathFor(locale, '/conditions'),
    label: dict.nav.conditions,
    children: publishedConditionsFor(locale).map((c) => ({
      href: pathFor(locale, `/conditions/${c.slug}`),
      label: shortTitle(locale, c.title),
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
   * THE FIX THE NOTE BELOW ASKED FOR, done 2026-09-05 at the client's prompting: "book now
   * directly leads to sweetpew, there's no NAP, hours, map link etc".
   *
   * "Book Now" leaves the site, so between 2026-08-01 and now a visitor could tap the only
   * nav item that sounded like "where are you" and land on a third-party booking form having
   * never seen the address. /book-now was down to ONE internal link sitewide (the homepage
   * "Directions & contact" button) despite carrying the NAP, the hours, the map and now the
   * three photo walkthroughs.
   *
   * ⚠️ THE LABEL AND THE PATH DELIBERATELY DISAGREE. "Locate Us" is what the page does;
   * `/book-now` is where it has to live, because the Wix /book-now ranked #13 for "chiro
   * cheras", /contact-us already 301s here, and every in-prose "opening hours and directions"
   * link in lib/services*.ts points at it. Renaming the route would throw all of that away to
   * fix a cosmetic mismatch. Do not "tidy" this into /locate-us.
   */
  { href: pathFor(locale, '/book-now'), label: dict.nav.locateUs },
  /**
   * Points off-site to SweetPew, at the client's request (2026-08-01). It used to go to
   * /book-now.
   */
  { href: clinic.bookingUrl, label: dict.nav.bookNow, external: true },
]
