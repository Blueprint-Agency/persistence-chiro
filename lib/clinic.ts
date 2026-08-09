/**
 * Single source of truth for NAP + business facts.
 *
 * NAP must be byte-identical everywhere it appears — site copy, JSON-LD, and every
 * external citation (GBP, Yelp MY, Waze, directories). Inconsistent NAP costs local-pack
 * ranking, which is the whole point of this rebuild. Never retype these into a component;
 * import them.
 */

export const clinic = {
  name: 'Persistence Chiropractic Care',
  legalName: 'Persistence Chiropractic Care',

  /**
   * Byte-identical to the Google Business Profile. Do not reformat.
   *
   * ⚠️ "V06" IS A DIGIT ZERO, NOT A LETTER O. It read `VO6` here and in AGENTS.md, PRODUCT.md
   * and proposed-site-architecture.md until 2026-08-01, when a character-level comparison
   * against the live listing caught it and the client confirmed the digit is correct. All
   * four were fixed together.
   *
   * It is one character and it looks like nothing, which is exactly the problem: the two
   * glyphs are near-identical in most UI faces, this string is the single source every page's
   * LocalBusiness schema and every external citation is built from, and a mismatched address
   * is the NAP inconsistency this file's own header warns costs local-pack ranking. If you
   * find yourself "correcting" it back to a letter, check the listing first.
   */
  address: {
    street: 'V06-G-02, Signature 2, Lingkaran SV',
    locality: 'Sunway Velocity',
    region: 'Kuala Lumpur',
    postalCode: '55100',
    country: 'MY',
  },

  geo: { lat: 3.129237, lng: 101.721961 },

  phone: '018-2014088',
  /** E.164 — for tel: links and schema, which must not carry the local format. */
  phoneE164: '+60182014088',
  email: 'info@persistencechiropractic.com',

  /**
   * SweetPew online booking. Retired 2026-07-26 when every CTA became a WhatsApp chat, and
   * REINSTATED 2026-08-01 at the client's request — for the "Book Now" nav item only.
   *
   * ⚠️ ONE CONSUMER: `mainNav()` in lib/nav.ts. Nothing else on the site should reach for
   * this. Every conversion button — hero, CTA band, sticky bar, service pages — stays a
   * WhatsApp conversation, because that is where the clinic actually replies and it is the
   * only path that carries a prefilled message identifying the page the visitor came from
   * (see `waMessage` in lib/whatsapp.ts). Two competing booking systems in one view is how
   * a visitor ends up doing neither.
   *
   * The slug typo ("chiropratic") is SweetPew's own and is correct as written — see
   * AGENTS.md. Do not "fix" it; the corrected spelling 404s.
   */
  bookingUrl: 'https://www.sweetpew.com/en/my/persistence-chiropratic-care',

  /**
   * The short link works for a bare "message us" tap, but prefer the builders in
   * `lib/whatsapp.ts` — wa.link cannot carry a prefilled message and wa.me can, and every
   * CTA on the site sends context with it.
   */
  whatsappUrl: 'https://wa.link/b0541h',

  socials: {
    instagram: 'https://www.instagram.com/persistencechiromy/',
    facebook: 'https://www.facebook.com/Persistence-Chiropractic-Care-107415958154457',
  },

  /**
   * The clinic's own Google Maps short link — it resolves to the actual Business Profile
   * listing, where the previous coordinate search only dropped a pin at lat/lng. Landing
   * on the real listing is what lets a visitor read reviews and tap "Directions", and it
   * ties the citation to the GBP entity Google already ranks.
   */
  mapsUrl: 'https://maps.app.goo.gl/mZYSyTztLbi95GHGA',

  /**
   * schema.org dayOfWeek names. Open 7 days.
   * Mon–Thu & Sat 10:00–20:00 · Fri 10:00–17:00 · Sun 10:00–15:00
   */
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '10:00', closes: '20:00' },
    { days: ['Friday'], opens: '10:00', closes: '17:00' },
    { days: ['Saturday'], opens: '10:00', closes: '20:00' },
    { days: ['Sunday'], opens: '10:00', closes: '15:00' },
  ],
} as const

