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
   * "Book Now" leaves the site, so between 2026-08-01 and 2026-09-05 a visitor could tap the
   * only nav item that sounded like "where are you" and land on a third-party booking form
   * having never seen the address. This page was down to ONE internal link sitewide (the
   * homepage "Directions & contact" button) despite carrying the NAP, the hours, the map and
   * the three photo walkthroughs.
   *
   * The label and the path finally agree, as of 2026-09-06. Until then this lived at
   * /book-now, and the note here argued for keeping that path because the Wix URL ranked #13
   * for "chiro cheras". GSC retired that argument: 90 days to 2026-09-05 put it at position
   * 15.5 on 35 impressions and no clicks, with the homepage at 4.4 taking the traffic. Every
   * click the old URL earned was a brand query at position 1.8, which a 301 carries.
   *
   * `/locate-us` and not a slug carrying "cheras" or "maluri": the homepage is this site's
   * Cheras page, and a second URL with those words in its path invites the cannibalisation the
   * architecture forbids. /book-now now 301s here, /contact-us points straight here rather than
   * hopping through it, and every in-prose "opening hours and directions" link in
   * lib/services*.ts was repointed in the same change.
   */
  { href: pathFor(locale, '/locate-us'), label: dict.nav.locateUs },
  /**
   * Points off-site to SweetPew, at the client's request (2026-08-01). It used to go to
   * /locate-us.
   */
  { href: clinic.bookingUrl, label: dict.nav.bookNow, external: true },
]
