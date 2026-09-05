/**
 * "Locate Us" — the photo walkthroughs the clinic already hands out on Instagram, rebuilt
 * as real text with the slides beside it.
 *
 * WHY THIS EXISTS AS A PAGE SECTION AND NOT A LINK TO THE CAROUSEL: Signature 2 sits behind
 * Sunway Velocity Mall, the unit is on a corridor with no street frontage, and the mall
 * approach involves an escalator down a floor. "VO6-G-02" is a correct address that does not
 * survive first contact with the building. Every step below is a landmark a first-time
 * visitor can actually see — a bakery, a mamak, a hotpot restaurant — because that is what
 * the clinic's own staff say on the phone.
 *
 * SOURCE: 21 client-supplied slides, "Persistence - How to Find us", received 2026-09-05.
 * Three sets: General Guide (driving/parking), from SV Mall (walking), and clinic → SMCV.
 *
 * ⚠️ FOUR THINGS THE SLIDES GOT WRONG OR LEFT OUT — see OPEN-ITEMS.md:
 *   1. The mall set is numbered 01, 02, 03, 04, 6, 7. There is no slide 5, so there may be
 *      a step missing between "turn left at Peng Chu" and "walk towards VO6".
 *   2. RESOLVED, AND THE SLIDES WERE RIGHT. They print the unit as "VO6-G-02" with a letter
 *      O, which this repo had recorded as a digit zero since 2026-08-01. The client confirmed
 *      the letter on 2026-09-05 and the whole repo now follows the slides, not the other way
 *      round. See the history note in lib/clinic.ts before touching that character again.
 *   3. The Waze/Google Maps slide shows "5.0 (12)" reviews. The profile is at 224. That
 *      slide is deliberately NOT used — the page renders live map links instead.
 *   4. The three title-card slides carry no information and are not used either.
 *
 * NO STEP MAY PROMISE A TIME OR A DISTANCE ("2 minutes from the LRT"). Nobody measured it,
 * and a walking estimate that is wrong for someone in pain is worse than no estimate.
 */
import type { Locale } from './i18n.ts'
import { directionsZh, signageZh } from './directions.zh.ts'
import { directionsMs, signageMs } from './directions.ms.ts'

export type DirectionStep = {
  /** The instruction itself. Reads as an imperative — "Turn left at Peng Chu". */
  title: string
  /** The landmark detail that makes the instruction checkable. Optional: some steps are self-evident. */
  detail?: string
  /** Path under /img/find-us. Every slide is a 1080x1080 square. */
  image: string
  /**
   * Alt text. The slides have their instruction baked into the pixels, so alt has to carry
   * BOTH the photo and the words on it, or a screen-reader user gets the route with holes in
   * it. Local modifiers per AGENTS.md where the shot actually shows the locality.
   *
   * ⚠️ Do not transcribe the shopfront sign's Malay line. It reads "Pusat Rawatan
   * Kiropraktik" — the clinic's registered signage, which the site does not control, but
   * "rawatan" in alt text is copy the site DOES control and the banned-word rule covers alt
   * text explicitly.
   */
  alt: string
}

export type DirectionRoute = {
  slug: string
  /** Section heading. */
  title: string
  /** One line under the heading saying who this route is for. */
  intro: string
  steps: readonly DirectionStep[]
  /**
   * Kept off the page until the copy for that locale has been written, exactly like a
   * `draft` Condition. An absent route is better than an English route under a Malay heading.
   */
  draft?: boolean
}

