/**
 * Chinese bundle copy. Same `Bundle` shape as `lib/pricing.ts`, keyed by the same `slug`.
 *
 * Prices are facts and never change between locales — only the wording around them does, so
 * `price`, `compareAt` and every `lines[].price` must match the English record exactly.
 * `content.test.ts` asserts it, because a bundle that costs RM588 in English and something
 * else in Chinese is not a translation error, it is a different price.
 *
 * 治疗 appears only inside 物理治疗, the name of the discipline — never as a verb for what is
 * done to a patient. See AGENTS.md § Multilingual.
 *
 * Same review contract as the other zh files: adapted from the English record, not yet read
 * by a Chinese-speaking reviewer. Unlike the service pages, this one carries a commercial
 * claim, so flag it for review before any spend points at these pages.
 */
import type { Bundle } from './pricing'

export const bundlesZh: Bundle[] = [
  {
    slug: 'chiro-physio',
    eyebrow: '新患者配套',
    name: '脊骨神经科与物理治疗配套',
    price: 588,
    compareAt: 660,
    lines: [
      { label: '脊骨神经科初诊咨询与首次调整', price: 310 },
      { label: 'X光检查', price: 190 },
      { label: '物理治疗初步评估、首次疗程与居家运动指导', price: 160 },
    ],
    who: '疼痛已经拖了一段时间、还没做过评估的新患者。先由脊椎矫正师评估和调整,再由物理治疗师接手肌力和活动度的部分。',
    image: {
      src: '/img/first-visit-consultation.webp',
      alt: 'Persistence Chiropractic 位于 Cheras, Kuala Lumpur 的诊所内,治疗师在评估过程中托住患者的颈部',
    },
    websiteExclusive: true,
    services: ['chiropractic-care', 'physiotherapy'],
    draft: false,
  },
  {
    slug: 'electromodalities-sports-massage',
    eyebrow: '运动恢复配套',
    /**
     * Renamed 2026-09-12 with the English record ("electromodalities"). 理疗仪器 rather than a
     * literal 电疗: the list includes cupping and taping, which are not electrical, and 理疗 is
     * the everyday Malaysian Chinese word for this category. Draft, unreviewed, like the rest.
     */
    name: '理疗仪器与运动按摩',
    description: '理疗仪器是这次疗程中借助工具的部分。视评估结果而定,可包括拔罐、热敷、超声波、冲击波或贴扎。',
    price: 200,
    compareAt: 240,
    lines: [
      { label: '理疗仪器,单次', price: 120 },
      { label: '运动按摩,六十分钟', price: 120 },
    ],
    who: '训练量大,或旧伤反反复复的人。针对酸痛的肌腱和紧绷的软组织,不需要是新患者。',
    /**
     * Shows one of the modalities being sold (shockwave), as of 2026-09-03. It replaced a
     * shoulder-mobility frame, which in turn replaced this page's own hero; neither depicted any
     * of them. Still the right frame after the 2026-09-12 rename: shockwave is on the list.
     *
     * ⚠️ AI GENERATED, SO THE ALT CLAIMS NO LOCATION. Not a photograph of this clinic, these
     * practitioners or these patients. Naming Cheras here would be a claim about a room that
     * does not exist, and this card sells something for money, which is the worst place on the
     * site to imply provenance it does not have. Swap in a real photograph when one exists.
     *
     * Portrait on purpose. The card crops with object-cover, so the tall frame fills the
     * desktop column and centre-crops to a wide strip on mobile, where the applicator and the
     * leg sit in the middle band.
     */
    image: {
      src: '/img/shockwave-session.webp',
      alt: '戴手套的执行者将冲击波探头贴在病患小腿上',
    },
    websiteExclusive: true,
    services: ['sports-massage', 'sports-injury-rehabilitation'],
    draft: false,
  },
]
