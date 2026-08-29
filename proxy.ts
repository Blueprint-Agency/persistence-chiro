import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

/**
 * Keeps English unprefixed at today's URLs (`/conditions/back-pain`) while Chinese and
 * Malay live under real prefixes (`/zh/...`, `/ms/...`) — the whole site is physically
 * built as `app/[locale]/...`, this is what makes the default locale invisible in the
 * URL bar without a second copy of every route.
 *
 * Runs before `app/[locale]/layout.tsx`'s `generateStaticParams`, so it never needs to
 * know what pages exist — it only rewrites the locale segment. `redirects()` in
 * `next.config.ts` (the legacy Wix 301s) fires before Proxy in Next's request pipeline,
 * so those need no locale-awareness here.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // `/en/*` is an internal rewrite target, never a public URL — a direct hit (a stray
  // link, a bookmark) is canonicalized back to the unprefixed path rather than served,
  // so the same content is never reachable at two URLs.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice('/en'.length) || '/'
    return NextResponse.redirect(url, 308)
  }

  const isPrefixed = LOCALES.some(
    (locale) =>
      locale !== DEFAULT_LOCALE && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  )
  if (isPrefixed) return NextResponse.next()

  // Plain NextResponse.rewrite with no extra headers — reading the request (via
  // next/headers) anywhere downstream would opt the whole route into dynamic rendering,
  // which conflicts with this site's static-by-default requirement. See
  // `components/LocaleSwitcher.tsx` for why the switcher deliberately doesn't need to know
  // the current page's exact path.
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Everything except: Next internals, the metadata routes, and any path segment with a
    // file extension (images/fonts/etc under public/ and the app-icon conventions). Blog
    // lives under `app/[locale]/blog` (English-only, gated in the route itself) so it IS
    // rewritten like every other page — it needs the same root layout as everything else,
    // since Next allows only one root layout per route subtree.
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)',
  ],
}
