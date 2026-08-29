/**
 * JSON-LD builders. One per template, per the schema table in
 * `proposed-site-architecture.md`. All NAP flows from `clinic` — never inline it here.
 */
import { clinic, practitioners, publishedRegistrations, hasBioFor, type Registration } from './clinic'
import { publishedServicesFor } from './services'
import { whatsappLink, waMessage } from './whatsapp'
import { type Locale, LOCALES, LOCALE_TAG, pathFor } from './i18n'

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
 * The site as an entity, separate from the business. Standard on every competitor in this
 * SERP (`mychiro.com.my`, `ianthechiro.com`, `goldenspinegroup.com`, Connect and Bliss all
 * carry one) and absent here until 2026-08-11.
 *
 * NO `SearchAction`. The Wix site declared one pointing at `/search?q=` and the rebuild has
 * no search route, so claiming a sitelinks searchbox would advertise a URL that 404s.
 */
export function webSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: clinic.name,
    inLanguage: LOCALE_TAG[locale],
    publisher: { '@id': `${SITE_URL}/#clinic` },
  }
}

/**
 * Homepage + contact. `Chiropractic` is a MedicalBusiness subtype and the most specific
 * type Google recognises for this clinic — more specific beats generic LocalBusiness.
 *
 * ENRICHED 2026-08-11 after a like-for-like comparison against the six clinics holding this
 * SERP. The rebuild's homepage emitted two schema types against seven to nine for the three
 * strongest rivals. `employee`, `founder` and `availableService` are the parts that were
 * genuinely missing: who provides the care, and what care is on offer.
 *
 * These are NESTED on the clinic node rather than emitted as competing top-level nodes.
 * That is deliberate — a `Person` already has a canonical top-level node on /about and
 * /about/<slug>, and repeating it here would describe the same person twice. `@id` on the
 * clinic keeps one authoritative business entity that every template references.
 *
 * `employee` reads through `publishedRegistrations`, so an unconfirmed registration number
 * is absent from the business node exactly as it is from the practitioner's own page. The
 * gate is not bypassable by going through a different builder.
 *
 * ⚠️ RENDERED ONCE PER LOCALE, ON THE SAME `@id` NODE. Every locale's pages reference
 * `${SITE_URL}/#clinic` by id rather than repeating this block, so `availableService` MUST
 * read that locale's own service names (`publishedServicesFor(locale)`) rather than always
 * English — otherwise whichever locale's static page happens to build last silently wins
 * for every other locale's pages too.
 */
export function localBusinessSchema(locale: Locale) {
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
    logo: `${SITE_URL}/img/logo-persistence.png`,
    image: `${SITE_URL}/og-default.jpg`,
    // Links the entity to the Business Profile listing Google already ranks, which is the
    // one place the reviews and the local pack position actually live.
    hasMap: clinic.mapsUrl,
    medicalSpecialty: 'Chiropractic',
    areaServed: [
      { '@type': 'Place', name: 'Cheras' },
      { '@type': 'Place', name: 'Maluri' },
      { '@type': 'Place', name: 'Kuala Lumpur' },
    ],
    availableLanguage: LOCALES.map((l) => LOCALE_TAG[l]),
    /** Derived, so a service added or unpublished in lib/services.ts follows automatically. */
    availableService: publishedServicesFor(locale).map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.title,
      url: `${SITE_URL}${pathFor(locale, `/services/${s.slug}`)}`,
    })),
    employee: practitioners.map((p) => {
      const registrations = publishedRegistrations(p)
      // Only link to the practitioner's own page when it actually exists in this locale
      // (gated by hasBioFor, same as the page's own generateStaticParams) — a Person node
      // is still valid with no `url`, whereas a URL that 404s is not.
      const url = hasBioFor(locale, p.slug) ? `${SITE_URL}${pathFor(locale, `/about/${p.slug}`)}` : undefined
      return {
        '@type': 'Person',
        name: p.name,
        jobTitle: p.role,
        ...(url ? { url } : {}),
        ...(p.credentials ? { description: p.credentials } : {}),
        ...(registrations.length
          ? {
              hasCredential: registrations.map((r) => ({
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: 'Professional registration',
                name: r.label,
                identifier: r.value,
              })),
            }
          : {}),
      }
    }),
    // Stated on her own profile and in `founderBio`, so this claims nothing new.
    founder: {
      '@type': 'Person',
      name: 'Valerie Na',
      ...(hasBioFor(locale, 'valerie-na')
        ? { url: `${SITE_URL}${pathFor(locale, '/about/valerie-na')}` }
        : {}),
    },
    sameAs: [clinic.socials.instagram, clinic.socials.facebook],
    /**
     * Points at WhatsApp, not a scheduler. SweetPew was retired 2026-07-26 and structured
     * data that still advertised it would be telling Google about a booking path the site no
     * longer offers. `ReserveAction` remains the honest type — the visitor is still asking
     * for an appointment; they are just doing it in a chat.
     */
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: whatsappLink(waMessage.general(locale)),
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