export const directions: readonly DirectionRoute[] = [
  {
    slug: 'driving',
    title: 'Driving here and parking',
    intro:
      'Most people arrive this way. Park under the building, come up to ground floor and you are on our corridor.',
    steps: [
      {
        title: 'Enter the car park at Entry E or Entry F',
        detail:
          'Both lead to the Signature 2 parking. We are at Signature 2, not inside the mall itself, so follow the Signature 2 markers rather than the mall entrances.',
        image: 'drive-01-parking-entry.webp',
        alt: 'Entry E car park barrier at Signature 2, Sunway Velocity, and the Signature 2 wall marker at the ramp',
      },
      {
        title: 'Take the lift up to G',
        detail:
          'The lift lobby directory lists G as Offices and Shops. Parking runs B1 to B3, so you are coming up, not down.',
        image: 'drive-02-lift-ground-floor.webp',
        alt: 'Car park lift lobby directory at Signature 2 Sunway Velocity showing the G floor for offices and shops',
      },
      {
        title: 'Walk the corridor towards VO6',
        detail:
          'Head for the front door side of the block. You are on the right stretch when the Nurin mamak is across the road from you. Same row as NSK.',
        image: 'drive-03-corridor-vo6.webp',
        alt: 'Ground floor corridor at Signature 2 leading to block VO6, with the Nurin mamak visible across the road',
      },
      {
        title: 'You have arrived',
        detail:
          'Green wall, blue reception counter. Come in and say hello at the front desk; there is nothing to check in on before that.',
        image: 'drive-04-reception.webp',
        alt: 'Reception counter and green wall inside Persistence Chiropractic Care, Sunway Velocity, Cheras Kuala Lumpur',
      },
    ],
  },
  {
    slug: 'from-the-mall',
    title: 'Walking from Sunway Velocity Mall',
    intro:
      'Coming from the mall, the LRT or a drop-off at the mall entrance. Six turns, each with something to look for.',
    steps: [
      {
        title: 'Head for the NanJing entrance',
        detail:
          'Verrona Hills bakery on your left, Tous Les Jours on your right. That pair is the entrance; there are several others and this is the one you want.',
        image: 'mall-01-nanjing-entrance.webp',
        alt: 'Verrona Hills bakery and Tous Les Jours cafe flanking the NanJing entrance inside Sunway Velocity Mall',
      },
      {
        title: 'Go out and keep straight along Nanjing Street',
        detail:
          'The open-air street with the red lanterns. Look for the #NANJING STREET letters at the far end.',
        image: 'mall-02-nanjing-street.webp',
        alt: 'Nanjing Street at Sunway Velocity, red lanterns overhead and the hashtag Nanjing Street sign at the end',
      },
      {
        title: 'At the end, take the escalator down one floor',
        detail:
          'You will see the "I love Sunway College" sign on your right. The escalator is on your left. One floor down only.',
        image: 'mall-03-escalator-down.webp',
        alt: 'End of Nanjing Street showing the Sunway College sign on the right and the escalator down on the left',
      },
      {
        title: 'Turn left at Peng Chu and keep going straight',
        detail:
          'Peng Chu is the hotpot restaurant with the planter boxes out front. Once past it you are on the covered walkway.',
        image: 'mall-04-turn-left-peng-chu.webp',
        alt: 'Peng Chu restaurant frontage at Sunway Velocity with the covered walkway running straight ahead past it',
      },
      {
        title: 'Carry on to VO6 and turn right at the end',
        detail:
          'Nurin, a mamak, comes into view across the road. When you can see it, turn left. You are one shopfront away.',
        image: 'mall-05-towards-vo6.webp',
        alt: 'Corridor turning towards block VO6 at Signature 2, with the Nurin mamak across the road below',
      },
      {
        title: 'You have arrived',
        detail:
          'Look for the blue Persistence Chiropractic lettering above the glass doors.',
        image: 'mall-06-shopfront.webp',
        alt: 'Persistence Chiropractic Care shopfront and reception at VO6-G-02, Signature 2, Sunway Velocity, Cheras',
      },
    ],
  },
  {
    slug: 'to-sunway-medical',
    title: 'Going to Sunway Medical Centre Velocity for your X-ray',
    intro:
      'If we send you for imaging, this is the walk from our front door to the radiology counter. You do not need to drive.',
    steps: [
      {
        title: 'Turn left out of our door and walk to the end',
        detail: 'Stay under the covered five-foot way; it runs the length of the block.',
        image: 'smcv-01-turn-left-out.webp',
        alt: 'Covered walkway outside Persistence Chiropractic Care at Signature 2, arrows pointing left along the block',
      },
      {
        title: 'Turn left again at the junction',
        detail: 'Keep straight once you are round the corner. The medical centre towers are ahead of you.',
        image: 'smcv-02-junction-left.webp',
        alt: 'Junction at the end of the Signature 2 block turning left towards Sunway Medical Centre Velocity',
      },
      {
        title: 'Follow the red Emergency sign',
        detail: 'It hangs under the link bridge, just before Tower B.',
        image: 'smcv-03-emergency-sign.webp',
        alt: 'Red Emergency direction sign under the link bridge beside Tower B at Sunway Medical Centre Velocity',
      },
      {
        title: 'Go in through the Tower B Emergency entrance',
        detail:
          'Inside, the wall sign points Emergency right and Radiology left. You want Radiology, on the left.',
        image: 'smcv-04-tower-b-entrance.webp',
        alt: 'Kecemasan Emergency entrance at Tower B, Sunway Medical Centre Velocity, and the interior Radiology direction sign',
      },
      {
        title: 'Register at the radiology counter and wait to be called',
        detail: 'Bring the form we give you. Come back to us with the images once you are done.',
        image: 'smcv-05-radiology-reception.webp',
        alt: 'Radiology reception counter at Sunway Medical Centre Velocity Tower B',
      },
    ],
  },
]

