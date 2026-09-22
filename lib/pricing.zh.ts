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
  /**
   * The three yoga cards, added 2026-09-22 with the English records — see their comment in
   * lib/pricing.ts for why there are three, why none of them is website only and why the drop
   * in card carries no saving.
   *
   * Class names follow the client's own bilingual flyer (椅子瑜伽, 体态核心瑜伽), the same wording
   * the zh yoga page uses. No 治疗 anywhere in these records: a yoga class is not something done
   * to a patient. Unreviewed, like every other zh record.
   */
  {
    slug: 'yoga-drop-in',
    eyebrow: '瑜伽,单堂课',
    name: '瑜伽单堂课',
    description:
      '单堂计费,当天付款。椅子瑜伽与体态核心瑜伽每逢星期六下午四点轮流开课,来之前先问一声这周是哪一堂。',
    price: 55,
    compareAt: 55,
    lines: [{ label: '瑜伽单堂课,椅子瑜伽或体态核心瑜伽', price: 55 }],
    who: '想先上一堂看看、还不急着买配套的人,或者只能偶尔挪出一个星期六的人。没有经验也可以来,也不必是诊所的患者。',
    image: {
      src: '/img/yoga-chair-side-stretch.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care 椅子瑜伽课上,一名微笑的女士坐在折叠椅上,双脚踩着瑜伽砖,单手举过头顶做侧伸展',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    draft: false,
  },
  {
    slug: 'yoga-pack-3',
    eyebrow: '瑜伽,三堂配套',
    name: '瑜伽三堂配套',
    description: '限一人使用,从第一堂算起有效两个月。椅子瑜伽、体态核心瑜伽都能用,混着上也行。',
    price: 138,
    compareAt: 165,
    lines: [{ label: '三堂单堂课,每堂 RM55', price: 165 }],
    who: '想开始上课,但还不想一次排到三个月之后的人。仅限一人使用,不能分给朋友。',
    image: {
      src: '/img/yoga-class-side-angle.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care 瑜伽课上,学员们各自在折叠椅旁做宽步弓箭步,单手向上伸展',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    draft: false,
  },
  {
    slug: 'yoga-pack-6',
    eyebrow: '瑜伽,六堂配套',
    name: '瑜伽六堂配套',
    description: '可以两个人共用,有效三个月。椅子瑜伽、体态核心瑜伽都能用,混着上也行。',
    price: 248,
    compareAt: 330,
    lines: [{ label: '六堂单堂课,每堂 RM55', price: 330 }],
    who: '固定来上课的人,或想结伴同行的两个人,因为一份配套两个人可以一起用。三种之中,平均每堂最划算。',
    image: {
      src: '/img/yoga-class-group.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,七名学员在瑜伽课后微笑合影,身后是一尊银色瑜伽人像和一排放着教具的架子',
    },
    websiteExclusive: false,
    services: ['yoga-classes'],
    offersPageOnly: true,
    draft: false,
  },
]