/** Physiotherapy / service modality pages. */
export function medicalProcedureSchema(o: {
  name: string
  description: string
  url: string
  /** How the procedure is carried out — enriches the entity beyond a bare stub. */
  howPerformed?: string
  /** e.g. 'Chiropractic', 'Physiotherapy' — the relevant medical specialty. */
  relevantSpecialty?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.url}`,
    procedureType: 'https://schema.org/NoninvasiveProcedure',
    ...(o.howPerformed ? { howPerformed: o.howPerformed } : {}),
    ...(o.relevantSpecialty ? { relevantSpecialty: o.relevantSpecialty } : {}),
    provider: { '@id': `${SITE_URL}/#clinic` },
  }
}

/**
 * E-E-A-T layer for a medical money page: a MedicalWebPage that records WHO reviewed the
 * content and WHEN. `lastReviewed` and `reviewedBy` are the two signals Google's medical
 * quality guidance looks for, and neither was present on the service/condition pages.
 * The reviewer is a real registered practitioner, referenced back to the clinic node.
 */
export function reviewedMedicalWebPage(o: {
  name: string
  description: string
  url: string
  lastReviewed: string
  reviewer: { name: string; role: string; credentials: string; slug: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: o.name,
    description: o.description,
    url: `${SITE_URL}${o.url}`,
    lastReviewed: o.lastReviewed,
    reviewedBy: {
      '@type': 'Person',
      name: o.reviewer.name,
      jobTitle: o.reviewer.role,
      url: `${SITE_URL}/about/${o.reviewer.slug}`,
      ...(o.reviewer.credentials ? { description: o.reviewer.credentials } : {}),
      worksFor: { '@id': `${SITE_URL}/#clinic` },
    },
    about: { '@id': `${SITE_URL}/#clinic` },
  }
}

/**
 * FAQ block. Only emit when the answers are genuinely on the page — Google treats
 * schema that isn't visible in the rendered content as a violation.
 */
/**
 * FAQPage for a route that answers questions in TWO rendered blocks: the short answers
 * (`keyTakeaways`) and the FAQ proper (`faqs`).
 *
 * Both blocks render on the page, which is the condition Google puts on FAQPage, but only
 * `faqs` used to reach the schema. That left the takeaways as plain prose whose machine
 * readability depended on where they happened to sit in the document — the cost the service
 * pages were about to pay for moving them below the reviews (2026-08-23). In structured data
 * position stops mattering, so the layout decision is free.
 *
 * NOT ABOUT RICH RESULTS. Google restricted FAQ rich snippets to well-known authoritative
 * government and health sites in 2023, and a private clinic is not one, so nothing new will
 * appear in the SERP. The value is that the answer engines which parse JSON-LD now see ten
 * Q&A pairs on a money page instead of five.
 *
 * THE TWO ARRAYS MUST NOT OVERLAP. Publishing one answer twice inside a single FAQPage is
 * the duplication the whole block is meant to avoid; `content.test.ts` asserts it, so a
 * reworded takeaway that drifts into an FAQ fails the build rather than shipping.
 */
export function pageFaqSchema(
  takeaways: readonly { q: string; a: string }[] | undefined,
  faqs: readonly { q: string; a: string }[],
) {
  return faqSchema([...(takeaways ?? []), ...faqs])
}

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

/**
 * Some posts are bylined to a named practitioner, others to the clinic itself
 * (`post.author === clinic.name`) — the latter is an Organization, not a Person, and
 * schema.org has no single type that covers both. Emitting `Person` for a clinic-authored
 * post would misrepresent the clinic's own name as a person's; comparing against the same
 * `clinic.name` this file already treats as the single source of truth keeps the two in
 * step without a second field on `Post`.
 */
export function blogPostingSchema(o: {
  title: string
  description: string
  slug: string
  datePublished: string
  author: string
}) {
  const isClinic = o.author === clinic.name

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: o.title,
    description: o.description,
    url: `${SITE_URL}/blog/${o.slug}`,
    datePublished: o.datePublished,
    author: isClinic
      ? { '@type': 'Organization', '@id': `${SITE_URL}/#clinic` }
      : { '@type': 'Person', name: o.author },
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

/**
 * `hasCredential` carries the professional registration numbers, which is the part of a
 * practitioner's entity Google can corroborate against the public ACM and MOH T&CM
 * registers — E-E-A-T for a YMYL medical page in a form a crawler can actually match.
 *
 * It reads through `publishedRegistrations`, so an unconfirmed number is absent from the
 * markup exactly as it is from the page: the gate can't be bypassed by emitting schema.
 */
export function personSchema(p: {
  name: string
  role: string
  credentials: string
  memberships: readonly string[]
  registrations: readonly Registration[]
  registrationsVerified: boolean
}) {
  const registrations = publishedRegistrations(p)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    jobTitle: p.role,
    description: p.credentials || undefined,
    memberOf: p.memberships.map((m) => ({ '@type': 'Organization', name: m })),
    hasCredential: registrations.length
      ? registrations.map((r) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional registration',
          name: r.label,
          identifier: r.value,
        }))
      : undefined,
    worksFor: { '@id': `${SITE_URL}/#clinic` },
  }
}
