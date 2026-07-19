import type { Metadata } from 'next'
import { clinic, addressOneLine, hoursDisplay } from '@/lib/clinic'

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
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Contact &amp; Directions</h1>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">Find us</h2>
          <address className="mt-2 not-italic leading-relaxed text-ink-muted">
            {addressOneLine}
          </address>
          <p className="mt-4">
            <a href={`tel:${clinic.phoneE164}`} className="text-brand-slate underline">
              {clinic.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${clinic.email}`} className="text-brand-slate underline">
              {clinic.email}
            </a>
          </p>
          <p className="mt-4 flex gap-4">
            <a href={clinic.mapsUrl} target="_blank" rel="noopener" className="text-brand-slate underline">
              Google Maps
            </a>
            <a href={clinic.whatsappUrl} target="_blank" rel="noopener" className="text-brand-slate underline">
              WhatsApp
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Opening hours</h2>
          <dl className="mt-2 space-y-1 text-ink-muted">
            {hoursDisplay.map((h) => (
              <div key={h.label} className="flex justify-between gap-4">
                <dt>{h.label}</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-neutral-500">Open seven days a week.</p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Book an appointment</h2>
        <p className="mt-2 text-ink-muted">
          Booking is handled by SweetPew. It opens in a new tab.
        </p>
        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block rounded bg-brand-gold px-5 py-2.5 font-medium text-ink"
        >
          Book on SweetPew
        </a>
        {/* ponytail: link out rather than iframe the widget. An embedded third-party
            booking script is the single biggest LCP risk on the site, and this page's
            job is ranking for "chiropractor cheras" + directions. Swap to an embed only
            if booking conversion measurably drops. */}
      </section>
    </div>
  )
}
