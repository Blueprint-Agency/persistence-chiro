import type { Metadata } from 'next'
import Image from 'next/image'

import { clinic } from '@/lib/clinic'
import { gonsteadIntro, gonsteadSteps } from '@/lib/gonstead'
import { CtaBand, Eyebrow, GhostButton, PageHero } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Gonstead Chiropractic in Cheras, Kuala Lumpur',
  description:
    'The Gonstead method: history taking, visualisation, instrumentation, palpation, X-ray analysis and adjustment. Registered chiropractors in Cheras, Maluri.',
  alternates: { canonical: '/chiropractic' },
}

export default function ChiropracticPage() {
  return (
    <>
      <PageHero
        eyebrow="Chiropractic"
        title="Gonstead chiropractic in Cheras"
        intro={gonsteadIntro}
      />

      {/* ------------------------------------------------------ The six steps */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Six steps, in order, every time.
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Gonstead is a process of elimination. Each step narrows the search until only the
              segment actually causing your pain is left — which is why we adjust one joint
              rather than the whole spine.
            </p>
            <div className="mt-8 overflow-hidden rounded-3xl">
              <Image
                src="/img/consultation-assessment.webp"
                alt="Gonstead chiropractor assessing spinal alignment before an adjustment in Cheras, Kuala Lumpur"
                width={1100}
                height={1400}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Numbered because the steps genuinely run in sequence — each one depends on
              what the previous one ruled out. Not decoration. */}
          <ol className="divide-y divide-line border-y border-line">
            {gonsteadSteps.map((step, i) => (
              <li key={step.name} className="flex gap-6 py-7">
                <span
                  aria-hidden="true"
                  className="label flex-none pt-1.5 text-brand-gold-ink"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{step.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <GhostButton href="/what-to-expect">What to expect on your first visit</GhostButton>
          <GhostButton href="/physiotherapy">Compare with physiotherapy</GhostButton>
        </div>
      </section>

      <CtaBand
        heading="Book a Gonstead assessment"
        body="Registered chiropractors in Cheras, Maluri. Open seven days, right next to Sunway Velocity."
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
