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
  /**
   * Draws a small gold tag icon before the label. Top-level items only, and there should be
   * exactly one: /offers, which is a commercial hook sitting in a row of navigation labels.
   * A second highlighted item would leave neither standing out.
   */
  highlight?: boolean
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
  /**
   * /offers, added 2026-09-09 at the client's request: one page gathering every published
   * offer in lib/pricing.ts, so a price is one tap away rather than reachable only from
   * whichever service page happens to carry it. `highlight` puts a small tag icon beside the
   * label, which is what the client's brief ("add bundle icon") asked for.
   *
   * WORDING: the MENU LABEL is "Offers" (优惠 / Tawaran), not "Pricing", "Promotions",
   * "Packages" or "Bundles", because the client asked to avoid those four words in the nav
   * (2026-09-09). The cards, hero buttons and WhatsApp messages keep saying "bundle": the
   * client asked for that explicitly the same day ("remain the word bundle for original
   * positions, only use offer at the menu bar"). Do not "tidy" the two into one word.
   */
  { href: pathFor(locale, '/offers'), label: dict.nav.offers, highlight: true },
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
      /**
       * Moved here from the top level on 2026-09-09, at the client's request, to free the
       * slot /offers now takes. Second row rather than last: it is the most-tapped thing in
       * this menu. The address also stays in the utility bar on every desktop viewport and in
       * the footer everywhere, so demoting the link does not hide the NAP.
       *
       * Why the page is in the nav at all: "Book Now" leaves the site for SweetPew, so
       * between 2026-08-01 and 2026-09-05 a visitor could tap the only nav item that sounded
       * like "where are you" and land on a third-party form having never seen the address.
       * The client flagged it ("book now directly leads to sweetpew, there's no NAP, hours,
       * map link etc") and this link was restored on 2026-09-05.
       *
       * `/locate-us` and not a slug carrying "cheras" or "maluri": the homepage is this
       * site's Cheras page, and a second URL with those words in its path invites the
       * cannibalisation the architecture forbids. It lived at /book-now until 2026-09-06; GSC
       * showed that URL earning only brand clicks, which a 301 carries, so the path was
       * changed to match the label. /book-now and /contact-us both 301 here.
       */
      { href: pathFor(locale, '/locate-us'), label: dict.nav.locateUs },
      { href: pathFor(locale, '/press'), label: dict.nav.press },
      { href: pathFor(locale, '/partner-with-us'), label: dict.nav.partnerWithUs },
    ],
  },
  // Blog stays English-only and unprefixed regardless of locale — it lives outside the
  // `[locale]` tree entirely (see proxy.ts).
  { href: '/blog', label: dict.nav.blog },
  /**
   * Points off-site to SweetPew, at the client's request (2026-08-01). It used to go to
   * /locate-us, which now sits under About.
   */
  { href: clinic.bookingUrl, label: dict.nav.bookNow, external: true },
]
