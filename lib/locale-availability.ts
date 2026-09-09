/**
 * Whether an unprefixed path (e.g. `/conditions/back-pain`) has a real, non-draft page in
 * a given locale. English is the source-of-truth locale — every route that exists at all
 * exists in English — so this only reasons about whether `zh`/`ms` actually cover it yet.
 *
 * ONE PLACE THIS LOGIC LIVES: the language switcher (`components/LocaleSwitcher.tsx`) and
 * `generateMetadata`'s `availableIn` computation both call this, so hreflang tags and the
 * switcher's links can never drift apart, and neither can ever point at a locale that
 * would 404.
 *
 * `STATIC_LOCALIZED_PATHS` lists the routes that have no dynamic segment or `draft` gate of
 * their own (a hub page, a NAP/utility page) but are now genuinely localized in every
 * locale — i.e. their route file no longer has `if (locale !== 'en') notFound()` at the
 * top. ⚠️ Whenever a page like that gets un-gated, it MUST be added here too, or its
 * `generateMetadata` will keep computing `availableIn: ['en']` and the switcher will keep
 * hiding the zh/ms version that now actually exists — this happened for real: `/about`,
 * `/locate-us`, `/press`, `/partner-with-us`, `/what-to-expect` and `/` were all localized
 * in the same session this list was last updated, and every one of them would have shipped
 * with wrong hreflang/switcher behaviour if this file had not been updated alongside them.
 */
import { LOCALES, type Locale } from './i18n'
import { conditionBySlugFor, conditionsFor, publishedConditionsFor } from './conditions'
import { serviceBySlugFor, servicesFor, publishedServicesFor } from './services'
import { hasBioFor, practitioners } from './clinic'

const STATIC_LOCALIZED_PATHS = new Set([
  '/',
  '/about',
  '/locate-us',
  '/press',
  '/partner-with-us',
  '/what-to-expect',
])

export function pathExistsIn(locale: Locale, path: string): boolean {
  if (locale === 'en') return true

  const conditionSlug = path.match(/^\/conditions\/([^/]+)$/)?.[1]
  if (conditionSlug) return Boolean(conditionBySlugFor(locale, conditionSlug))
  if (path === '/conditions') return publishedConditionsFor(locale).length > 0

  const serviceSlug = path.match(/^\/services\/([^/]+)$/)?.[1]
  if (serviceSlug) return Boolean(serviceBySlugFor(locale, serviceSlug))
  if (path === '/services') return publishedServicesFor(locale).length > 0

  const practitionerSlug = path.match(/^\/about\/([^/]+)$/)?.[1]
  if (practitionerSlug) return hasBioFor(locale, practitionerSlug)

  if (STATIC_LOCALIZED_PATHS.has(path)) return true

  return false
}

/**
 * Every unprefixed path that exists in a non-English locale, as a plain string array. This
 * is what the language switcher (a client component, see `components/LocaleSwitcher.tsx`)
 * receives from the server-rendered Header so it can link to the *same page* in another
 * language without importing the content data files into the browser bundle.
 *
 * Derived by running every candidate route through `pathExistsIn` rather than by a second
 * hand-written rule set, so it can never disagree with hreflang about what is live. The
 * candidate list is every route family `pathExistsIn` knows how to answer for — add a new
 * family there and here together.
 */
export type LocalizedPaths = Record<Exclude<Locale, 'en'>, readonly string[]>

export function localizedPaths(): LocalizedPaths {
  const candidates = [
    ...STATIC_LOCALIZED_PATHS,
    '/conditions',
    '/services',
    ...conditionsFor('en').map((c) => `/conditions/${c.slug}`),
    ...servicesFor('en').map((s) => `/services/${s.slug}`),
    ...practitioners.map((p) => `/about/${p.slug}`),
  ]
  const out = {} as Record<Exclude<Locale, 'en'>, string[]>
  for (const locale of LOCALES) {
    if (locale === 'en') continue
    out[locale] = candidates.filter((path) => pathExistsIn(locale, path))
  }
  return out
}
