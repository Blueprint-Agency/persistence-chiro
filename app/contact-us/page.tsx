import type { Metadata } from 'next'
import Image from 'next/image'

import { clinic, addressOneLine, hoursDisplay } from '@/lib/clinic'
import { CtaBand, Eyebrow, GhostButton, GoldButton, PageHero, WhatsAppIcon } from '@/components/ui'

// Competitors rank with their contact pages in this SERP (Excellence sits #12 for
// "chiropractor cheras" with theirs), so this page gets real metadata, not a stub.
export const metadata: Metadata = {
  title: 'Contact & Directions — Chiropractor in Cheras, Maluri',
  description:
    'Persistence Chiropractic Care, Sunway Velocity, Cheras. Opening hours, directions from Maluri LRT, phone and WhatsApp. Open seven days.',
  alternates: { canonical: '/contact-us' },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact & directions"
        intro="Right next to Sunway Velocity and Sunway Medical Centre, Cheras. Open seven days a week."
      >
        <div className="flex flex-wrap gap-3">
          <GoldButton href={clinic.bookingUrl} external>
            Book an appointment
          </GoldButton>
          <GhostButton href={clinic.whatsappUrl} external tone="light">
            <WhatsAppIcon />
            WhatsApp us
          </GhostButton>
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

            {/* ponytail: link out rather than iframe the widget. An embedded third-party
                booking script is the single biggest LCP risk on the site, and this page's
                job is ranking for "chiropractor cheras" + directions. Swap to an embed only
                if booking conversion measurably drops. */}
            <p className="mt-8 text-sm text-ink-muted">
              Booking is handled by SweetPew and opens in a new tab.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
