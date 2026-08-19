import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'

import { GA4_ID, GTM_ID } from '@/lib/analytics'

/**
 * Google Tag Manager + optional direct GA4.
 *
 * GTM ships via `@next/third-parties`, matching the kaiteki build. The component loads the
 * container after hydration (off the critical path, so LCP is unaffected) and owns the
 * `dataLayer` queue, so `sendGTMEvent` pushes made before the container initialises are
 * replayed once it loads. App Router navigations are `history.pushState` calls, which the
 * container's built-in History Change trigger picks up — no manual pageview push here.
 *
 * Renders nothing when the env vars are absent, so dev and preview stay untracked.
 */
export function Analytics() {
  return (
    <>
      {GTM_ID && (
        <>
          {/* GTM is the heaviest third party on the page; warm the connection early. */}
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <GoogleTagManager gtmId={GTM_ID} />
        </>
      )}

      {/* Only when GA4 is wired directly instead of through the GTM container. */}
      {!GTM_ID && GA4_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
    </>
  )
}

/**
 * The `<noscript>` iframe half of GTM — `GoogleTagManager` ships the script only. Must sit
 * immediately inside <body>, which is why it is separate from the component above.
 */
export function AnalyticsNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
