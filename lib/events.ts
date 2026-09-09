/**
 * Community and corporate event gallery, migrated from the live Wix /our-partners page
 * (the Wix Pro Gallery, 12 items, pulled 2026-07-23). Titles and the facts of each event
 * are from the gallery's own data; blurbs are rewritten to drop the marketing copy's
 * efficacy phrasing ("enhance performance through chiropractic" etc.) per the no-promises rule.
 *
 * These are clinic-activity photos, so alt text carries local modifiers per AGENTS.md.
 *
 * Ordering runs newest corporate first, then the migrated Wix set: corporate → community → press.
 */

/**
 * One photo per event was the Wix gallery's limit. Events can now carry more than one —
 * `EventGallery` crossfades them (up to two, see that component) with no JavaScript.
 * The first image is the one shown when motion is reduced, so lead with the strongest.
 */
export type EventImage = { file: string; alt: string }
export type Event = { title: string; blurb: string; images: readonly EventImage[] }

export const events: Event[] = [
  {
    title: 'Corporate Health Talk at Popular Bookstore',
    blurb:
      'A spinal-health talk for the Popular Book Co. team in Kuala Lumpur, with a spine model on hand to show what an adjustment is actually working on.',
    images: [
      {
        file: '/img/events/event-popular-audience.webp',
        alt: 'Popular Bookstore staff at a Persistence Chiropractic corporate health talk in Kuala Lumpur',
      },
      {
        file: '/img/events/event-popular-spine-model.webp',
        alt: 'Persistence Chiropractic explaining the spine with a model at the Popular Bookstore health talk in Kuala Lumpur',
      },
    ],
  },
  {
    title: 'Health Talk at Exform Fitness',
    blurb:
      'A session for Exform Fitness members on screening fall risk in older adults and how the spine and nervous system connect.',
    images: [
      {
        file: '/img/events/event-exform-fall-risk.webp',
        alt: 'Persistence Chiropractic from Cheras, Kuala Lumpur presenting on fall-risk screening for seniors at Exform Fitness',
      },
      {
        file: '/img/events/event-exform-nervous-system.webp',
        alt: 'Persistence Chiropractic from Cheras, Kuala Lumpur presenting on the spine and nervous system at Exform Fitness',
      },
    ],
  },
  {
    title: 'Ergonomic Health Talk at Tricor Malaysia',
    blurb: 'An ergonomics and spinal-health talk with screening for the Tricor Malaysia team.',
    images: [{ file: '/img/events/event-tricor.webp', alt: 'Persistence Chiropractic giving an ergonomics health talk for the Tricor Malaysia team in Kuala Lumpur' }],
  },
  {
    title: 'Ergonomic Health Talk at Adstra Miles',
    blurb: 'Kee Shan on ergonomics and spinal health for the Adstra Miles workforce.',
    images: [{ file: '/img/events/event-adstra-miles.webp', alt: 'Chiropractor Kee Shan presenting an ergonomics talk for staff at Adstra Miles in Kuala Lumpur' }],
  },
  {
    title: 'Shopee Malaysia Wellness Week',
    blurb: 'A talk on ergonomic hazards for office workers during Shopee Wellness Week.',
    images: [{ file: '/img/events/event-shopee.webp', alt: 'Persistence Chiropractic at the Shopee Malaysia Wellness Week activation in Kuala Lumpur' }],
  },
  {
    title: "Anytime Fitness 1st Year Anniversary",
    blurb: 'Kee Shan and Hao Ran raising spinal-care awareness with gym members at the anniversary.',
    images: [{ file: '/img/events/event-anytime-fitness.webp', alt: 'Persistence Chiropractic team at the Anytime Fitness first anniversary in Kuala Lumpur' }],
  },
  {
    title: 'Health Talk for Badminton Players with Exoteric Club',
    blurb: 'A talk for badminton players at Exoteric Club on training load and recovery.',
    images: [{ file: '/img/events/event-exoteric.webp', alt: 'Persistence Chiropractic team with Exoteric badminton club members in Kuala Lumpur' }],
  },
  {
    title: 'KLWC Health Talk with Yogis',
    blurb: 'A session for yoga enthusiasts, hosted with KL Wellness City.',
    images: [{ file: '/img/events/event-klwc-yogis.webp', alt: 'Persistence Chiropractic health talk for yoga enthusiasts with KL Wellness City in Kuala Lumpur' }],
  },
  {
    title: 'Move with Meaning, with Yen Ru',
    blurb: 'A spinal-wellness session with Yen Ru for a group of yoga enthusiasts.',
    images: [{ file: '/img/events/event-move-with-meaning.webp', alt: 'Persistence Chiropractic spinal-wellness session with Yen Ru for yoga enthusiasts in Kuala Lumpur' }],
  },
  {
    title: 'Community Talk @ Damai Perdana',
    blurb: 'A community talk by Derek and Kee Shan on spinal health at Damai Perdana.',
    images: [{ file: '/img/events/event-damai-perdana.webp', alt: 'Persistence Chiropractic community talk on spinal health at Damai Perdana, Kuala Lumpur' }],
  },
  {
    title: 'Charity Health Talk for Ti-Ratana Welfare',
    blurb: 'A charity talk with Managedcare and Lunox, with complimentary screening for residents.',
    images: [{ file: '/img/events/event-tiratana-talk.webp', alt: 'Persistence Chiropractic charity health talk for Ti-Ratana Welfare Society in Kuala Lumpur' }],
  },
  {
    title: 'Charity Chiropractic Care for Ti-Ratana Welfare',
    blurb: 'Complimentary chiropractic sessions for Ti-Ratana residents, young and old.',
    images: [{ file: '/img/events/event-tiratana-care.webp', alt: 'A Persistence chiropractor caring for a Ti-Ratana Welfare resident in Kuala Lumpur' }],
  },
  {
    title: "Tzu Chi Health Talk",
    blurb: 'A full-house health talk for the Tzu Chi Buddhist Association, led by Kee Shan.',
    images: [{ file: '/img/events/event-tzu-chi.webp', alt: 'Kee Shan giving a health talk for the Tzu Chi Buddhist Association in Kuala Lumpur' }],
  },
  {
    title: 'Featured in Going Places Magazine',
    blurb: 'A feature in the September issue of Going Places, Malaysia Airlines’ inflight magazine.',
    images: [{ file: '/img/events/event-going-places.webp', alt: 'Persistence Chiropractic featured in Going Places magazine, at the clinic in Cheras, Kuala Lumpur' }],
  },
]