/**
 * What the shopfront looks like from each side.
 *
 * NOT a route step — it is the check a visitor makes once they think they have arrived, and
 * it is the last thing standing between them and turning around. The unit has frontage on two
 * sides: the front door on the corridor every route above ends on, and a back door under Tong
 * Beauty Lab that people walking the other way reach first and do not recognise as us.
 */
export const signage: readonly DirectionStep[] = [
  {
    title: 'Front door',
    detail: 'On the corridor, blue lettering on a white panel, above the glass doors.',
    image: 'signage-front-door.webp',
    alt: 'Persistence Chiropractic Care front signage above the glass doors at Signature 2, Sunway Velocity, Cheras',
  },
  {
    title: 'Back door',
    detail: 'The other side of the same unit, under Tong Beauty Lab. Same doors, same welcome.',
    image: 'signage-back-door.webp',
    alt: 'Persistence Chiropractic Care rear signage below Tong Beauty Lab at Signature 2, Sunway Velocity, Cheras',
  },
]

/**
 * Which glyph the route card on /book-now draws. Keyed by slug and kept HERE rather than as a
 * field on each `DirectionRoute`, because the icon is a property of the route itself, not of
 * the language it is written in — as a field it would have to be typed identically into three
 * locale files that must never disagree about it.
 *
 * It lives in this file rather than in components/FindUs.tsx for a duller reason: the test
 * runner parses plain TypeScript but not JSX, so a map inside the .tsx cannot be asserted
 * against. `content.test.ts` fails if a route has no entry, so a route added later cannot
 * quietly render a card with a blank square where the icon should be.
 */
export type RouteIcon = 'car' | 'walk' | 'hospital'

export const routeIcons: Record<string, RouteIcon> = {
  driving: 'car',
  'from-the-mall': 'walk',
  'to-sunway-medical': 'hospital',
}

const directionsByLocale: Record<Locale, readonly DirectionRoute[]> = {
  en: directions,
  zh: directionsZh,
  ms: directionsMs,
}

export const directionsFor = (locale: Locale) => directionsByLocale[locale]
export const publishedDirectionsFor = (locale: Locale) =>
  directionsFor(locale).filter((r) => !r.draft)

const signageByLocale: Record<Locale, readonly DirectionStep[]> = {
  en: signage,
  zh: signageZh,
  ms: signageMs,
}

export const signageFor = (locale: Locale) => signageByLocale[locale]
