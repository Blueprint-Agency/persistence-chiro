import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, SITE_URL } from "@/lib/schema";
import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { CtaTracking } from "@/components/CtaTracking";
import { MobileNavClose } from "@/components/MobileNavClose";
import { GSC_VERIFICATION } from "@/lib/analytics";
import { isStagingDeployment } from "@/lib/deployment";
import { OG_IMAGE } from "@/lib/seo";

// Montserrat for headings, per the brand (AGENTS.md). Source Sans 3 for body — drawn for
// long-form reading, which is what condition pages are, and warmer than the Inter default.
// The live Wix site mixes five stock faces with no system; two is the whole scale here.
const montserrat = Montserrat({ variable: "--font-heading", subsets: ["latin"] });
const sourceSans = Source_Sans_3({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  // Required — without it, relative canonical/OG URLs are a build error.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chiropractor in Cheras (Maluri), Kuala Lumpur | Persistence Chiropractic",
    // Every route sets its own title; this only wraps them.
    template: "%s | Persistence Chiropractic",
  },
  description:
    "Gonstead chiropractic and physiotherapy in Cheras, Maluri. Registered chiropractors for back pain, slipped disc, sciatica and sports injury in Kuala Lumpur.",
  alternates: { canonical: "/" },
  // Belt and braces with robots.txt: a Disallow stops crawling but does not always remove a
  // URL already known to Google, whereas noindex does. Only ever set on *.vercel.app.
  ...(isStagingDeployment ? { robots: { index: false, follow: false } } : {}),
  // Search Console ownership. Only emitted when the token env var is set — the DNS
  // method is fine too, this just avoids a second round-trip to the client for DNS access.
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  // Fallback card only. Every route builds its own through lib/seo.ts `pageMetadata()`,
  // which is what makes og:url per-page — Next.js overrides `openGraph` shallowly, so a
  // route that sets it replaces this whole object rather than extending it.
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Persistence Chiropractic Care",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-MY"
      className={`${montserrat.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-body)]">
        <AnalyticsNoScript />
        {/* Sitewide business schema. Every other template references it by @id rather
            than repeating NAP. */}
        <JsonLd data={localBusinessSchema()} />
        {/* Keyboard and screen-reader users otherwise tab the logo, six nav items and every
            focus-within submenu child before reaching the h1 — on every route. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        {/* Renders no DOM — attaches one delegated listener for CTA conversion events. */}
        <CtaTracking />
        {/* Also renders no DOM — dismisses the mobile drawer once a link in it is tapped. */}
        <MobileNavClose />
      </body>
    </html>
  );
}
