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
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  Eyebrow,
  GhostButton,
  Vertebrae,
  WhatsAppButton,
  CheckIcon,
  CtaBand,
} from '@/components/ui'
import { StickyCta } from '@/components/service'
import { Preloader } from '@/components/Preloader'
import { HeroGallery } from '@/components/HeroGallery'
import { waMessage } from '@/lib/whatsapp'

/**
 * Hero gallery. Assessment and consultation only — no adjustment shots.
 *
 * The clinic's second positioning claim is that nothing is touched before it is examined, and
 * a rotating reel of spines being cracked would contradict it in the first viewport, at the
 * exact moment a nervous first-timer decides whether to stay. All three practitioners appear;
 * the nervoscope slide is the one image on the site that shows the Gonstead instrumentation
 * step nothing else illustrates.
 *
 * Exactly four — the CSS keyframes in globals.css divide the loop into four slots.
 */
const heroSlides = [
  {
    src: '/img/hero-consult-spine-model.webp',
    alt: 'Chiropractor explaining spinal anatomy with a spine model to a patient at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
  },
  {
    src: '/img/hero-consult-xray.webp',
    alt: 'Chiropractor talking a patient through their spinal X-ray at Persistence Chiropractic Care in Cheras, Kuala Lumpur',
  },
  {
    src: '/img/hero-consult-lightbox.webp',
    alt: 'Chiropractor pointing out findings on a spinal X-ray lightbox in Cheras, Maluri, Kuala Lumpur',
  },
  {
    src: '/img/hero-assessment-nervoscope.webp',
    alt: 'Gonstead chiropractor running a nervoscope along a patient spine during assessment in Cheras, Kuala Lumpur',
  },
] as const

/**
 * The homepage IS the Cheras page — there is deliberately no /areas/cheras. It already
 * ranks #16 for "chiro cheras" and holds most of the site's referring domains; a second
 * page would compete with it from zero. H1 must contain "Chiropractor in Cheras".
 * LocalBusiness JSON-LD is emitted once in the root layout; FAQPage is emitted here
 * because the answers are rendered here.
 *
 * BAND ORDER IS LOAD-BEARING — do not reshuffle these sections casually.
 *
 *   hero → accreditations → intro/offers → care paths → FAQ → testimonials → blog
 *        → visit us → conversion band
 *
 * The ask sits at the FOOT, after every objection has been handled: the FAQ answers "does
 * it hurt", the testimonials answer "does it work for people like me", and "visit us"
 * answers the only question a person in pain actually has left — can I get there, and are
 * they open. That last one is the strongest possible setup for the booking button, which
 * is why it is the final band before it.
 *
 * The band previously fired mid-page, *before* the FAQ, and the page ended on three blog
 * thumbnails. Peak-end says the last impression carries disproportionate weight, and the
 * last impression was an invitation to go read something instead of to book.
 *
 * The blog trio stays (it is real internal linking to /blog and those posts need it) but is
 * buried between the proof and the practical close, where it cannot be the final word.
 *
 * BACKGROUND RHYTHM: slate → white → cream → white → cream → aqua → cream → white → gold.
 * No two adjacent bands share a ground; that alternation plus the 1px warm hairline is what
 * makes nine bands legible. If you insert a band, check its neighbours.
 *
 * Under the 2026 preview palette the same rhythm reads:
 * forest → white → sand → white → skin → teal → sand → white → gold. The alternation is
 * unchanged; only the hues moved.
 */
// Title is prescribed by seo-strategy.md § Phase 1 — the homepage IS the Cheras page.
export const metadata: Metadata = pageMetadata({
  title: 'Chiropractor in Cheras (Maluri), Kuala Lumpur',
  description:
    'Gonstead chiropractic and physiotherapy in Cheras, Maluri. Registered chiropractors treating back pain, slipped disc, sciatica and sports injury. Open seven days.',
  path: '/',
})