/**
 * Google Business Profile star rating, for social proof on money pages.
 *
 * ⚠️ GATED LIKE `registrationsVerified`. The review section renders ONLY when `verified` is
 * true, so a fabricated or stale number can never ship on its own.
 *
 * These are filled in and live. To REFRESH them: the summary is readable off the Business
 * Profile knowledge panel (a browser-rendering scrape gets it; the individual review text is
 * lazy-loaded and is not retrievable that way, so those come from the GBP dashboard by hand
 * into lib/reviews.ts). Refresh both together or the count and the quotes disagree.
 *
 * `url` points a "read the reviews" link at the real GBP entity.
 */
export const googleReviews = {
  /**
   * CONFIRMED 2026-08-01 against the live Business Profile: 5.0 from 224 reviews.
   *
   * ⚠️ `count` IS A SNAPSHOT AND WILL DRIFT. It only moves when someone updates this line, so
   * treat it as "at least this many" and refresh it whenever the reviews themselves are
   * refreshed in lib/reviews.ts. If it ever needs to be live, that is the Places API or the
   * Featurable route, not a bigger number typed in here.
   */
  verified: true,
  rating: 5.0,
  count: 224,
  url: clinic.mapsUrl,
} as const

/** Human-readable one-line address. Used in footer + citations. */
export const addressOneLine = [
  clinic.address.street,
  clinic.address.locality,
  `${clinic.address.postalCode} ${clinic.address.region}`,
].join(', ')

/** Display order for the hours table. Mirrors `clinic.hours` — kept adjacent so they can't drift. */
export const hoursDisplay = [
  { label: 'Monday to Thursday', value: '10:00am to 8:00pm' },
  { label: 'Friday', value: '10:00am to 5:00pm' },
  { label: 'Saturday', value: '10:00am to 8:00pm' },
  { label: 'Sunday', value: '10:00am to 3:00pm' },
]

const DAY_SHORT: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}

