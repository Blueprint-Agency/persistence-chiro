import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { clinic, hoursDisplay } from '@/lib/clinic'
import { publishedConditions } from '@/lib/conditions'
import { publishedServices } from '@/lib/services'
import { publishedPosts } from '@/lib/posts'
import { homeFaqs } from '@/lib/faqs'
import { homeIntro, offers, testimonials, accreditations, postImages } from '@/lib/home'
import { faqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { Eyebrow, GoldButton, GhostButton, Vertebrae, WhatsAppIcon, CheckIcon } from '@/components/ui'

/**
 * The homepage IS the Cheras page — there is deliberately no /areas/cheras. It already
 * ranks #16 for "chiro cheras" and holds most of the site's referring domains; a second
 * page would compete with it from zero. H1 must contain "Chiropractor in Cheras".
 * LocalBusiness JSON-LD is emitted once in the root layout; FAQPage is emitted here
 * because the answers are rendered here.
 */
export const metadata: Metadata = {
  title: 'Chiropractor in Cheras (Maluri), Kuala Lumpur | Persistence Chiropractic',
  description:
    'Gonstead chiropractic and physiotherapy in Cheras, Maluri. Registered chiropractors treating back pain, slipped disc, sciatica and sports injury. Open seven days.',
  alternates: { canonical: '/' },
}

export default function Home() {
  const conditions = publishedConditions()
  const modalities = publishedServices()
  const posts = publishedPosts().filter((p) => postImages[p.slug]).slice(0, 3)

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative bg-brand-slate-deep text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
          <div>
            <Eyebrow tone="light">Gonstead chiropractic &middot; Cheras, Maluri</Eyebrow>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Chiropractor in Cheras for backs that have waited long enough.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Drug-free, hands-on chiropractic &amp; physiotherapy in Cheras. Personalised
              treatment and precise spinal adjustments, built around what your assessment
              actually shows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <GoldButton href={clinic.bookingUrl} external>
                Book an appointment
              </GoldButton>
              <GhostButton href={clinic.whatsappUrl} external tone="light">
                <WhatsAppIcon />
                WhatsApp us
              </GhostButton>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
              {['Open 7 days a week', 'Registered chiropractors', 'Next to Sunway Velocity'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-brand-gold" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* The curved cut is the reference's move, rebuilt with a border radius rather
              than an SVG mask — one property, and it survives any aspect ratio. */}
          <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] lg:rounded-tl-[9rem]">
            <Image
              src="/img/hero-adjustment.webp"
              alt="Chiropractor performing a Gonstead pelvis adjustment at Persistence Chiropractic Care in Cheras, Kuala Lumpur"
              width={1800}
              height={1500}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Accreditation strip */}
      {/* Registrations are the strongest local trust signal this clinic has, so the marks
          render at full strength on white. No opacity fade, no blend mode — a washed-out
          accreditation logo reads as decoration rather than credential. */}
      <section aria-label="Accreditations" className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-4 py-8">
          {accreditations.map((a) => (
            <Image
              key={a.src}
              src={a.src}
              alt={a.alt}
              width={a.width}
              height={a.height}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- Intro + offers */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Why Persistence</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {homeIntro.heading}
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
            {homeIntro.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="pt-2">
              <GhostButton href="/about">Meet the team</GhostButton>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              className="group overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-xl hover:shadow-black/5"
            >
              <Image
                src={offer.image}
                alt={offer.alt}
                width={1100}
                height={700}
                sizes="(max-width: 768px) 100vw, 540px"
                className="h-56 w-full object-cover"
              />
              <div className="p-7">
                <h3 className="text-xl font-bold">{offer.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{offer.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                  Learn more
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Two care paths */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="max-w-2xl">
            <Eyebrow>Where to start</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Chiropractic or physiotherapy?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Chiropractic works on how your joints move. Physiotherapy builds the strength around
              them. Most patients only need one of the two, and we&rsquo;ll tell you which on your
              first visit.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-brand-slate-deep p-8 text-white lg:p-10">
              <Vertebrae className="text-brand-gold" />
              <h3 className="mt-5 text-2xl font-bold text-white">Chiropractic</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                The Gonstead method is a segment-by-segment examination. It finds the specific
                joint causing your pain, rather than adjusting the whole spine and hoping.
              </p>
              {conditions.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/conditions/${c.slug}`}
                        className="inline-block rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/80 hover:border-brand-gold hover:text-white"
                      >
                        {c.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8">
                <GhostButton href="/services/chiropractic-treatment" tone="light">
                  How Gonstead works
                </GhostButton>
              </div>
            </article>

            <article className="rounded-3xl border border-line bg-brand-aqua/50 p-8 lg:p-10">
              <Vertebrae className="text-brand-slate" />
              <h3 className="mt-5 text-2xl font-bold">Physiotherapy</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">
                Hands-on treatment plus the loading and rehab work that stops the same injury
                coming back. What we work on depends on what you need to get back to.
              </p>
              {modalities.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {modalities.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={`/services/${m.slug}`}
                        className="inline-block rounded-full border border-brand-slate/20 bg-white/60 px-3.5 py-1.5 text-sm text-brand-slate hover:border-brand-slate"
                      >
                        {m.title.split(' in ')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8">
                <GhostButton href="/services">Explore physiotherapy</GhostButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <Eyebrow>What our patients say</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
          Reviews from our patients in Cheras
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-line bg-white p-8 lg:p-10"
            >
              <Vertebrae className="text-brand-gold" />
              <blockquote className="mt-6 flex-1 space-y-4 text-lg leading-relaxed text-ink">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <p className="text-base text-ink-muted">{t.detail}</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5 label text-brand-slate">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA band */}
      <section className="bg-brand-gold">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between lg:py-14">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Suffering from back pain?
            </h2>
            <p className="mt-2 text-ink/70">
              Consult our Gonstead chiropractors today. Open seven days, right next to Sunway
              Velocity.
            </p>
          </div>
          <div className="flex flex-none flex-wrap gap-3">
            <a
              href={clinic.bookingUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-slate-deep"
            >
              Book now
            </a>
            <a
              href={`tel:${clinic.phoneE164}`}
              className="inline-flex items-center justify-center rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold text-ink hover:bg-ink/5"
            >
              Call {clinic.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- FAQs */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Before you book</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Still unsure?{' '}
              <a
                href={clinic.whatsappUrl}
                target="_blank"
                rel="noopener"
                className="font-semibold text-brand-gold-ink underline underline-offset-4"
              >
                Message us on WhatsApp
              </a>{' '}
              and tell us your main concern. We&rsquo;ll advise whether to start with chiropractic
              or physiotherapy.
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {homeFaqs.map((faq) => (
              <details key={faq.q} className="faq group py-5">
                <summary className="flex items-start justify-between gap-6 text-lg font-semibold text-ink">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="faq-sign mt-1 flex-none text-2xl font-light leading-none text-brand-slate transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Visit us */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/img/clinic-reception.webp"
              alt="Reception at Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur"
              width={1600}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              Right next to Sunway Velocity, Cheras.
            </h2>
            <address className="mt-6 not-italic text-lg leading-relaxed text-ink-muted">
              {clinic.address.street}
              <br />
              {clinic.address.locality}, {clinic.address.postalCode} {clinic.address.region}
            </address>

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
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
              <GhostButton href="/book-now">Directions &amp; contact</GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Blog */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the clinic</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                Spine notes, written by our chiropractors.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-brand-slate underline underline-offset-4"
            >
              All articles
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <Image
                    src={postImages[post.slug]}
                    alt={post.title}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                  <p className="mt-5 label text-brand-slate">
                    {new Date(post.datePublished).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-brand-slate">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
