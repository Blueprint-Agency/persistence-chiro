import type { Metadata } from "next";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, SITE_URL } from "@/lib/schema";
import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { CtaTracking } from "@/components/CtaTracking";
import { GSC_VERIFICATION } from "@/lib/analytics";

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
    "Gonstead chiropractic and physiotherapy in Cheras, Maluri. Registered chiropractors treating back pain, slipped disc, sciatica and sports injury in Kuala Lumpur.",
  alternates: { canonical: "/" },
  // Search Console ownership. Only emitted when the token env var is set — the DNS
  // method is fine too, this just avoids a second round-trip to the client for DNS access.
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Persistence Chiropractic Care",
    url: "/",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        {/* Renders no DOM — attaches one delegated listener for CTA conversion events. */}
        <CtaTracking />
      </body>
    </html>
  );
}