/** 24h "20:00" -> "8pm", "10:30" -> "10.30am". Minutes only appear when there are any. */
function clock(time: string) {
  const [h, m] = time.split(':').map(Number)
  return `${h % 12 || 12}${m ? `.${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`
}

/** A run of three or more days collapses to a range; one or two are listed. */
function daySpan(days: readonly string[]) {
  return days.length >= 3
    ? `${DAY_SHORT[days[0]]} to ${DAY_SHORT[days[days.length - 1]]}`
    : days.map((d) => DAY_SHORT[d]).join(' & ')
}

/**
 * The whole week on one line: "Mon to Thu & Sat 10am to 8pm · Fri 10am to 5pm · Sun 10am to 3pm".
 *
 * Ranges read "to" rather than taking an en dash. That is the house no-dashes rule applied
 * to rendered copy (AGENTS.md), and this string renders in the header utility bar on every
 * route, so it is about nine characters longer than it used to be. If the strip ever runs
 * out of room, shorten it by dropping a block, not by reinstating the dash.
 *
 * DERIVED from `clinic.hours`, never typed out. The header's utility bar used to carry a
 * hand-written "Mon to Thu, 10am to 8pm", which was both a second copy of the hours and an
 * incomplete one — it silently dropped Friday's earlier close and both weekend days, on the
 * one strip a "chiropractor near me" visitor reads before deciding whether to come today.
 * Opening hours are part of the NAP consistency the local pack scores; a partial second copy
 * is exactly how they drift out of sync with the Google Business Profile.
 *
 * Blocks sharing an open/close pair are merged, so Monday–Thursday and Saturday state their
 * shared 8pm close once. Change `clinic.hours` and this follows.
 */
export const hoursSummary = (() => {
  const byTime = new Map<string, string[]>()
  for (const block of clinic.hours) {
    const key = `${block.opens}-${block.closes}`
    byTime.set(key, [...(byTime.get(key) ?? []), daySpan(block.days)])
  }
  return [...byTime]
    .map(([key, spans]) => {
      const [opens, closes] = key.split('-')
      return `${spans.join(' & ')} ${clock(opens)} to ${clock(closes)}`
    })
    .join(' · ')
})()

/**
 * Professional registrations.
 *
 * Two independent extractions of the live /about-us page disagreed about which chiropractor
 * holds which number — the Wix markup interleaves the team cards — so every number here
 * started out unverified and hidden. A mis-assigned professional registration for a
 * registered healthcare practitioner is not an acceptable error.
 *
 * The gate is therefore PER PRACTITIONER (`registrationsVerified` on each entry below), not
 * global: one confirmed practitioner can publish without dragging two guesses out with them.
 * `true` means the clinic confirmed those exact numbers for that exact person; only then do
 * they render on the cards, the profile page and the Person schema.
 *
 * ALL THREE ARE NOW CONFIRMED and rendering: Valerie Na on 2026-07-28, Kee Shan Lim and Rynn
 * Hoh on 2026-08-09, when the client sent their two cards side by side and said which was
 * whose. That is what the gate was for — the numbers themselves were never in doubt, only the
 * pairing, and a side-by-side is the one form of evidence the interleaved markup could not
 * corrupt. Note the shape it confirmed is asymmetric: Kee Shan holds both an ACM and an MOH
 * number, Rynn holds MOH only.
 *
 * The gate stays, per practitioner, for whoever arrives next.
 *
 * `label` is the full wording the registering body uses, for the profile page. `short` is the
 * card-sized abbreviation — the MOH title alone is longer than a team card is wide.
 */
export type Registration = { label: string; short: string; value: string }

export const acmNo = (value: string): Registration => ({
  label: 'ACM No.',
  short: 'ACM No.',
  value,
})

export const mohTcmNo = (value: string): Registration => ({
  label: 'Registered Practitioner under Traditional and Complementary Medicine Division (MOH)',
  short: 'MOH T&CM',
  value,
})

/** The registrations we are allowed to show. Empty until the clinic confirms that person's. */
export const publishedRegistrations = (p: {
  registrations: readonly Registration[]
  registrationsVerified: boolean
}): readonly Registration[] => (p.registrationsVerified ? p.registrations : [])

/**
 * Founder bio. From the live /about-us page, bar the opening clause.
 *
 * That clause said "founder and principal chiropractor". The client moved the business
 * titles here on 2026-08-01 and out of the `role` line, which now reads plain
 * "Chiropractor" for all three practitioners: founder and director describe what she does
 * for the business, and this is the one place on the site with room to say so without it
 * reading as a clinical rank next to her name. "Principal chiropractor" did not come back
 * with them, deliberately.
 */
export const founderBio = [
  'As the founder and director of Persistence Chiropractic Care, Valerie pursued Chiropractic in a globally renowned university in Melbourne, Australia. Valerie has always had a strong desire to help others. Her fascination with being a chiropractor began when she met a childhood friend who exposed her to the field of chiropractic. Valerie began her voyage into exploration after becoming fascinated by her friend’s stories and knowledge.',
  'Valerie did plenty of research and taught herself the fundamentals of chiropractic in her early days of exploration. From attending webinars and observing numerous chiropractors, she further developed her craft and went on to work with patients struggling with physical pain. She says the best part of the job is when a patient finally recognises what has been driving their problem and knows what to do about it.',
  'Today, Persistence Chiropractic Care cares for people of all ages, pre or post-surgery, and offers acute, chronic, and wellness chiropractic care and adjustments.',
]

/**
 * Every practitioner gets a route, because every team card on /about-us links to one and
 * a card that 404s is worse than a short page.
 *
 * Indexing is a separate question from routing, and it keys off `bio` rather than a
 * hand-set flag — the two cannot drift. All three now have one: Valerie's came off the live
 * site, and the clinic supplied Kee Shan's and Rynn's on 2026-08-09, so all three pages index
 * and sit in the sitemap. That happened on its own when the bios landed; there was no flag to
 * flip, which is the point of deriving it.
 *
 * Keep it derived. If a fourth practitioner arrives without a bio, inventing education or
 * experience for a registered healthcare practitioner is still not an option — their page
 * exists, stays reachable, and goes `noindex` until real copy arrives.
 */
export const hasBio = (p: { bio: readonly string[] }) => p.bio.length > 0

/**
 * Associate chiropractor bios. Supplied by the clinic 2026-08-09, published close to verbatim.
 *
 * Two deliberate departures from the text as it arrived:
 *
 * 1. "Whether treating office workers with neck and back pain" is now "Whether caring for".
 *    The banned-word rule in AGENTS.md covers everything a patient sees, and a bio is not a
 *    disclaimer, so it gets no carve-out. Nothing else in either bio used the word.
 * 2. The em dash before "without relying solely on medication" is a comma. Rendered copy on
 *    this site does not take dashes.
 *
 * `role` stays plain "Chiropractor" for all three. Kee Shan's "Associate Chiropractor" opens
 * his bio instead, which is where the client put "founder and director" on 2026-08-01 for the
 * same reason: a business title next to a name reads as a clinical rank.
 */
export const keeShanBio = [
  'Kee Shan Lim is an Associate Chiropractor at Persistence Chiropractic Care who graduated with a Bachelor of Science (Hons) in Chiropractic from the International Medical University (IMU), Malaysia.',
  'Driven by the belief that everyone deserves to live a healthier and happier life, Kee Shan chose chiropractic because of its natural, hands-on approach to helping people move better, recover from pain, and improve their overall quality of life, without relying solely on medication.',
  'Committed to lifelong learning, Kee Shan regularly attends professional seminars, workshops, and continuing education programmes in both Malaysia and Australia to further refine his clinical skills and stay up to date with the latest developments in chiropractic care. His goal is to provide patient-centred care for individuals of all ages, occupations, and activity levels.',
  'Whether caring for office workers with neck and back pain, active individuals recovering from sports-related injuries, or those simply looking to maintain a healthy spine, Kee Shan believes that every patient deserves to be heard, understood, and cared for with sincerity.',
  'As he continues to grow in his chiropractic career, Kee Shan remains dedicated to delivering high-quality care and helping more people achieve healthier, more active lives through chiropractic.',
]

export const rynnBio = [
  'Rynn is a sports enthusiast and chiropractor with a strong interest in helping individuals move better, perform better, and stay active. His academic background spans neuroscience and chiropractic, having studied at a renowned university in Melbourne and in Malaysia.',
  'His passion for chiropractic grew from his interest in the human anatomy, biomechanics, and the relationship between the nervous system and physical performance. As someone who enjoys sports himself, Rynn developed a strong interest in working with athletes and active individuals, helping them better understand their bodies and manage the physical demands of their sport and daily activities.',
  'He believes that chiropractic care should not only focus on relieving symptoms, but also on understanding the factors contributing to a person’s condition. His approach is centred around helping patients understand their bodies, improve their movement, and take an active role in their recovery and long-term physical health.',
]

/**
 * ⚠️ CHIROPRACTORS ONLY. NO PHYSIOTHERAPIST IS LISTED, AND ONE MUST NOT BE INVENTED.
 *
 * ⚠️ CHIROPRACTORS ARE NOT LICENSED TO DELIVER PHYSIOTHERAPY. Client confirmation,
 * 2026-08-08. So this array cannot stand in for a physiotherapy team, and `<MeetDoctors>`
 * (hardcoded to "Meet your chiropractors") must not render on a physiotherapy page: doing so
 * implies the wrong profession provides the care. /services/physiotherapy therefore sets
 * `practitionersWithheld` in lib/services.ts and shows no team section at all.
 *
 * An earlier version of this note suggested the page could simply "say plainly" that the
 * chiropractors deliver physiotherapy. That was wrong and is recorded here so it is not
 * proposed again.
 *
 * The clinic does employ physiotherapists; they are within their probation period and are not
 * to be named on the site until it ends. Absent is the correct state, not a gap to paper over
 * — the same reasoning as the registration gate below.
 *
 * WHEN THE LIST ARRIVES: add each physio with a `role` of 'Physiotherapist', leave
 * `registrationsVerified` false until their MOH / allied-health numbers are confirmed against
 * the register, give `<MeetDoctors>` a way to filter by role, and un-hardcode its eyebrow and
 * default heading. Then drop `practitionersWithheld` from the physiotherapy entry.
 */
export const practitioners = [
  {
    name: 'Valerie Na',
    role: 'Chiropractor',
    slug: 'valerie-na',
    photo: '/img/valerie-na.webp',
    credentials: 'BAppSc (Chiropractic), BHSc, RMIT University, Melbourne',
    // Supplied by the clinic 2026-07-28 — the only pair confirmed against a named person.
    registrations: [acmNo('ACM-2021-384'), mohTcmNo('CP-PPB2024/10096')],
    registrationsVerified: true,
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    bio: founderBio,
  },
  {
    // Blog bylines give the full name as Kee Shan Lim; the team card says "Kee Shan".
    name: 'Kee Shan Lim',
    role: 'Chiropractor',
    slug: 'kee-shan-lim',
    photo: '/img/kee-shan-lim.webp',
    // From the bio the clinic supplied 2026-08-09, abbreviated to match Valerie's format.
    credentials: 'BSc (Hons) Chiropractic, International Medical University (IMU), Malaysia',
    // CONFIRMED 2026-08-09: the client sent the two cards side by side and named which is
    // whose, which is the one thing the interleaved markup could not settle.
    registrations: [acmNo('ACM-2023-508'), mohTcmNo('CP-PPB2025/18923')],
    registrationsVerified: true,
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    bio: keeShanBio,
  },
  {
    // No ACM number appears on this card — confirm whether one exists.
    name: 'Rynn Hoh',
    role: 'Chiropractor',
    slug: 'rynn-hoh',
    photo: '/img/rynn-hoh.webp',
    /**
     * STILL EMPTY ON PURPOSE. The bio the clinic supplied 2026-08-09 says his background
     * "spans neuroscience and chiropractic, having studied at a renowned university in
     * Melbourne and in Malaysia" — no degree, no institution. This field holds a named
     * qualification from a named university and feeds `description` in the Person schema, so
     * filling it means guessing which degree and which Melbourne university, for a registered
     * healthcare practitioner. The bio carries what we were actually told instead.
     *
     * ASK THE CLINIC for the degree titles and the two universities; then this is one line.
     */
    credentials: '',
    /**
     * CONFIRMED 2026-08-09 alongside Kee Shan's, from the same side-by-side.
     *
     * ONE ENTRY, NOT TWO, AND THAT IS THE CONFIRMED STATE. His card carries the MOH T&CM
     * registration and no ACM number, where Kee Shan's carries both. Do not "restore" an ACM
     * number here from a stray extraction — the absence was checked, not overlooked. See the
     * note on his memberships below.
     */
    registrations: [mohTcmNo('CP-PP2026/15619')],
    registrationsVerified: true,
    /**
     * ⚠️ THIS LIST CLAIMS ACM MEMBERSHIP WHILE THE REGISTRATIONS ABOVE CARRY NO ACM NUMBER.
     *
     * Not impossible — a card need not print every number — but it is the one internal
     * inconsistency left on this page, and `memberships` has no verification gate the way
     * `registrations` does, so nothing else catches it. Both lines came off the same Wix read;
     * only the numbers were confirmed on 2026-08-09.
     *
     * ASK whether Rynn holds ACM membership. If yes, get the number. If no, delete the line.
     */
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    bio: rynnBio,
  },
] as const

/** Practitioners whose page is substantial enough to submit for indexing. */
export const indexablePractitioners = () => practitioners.filter(hasBio)
export const practitionerBySlug = (slug: string) => practitioners.find((p) => p.slug === slug)
