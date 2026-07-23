import type { Metadata } from 'next'
import Image from 'next/image'

import { clinic } from '@/lib/clinic'
import { keyPartners, partners } from '@/lib/partners'
import { events } from '@/lib/events'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { CtaBand, CheckIcon, Eyebrow, PageHero } from '@/components/ui'
import { PartnerEnquiry } from '@/components/PartnerEnquiry'

export const metadata: Metadata = {
  title: 'Partner With Us — Corporate Wellness in Cheras, KL',
  description:
    'Work with Persistence Chiropractic in Cheras, Kuala Lumpur — corporate wellness talks, workshops, health screenings, event booths and brand collaborations.',
  alternates: { canonical: '/partner-with-us' },
}

const reasons = [
  {
    title: 'Corporate wellness that people remember',
    body: 'Talks and hands-on workshops on posture, ergonomics and desk-worker health, run at your office or ours. A practical session your team actually uses, not a slideshow.',
  },
  {
    title: 'Health screenings and event booths',
    body: 'Spinal screenings and postural assessments for company events, launches and community days across Kuala Lumpur.',
  },
  {
    title: 'Brand and product collaborations',
    body: 'We have worked with brands from Sunway Medical Centre Velocity to Shopee, Maxis and Panasonic on wellness activations and content.',
  },
]

export default function PartnerWithUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Partner With Us', url: '/partner-with-us' }])} />

      <PageHero
        eyebrow="Partnerships"
        title="Partner with us"
        intro="We run corporate wellness sessions, health screenings and brand collaborations from our clinic in Cheras, Maluri. If your organisation wants to work together, tell us a little and we will pick it up on WhatsApp."
      />

      {/* ------------------------------------------------------------- Why partner */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>What we do together</Eyebrow>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {reasons.map((r) => (
            <li key={r.title} className="rounded-3xl border border-line bg-white p-7">
              <CheckIcon className="h-6 w-6 text-brand-gold" />
              <h2 className="mt-4 text-lg font-bold">{r.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------------------- Proof */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>Talks, screenings and events we have run</Eyebrow>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <li key={e.file} className="flex flex-col">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={e.file}
                    alt={e.alt}
                    width={1100}
                    height={825}
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-bold leading-snug">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{e.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- Enquiry */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
        <Eyebrow>Start a conversation</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
          Tell us what you have in mind.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          A few quick questions, then it opens WhatsApp with your answers ready to send. No
          forms to chase, no waiting on email.
        </p>
        <div className="mt-8">
          <PartnerEnquiry />
        </div>
      </section>

      {/* -------------------------------------------------------------- Logo wall */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>Partners</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Organisations we work alongside.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            From Sunway Medical Centre Velocity next door to the brands and events we have
            supported across Kuala Lumpur.
          </p>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {keyPartners.map((p) => (
              <li
                key={p.file}
                className="flex items-center justify-center rounded-2xl border border-line bg-white p-8"
              >
                <Image
                  src={p.file}
                  alt={`${p.name} logo`}
                  width={200}
                  height={200}
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="h-20 w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>

          <p className="mt-14 label text-brand-slate">We have also worked with</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p) => (
              <li
                key={p.file}
                className="flex items-center justify-center rounded-2xl border border-line bg-white p-6 sm:p-8"
              >
                <Image
                  src={p.file}
                  alt={`${p.name} logo`}
                  width={200}
                  height={200}
                  sizes="(max-width: 640px) 45vw, 240px"
                  className="h-16 w-auto max-w-full object-contain sm:h-20"
                />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-muted">…and many more.</p>
        </div>
      </section>

      <CtaBand
        heading="Prefer to just message us?"
        body="Reach the clinic directly on WhatsApp or by phone — we are happy to talk through what a partnership could look like."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
