/**
 * JSON-LD builders. One per template, per the schema table in
 * `proposed-site-architecture.md`. All NAP flows from `clinic` — never inline it here.
 */
import { clinic } from './clinic'

export const SITE_URL = 'https://www.persistencechiropractic.com'

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: clinic.address.street,
  addressLocality: clinic.address.locality,
  addressRegion: clinic.address.region,
  postalCode: clinic.address.postalCode,
  addressCountry: clinic.address.country,
}

const openingHoursSpecification = clinic.hours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days,
  opens: h.opens,
  closes: h.closes,
}))

/**
 * Homepage + contact. `Chiropractic` is a MedicalBusiness subtype and the most specific
 * type Google recognises for this clinic — more specific beats generic LocalBusiness.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Chiropractic',
    '@id': `${SITE_URL}/#clinic`,
    name: clinic.name,
    url: SITE_URL,
    telephone: clinic.phoneE164,
    email: clinic.email,
    address: postalAddress,
    geo: { '@type': 'GeoCoordinates', latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    openingHoursSpecification,
    areaServed: [
      { '@type': 'Place', name: 'Cheras' },
      { '@type': 'Place', name: 'Maluri' },
      { '@type': 'Place', name: 'Kuala Lumpur' },
    ],
    sameAs: [clinic.socials.instagram, clinic.socials.facebook],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: clinic.bookingUrl,
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      result: { '@type': 'Reservation', name: 'Chiropractic appointment' },
    },
  }
}

/** Condition pages. */
export function medicalWebPageSchema(o: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.url}`,
    provider: { '@id': `${SITE_URL}/#clinic` },
  }
}

/** Physiotherapy modality pages. */
export function medicalProcedureSchema(o: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.url}`,
    provider: { '@id': `${SITE_URL}/#clinic` },
  }
}

/**
 * FAQ block. Only emit when the answers are genuinely on the page — Google treats
 * schema that isn't visible in the rendered content as a violation.
 */
export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function blogPostingSchema(o: {
  title: string
  description: string
  slug: string
  datePublished: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: o.title,
    description: o.description,
    url: `${SITE_URL}/blog/${o.slug}`,
    datePublished: o.datePublished,
    author: { '@type': 'Person', name: o.author },
    publisher: { '@id': `${SITE_URL}/#clinic` },
  }
}

/**
 * Breadcrumb trail. Nested pages only — a breadcrumb of one item (the homepage) is noise.
 * `items` is ordered root-first; the current page is the last item. Every `url` is a path,
 * so NAP/domain stays in one place (`SITE_URL`).
 */
export function breadcrumbSchema(items: readonly { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  }
}

/**
 * Hub pages (/conditions, /services). A CollectionPage whose mainEntity is the ItemList of
 * child pages — this is what tells Google the page is a browseable index rather than a
 * thin doorway. `about` references the clinic by @id so NAP is never repeated.
 */
export function collectionPageSchema(o: {
  name: string
  description: string
  url: string
  items: readonly { name: string; url: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.url}`,
    about: { '@id': `${SITE_URL}/#clinic` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: o.items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: `${SITE_URL}${it.url}`,
      })),
    },
  }
}

/**
 * Booking/contact page. The architecture's schema table pairs /contact-us with
 * `LocalBusiness + ReserveAction`. Both already live on the sitewide `Chiropractic` node
 * (`#clinic`, with its `potentialAction`), so this page emits a `ContactPage` that points
 * at that node by @id rather than repeating NAP — the mainEntity IS the clinic, and its
 * ReserveAction comes with it.
 */
export function contactPageSchema(o: { url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}${o.url}`,
    mainEntity: { '@id': `${SITE_URL}/#clinic` },
  }
}

export function personSchema(p: {
  name: string
  role: string
  credentials: string
  memberships: readonly string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
    description: p.credentials || undefined,
    memberOf: p.memberships.map((m) => ({ '@type': 'Organization', name: m })),
    worksFor: { '@id': `${SITE_URL}/#clinic` },
  }
}
