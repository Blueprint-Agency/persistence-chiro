/**
 * Site navigation. Derived from the content modules so a draft page can never leak into
 * the nav — and so the nav and the sitemap can't disagree about what exists.
 */
import { publishedConditions } from './conditions'
import { publishedModalities } from './physiotherapy'
import { publishedPractitioners } from './clinic'

export type NavItem = { href: string; label: string; children?: NavItem[] }

export const mainNav = (): NavItem[] => [
  {
    href: '/conditions',
    label: 'Conditions',
    children: publishedConditions().map((c) => ({
      href: `/conditions/${c.slug}`,
      label: c.title.split(' in ')[0],
    })),
  },
  { href: '/chiropractic', label: 'Chiropractic' },
  {
    href: '/physiotherapy',
    label: 'Physiotherapy',
    children: publishedModalities().map((m) => ({
      href: `/physiotherapy/${m.slug}`,
      label: m.title.split(' in ')[0],
    })),
  },
  { href: '/what-to-expect', label: 'What to Expect' },
  {
    href: '/about-us',
    label: 'About',
    // /press was reachable only from the sitemap — orphaned from the nav entirely. It
    // groups here rather than taking a top-level slot: both answer "who are these people".
    children: [
      { href: '/about-us', label: 'Our team' },
      // Only published practitioners have a page — see `published` in lib/clinic.ts.
      ...publishedPractitioners().map((p) => ({ href: `/about-us/${p.slug}`, label: p.name })),
      { href: '/press', label: 'Press & publications' },
    ],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact' },
]
