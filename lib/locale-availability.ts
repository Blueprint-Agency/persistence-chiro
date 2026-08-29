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
 * `/book-now`, `/press`, `/partner-with-us`, `/what-to-expect` and `/` were all localized
 * in the same session this list was last updated, and every one of them would have shipped
 * with wrong hreflang/switcher behaviour if this file had not been updated alongside them.
 */
import type { Locale } from './i18n'
import { conditionBySlugFor, publishedConditionsFor } from './conditions'
import { serviceBySlugFor, publishedServicesFor } from './services'
import { hasBioFor } from './clinic'

const STATIC_LOCALIZED_PATHS = new Set([
  '/',
  '/about',
  '/book-now',
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
