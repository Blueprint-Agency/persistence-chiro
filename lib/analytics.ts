/**
 * Analytics + conversion tracking config.
 *
 * KPI 2 in `seo-proposal.html` is "+10% monthly increment in CTA clicks (calls, WhatsApp,
 * bookings)". Nothing on this site measured that before, which made the KPI unreportable —
 * this module is what makes it measurable. Every day without it is baseline that cannot be
 * recovered retrospectively, so it ships ahead of any further content work.
 *
 * IDs come from env vars so the repo carries no account identifiers and previews can run
 * untracked. Every integration is opt-in: with no env var set, nothing renders and no
 * third-party script loads. That keeps `npm run dev` and Vercel previews clean of real
 * analytics traffic, which would otherwise pollute the very baseline we are establishing.
 *
 * Set in Vercel (Production scope only — NOT Preview, for the reason above):
 *   NEXT_PUBLIC_GTM_ID          GTM-XXXXXXX   container id
 *   NEXT_PUBLIC_GA4_ID          G-XXXXXXXXXX  only if firing GA4 directly, not via GTM
 *   NEXT_PUBLIC_GSC_VERIFICATION              Search Console meta-tag token
 *
 * Prefer GTM alone: configure GA4 inside the container so tag changes do not need a
 * redeploy. GA4_ID exists as a fallback for the case where the client wants GA4 without
 * granting GTM access.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION

/**
 * Conversion events. These names are the contract with GTM/GA4 — changing one silently
 * breaks the goal configured in the container, so treat them as fixed once live.
 */
export const CTA_EVENTS = {
  booking: 'booking_click',
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  maps: 'maps_click',
} as const

export type CtaEvent = (typeof CTA_EVENTS)[keyof typeof CTA_EVENTS]

/**
 * Classify an outbound href into a conversion event, or null if it isn't one.
 *
 * Matching on href rather than on a data attribute is deliberate: every CTA on the site is
 * a plain `<a>` inside a server component, and adding tracking props to each would turn a
 * dozen static pages into client components for no user-facing benefit. Core Web Vitals is
 * a non-negotiable in AGENTS.md, so the tracking adapts to the markup, not the reverse.
 */
export function ctaEventFor(href: string | null | undefined): CtaEvent | null {
  if (!href) return null
  if (href.startsWith('tel:')) return CTA_EVENTS.phone
  if (href.includes('wa.link') || href.includes('wa.me') || href.includes('whatsapp'))
    return CTA_EVENTS.whatsapp
  if (href.includes('sweetpew.com')) return CTA_EVENTS.booking
  if (href.includes('google.com/maps') || href.includes('maps.app.goo.gl'))
    return CTA_EVENTS.maps
  return null
}
