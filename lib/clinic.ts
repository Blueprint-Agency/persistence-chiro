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

  // Byte-identical to Google Business Profile. Do not reformat.
  address: {
    street: 'VO6-G-02, Signature 2, Lingkaran SV',
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

  /** Booking is external (SweetPew). Their slug contains a typo; it is correct as written. */
  bookingUrl: 'https://www.sweetpew.com/en/my/persistence-chiropratic-care',
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

/** Human-readable one-line address. Used in footer + citations. */
export const addressOneLine = [
  clinic.address.street,
  clinic.address.locality,
  `${clinic.address.postalCode} ${clinic.address.region}`,
].join(', ')

/** Display order for the hours table. Mirrors `clinic.hours` — kept adjacent so they can't drift. */
export const hoursDisplay = [
  { label: 'Monday – Thursday', value: '10:00am – 8:00pm' },
  { label: 'Friday', value: '10:00am – 5:00pm' },
  { label: 'Saturday', value: '10:00am – 8:00pm' },
  { label: 'Sunday', value: '10:00am – 3:00pm' },
]

/**
 * ⚠️ REGISTRATION NUMBERS ARE UNVERIFIED — DO NOT PUBLISH UNTIL THE CLINIC CONFIRMS.
 *
 * Two independent extractions of the live /about-us page disagreed about which
 * chiropractor holds which number, because the Wix markup interleaves the team cards.
 * The values below come from the card-by-card read (the more direct of the two), but a
 * mis-assigned professional registration number for a registered healthcare practitioner
 * is not an acceptable error.
 *
 * `registrationsVerified` gates rendering: /about-us shows names, roles and memberships
 * but withholds the numbers until this flips true. Confirm against the ACM register and
 * the MOH T&CM register, then set it.
 */
export const registrationsVerified = false

/** Founder bio. VERBATIM from the live /about-us page. */
export const founderBio = [
  'As a founder and principal chiropractor in Persistence Chiropractic Care, Valerie pursued Chiropractic in a globally renowned university in Melbourne, Australia. Valerie has always had a strong desire to help others. Her fascination with being a chiropractor began when she met a childhood friend who exposed her to the field of chiropractic. Valerie began her voyage into exploration after becoming fascinated by her friend’s stories and knowledge.',
  'Valerie did plenty of research and taught herself the fundamentals of chiropractic in her early days of exploration. From attending webinars and observing numerous chiropractors, she further mastered her craft and was able to bring relief to patients that struggled with physical pain. It brings immense joy to Valerie to see her patients step out of the treatment room feeling like a brand new person.',
  'Today, Persistence Chiropractic Care treats people of all ages, pre or post-surgery, and offers acute, chronic, and wellness chiropractic care and adjustments.',
]

/**
 * `published` gates the individual /about-us/[slug] page — NOT the team card on
 * /about-us, which every practitioner still gets.
 *
 * Only Valerie has a bio and credentials on the live site. The other two have neither,
 * anywhere, and inventing education or experience for a registered healthcare
 * practitioner is not an option. A page carrying nothing but a name, a role and two
 * memberships is exactly the thin page this rebuild exists to avoid, so it stays
 * unbuilt: no route, no nav link, no sitemap entry. Flip `published` once the clinic
 * supplies real bios.
 */
export const practitioners = [
  {
    name: 'Dr. Valerie Na',
    role: 'Director & Principal Chiropractor',
    slug: 'valerie-na',
    photo: '/img/dr-valerie-na.webp',
    credentials: 'BAppSc (Chiropractic), BHSc — RMIT University, Melbourne',
    registrations: ['ACM-2021-384', 'MOH T&CM CP-PPB2024/10096'],
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    bio: founderBio,
    published: true,
  },
  {
    // Blog bylines give the full name as Kee Shan Lim; the team card says "Kee Shan".
    name: 'Dr. Kee Shan Lim',
    role: 'Chiropractor',
    slug: 'kee-shan-lim',
    photo: '/img/dr-kee-shan-lim.webp',
    credentials: '',
    registrations: ['ACM-2023-508', 'MOH T&CM CP-PPB2025/18923'],
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    // No bio or credentials exist for her on the live site or anywhere in this repo.
    bio: [],
    published: false,
  },
  {
    // No ACM number appears on this card — confirm whether one exists.
    name: 'Dr. Rynn Hoh',
    role: 'Chiropractor',
    slug: 'rynn-hoh',
    photo: '/img/dr-rynn-hoh.webp',
    credentials: '',
    registrations: ['MOH T&CM CP-PP2026/15619'],
    memberships: [
      'Gonstead Chiropractic Society Australia',
      'Association of Chiropractic Malaysia',
    ],
    // No bio or credentials exist for her on the live site or anywhere in this repo.
    bio: [],
    published: false,
  },
] as const

export const publishedPractitioners = () => practitioners.filter((p) => p.published)
export const practitionerBySlug = (slug: string) => practitioners.find((p) => p.slug === slug)
