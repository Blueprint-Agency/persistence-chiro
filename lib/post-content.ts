import type { ComponentType } from 'react'

/**
 * slug -> MDX body component.
 *
 * Static imports (not `import()` by template string) so Turbopack can resolve every post
 * at build time and the route stays fully prerendered. Adding a post means adding the
 * MDX file, a `posts.ts` entry, and one line here.
 */
import ADeeperUnderstandingOfScoliosis from '@/content/blog/a-deeper-understanding-of-scoliosis.mdx'
import AreHouseChores from '@/content/blog/are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say.mdx'
import BoneHealthWebinar from '@/content/blog/blog-boost-your-bone-health-webinar.mdx'
import MigraineRelief from '@/content/blog/chiropractic-care-a-fresh-perspective-on-migraine-relief.mdx'
import TiRatanaCharityTalk from '@/content/blog/chiropractic-care-charity-talk-for-ti-ratana-welfare.mdx'
import CareForAthletes from '@/content/blog/chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries.mdx'
import StagesOfAWomansLife from '@/content/blog/chiropractic-care-through-the-stages-of-a-woman-s-life.mdx'
import DereksJourney from '@/content/blog/derek-s-journey-with-gonstead-chiropractic-care.mdx'
import ErgonomicChairs from '@/content/blog/health-benefits-of-ergonomic-chairs.mdx'
import LessPainMoreGain from '@/content/blog/less-pain-more-gain-with-regular-chiropractic-care.mdx'
import SleepingWell from '@/content/blog/sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep.mdx'
import SpikeHigher from '@/content/blog/spike-higher-play-longer.mdx'
import ThreeYears from '@/content/blog/three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community.mdx'
import FirstTimeVisit from '@/content/blog/what-to-expect-when-going-to-the-chiropractor-for-the-first-time.mdx'

export const postBodies: Record<string, ComponentType> = {
  'a-deeper-understanding-of-scoliosis': ADeeperUnderstandingOfScoliosis,
  'are-house-chores-a-pain-in-the-back-here-s-what-chiropractors-say': AreHouseChores,
  'blog-boost-your-bone-health-webinar': BoneHealthWebinar,
  'chiropractic-care-a-fresh-perspective-on-migraine-relief': MigraineRelief,
  'chiropractic-care-charity-talk-for-ti-ratana-welfare': TiRatanaCharityTalk,
  'chiropractic-care-for-athletes-optimising-performance-and-preventing-injuries': CareForAthletes,
  'chiropractic-care-through-the-stages-of-a-woman-s-life': StagesOfAWomansLife,
  'derek-s-journey-with-gonstead-chiropractic-care': DereksJourney,
  'health-benefits-of-ergonomic-chairs': ErgonomicChairs,
  'less-pain-more-gain-with-regular-chiropractic-care': LessPainMoreGain,
  'sleeping-well-waking-better-the-key-to-spinal-health-and-quality-sleep': SleepingWell,
  'spike-higher-play-longer': SpikeHigher,
  'three-years-of-gratitude-and-growth-celebrating-wellness-world-spine-day-and-our-community':
    ThreeYears,
  'what-to-expect-when-going-to-the-chiropractor-for-the-first-time': FirstTimeVisit,
}
