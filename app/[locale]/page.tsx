import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { clinic, googleReviews, hoursDisplayFor } from '@/lib/clinic'
import { LOCALES, isLocale, pathFor, shortTitle } from '@/lib/i18n'
import { pathExistsIn } from '@/lib/locale-availability'
import { publishedConditionsFor } from '@/lib/conditions'
import { publishedServicesFor } from '@/lib/services'
import { publishedPosts } from '@/lib/posts'
import { homeFaqsFor } from '@/lib/faqs'
import { homeIntroFor, offersFor, accreditations } from '@/lib/home'
import { faqSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  Eyebrow,
  GhostButton,
  Vertebrae,
  WhatsAppButton,
  CheckIcon,
} from '@/components/ui'
import { StickyCta } from '@/components/service'
import { GoogleReviews } from '@/components/GoogleReviews'
import { MeetDoctors } from '@/components/MeetDoctors'
import { Preloader } from '@/components/Preloader'
import { HeroGallery } from '@/components/HeroGallery'
import { waMessage } from '@/lib/whatsapp'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/dictionaries/types'

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
 * A function of `dict` rather than a module-level constant since the alt text (real clinic
 * photography) is now localized — see `dict.page.heroSlide*Alt`.
 */
function heroSlidesFor(dict: Dictionary) {
  return [
    { src: '/img/hero-consult-spine-model.webp', alt: dict.page.heroSlideSpineModelAlt },
    { src: '/img/hero-consult-xray.webp', alt: dict.page.heroSlideXrayAlt },
    { src: '/img/hero-consult-lightbox.webp', alt: dict.page.heroSlideLightboxAlt },
    { src: '/img/hero-assessment-nervoscope.webp', alt: dict.page.heroSlideNervoscopeAlt },
  ] as const
}

/**
 * The homepage IS the Cheras page — there is deliberately no /areas/cheras. It already
 * ranks #16 for "chiro cheras" and holds most of the site's referring domains; a second
 * page would compete with it from zero. H1 must contain "Chiropractor in Cheras".
 * LocalBusiness JSON-LD is emitted once in the root layout; FAQPage is emitted here
 * because the answers are rendered here.
 *
 * BAND ORDER IS LOAD-BEARING — do not reshuffle these sections casually.
 *
 *   hero → accreditations → intro/offers → care paths → patient photographs
 *        → testimonials → FAQ → meet the team → blog → visit us
 *
 * The conversion band that used to close the page was removed at the client's request; see
 * the note where it stood. "Visit us" is now the last band, which still means the page ends
 * on the practical facts a "near me" visitor needs rather than on blog thumbnails.
 *
 * The ORDER is still built to handle objections in sequence. The proof pair — patient
 * photographs, then testimonials — answers "does this do anything for people like me"; the
 * FAQ then answers "does it hurt, and what happens on my first visit"; and "visit us"
 * answers the only question a person in pain actually has left — can I get there, and are
 * they open. Proof ahead of the FAQ is deliberate (client request, 2026-08-24): the FAQ is
 * read by someone already half-persuaded, so it works better as the last hesitation to clear
 * than as the first thing a cold visitor is handed. That sequence was the setup for the ask;
 * the ask itself is now carried by the sticky header and, below `lg`, the fixed bar. Keep
 * the order — reshuffling it puts objections after the point they matter.
 *
 * The blog trio stays (it is real internal linking to /blog and those posts need it) but is
 * buried between the proof and the practical close, so it cannot be the final word. The
 * page once ended on three blog thumbnails, which made the last impression an invitation to
 * go and read something. Peak-end says that position carries disproportionate weight, so
 * whatever ends this page should not be a detour.
 *
 * BACKGROUND RHYTHM: slate → white → cream → white → cream → aqua → cream → white → cream
 * → white. No two adjacent bands share a ground; that alternation plus the 1px warm hairline
 * is what makes ten bands legible. If you insert a band, check its neighbours.
 *
 * The cream between the white care paths and the aqua reviews is "patient photographs",
 * added 2026-08-24. It carries no band of its own for that reason — the page ground is
 * already the change of value on both sides.
 *
 * "Meet the team" (white, added 2026-08-11) now sits between the FAQ (cream) and the blog
 * (cream), which is still the only slot on the page leaving a white gap free. It also still
 * lands where it belongs in the sequence: the FAQ answers "does it hurt", this answers "who
 * would be doing it". Do not move it next to the accreditation strip or "visit us" without
 * changing its ground.
 */
