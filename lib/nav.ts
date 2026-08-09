/**
 * Site navigation. Derived from the content modules so a draft page can never leak into
 * the nav — and so the nav and the sitemap can't disagree about what exists.
 */
import { clinic } from './clinic'
import { publishedConditions } from './conditions'
import { publishedServices } from './services'

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

export const mainNav = (): NavItem[] => [
  {
    href: '/services',
    label: 'Services',
    children: publishedServices().map((s) => ({
      href: `/services/${s.slug}`,
      label: s.title.split(' in ')[0],
      badge: s.navBadge,
    })),
  },
  {
    href: '/conditions',
    label: 'Conditions',
    children: publishedConditions().map((c) => ({
      href: `/conditions/${c.slug}`,
      label: c.title.split(' in ')[0],
    })),
  },
  { href: '/what-to-expect', label: 'What to Expect' },
  {
    // /press was reachable only from the sitemap — orphaned from the nav entirely. It
    // groups here rather than taking a top-level slot: both answer "who are these people".
    // Practitioners are deliberately not listed here. Their pages are reached by clicking
    // a card on /about, where the photo and role give the name context a bare dropdown
    // row cannot. Listing them twice made the menu long without making anything findable.
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'Our team' },
      { href: '/press', label: 'Press & publications' },
      { href: '/partner-with-us', label: 'Partner with us' },
    ],
  },
  { href: '/blog', label: 'Blog' },
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
  { href: clinic.bookingUrl, label: 'Book Now', external: true },
]
