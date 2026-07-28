import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { clinic, addressOneLine, hoursDisplay } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, contactPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { CtaBand, Eyebrow, GhostButton, WhatsAppButton, PageHero } from '@/components/ui'
import { waMessage } from '@/lib/whatsapp'

// Competitors rank with their contact pages in this SERP (Excellence sits #12 for
// "chiropractor cheras" with theirs), so this page gets real metadata, not a stub.
export const metadata: Metadata = pageMetadata({
  title: 'Book a Chiropractor in Cheras, Maluri',
  description:
    'Book Persistence Chiropractic Care at Sunway Velocity, Cheras. Opening hours, parking, walking directions from Maluri LRT, phone and WhatsApp. Open seven days.',
  path: '/book-now',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema({ url: '/book-now' })} />
      <JsonLd data={breadcrumbSchema([{ name: 'Book Now', url: '/book-now' }])} />

      <PageHero
        eyebrow="Contact"
        title="Contact & directions"
        intro="Right next to Sunway Velocity and Sunway Medical Centre, Cheras. Open seven days a week."
      >
        <div>
          <WhatsAppButton message={waMessage.general}>Book on WhatsApp</WhatsAppButton>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/img/clinic-front-desk.webp"
              alt="Reception desk at Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur"
              width={1400}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Eyebrow>Find us</Eyebrow>
            <address className="mt-5 not-italic text-xl leading-relaxed text-ink">
              {addressOneLine}
            </address>

            <dl className="mt-7 space-y-3">
              <div className="flex gap-4">
                <dt className="w-24 flex-none text-sm text-ink-muted">Phone</dt>
                <dd>
                  <a
                    href={`tel:${clinic.phoneE164}`}
                    className="font-semibold text-brand-slate hover:underline"
                  >
                    {clinic.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 flex-none text-sm text-ink-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-brand-slate hover:underline"
                  >
                    {clinic.email}
                  </a>
                </dd>
              </div>
            </dl>

            <h2 className="mt-10 flex items-center gap-3 label text-brand-slate">Opening hours</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {hoursDisplay.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-ink-muted">{h.label}</dt>
                  <dd className="font-semibold text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <GhostButton href={clinic.mapsUrl} external>
                Open in Google Maps
              </GhostButton>
            </div>

            {/* Online booking (SweetPew) was retired 2026-07-26 — every appointment now starts
                as a WhatsApp message. That also removed the site's single biggest LCP risk: a
                third-party booking script on the page that has to rank for
                "chiropractor cheras" + directions. */}
            <p className="mt-8 text-sm text-ink-muted">
              We take appointments over WhatsApp and by phone, seven days a week. Message us
              your main concern and we will confirm a time.
            </p>

            <p className="mt-6 leading-relaxed text-ink-muted">
              Not sure where to start? Browse{' '}
              <Link
                href="/services"
                className="font-semibold text-brand-slate underline underline-offset-4"
              >
                our services
              </Link>{' '}
              or the{' '}
              <Link
                href="/conditions"
                className="font-semibold text-brand-slate underline underline-offset-4"
              >
                conditions we treat
              </Link>
              , or message us your main concern and we will point you to the right one.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
