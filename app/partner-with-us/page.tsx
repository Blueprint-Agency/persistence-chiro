import type { Metadata } from 'next'
import Image from 'next/image'

import { clinic } from '@/lib/clinic'
import { keyPartners, partners } from '@/lib/partners'
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

const proof = [
  {
    src: '/img/events/event-corporate-talk.webp',
    alt: 'Persistence Chiropractic leading a corporate wellness talk with Tricor in Kuala Lumpur',
    caption: 'Corporate wellness talk with Tricor',
  },
  {
    src: '/img/events/event-office-wellness-talk.webp',
    alt: 'Persistence Chiropractic presenting an ergonomic health talk for office workers in Kuala Lumpur',
    caption: 'Speaking on ergonomic health for office workers',
  },
  {
    src: '/img/events/event-ergonomics-workshop.webp',
    alt: 'An ergonomics workshop for a company team in Cheras, Kuala Lumpur',
    caption: 'Ergonomics workshop, in session',
  },
  {
    src: '/img/events/event-community-screening.webp',
    alt: 'A community spinal health talk hosted with Ti-Ratana Welfare Society in Kuala Lumpur',
    caption: 'Community health talk with Ti-Ratana',
  },
  {
    src: '/img/events/event-community-adjustment.webp',
    alt: 'A Persistence chiropractor assessing a community member at a Ti-Ratana health day in Kuala Lumpur',
    caption: 'Postural screening at a Ti-Ratana community day',
  },
  {
    src: '/img/events/event-award.webp',
    alt: 'The Persistence Chiropractic team at a WeekendPlan Editor’s Choice event in Kuala Lumpur',
    caption: 'WeekendPlan Editor’s Choice, Best Service 2023',
  },
  {
    src: '/img/events/event-magazine-feature.webp',
    alt: 'Persistence Chiropractic featured in Going Places magazine, at the clinic in Cheras, Kuala Lumpur',
    caption: 'Featured in Going Places magazine',
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
          <Eyebrow>A few we have run</Eyebrow>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proof.map((p) => (
              <li key={p.src}>
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 100vw, 540px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm text-ink-muted">{p.caption}</p>
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
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {partners.map((p) => (
              <li
                key={p.file}
                className="flex items-center justify-center rounded-xl border border-line bg-white p-5"
              >
                <Image
                  src={p.file}
                  alt={`${p.name} logo`}
                  width={160}
                  height={160}
                  sizes="(max-width: 640px) 30vw, 160px"
                  className="h-12 w-auto max-w-full object-contain"
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
