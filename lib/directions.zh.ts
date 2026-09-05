/**
 * Chinese "Locate Us" walkthroughs. Same shape and same `slug`s as `lib/directions.ts`.
 *
 * ⚠️ FIRST-PASS DRAFT, NOT CLIENT-REVIEWED — the same standing as the zh dictionary. Logged
 * in OPEN-ITEMS.md. The route facts are not in question (they came off the client's own
 * slides); the wording is.
 *
 * PLACE NAMES STAY IN LATIN SCRIPT — Cheras, Sunway Velocity, Nanjing Street, Peng Chu,
 * Nurin, Signature 2, Tower B. Per AGENTS.md, confirmed 2026-08-28: a transliterated place
 * name matches neither the Google Business Profile nor the signage a visitor is standing in
 * front of, and mixing English place names into Chinese sentences is how Malaysian Chinese
 * copy actually reads. That matters more here than anywhere else on the site — every one of
 * these names is a thing the reader has to physically spot.
 */
import type { DirectionRoute, DirectionStep } from './directions.ts'

export const directionsZh: readonly DirectionRoute[] = [
  {
    slug: 'driving',
    title: '自驾前来与停车',
    intro: '大部分人都是这样过来的。把车停在楼下停车场，上到 G 层，就在我们这条走廊上。',
    steps: [
      {
        title: '从 Entry E 或 Entry F 进入停车场',
        detail:
          '两个入口都通往 Signature 2 的停车场。我们在 Signature 2，不在商场里面，所以请跟着 Signature 2 的指示牌走，不要走商场入口。',
        image: 'drive-01-parking-entry.webp',
        alt: 'Sunway Velocity Signature 2 的 Entry E 停车场入闸口，以及斜坡旁的 Signature 2 标示',
      },
      {
        title: '搭电梯上到 G 层',
        detail: '电梯口的楼层表上，G 层写的是 Offices 和 Shops。停车场在 B1 到 B3，所以是往上，不是往下。',
        image: 'drive-02-lift-ground-floor.webp',
        alt: 'Sunway Velocity Signature 2 停车场电梯口的楼层指示牌，G 层为办公室与商店',
      },
      {
        title: '沿走廊往 VO6 方向走',
        detail:
          '往正门那一侧走。走对的话，马路对面就是 Nurin 嘛嘛档。跟 NSK 同一排。',
        image: 'drive-03-corridor-vo6.webp',
        alt: 'Signature 2 地面层走廊通往 VO6 座，马路对面可看到 Nurin 嘛嘛档',
      },
      {
        title: '到了',
        detail: '绿色植物墙，蓝色柜台。进来跟前台打声招呼就可以，不用先在别处报到。',
        image: 'drive-04-reception.webp',
        alt: 'Cheras, Kuala Lumpur, Sunway Velocity 的 Persistence Chiropractic Care 前台柜台与绿色植物墙',
      },
    ],
  },
  {
    slug: 'from-the-mall',
    title: '从 Sunway Velocity Mall 步行过来',
    intro: '从商场、轻快铁，或在商场门口下车的话走这条。六个转弯，每一个都有东西可以对。',
    steps: [
      {
        title: '往商场的 NanJing 入口走',
        detail:
          '左边是 Verrona Hills 面包店，右边是 Tous Les Jours。看到这两家就对了；商场入口不止一个，你要的是这个。',
        image: 'mall-01-nanjing-entrance.webp',
        alt: 'Sunway Velocity Mall 内 NanJing 入口两侧的 Verrona Hills 面包店与 Tous Les Jours 咖啡店',
      },
      {
        title: '出了入口，沿 Nanjing Street 一直走',
        detail: '就是挂着红灯笼的露天街道。走到尽头会看到 #NANJING STREET 的立体字。',
        image: 'mall-02-nanjing-street.webp',
        alt: 'Sunway Velocity 的 Nanjing Street，头顶挂满红灯笼，尽头是 Nanjing Street 立体字招牌',
      },
      {
        title: '走到尽头，搭扶手电梯下一层',
        detail: '右手边会看到 “I love Sunway College” 的招牌，扶手电梯在左手边。只下一层。',
        image: 'mall-03-escalator-down.webp',
        alt: 'Nanjing Street 尽头，右边是 Sunway College 招牌，左边是往下的扶手电梯',
      },
      {
        title: '在 Peng Chu 左转，然后一直走',
        detail: 'Peng Chu 是门口摆着花槽的火锅店。过了它就进入有盖走道。',
        image: 'mall-04-turn-left-peng-chu.webp',
        alt: 'Sunway Velocity 的 Peng Chu 餐厅门面，旁边是笔直延伸的有盖走道',
      },
      {
        title: '继续走到 VO6，尽头右转',
        detail: '马路对面会出现 Nurin 嘛嘛档。看到它就左转，剩下一间店面的距离。',
        image: 'mall-05-towards-vo6.webp',
        alt: 'Signature 2 走廊转向 VO6 座，下方马路对面是 Nurin 嘛嘛档',
      },
      {
        title: '到了',
        detail: '玻璃门上方是蓝色的 Persistence Chiropractic 字样。',
        image: 'mall-06-shopfront.webp',
        alt: 'Cheras, Sunway Velocity, Signature 2, VO6-G-02 的 Persistence Chiropractic Care 店面与前台',
      },
    ],
  },
  {
    slug: 'to-sunway-medical',
    title: '前往 Sunway Medical Centre Velocity 照 X 光',
    intro: '如果我们安排你去照片，这是从我们门口走到放射部柜台的路。不必开车。',
    steps: [
      {
        title: '出门左转，一直走到尽头',
        detail: '走在有盖的五脚基下，它贯穿整排店。',
        image: 'smcv-01-turn-left-out.webp',
        alt: 'Signature 2 的 Persistence Chiropractic Care 门外有盖走道，箭头指向左边沿整排店走',
      },
      {
        title: '在路口再左转',
        detail: '转过弯后继续直走，前面就是医院的大楼。',
        image: 'smcv-02-junction-left.webp',
        alt: 'Signature 2 尽头的路口左转，通往 Sunway Medical Centre Velocity',
      },
      {
        title: '跟着红色的 Emergency 指示牌走',
        detail: '牌子挂在天桥下方，就在 Tower B 前面。',
        image: 'smcv-03-emergency-sign.webp',
        alt: 'Sunway Medical Centre Velocity Tower B 旁天桥下方的红色 Emergency 指示牌',
      },
      {
        title: '从 Tower B 的 Emergency 入口进去',
        detail: '进门后墙上的牌子写着 Emergency 往右、Radiology 往左。你要找的是左边的 Radiology。',
        image: 'smcv-04-tower-b-entrance.webp',
        alt: 'Sunway Medical Centre Velocity Tower B 的 Kecemasan Emergency 入口，以及室内的 Radiology 指示牌',
      },
      {
        title: '在放射部柜台登记，等叫号',
        detail: '记得带上我们给你的单子。照完把片子带回来给我们。',
        image: 'smcv-05-radiology-reception.webp',
        alt: 'Sunway Medical Centre Velocity Tower B 的放射部登记柜台',
      },
    ],
  },
]

export const signageZh: readonly DirectionStep[] = [
  {
    title: '正门招牌',
    detail: '在走廊那一侧，玻璃门上方白底蓝字。',
    image: 'signage-front-door.webp',
    alt: 'Cheras, Sunway Velocity, Signature 2 的 Persistence Chiropractic Care 正门玻璃门上方招牌',
  },
  {
    title: '后门招牌',
    detail: '同一间店的另一面，在 Tong Beauty Lab 楼下。一样的门，一样进来就好。',
    image: 'signage-back-door.webp',
    alt: 'Cheras, Sunway Velocity, Signature 2 的 Persistence Chiropractic Care 后门招牌，位于 Tong Beauty Lab 下方',
  },
]
