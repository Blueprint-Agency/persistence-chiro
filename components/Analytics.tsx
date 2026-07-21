import Script from 'next/script'

import { GA4_ID, GTM_ID } from '@/lib/analytics'

/**
 * Google Tag Manager + optional direct GA4.
 *
 * Uses `next/script` rather than `@next/third-parties` — the Next docs still describe that
 * package as "an experimental library under active development", and this site has no other
 * runtime dependencies to speak of. `afterInteractive` keeps the container off the critical
 * path so LCP is unaffected.
 *
 * Renders nothing when the env vars are absent, so dev and preview stay untracked.
 */
export function Analytics() {
  return (
    <>
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
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
 * The `<noscript>` iframe half of GTM. Must sit immediately inside <body>, which is why it
 * is separate from the script above.
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
