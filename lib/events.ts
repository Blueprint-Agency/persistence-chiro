/**
 * Community and corporate event gallery, migrated from the live Wix /our-partners page
 * (the Wix Pro Gallery, 12 items, pulled 2026-07-23). Titles and the facts of each event
 * are from the gallery's own data; blurbs are rewritten to drop the marketing copy's
 * efficacy phrasing ("enhance performance through chiropractic" etc.) per the no-promises rule.
 *
 * These are clinic-activity photos, so alt text carries local modifiers per AGENTS.md.
 *
 * Ordering runs corporate → community → press.
 */

export type Event = { file: string; title: string; blurb: string; alt: string }

export const events: Event[] = [
  {
    file: '/img/events/event-tricor.webp',
    title: 'Ergonomic Health Talk at Tricor Malaysia',
    blurb: 'An ergonomics and spinal-health talk with screening for the Tricor Malaysia team.',
    alt: 'Persistence Chiropractic giving an ergonomics health talk for the Tricor Malaysia team in Kuala Lumpur',
  },
  {
    file: '/img/events/event-adstra-miles.webp',
    title: 'Ergonomic Health Talk at Adstra Miles',
    blurb: 'Kee Shan on ergonomics and spinal health for the Adstra Miles workforce.',
    alt: 'Chiropractor Kee Shan presenting an ergonomics talk for staff at Adstra Miles in Kuala Lumpur',
  },
  {
    file: '/img/events/event-shopee.webp',
    title: 'Shopee Malaysia Wellness Week',
    blurb: 'A talk on ergonomic hazards for office workers during Shopee Wellness Week.',
    alt: 'Persistence Chiropractic at the Shopee Malaysia Wellness Week activation in Kuala Lumpur',
  },
  {
    file: '/img/events/event-anytime-fitness.webp',
    title: "Anytime Fitness 1st Year Anniversary",
    blurb: 'Kee Shan and Hao Ran raising spinal-care awareness with gym members at the anniversary.',
    alt: 'Persistence Chiropractic team at the Anytime Fitness first anniversary in Kuala Lumpur',
  },
  {
    file: '/img/events/event-exoteric.webp',
    title: 'Health Talk for Badminton Players with Exoteric Club',
    blurb: 'A talk for badminton players at Exoteric Club on training load and recovery.',
    alt: 'Persistence Chiropractic team with Exoteric badminton club members in Kuala Lumpur',
  },
  {
    file: '/img/events/event-klwc-yogis.webp',
    title: 'KLWC Health Talk with Yogis',
    blurb: 'A session for yoga enthusiasts, hosted with KL Wellness City.',
    alt: 'Persistence Chiropractic health talk for yoga enthusiasts with KL Wellness City in Kuala Lumpur',
  },
  {
    file: '/img/events/event-move-with-meaning.webp',
    title: 'Move with Meaning — with Yen Ru',
    blurb: 'A spinal-wellness session with Yen Ru for a group of yoga enthusiasts.',
    alt: 'Persistence Chiropractic spinal-wellness session with Yen Ru for yoga enthusiasts in Kuala Lumpur',
  },
  {
    file: '/img/events/event-damai-perdana.webp',
    title: 'Community Talk @ Damai Perdana',
    blurb: 'A community talk by Derek and Kee Shan on spinal health at Damai Perdana.',
    alt: 'Persistence Chiropractic community talk on spinal health at Damai Perdana, Kuala Lumpur',
  },
  {
    file: '/img/events/event-tiratana-talk.webp',
    title: 'Charity Health Talk for Ti-Ratana Welfare',
    blurb: 'A charity talk with Managedcare and Lunox, with complimentary screening for residents.',
    alt: 'Persistence Chiropractic charity health talk for Ti-Ratana Welfare Society in Kuala Lumpur',
  },
  {
    file: '/img/events/event-tiratana-care.webp',
    title: 'Charity Chiropractic Care for Ti-Ratana Welfare',
    blurb: 'Complimentary chiropractic sessions for Ti-Ratana residents, young and old.',
    alt: 'A Persistence chiropractor caring for a Ti-Ratana Welfare resident in Kuala Lumpur',
  },
  {
    file: '/img/events/event-tzu-chi.webp',
    title: "Tzu Chi Health Talk",
    blurb: 'A full-house health talk for the Tzu Chi Buddhist Association, led by Kee Shan.',
    alt: 'Kee Shan giving a health talk for the Tzu Chi Buddhist Association in Kuala Lumpur',
  },
  {
    file: '/img/events/event-going-places.webp',
    title: 'Featured in Going Places Magazine',
    blurb: 'A feature in the September issue of Going Places, Malaysia Airlines’ inflight magazine.',
    alt: 'Persistence Chiropractic featured in Going Places magazine, at the clinic in Cheras, Kuala Lumpur',
  },
]
