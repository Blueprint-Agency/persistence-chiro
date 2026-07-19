import type { Metadata } from 'next'
import { founderBio, practitioners, registrationsVerified } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { personSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'About Our Chiropractors in Cheras, Kuala Lumpur',
  description:
    'Meet the chiropractors at Persistence Chiropractic Care in Cheras, Maluri — founder Dr. Valerie Na, credentials, and professional memberships.',
  alternates: { canonical: '/about-us' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {practitioners.map((p) => (
        <JsonLd key={p.slug} data={personSchema(p)} />
      ))}

      <h1 className="text-3xl font-semibold">About Us</h1>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">About Valerie</h2>
        {founderBio.map((para) => (
          <p key={para.slice(0, 40)} className="mt-4 leading-relaxed text-ink-muted">
            {para}
          </p>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Our team</h2>
        <ul className="mt-6 space-y-8">
          {practitioners.map((p) => (
            <li key={p.slug}>
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-neutral-500">{p.role}</p>
              {p.credentials && <p className="mt-2 text-ink-muted">{p.credentials}</p>}
              {p.memberships.length > 0 && (
                <ul className="mt-2 text-sm text-ink-muted">
                  {p.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              )}
              {/* Registration numbers stay hidden until the clinic confirms the mapping —
                  see the warning on `registrationsVerified` in lib/clinic.ts. */}
              {registrationsVerified && p.registrations.length > 0 && (
                <p className="mt-2 text-sm text-neutral-500">{p.registrations.join(' · ')}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* /our-partners 301s to this anchor — it must exist or the redirect lands nowhere useful. */}
      <section id="partners" className="mt-12 scroll-mt-8">
        <h2 className="text-2xl font-semibold">Partners</h2>
        <p className="mt-2 text-ink-muted">
          Partner logos from the previous site are in <code>assets/images</code> — 43 of
          them, pending selection and optimisation into <code>public/</code>.
        </p>
      </section>
    </div>
  )
}
