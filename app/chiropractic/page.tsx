import type { Metadata } from 'next'
import Link from 'next/link'
import { clinic } from '@/lib/clinic'
import { gonsteadIntro, gonsteadSteps } from '@/lib/gonstead'

export const metadata: Metadata = {
  title: 'Gonstead Chiropractic in Cheras, Kuala Lumpur',
  description:
    'The Gonstead method: history taking, visualisation, instrumentation, palpation, X-ray analysis and adjustment. Registered chiropractors in Cheras, Maluri.',
  alternates: { canonical: '/chiropractic' },
}

export default function ChiropracticPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Gonstead Chiropractic in Cheras</h1>
      <p className="mt-4 text-lg text-ink-muted">{gonsteadIntro}</p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Our six-step approach</h2>
        <ol className="mt-6 space-y-8">
          {gonsteadSteps.map((step, i) => (
            <li key={step.name}>
              <h3 className="text-lg font-medium">
                {i + 1}. {step.name}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-xl font-semibold">Book an assessment</h2>
        <p className="mt-2 text-ink-muted">
          Registered chiropractors in Cheras, Maluri. Open seven days.
        </p>
        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block rounded bg-brand-gold px-5 py-2.5 font-medium text-ink"
        >
          Book an appointment
        </a>
        <p className="mt-4 text-sm">
          <Link href="/what-to-expect" className="text-brand-slate underline">
            What to expect on your first visit
          </Link>
        </p>
      </section>
    </div>
  )
}