export default function Home() {
  const conditions = publishedConditions()
  const modalities = publishedServices()
  const posts = publishedPosts().filter((p) => postImages[p.slug]).slice(0, 3)

  return (
    <>
      {/* 2026 PALETTE PREVIEW — homepage only, remove to revert.
          Renders nothing. `body:has([data-brand="2026"])` in globals.css picks it up and
          repoints the brand tokens for this route, header and footer included. Every other
          page still renders the current gold/slate palette, so the two can be compared by
          moving between `/` and any other route. */}
      <div data-brand="2026" hidden />

      {/* Backbone reveal — homepage only. Fixed overlay, so it covers the header too
          despite living inside <main>. Plays once per session, then unmounts. */}
      <Preloader />

      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      {/* PREVIEW CHANGE. Forest at its exact board value, per the client — the Lavender
          field was rejected. So the hero stays a dark field and the supporting copy stays
          white, as it was before the palette swap.
          The one thing that had to move: #006980 is lighter than the navy it replaces, and
          white at 70% lands on it at 3.9:1 — under AA. Every muted line here is /85, which
          clears it at 5.0:1. Do not walk those back to /70 or /75 on this ground.
          Note that this leaves the board's 70% primary with no large surface anywhere on
          the page; see the palette block in globals.css. */}
      <section className="relative bg-pc-forest text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
          <div>
            <Eyebrow tone="light">Gonstead chiropractic &middot; Cheras, Maluri</Eyebrow>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Chiropractor in Cheras for backs that have waited long enough.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Drug-free, hands-on chiropractic &amp; physiotherapy in Cheras. Personalised
              treatment and precise spinal adjustments, built around what your assessment
              actually shows.
            </p>

            <div className="mt-8">
              {/* Back to the gold fill now the field is dark: #ffd6a2 on Forest is 4.6:1 and
                  the pale gold is at its best on this ground. */}
              <WhatsAppButton message={waMessage.home}>Book on WhatsApp</WhatsAppButton>
            </div>

            {/* The first-timer's real question, answered next to the button rather than in
                the fourth collapsed FAQ. States process, never an outcome — assessment
                before adjustment is the Gonstead method (lib/gonstead.ts), not a promise. */}
            <p className="mt-4 text-sm text-white/85">
              Your first visit starts with an assessment. Nothing is adjusted until we have
              examined you.
            </p>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">
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
              than an SVG mask — one property, and it survives any aspect ratio. It lives on
              the gallery container now, which crops every slide to the same silhouette. */}
          <HeroGallery slides={heroSlides} />
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
              className="group overflow-hidden rounded-3xl border border-line bg-white shadow-ambient transition-shadow hover:shadow-ambient-raise"
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

      {/* ---------------------------------------------------------------- FAQs */}
      {/* Moved ahead of the conversion band: "does it hurt" and "what happens on my first
          visit" are the objections standing between a nervous first-timer and a booking.
          Asking for the booking before answering them was asking too early.

          PREVIEW CHANGE: given its own Skin-tinted band rather than sitting on the page
          ground. It falls between two white bands, and the board's warm secondary is the
          one colour on it that reads as reassurance rather than as clinical information —
          which is exactly this band's job. */}
      <section className="border-y border-line bg-pc-skin/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
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

      {/* ---------------------------------------------------------- Testimonials */}
      {/* On the aqua tint rather than the cream ground. It sits between the FAQ and the blog,
          both of which are cream, and three identical grounds in a row would collapse the
          band rhythm that makes this page scan. Aqua is the reception-desk colour and the
          same ground the service pages give their reviews — so this is the sitewide pattern,
          not a one-off. */}
      <section className="border-y border-line bg-brand-aqua/40">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <Eyebrow>What our patients say</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Reviews from our patients in Cheras
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-3xl border border-line bg-white p-8 shadow-ambient lg:p-10"
              >
                {/* PREVIEW CHANGE: Forest, not gold. The mark stays gold on the Forest
                    field — pale gold on dark reads beautifully — but #ffd6a2 on a white
                    card is 1.3:1 and the signature simply vanishes. */}
                <Vertebrae className="text-brand-slate" />
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
        </div>
      </section>

      {/* --------------------------------------------------------------- Blog */}
      {/* Kept for the internal links into /blog, but demoted. It serves someone researching
          chiropractic, not someone deciding tonight, so it must not be the last thing the
          page says. */}
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
                    /* Decorative: the <h3> directly below carries the same words, so alt
                       text here made every card announce its title twice. */
                    alt=""
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

      {/* ------------------------------------------------------------ Visit us */}
      {/* The last band before the ask, deliberately. For "chiropractor near me" intent the
          deciding facts are how far away you are and whether you are open — so the address,
          the hours table and the Maps link are the setup, and the gold band is the payoff. */}
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

      {/* ------------------------------------------------------------ CTA band */}
      {/* The shared component, not a hand-rolled copy of it — two implementations of the
          signature conversion band on the one page that has to convert is how the copy and
          the styling drift apart. DESIGN.md puts this at the foot of every content page;
          this page is no longer the exception. */}
      <CtaBand
        heading="Suffering from back pain?"
        body="Message our Gonstead chiropractors today. Open seven days, right next to Sunway Velocity."
        message={waMessage.home}
      />

      {/* Mobile booking bar. Below `lg` the header CTA is hidden and the gold band is most
          of a page away, which left a phone visitor — the primary visitor — with no booking
          action for roughly five screens. Same component the service pages use. */}
      <StickyCta message={waMessage.home} tone="contrast" />
      {/* Clearance for the fixed bar, in the footer's colour so it reads as the footer
          beginning rather than as an empty band. The homepage had none at all, so the bar
          sat on top of the last line of the footer. */}
      <div aria-hidden="true" className="h-20 bg-brand-slate-deep lg:hidden" />
    </>
  )
}
