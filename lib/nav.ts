/**
 * Site navigation. Derived from the content modules so a draft page can never leak into
 * the nav — and so the nav and the sitemap can't disagree about what exists.
 */
import { publishedConditions } from './conditions'
import { publishedServices } from './services'

export type NavItem = { href: string; label: string; children?: NavItem[] }

export const mainNav = (): NavItem[] => [
  {
    href: '/services',
    label: 'Services',
    children: publishedServices().map((s) => ({
      href: `/services/${s.slug}`,
      label: s.title.split(' in ')[0],
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
    ],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/book-now', label: 'Book Now' },
]