/**
 * Social proof for the snippet, not for the page.
 *
 * Search Console (21 Jul – 19 Aug 2026) shows the homepage holding position 3.8 on "chiro
 * cheras", 6.0 on "best chiropractic malaysia" and 7.7 on "best chiropractor in malaysia" —
 * and taking ZERO clicks from any of them across ~300 impressions. We are being seen and not
 * chosen, so the snippet is the thing to fix, not the ranking.
 *
 * The rating already renders on the page via <GoogleReviews>. It was missing from the one
 * place that decides whether the visit happens at all. The nearest competitor puts "700+
 * five-star reviews" in their description; ours said "Open seven days".
 *
 * Gated on `verified` for the same reason the component is: no data means no claim, and a
 * meta description is the worst place to ship an unbacked number because Google may render
 * it verbatim. `count` is a drifting snapshot, so it is written as "224+" — the file that
 * owns it says to treat it as "at least this many".
 */
type Props = { params: Promise<{ locale: string }> }

/**
 * Neither "Cheras"/"Maluri"/"Kuala Lumpur" nor "chiropractor"/"physiotherapy" translated
 * carry any measurable Ubersuggest volume in zh/ms (every direct variant checked — 脊医,
 * 整脊, 脊椎矫正, kiropraktor, klinik kiropraktik cheras — returns 0/mo, MY, locId 2458,
 * checked 2026-08-29). This is not a gap to force a keyword into: the homepage's job is
 * brand + locality identity, same as the English title, which also isn't built around a
 * single high-volume exact-match term. Place names stay in English/Latin script per the
 * sitewide NAP rule.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale = rawLocale
  const dict = await getDictionary(locale)

  /**
   * Social proof for the snippet, not for the page.
   *
   * Search Console (21 Jul – 19 Aug 2026) shows the homepage holding position 3.8 on "chiro
   * cheras", 6.0 on "best chiropractic malaysia" and 7.7 on "best chiropractor in malaysia" —
   * and taking ZERO clicks from any of them across ~300 impressions. We are being seen and not
   * chosen, so the snippet is the thing to fix, not the ranking.
   *
   * The rating already renders on the page via <GoogleReviews>. It was missing from the one
   * place that decides whether the visit happens at all. The nearest competitor puts "700+
   * five-star reviews" in their description; ours said "Open seven days".
   *
   * Gated on `verified` for the same reason the component is: no data means no claim, and a
   * meta description is the worst place to ship an unbacked number because Google may render
   * it verbatim. `count` is a drifting snapshot, so it is written as "224+" — the file that
   * owns it says to treat it as "at least this many".
   */
  const socialProof = googleReviews.verified
    ? locale === 'zh'
      ? ` ${googleReviews.rating.toFixed(1)} 分,来自 ${googleReviews.count}+ 则 Google ${dict.page.googleReviewsSuffix}。`
      : locale === 'ms'
        ? ` Dinilai ${googleReviews.rating.toFixed(1)} daripada ${googleReviews.count}+ ${dict.page.googleReviewsSuffix} Google.`
        : ` Rated ${googleReviews.rating.toFixed(1)} from ${googleReviews.count}+ Google reviews.`
    : ''

  const copy = {
    /**
     * Three locality terms, one character budget. All three survive; the abbreviation pays.
     *
     * seo-strategy.md § Phase 1 prescribes `Chiropractor in Cheras (Maluri), Kuala Lumpur`,
     * which reaches 72 characters with the brand suffix — past what Google renders, so the
     * brand was being truncated on every impression. The fix is NOT to drop a locality. It is
     * to spend "Kuala Lumpur" down to "KL", which lands the whole title at 61.
     *
     * Why the abbreviation is the right thing to cut: we rank 21.5 for "chiropractor kuala
     * lumpur" WITH the full form in this title, and 17.0 for "chiro kl" WITHOUT "KL" in it.
     * Exact-match here is not carrying the ranking, and Google resolves the two as one entity.
     *
     * ⚠️ DO NOT "SIMPLIFY" MALURI OUT OF THIS TITLE. An earlier pass removed it on the grounds
     * that Search Console reports ZERO impressions for any query containing "maluri". That
     * reasoning was wrong twice over. Impressions measure demand × our own visibility, so a
     * zero cannot distinguish "nobody searches it" from "we do not rank for it". And GSC is
     * structurally blind to assistant queries — someone asking ChatGPT "chiropractor near
     * Maluri" generates no impression anywhere in that data, on a site whose brief is AEO and
     * GEO as much as SEO. Maluri is the colloquial name locals actually say out loud; Sunway
     * Velocity sits on the Cheras/Maluri boundary and Maluri is the MRT/LRT interchange.
     *
     * This "keep all three localities" rule applies identically in zh/ms — do not simplify
     * Maluri out of those titles either.
     */
    en: {
      title: 'Chiropractor in Cheras, Maluri, KL',
      description:
        `Gonstead chiropractic and physiotherapy in Cheras, Maluri.${socialProof}` +
        ' Back pain, slipped disc, sciatica. Open seven days.',
    },
    zh: {
      title: 'Cheras, Maluri, KL 脊椎矫正诊所',
      description:
        `Cheras, Maluri 的 Gonstead 脊椎矫正与物理治疗。${socialProof}` +
        '背痛、椎间盘突出、坐骨神经痛。每周七天营业。',
    },
    ms: {
      title: 'Kiropraktor di Cheras, Maluri, KL',
      description:
        `Kiropraktik Gonstead dan fisioterapi di Cheras, Maluri.${socialProof}` +
        ' Sakit belakang, slip disc, sciatica. Buka tujuh hari.',
    },
  }[locale]

  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/',
    locale,
    availableIn: LOCALES.filter((l) => pathExistsIn(l, '/')),
  })
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale

  const dict = await getDictionary(locale)
  const heroSlides = heroSlidesFor(dict)
  const homeIntro = homeIntroFor(locale)
  const offers = offersFor(locale)
  const homeFaqs = homeFaqsFor(locale)
  const conditions = publishedConditionsFor(locale)
  const modalities = publishedServicesFor(locale)
  const posts = publishedPosts().filter((p) => p.heroImage).slice(0, 3)
  const hoursDisplay = hoursDisplayFor(locale)

  return (
    <>
      {/* Backbone reveal — homepage only. Fixed overlay, so it covers the header too
          despite living inside <main>. Plays once per session, then unmounts. */}
      <Preloader homePath={pathFor(locale, '/')} />

      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------------------------------------------------------- Hero */}
      {/**
       * The deep slate field. This is the page's darkest surface and the only full-bleed one,
       * which is what makes the white accreditation strip below it read as a separate band
       * rather than as more hero.
       *
       * Everything on it is white or white-on-opacity: solid white for the h1, /75 for the
       * lead (7.7:1) and /70 for the small print (7.0:1). Both clear AA on #17364a — the
       * reason `--brand-slate-deep` exists as a derived token at all is that the raw brand
       * #2B5672 does not carry white body copy at these sizes.
       *
       * The client's 2026 board briefly put this hero on a light field (Lavender, then
       * Forest, Teal and Sand in turn); that preview was withdrawn on 2026-08-03 and the
       * navy is back. If it is ever revisited, the working is in the git history.
       */}
      <section className="relative bg-brand-slate-deep text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
          <div>
            <Eyebrow tone="light">{dict.page.homeHeroEyebrow}</Eyebrow>

            {/**
             * CLIENT-CHOSEN WORDING, 2026-08-01, picked from a set of options with the
             * trade-offs spelled out. Do not "correct" it — raise it with them.
             *
             * It answers the client's actual objection (the clinic is not chiropractors
             * alone) in the fewest words available, and "under one roof" carries a real
             * benefit rather than a claim: you are not referred out for the other half.
             *
             * ⚠️ ONE RULE STILL BROKEN, deliberately. seo-strategy.md § Phase 1 says this h1
             * MUST contain "Chiropractor in Cheras" contiguously; "Chiropractor and
             * Physiotherapist in Cheras" does not. This page ranks #16 for "chiro cheras"
             * and holds most of the site's referring domains.
             * MITIGATION: the exact phrase survives in the <title> above ("Chiropractor in
             * Cheras (Maluri), Kuala Lumpur"), which is the stronger of the two signals, and
             * the h1 is a weak one by comparison. Watch "chiro cheras" and "chiropractor
             * cheras" in Search Console; if they slip, this is the line to revisit.
             *
             * RESOLVED by this wording: the previous h1 repeated "Physiotherapy in Cheras"
             * verbatim, which is the exact h1 of /services/physiotherapy and its target
             * keyword (kpi-keyword-map.md #5). Naming the *practitioner* rather than the
             * discipline keeps the homepage out of that page's query. Keep it that way — do
             * not let this line drift back toward "Physiotherapy in Cheras".
             *
             * The tail is deliberately NOT the earlier "heal your body naturally". That is an
             * outcome promise on a YMYL page for a clinic that may not advertise treating
             * anything, and it is the class of claim stripped from this site in July and
             * again this session.
             *
             * zh/ms (`dict.page.homeH1`) are natural translations of the same wording and
             * carry the same "under one roof" benefit, but the English-specific mitigation
             * above (the exact phrase surviving in <title>) does not apply to them — their
             * SEO strategy targets real zh/ms search terms, not an English ranking signal,
             * per AGENTS.md § Multilingual, so there is nothing to mitigate.
             */}
            {/* ⚠️ The client asked for this h1 in black on 2026-08-02. That was a decision
                about the Sand field it then sat on; ink is 1.3:1 on the navy and simply
                cannot be read here, so reverting the palette reverted the colour with it.
                The WORDING is untouched. If they want black back, the field has to go light
                again — raise the two together, don't split them. */}
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              {dict.page.homeH1}
            </h1>

            {/* Client's wording, 2026-08-01. "For backs that have waited long enough" was
                cut with it — it was the only line in this viewport addressed to a person in
                pain rather than describing the clinic, so if the hero ever needs more warmth,
                that is the line to bring back.

                Note the repetition it accepts: this is the fourth mention of the disciplines
                and the third "Cheras" on one screen. In body copy that is weak enough not to
                threaten /services/physiotherapy the way an h1 would — but do not let the
                phrase climb back into a heading. */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {dict.page.homeHeroLead}
            </p>

            <div className="mt-8">
              <WhatsAppButton message={waMessage.home(locale)}>{dict.header.enquireOnWhatsapp}</WhatsAppButton>
            </div>

            {/* The first-timer's real question, answered next to the button rather than in
                the fourth collapsed FAQ. States process, never an outcome — assessment
                before adjustment is the Gonstead method (lib/gonstead.ts), not a promise. */}
            <p className="mt-4 text-sm text-white/70">{dict.page.homeAssessmentNote}</p>

            {/**
             * Three facts a "chiropractor near me" visitor checks before anything else.
             *
             * The landmark is now Sunway Medical Centre Velocity rather than the mall, at
             * the client's request. It is the stronger of the two signals: a private
             * hospital is a credibility marker as well as a proximity one, and the mall is
             * already named in the address, the Find us band and the footer, so nothing is
             * lost. It is a statement of distance only — the clinic is independent of the
             * hospital and no line here may imply otherwise.
             */}
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
              {[
                dict.page.homeFactOpenSevenDays,
                dict.page.homeFactRegistered,
                dict.page.homeFactWalkToHospital,
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-brand-gold" />
                  {item}
                </li>
              ))}
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
      <section aria-label={dict.page.accreditationsAriaLabel} className="border-b border-line bg-white">
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
            <Eyebrow>{dict.page.whyPersistenceEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {homeIntro.heading}
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
            {homeIntro.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <div className="pt-2">
              <GhostButton href={pathFor(locale, '/about')}>{dict.page.meetTheTeamLinkText}</GhostButton>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <Link
              key={offer.href}
              href={pathFor(locale, offer.href)}
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
                  {dict.page.learnMore}
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
            <Eyebrow>{dict.page.whereToStartEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.chiropracticOrPhysiotherapy}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{dict.page.carePathsIntro}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-brand-slate-deep p-8 text-white lg:p-10">
              <Vertebrae className="text-brand-gold" />
              <h3 className="mt-5 text-2xl font-bold text-white">{dict.page.chiropracticCardTitle}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{dict.page.chiropracticCardBody}</p>
              {conditions.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={pathFor(locale, `/conditions/${c.slug}`)}
                        className="inline-block rounded-full border border-white/20 px-3.5 py-1.5 text-sm text-white/80 hover:border-brand-gold hover:text-white"
                      >
                        {shortTitle(locale, c.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8">
                <GhostButton href={pathFor(locale, '/services/chiropractic-care')} tone="light">
                  {dict.page.howGonsteadWorks}
                </GhostButton>
              </div>
            </article>

            <article className="rounded-3xl border border-line bg-brand-aqua/50 p-8 lg:p-10">
              <Vertebrae className="text-brand-slate" />
              <h3 className="mt-5 text-2xl font-bold">{dict.page.physiotherapyCardTitle}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{dict.page.physiotherapyCardBody}</p>
              {modalities.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {modalities.map((m) => (
                    <li key={m.slug}>
                      <Link
                        href={pathFor(locale, `/services/${m.slug}`)}
                        className="inline-block rounded-full border border-brand-slate/20 bg-white/60 px-3.5 py-1.5 text-sm text-brand-slate hover:border-brand-slate"
                      >
                        {shortTitle(locale, m.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8">
                <GhostButton href={pathFor(locale, '/services')}>{dict.page.explorePhysiotherapy}</GhostButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Patient photographs */}
      {/* Added 2026-08-24 at the client's request, immediately above the reviews. The
          photographs and the reviews make the same argument in two registers, and the images
          are the half a visitor takes in without stopping to read — so they open the proof
          band rather than sitting only on a service page most homepage visitors never reach.

          Same two composites as /services/chiropractic-care, and the same two rules hold them
          in bounds here. These are the only outcome claims anywhere on the site and an image
          makes its claim silently, so:

          1. THE DISCLAIMER SHIPS WITH THE IMAGES, as a figcaption, never a footnote elsewhere.
          2. THE COPY DESCRIBES THE LINE, NOT A RESULT. Do not reword the caption or the
             standfirst towards "corrected", "straightened" or "improved" — the scoliosis copy
             in lib/conditions.ts says in reviewed text that "the curve itself stays as it is",
             and these photographs must not contradict it two clicks away.

          Page ground (cream): the care paths above are white, the reviews below are aqua. */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{dict.page.patientPhotographsEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.whatAChangeInPostureCanLookLike}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              {dict.page.patientPhotographsHomeIntro}
            </p>
            <div className="mt-8">
              <GhostButton href={pathFor(locale, '/services/chiropractic-care')}>
                {dict.page.howChiropracticCareWorksLinkText}
              </GhostButton>
            </div>
          </div>

          <figure>
            {/* Both pairs on one row, matching the service page. Each file is already a
                composite of two photographs plus a Before/After band, so one row is four
                photographs wide; stacking returns at `sm`, where side by side would be
                unreadable rather than merely small.
                Alt text reuses `dict.page.beforeAfterPostureAlt`/`beforeAfterSpinalCurveAlt`
                — the same strings `/services/chiropractic-care` uses for the same images. */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { src: '/img/before-after-posture.webp', alt: dict.page.beforeAfterPostureAlt },
                { src: '/img/before-after-spinal-curve.webp', alt: dict.page.beforeAfterSpinalCurveAlt },
              ].map((pair) => (
                <div
                  key={pair.src}
                  className="overflow-hidden rounded-3xl border border-line shadow-ambient"
                >
                  <Image
                    src={pair.src}
                    alt={pair.alt}
                    width={1080}
                    height={1350}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 330px"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <figcaption className="mt-6 text-sm leading-relaxed text-ink-muted">
              {/* Carried verbatim from /services/chiropractic-care via
                  `dict.page.patientPhotographsCaption`. The permission sentence is the only
                  published statement that these two patients agreed to their photographs
                  being used; it must ship wherever the photographs do. */}
              {dict.page.patientPhotographsCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------------- Testimonials */}
      {/* Google-review styled, at the client's request, replacing a bespoke two-up quote
          grid that lived only here. `GoogleReviews` is the same component the five service
          pages already use, so there is now one review treatment on the site instead of two
          — and one place to change when the real Google data lands.

          The reviews are REAL as of 2026-08-01 — the client supplied them from the Business
          Profile and lib/sample-reviews.ts is gone, so this renders everywhere rather than
          only on the preview domain. Nothing invented may go back into lib/reviews.ts.

          It keeps its own aqua band. Since 2026-08-24 it sits directly under the patient
          photographs and above the FAQ — cream either side, so the aqua reads as the centre
          of the proof band rather than as a stray tint. */}
      <GoogleReviews dict={dict} />

      {/* ---------------------------------------------------------------- FAQs */}
      {/* "Does it hurt" and "what happens on my first visit" are the objections standing
          between a nervous first-timer and a booking, so they are answered before the page
          reaches the practical close.

          Moved below the proof band 2026-08-24 at the client's request. It now reads to
          someone the photographs and the reviews have already half-persuaded, which is the
          audience these questions are actually written for.

          Sits on the page ground with no band of its own — aqua above and white below, so
          the cream is already the change of value. The 2026 preview gave it a warm Skin tint;
          that went with the rest of the preview. */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>{dict.page.beforeYouBookEyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.frequentlyAskedQuestions}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              {dict.page.stillUnsurePrefix}
              <a
                href={clinic.whatsappUrl}
                target="_blank"
                rel="noopener"
                className="font-semibold text-brand-gold-ink underline underline-offset-4"
              >
                {dict.page.messageUsOnWhatsappLinkText}
              </a>
              {dict.page.stillUnsureSuffix}
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

      {/* ------------------------------------------------------- Meet the team */}
      {/* Who would actually be looking after you — a first-order trust question on a YMYL
          page, and one the homepage previously answered only by sending you to /about.
          Same component the service pages use, so there is one treatment of the team on the
          site rather than two, and it is the visible half of the `employee` block now on the
          clinic's JSON-LD. Every card is gated: registration numbers render only for the
          practitioners the clinic has confirmed, and a missing credentials line stays missing
          rather than being invented (lib/clinic.ts).

          Three links to /about/<slug> is also the homepage's only internal linking into the
          practitioner pages, which are otherwise reachable only via /about.

          It followed the FAQ before 2026-08-24 and still does; only the reviews moved. */}
      <MeetDoctors locale={locale} dict={dict} />

      {/* --------------------------------------------------------------- Blog */}
      {/* Kept for the internal links into /blog, but demoted. It serves someone researching
          chiropractic, not someone deciding tonight, so it must not be the last thing the
          page says.

          Links stay unprefixed (`/blog`, not `pathFor(locale, '/blog')`): the blog route
          itself is English-only sitewide (`if (locale !== 'en') notFound()`), so a
          locale-prefixed link would 404 on zh/ms. Only the surrounding chrome (eyebrow,
          heading, "All articles") is localized — post titles/dates/excerpts stay English,
          same as the blog content model itself. */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{dict.page.fromTheClinicEyebrow}</Eyebrow>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                {dict.page.spineNotesHeading}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-brand-slate underline underline-offset-4"
            >
              {dict.page.allArticlesLinkText}
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <Image
                    src={post.heroImage!.src}
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
              alt={dict.page.receptionAlt}
              width={1600}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Eyebrow>{dict.footer.visit}</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
              {dict.page.rightNextToSunwayVelocity}
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
                {dict.footer.openInGoogleMaps}
              </GhostButton>
              <GhostButton href={pathFor(locale, '/book-now')}>{dict.page.directionsAndContact}</GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- (no CTA band here) */}
      {/* REMOVED at the client's request, 2026-08-01. DESIGN.md still calls the conversion
          band a signature component at the foot of every content page, and it still is —
          on every route except this one. Do not re-add it here without asking them.

          What still carries the ask: the sticky header CTA on desktop, present on every
          scroll position, and the fixed StickyCta bar below `lg`. Both survive, which is
          why removing the band costs less than it looks. What is genuinely lost is the
          restatement at the foot, after "Visit us" has answered "can I get there and are
          they open" — which was the strongest setup for the ask on the page. Watch the CTA
          conversion events (lib/events.ts) before concluding it made no difference. */}

      {/* Mobile booking bar. Below `lg` the header CTA is hidden, which left a phone visitor
          — the primary visitor — with no booking action for roughly five screens. Now that
          the band is gone it is the only in-page ask below `lg`. Same component the service
          pages use. */}
      <StickyCta dict={dict} message={waMessage.home(locale)} />
      {/* Clearance for the fixed bar, in the footer's colour so it reads as the footer
          beginning rather than as an empty band. The homepage had none at all, so the bar
          sat on top of the last line of the footer. */}
      <div aria-hidden="true" className="h-20 bg-brand-slate-deep lg:hidden" />
    </>
  )
}
