/**
 * Chinese-language service pages. Same `Service` shape as `lib/services.ts`, keyed by the
 * same `slug` — see `lib/conditions.zh.ts` for the reasoning (identical slugs across
 * locales, `draft`-gated rollout).
 *
 * The physiotherapy page targets 推拿 (tuina) — 2,900/mo, SD 38, the largest real Chinese
 * keyword found in this project's research — HONESTLY: the copy explains that physiotherapy
 * is a distinct, MOH-registered allied-health profession, not traditional Chinese tuina,
 * rather than claiming equivalence. This captures genuinely adjacent search intent (someone
 * looking for hands-on relief for back/shoulder tension) without misrepresenting the
 * service — see the FAQ entry that addresses it directly.
 *
 * "物理治疗" (physiotherapy) and "徒手治疗" (manual therapy) keep 治 as the name of the
 * discipline/technique, the same way English "physiotherapy" is allowed despite the
 * sitewide "never write treat/treatment" rule — see AGENTS.md § Multilingual. Body copy
 * never uses 治疗 as a verb describing what is done to a patient. Confirmed with the user,
 * 2026-08-28: these are the correct medical/professional terms, not a wording to avoid.
 *
 * ⚠️ PLACE NAMES STAY IN ENGLISH: "Cheras", "Maluri", "Kuala Lumpur" — never 增江/马鲁里/
 * 吉隆坡. Confirmed with the user, 2026-08-28: a transliterated Chinese place name doesn't
 * match what the Google Business Profile, Maps, or an actual searcher uses, which is the
 * exact NAP-consistency risk `AGENTS.md` already warns about for the English/Malay copy.
 * Malaysian Chinese sites commonly mix English place names into Chinese sentences this way
 * — it reads as normal, not as an error.
 *
 * Same review contract as the Malay files: adapted from the clinic-reviewed English
 * record, `lastReviewed` left unset, `draft: true` until a Chinese-speaking reviewer has
 * checked the wording.
 *
 * ⚠️ If a `chiropractic-care` entry is added here, it MUST set `dedicatedRoute: true`
 * (matching the English record) — see the note in `lib/services.ts` on why.
 */
import type { Service } from './services'

export const servicesZh: Service[] = [
  {
    slug: 'physiotherapy',
    title: 'Cheras, Kuala Lumpur 物理治疗',
    metaTitle: 'Cheras 物理治疗 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri, Kuala Lumpur,毗邻 Sunway Velocity 的物理治疗服务。先评估,后徒手护理与针对性康复运动。每周七天营业,无需转介信。',
    targetKeyword: '推拿',
    intro:
      'Cheras 的物理治疗,结合徒手护理与针对性的康复运动。许多人在马来西亚搜索「推拿」来寻找舒缓背痛、肩颈紧绷的服务——物理治疗是受马来西亚卫生部认可的专业,做法不完全相同,详情请见下方常见问题。关节恢复较自由的活动度后,运动训练的目标是重建力量与控制能力,帮助您维持这个状态。',
    heroImage: {
      src: '/img/cupping-therapy.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,拔罐疗法施作于病患的上背部',
    },
    ogImage: '/og/cupping-therapy.jpg',
    midImage: {
      src: '/img/therapy-neck.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,物理治疗师为坐着的病患处理颈部与肩膀',
    },
    assurances: ['任何护理方案前先评估', '运动方案针对您的问题设计,非一般讲义', '每周七天营业 · Cheras, Maluri'],
    outcomes: [
      {
        text: '疼痛或僵硬限制了您一天的活动',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: '插图:一名男子手扶颈侧,颈肩肌肉部位标示发亮',
        },
      },
      {
        text: '近期的拉伤或复发,希望获得正确评估',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: '插图:一名男子站在厨房台面前,手扶下背,下背部位标示发亮',
        },
      },
      {
        text: '反复出现、久久未愈的老毛病',
        image: {
          src: '/img/physio-recurring.webp',
          alt: '临床人员在评估时将手轻放于坐着的女性病患肩上',
        },
      },
      {
        text: '受伤或休养一段时间后出现的无力或控制不佳',
        image: {
          src: '/img/physio-weakness.webp',
          alt: '插图:一名女性坐在书桌前,双脚着地,脚踝部位标示发亮',
        },
      },
      {
        text: '真正针对您问题设计的运动,而非一般讲义',
        image: {
          src: '/img/physio-tailored-exercise.webp',
          alt: '一名女性使用弹力带做训练,治疗师握住弹力带的另一端',
        },
      },
    ],
    qualifierConcerns: [
      '疼痛或僵硬影响日常活动',
      '问题反复发作',
      '想要针对自身情况设计的运动',
      '受伤后感觉无力或不稳',
      '不确定自己需要物理治疗还是脊椎矫正护理',
    ],
    comparison: {
      heading: '物理治疗还是脊椎矫正护理?',
      intro: '诚实的答案是要看评估结果,不少病患最终两者都会用到。以下是大致的差别。',
      columns: ['物理治疗', '脊椎矫正护理'],
      rows: [
        { label: '主要着重', a: '力量、控制与身体活动方式', b: '脊椎受限关节的活动方式' },
        {
          label: '首次会诊',
          a: '动作测试与评估,接着是徒手护理与第一组运动',
          b: 'Gonstead 逐节分析,先评估后调整',
        },
        { label: '主要方式', a: '徒手治疗、关节松动术、康复运动', b: '针对特定节段的精准徒手调整' },
        { label: '疗程之间', a: '大部分工作由运动计划承担', b: '通常居家练习较少,但仍可能给予建议' },
        { label: '通常适合', a: '受伤后恢复、无力、活动一再受限', b: '关节感觉卡住,或问题反复出现在同一处' },
      ],
      note: '两者没有绝对哪个更好。若不确定自己需要哪一种,欢迎透过 WhatsApp 告诉我们您的主要困扰,我们会为您指出正确的起点,而不是随意为您安排。',
    },
    citations: [
      {
        claim: '临床指南建议大多数非特异性下背痛应保持活动并采用运动为主的护理方式,而非长期卧床休息。',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim: '马来西亚的物理治疗师在卫生部及相关专业医疗法规框架下执业。',
        source: 'Allied Health Professions Act 2016, Malaysia',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10835829/',
      },
    ],
    fitCheck: {
      rightFor: [
        '您想了解问题的根本原因,而不只是疼痛的位置。',
        '您愿意在疗程之间完成一套简单、针对性的运动。',
        '您希望徒手护理与康复运动能在同一处完成。',
        '若护理方向不对,您希望被转介,而不是被留在无效的疗程中。',
      ],
      notRightFor: [
        '您只想要被动式的疗程,疗程之间不做任何练习——运动正是主要的一环。',
        '您希望在还没被评估前,就先谈好固定的疗程次数。',
        '您想要的是放松性质的按摩或水疗体验,而非临床康复。',
        '您的问题需要先做影像检查或医生诊断。物理治疗不处理骨折、感染或器官疾病,遇到这类情况我们会转介,而不是继续进行。',
      ],
      note: '以上任何一点都不代表您是「难搞」的病患。它只是说明,来我们这里的第一次会诊可能无法满足您真正的需求,我们宁愿一开始就说清楚。如果您想要的是诚实的评估,以及一个您能理解并愿意配合的方案,那正是第一次会诊会提供的。',
    },
    sections: [
      {
        heading: 'Cheras 物理治疗',
        body: '物理治疗诊所位于 Cheras, Maluri 一带,紧邻 Sunway Velocity,每周七天营业。无需转介信,可直接预约。第一次会诊主要是评估:我们会先了解您实际的活动方式,再决定处理方向,让护理真正针对问题根源,而不只是疼痛的位置。之后我们会结合徒手护理与一套小型运动计划,目标是重建力量与控制能力,帮助关节维持较自由的活动度。',
      },
      {
        heading: '精准徒手治疗',
        body: '徒手技巧,包括关节松动术与筋膜放松,能减轻疼痛并改善关节活动度。它最适合作为起点,而非整个方案,先让状况稳定下来,以便展开主动训练。',
      },
      {
        heading: '动作、步态与生物力学评估',
        body: '详细检视姿势、步态与负重时的活动方式,找出真正的影响因素,而不只是疼痛的部位。一处的疼痛,往往源自另一处的活动方式。若鞋款或矫形鞋垫是因素之一,我们也会一并检查。',
      },
      {
        heading: '康复运动方案',
        body: '根据您的状况、目标与日常生活设计渐进式方案。长久的改善多半来自运动训练,因此我们会正确地开立处方,而非给一张通用讲义。方案由小处开始,并随着您逐渐进步而调整。',
      },
      {
        heading: '第一次物理治疗会诊会经历什么',
        body: '第一次会诊主要是评估:病史、加重与缓解因素,以及您的活动方式。接着通常会进行徒手护理,并带回第一组运动。整个过程约需四十五分钟到一小时。',
      },
      {
        heading: '物理治疗或脊椎矫正护理,以及我们如何结合两者',
        body: '大致而言,脊椎矫正护理着重受限关节的活动方式,物理治疗则着重周围的力量与控制。许多人两者都受益,再加上干针,同一屋檐下即可完成,地点就在 Cheras。欢迎透过 WhatsApp 告诉我们您的主要困扰,我们会为您指出起点。',
      },
    ],
    helpsWith: [
      'back-pain',
      'slipped-disc',
      'neck-pain',
      'sciatica',
      'scoliosis',
      'hip-pain',
      'shoulder-imbalance',
    ],
    relatedLinks: [
      { href: '/services/chiropractic-care', label: '比较脊椎矫正护理' },
      { href: '/services/sports-injury-rehabilitation', label: '运动伤害与康复' },
      { href: '/services/dry-needling', label: '针对持续紧绷肌肉的干针' },
      { href: '/services/posture-correction', label: '为办公族设计的姿势调整' },
      { href: '/what-to-expect', label: '第一次会诊会经历什么' },
    ],
    practitionersWithheld:
      "Same gate as the English record — client instruction, 2026-08-08. The clinic's physiotherapists are still within probation and are not to be named yet, and chiropractors are not licensed to deliver physiotherapy. Remove once the clinic supplies the physiotherapist list.",
    faqs: [
      {
        q: '「推拿」和物理治疗一样吗?',
        a: '不完全一样。物理治疗是马来西亚卫生部认可的专业,着重先评估、找出问题根源,再结合徒手护理与针对性的康复运动;传统推拿则着重以手法放松肌肉,通常不包含正式的评估流程或运动处方。如果您是因为背痛、肩颈紧绷而搜索「推拿」,物理治疗的评估流程或许更能找出问题真正的原因。若不确定哪一种更适合,欢迎透过 WhatsApp 告诉我们您的情况。',
      },
      {
        q: '物理治疗评估会经历什么?',
        a: '第一次物理治疗会诊主要是评估。我们会先了解病史,询问什么动作会加重或缓解问题,以及您希望恢复到什么程度,接着检视您实际的活动方式,测试受影响的部位,并检查周围的关节与肌肉。目标是找出真正的问题根源,而不只是疼痛的位置,因为一处的疼痛往往源自另一处的活动方式。之后我们会以简单易懂的方式说明发现,并共同订定方案,通常会结合部分徒手护理与一套小型、针对性的运动计划。',
        links: [{ phrase: '第一次物理治疗会诊', href: '/what-to-expect' }],
      },
      {
        q: '第一次会诊需要多久?',
        a: '大约四十五分钟到一小时,大部分时间用于评估,而非徒手护理。会诊结束时,您应该已经了解我们对状况的判断。',
      },
      {
        q: '第一次物理治疗会诊会痛吗?',
        a: '一般不会造成过度的疼痛。部分测试可能会短暂重现您熟悉的症状,以便我们准确找出问题,但治疗师会在您能承受的范围内进行,您也可以随时要求停止。徒手护理后隔天出现轻微酸痛属常见现象。',
      },
      {
        q: '我需要看几次物理治疗?',
        a: '这取决于问题本身、发生多久,以及运动进展的情况,因此第一次会诊不会给出固定的次数。及早评估往往比拖到问题慢性化需要更少的疗程。我们会在过程中诚实地检视进展,而不是一开始就推销疗程套餐。',
      },
      {
        q: '看物理治疗需要转介信吗?',
        a: '预约无需转介信。若您的情况需要先做影像检查或医生诊断,我们会告知并协助您安排,而不是直接继续进行。',
      },
      {
        q: '会给我居家运动吗?',
        a: '多数情况下会。长久的改善往往来自运动训练,因此我们会开立小型、针对性的方案,并随着您的进步逐步调整,设计上会配合您日常生活的节奏。',
      },
      {
        q: '可以同时进行物理治疗与脊椎矫正护理吗?',
        a: '可以,这里不少病患都是如此。两者着重的方向不同,因此结合使用相当常见:脊椎矫正护理处理受限关节的活动方式,物理治疗则针对周围的力量与控制,而当肌肉是主要因素时,干针也会一并使用。评估会决定从何处开始,以及两者是否都值得使用,若我们认为其中一种已经足够,也会如实告知。',
        links: [{ phrase: '干针', href: '/services/dry-needling' }],
      },
      {
        q: '诊所在 Cheras 哪里?有停车位吗?',
        a: '诊所位于 Maluri 的 Sunway Velocity 发展区内的 Signature 2,属于 Cheras, Kuala Lumpur 一带。开车前来可停在商场停车场,搭乘轻快铁的话,Maluri 站与 Cochrane 站皆在步行范围内。Maluri 是转乘站,安邦线、斯里白沙罗线与加影线皆可抵达。完整地址与地图链接列于每个页面底部。',
      },
      {
        q: '周末有营业吗?',
        a: '有,我们每周七天营业,包括星期日。星期六营业至晚上八点,星期日至下午三点,通常是平日难以安排时段者的最佳选择。星期一至星期四营业至晚上八点,星期五至下午五点。',
        links: [{ phrase: '每周七天营业', href: '/book-now' }],
      },
    ],
    // Flipped for local preview only, at the user's request — still needs a Chinese-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'dry-needling',
    title: 'Cheras, Kuala Lumpur 干针',
    metaTitle: 'Cheras 干针 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri 的干针,针对深层肌肉紧绷与激痛点。先评估后施针,使用单次性无菌针具,不夸大效果。',
    // 针灸的好处和坏处 90/mo,SD 32(Ubersuggest,locId 2458)——马来西亚华人常将 dry
    // needling 与针灸混为一谈,这个词代表真实存在的困惑,而非直译。页面诚实说明两者的差异,
    // 而非借用「针灸」的名号招揽,详见下方常见问题。
    targetKeyword: '针灸的好处和坏处',
    intro:
      'Cheras 的干针,一种神经肌肉技术,以细针进入激痛点与紧绷的肌肉带,这些部位通常单靠徒手护理难以松开。我们把它当作整体方案的一环,而非单独使用,并且只有在评估结果指向肌肉是主要问题时才会采用。',
    heroImage: {
      src: '/img/dry-needling.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,戴手套的执行者为病患上背与肩膀进行干针',
    },
    ogImage: '/og/dry-needling.jpg',
    midImage: {
      src: '/img/dry-needling-session.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,戴手套的执行者将单次性针具置入病患肩膀的激痛点',
    },
    assurances: ['单次性无菌针具,绝不重复使用', '先评估,才施针', '每周七天营业 · Cheras, Maluri'],
    outcomes: [
      {
        text: '肌肉紧绷成结,拉伸或按摩都无法松开',
        image: {
          src: '/img/dn-tight-knot.webp',
          alt: '插图:一名人物的颈部与上背部,肌肉结节部位标示发亮',
        },
      },
      {
        text: '深层肌肉紧绷,与颈部、肩膀或下背问题有关',
        image: {
          src: '/img/dn-deep-tension.webp',
          alt: '插图:一名人物的下背部,深层肌肉紧绷部位标示发亮',
        },
      },
      {
        text: '激痛点反复将疼痛牵引至同一个部位',
        image: {
          src: '/img/dn-trigger-points.webp',
          alt: '插图:一名人物的肩膀出现激痛点,疼痛沿手臂牵引',
        },
      },
      {
        text: '旧伤之后,肌肉持续处于紧绷、过度警戒的状态',
        image: {
          src: '/img/dn-old-injury.webp',
          alt: '插图:一名人物膝盖周围的肌肉,旧伤部位标示发亮',
        },
      },
    ],
    qualifierConcerns: [
      { label: '有一处肌肉结节,一直无法松开', icon: 'knot' },
      { label: '按摩当下有效,隔天又紧绷起来', icon: 'recurring' },
      { label: '颈部或肩膀长期处于紧绷状态', icon: 'neck' },
      { label: '旧伤让某处肌肉一直感觉紧绷、过度反应', icon: 'injury' },
      { label: '之前做过干针,效果不错', icon: 'needle' },
      { label: '对针有点紧张,想先问清楚再说', icon: 'question' },
    ],
    citations: [
      {
        claim: '肌筋膜激痛点被定义为骨骼肌紧绷肌带内高度敏感的点。',
        source: 'McAphee et al. (2022), International Journal of Sports Physical Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9159711/',
      },
      {
        claim: '激痛点干针的调查显示,不良反应通常轻微且短暂,例如酸痛或轻微瘀青。',
        source: 'Brady et al. (2014), Journal of Manual & Manipulative Therapy',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4101552/',
      },
      {
        claim: '在马来西亚,脊椎矫正与物理治疗属于受规范的医疗执业,执行者须具备受认可的资格。',
        source: 'Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    fitCheck: {
      rightFor: [
        '某处肌肉一直紧绷,拉伸与按摩都无法改善,想知道原因。',
        '希望干针是整体方案的一部分,搭配运动或调整一起进行。',
        '重视单次性无菌针具,以及会先了解病史的执行者。',
        '比起被直接施针,更希望在不适合的情况下被诚实告知。',
      ],
      notRightFor: [
        '希望不经评估、直接指定施针部位。',
        '对针具有强烈恐惧感——遇到这种情况,我们宁愿选择其他方式,也不会勉强说服您接受干针。',
        '只想单独做干针,疗程之间不搭配运动或后续追踪。',
        '在找的其实是针灸。针灸使用的针具类似,但取穴方式不同,也不是我们提供的服务。',
      ],
      note: '如果以上有任何一点符合您的情况,不代表我们帮不上忙,只是说明干针可能不是我们会优先建议的起点,而这正是第一次会诊要厘清的事。我们宁愿一开始就指出适合您的方式,而不是顺着您进门时提出的要求去做。',
    },
    sections: [
      {
        heading: 'Cheras 的干针',
        body: '干针是一种神经肌肉技术,以细小的单次性针具进入激痛点与紧绷的肌肉带,这些部位通常单靠徒手护理难以松开。我们把它当作整体方案的一环,而非单独使用,只有在评估结果指向肌肉是主要问题时才会采用。',
      },
      {
        heading: '干针实际上在做什么',
        body: '激痛点是肌肉内一个紧绷、敏感的结节,可能将疼痛牵引到其他部位。针具置入后,常会引发短暂的肌肉抽动反应,代表肌肉正在松开。效果如何,取决于是什么原因让这块肌肉持续紧绷。',
      },
      {
        heading: '一次疗程会经历什么',
        body: '我们会先评估,再将细针置入找到的部位。过程中通常是短暂的抽动感或闷胀感,而非锐痛。单次疗程约十五到三十分钟,并会影响接下来搭配的运动或徒手护理内容。',
      },
      {
        heading: '安全吗?之后要注意什么',
        body: '在受过训练的执行者操作下,干针相当安全,针具皆为单次性无菌针,用后即弃。施针处出现轻微酸痛或小瘀青属常见现象,通常一两天内会自行消退。若您怀孕、正在服用抗凝血药物,或对针具特别抗拒,请事先告知。',
      },
      {
        heading: '如何与其他护理项目搭配',
        body: '干针能舒缓肌肉紧绷,但无法改变让肌肉持续紧绷的习惯或无力状况。在 Cheras 同一屋檐下,我们会将它与脊椎矫正护理及物理治疗搭配使用,由评估决定从何处开始。',
      },
      {
        heading: '大概需要几次疗程',
        body: '这取决于问题存在多久,因此不会在第一次会诊就承诺固定次数。有些人很快就感觉到变化,有些则需要数周的持续搭配。我们会随着进度诚实检视状况,而不是一开始就推销套餐。',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'shoulder-imbalance', 'sciatica'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: '干针如何与物理治疗搭配' },
      { href: '/services/chiropractic-care', label: '与脊椎矫正护理比较' },
      { href: '/what-to-expect', label: '第一次会诊会经历什么' },
    ],
    faqs: [
      {
        q: '干针需要转介信吗?',
        a: '不需要,您可以直接在 Cheras 预约。我们会先评估再决定是否施针,若发现干针不适合您的情况,会如实告知。',
      },
      {
        q: '第一次疗程要多久?',
        a: '大约四十五分钟到一小时,大部分时间用于评估,而非施针。会诊结束时,您应该已经了解我们对状况的判断。',
      },
      {
        q: '干针和针灸一样吗?',
        a: '不一样。干针(英文称 dry needling)是源自西方、以解剖学为基础的技术:将细小的单丝针具直接置入肌筋膜激痛点——也就是紧绷肌带内一个高度敏感的小结节——目的是松开该处的紧绷,过程中不会注射任何药物,这也是英文「dry」(不注射)这个字的由来。针灸则源自中医,使用类似的针具,但取穴方式是沿着经络,而非依据肌肉解剖位置。在这里,干针是评估后方案中的其中一项工具,而不是单独存在的疗法。',
        links: [{ phrase: '评估后方案', href: '/what-to-expect' }],
      },
      {
        q: '干针会痛吗?',
        a: '多数病患形容是短暂的抽动感或闷胀感,而非锐痛。施针后出现轻微酸痛属常见现象,通常一天内会消退。若感觉超出不适的范围,请随时告知执行者,力道与手法都可以调整或立即停止。',
      },
      {
        q: '需要做几次干针?',
        a: '这取决于肌肉紧绷存在多久,以及是什么原因让它持续紧绷,因此第一次会诊不会给出固定次数。有些人很快就感觉到变化,有些则需要数周搭配运动持续进行。我们会随着进度诚实检视状况,而不是一开始就推销固定套餐。',
      },
      {
        q: '针具安全吗?会重复使用吗?',
        a: '针具绝不重复使用。我们采用单次性无菌针具,使用一次后即弃。在受过训练的执行者操作下,干针相当安全,不过施针处出现轻微酸痛或小瘀青属正常现象。',
      },
      {
        q: '干针安全吗?有副作用吗?',
        a: '由受过训练的执行者使用单次性无菌针具操作,一般认为是安全的。常见的反应多半轻微且短暂:施针处暂时酸痛,偶尔出现小瘀青,通常一两天内会消退。之后可以正常饮食、工作与运动。我们会先了解您的病史,因为在怀孕、服用影响凝血功能的药物,或对针具有强烈恐惧等情况下,我们会选择其他方式。通常也会搭配特定的运动,让松开的肌肉有理由维持在这个状态。',
        links: [{ phrase: '特定的运动', href: '/services/physiotherapy' }],
      },
      {
        q: '干针能处理什么问题?',
        a: '最常见的情况是:某处肌肉一直紧绷、拉伸按摩都无法改善;激痛点反复将疼痛牵引到同一个部位;或旧伤让某处肌肉持续处于紧绷、过度警戒的状态。常用于颈部、肩膀与下背部,也会搭配用于坐骨神经痛、肩膀不平衡等情况的护理。施针能舒缓紧绷的肌肉,但单靠它无法改变让肌肉持续紧绷的习惯、无力或关节活动受限,因此在评估结果指向这个方向时,我们会搭配脊椎矫正护理一起进行。',
        links: [
          { phrase: '坐骨神经痛', href: '/conditions/sciatica' },
          { phrase: '肩膀不平衡', href: '/conditions/shoulder-imbalance' },
          { phrase: '脊椎矫正护理', href: '/services/chiropractic-care' },
        ],
      },
      {
        q: '应该做干针还是脊椎矫正调整?',
        a: '这取决于评估的结果,而且两者经常是搭配使用,而非二选一。大致来说,干针处理的是紧绷、敏感的肌肉,调整处理的是脊椎关节的活动方式。若不确定,欢迎透过 WhatsApp 告诉我们您主要的困扰,我们会为您指出正确的起点。',
      },
    ],
    // Client request 2026-08-09, menu only and deliberately so: the page stays live, indexed
    // and bookable, and "(Coming Soon)" is a title for now. Same client instruction applies
    // per locale — see the English record.
    navBadge: '(即将推出)',
    // Flipped for local preview only, at the user's request — still needs a Chinese-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    slug: 'posture-correction',
    title: 'Cheras, Kuala Lumpur 驼背与姿势调整',
    metaTitle: 'Cheras 驼背姿势调整 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri 为办公族提供的姿势评估与调整。坐姿、办公桌摆设与针对性运动,给您诚实的期望。',
    // 驼背 720/mo,SD 57(Ubersuggest,locId 2458)——比「驼背矫正」(30/mo,SD 62)搜索量
    // 高出许多,难度反而更低。
    targetKeyword: '驼背',
    intro:
      '为 Cheras 办公族设计的姿势调整。我们评估您实际坐着与活动的方式,再结合力量训练与实际可行的办公桌调整,让较好的姿势变得可以维持下去,而不是需要一直提醒自己的事。',
    heroImage: {
      src: '/img/posture-assessment.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师检查坐着病患的上背与姿势',
    },
    ogImage: '/og/posture-assessment.jpg',
    midImage: {
      src: '/img/nervoscope-assessment.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,nervoscope 沿病患脊椎移动的特写',
    },
    assurances: ['姿势经过评估,而非猜测', '真正能维持下去的办公桌调整', '每周七天营业 · Cheras, Maluri'],
    outcomes: [
      {
        text: '一整天坐在办公桌前累积的颈肩紧绷',
        image: {
          src: '/img/posture-desk-tension.webp',
          alt: '插图:一名男子傍晚在办公桌前捏着自己的颈部,颈肩肌肉部位标示发亮',
        },
      },
      {
        text: '您注意到的头部前倾或圆肩',
        image: {
          src: '/img/posture-forward-head.webp',
          alt: '一名站立男子的侧面,头部超出红色垂直参考线,肩膀呈圆拱状',
        },
      },
      {
        text: '活动时会缓解、久坐后又出现的僵硬感',
        image: {
          src: '/img/posture-sitting-stiffness.webp',
          alt: '插图:一名女子从办公桌起身时扶着下背,下背部位标示发亮',
        },
      },
      {
        text: '真正能维持下去的实际办公桌调整',
        image: {
          src: '/img/posture-workstation.webp',
          alt: '一名男子在家中办公桌旁调整螢幕高度,一旁是人体工学椅',
        },
      },
      {
        text: '力量训练,让维持较好的姿势不再需要刻意费力',
        image: {
          src: '/img/posture-hold-position.webp',
          alt: '一名女子在明亮的运动室内,于胸口高度拉开弹力带',
        },
      },
    ],
    qualifierConcerns: [
      '一整天坐在办公桌前后,颈肩会酸痛',
      '注意到自己头部前倾或肩膀圆拱',
      '久坐后身体会变得僵硬',
      '想要办公桌摆设方面的建议',
      '试过姿势矫正带但没有效果',
    ],
    citations: [
      {
        claim: '当代物理治疗研究质疑「单一正确姿势」的概念,转而强调活动与变化的重要性。',
        source: 'O’Sullivan et al., research on posture and back pain',
        url: 'https://bjsm.bmj.com/content/54/12/698',
      },
      {
        claim: '长时间静态久坐与肌肉骨骼不适有关,一般建议定时起身活动。',
        source: 'Chartered Society of Physiotherapy guidance',
        url: 'https://www.csp.org.uk/public-patient/keeping-active-healthy',
      },
    ],
    fitCheck: {
      rightFor: [
        '您想知道姿势中哪些部分实际能改变、哪些不能。',
        '您愿意进行力量与活动度训练,而非依赖矫正带。',
        '您想要一整天工作中真正能维持的办公桌调整。',
        '您希望运动方案由评估决定,而非一份通用清单。',
      ],
      notRightFor: [
        '您想要一劳永逸、完全不费力就能维持的完美姿势。',
        '您想在还没被观察实际活动方式前,就先谈好固定的疗程次数。',
        '您想要矫正带或器材,而非需要力量与习惯训练来维持姿势。',
        '您有脊柱侧弯等结构性弯曲,并希望它被矫正回来。护理能帮助舒适度与活动度,弯曲本身则维持原状。',
      ],
      note: '以上任何一点都不代表您是「难搞」的病患。它只是说明,您期望的与姿势调整实际能做到的是两回事,我们宁愿在您付费之前就说清楚。真正会有反应的,通常是舒适度、耐力,以及维持较好姿势所需的费力程度,第一次会诊正是用来确认哪一项适用于您。',
    },
    sections: [
      {
        heading: 'Cheras 的姿势调整',
        body: '为 Cheras 办公族设计的姿势调整。我们评估您实际坐着与活动的方式,再结合力量训练与实际可行的办公桌调整,让较好的姿势变得可以维持下去,而不是需要一直提醒自己的事。多数来我们这里的病患,一天大部分时间都对着螢幕。',
      },
      {
        heading: '姿势评估',
        body: '我们观察您坐、站与活动的方式,而不只是拍一张照片。一整天工作下来您如何撑住姿势,比诊所里三十秒的观察更能说明问题。我们也会检查力量与活动度不足的地方。',
      },
      {
        heading: '头部前倾与圆肩',
        body: '我们在办公族身上最常见的型态,是头部逐渐前倾、肩膀往内圆拱,背后通常伴随僵硬的上背。这是多年对着螢幕累积而成,并非一夜之间发生。重要的是找出哪些部位紧绷、哪些无力,哪些只是习惯。',
      },
      {
        heading: '坐姿与办公桌摆设',
        body: '根据您实际的工作方式,对椅子高度、螢幕位置与办公桌摆设做出实际的调整。多数办公族的不适,来自维持同一个姿势太久,因此常常起身活动,比找到「完美姿势」更重要。',
      },
      {
        heading: '矫正运动',
        body: '针对撑住一整天姿势的肌肉,设计的力量与活动度训练。单靠一种方式无法单独改变姿势,因此运动是疗程之间真正在起作用的部分。不需要花很长时间,规律才是重点。',
      },
      {
        heading: '姿势调整能做到什么、不能做到什么',
        body: '老实说:舒适度与耐力通常会改善,维持较好姿势也会随时间变得较不费力。我们无法承诺的是永久重塑固定的结构,或给您一个自动维持的完美姿势。您的脊椎矫正师会告诉您,对您而言什么是实际可行的。',
      },
    ],
    helpsWith: ['neck-pain', 'shoulder-imbalance', 'back-pain'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: '我们的物理治疗方式' },
      { href: '/services/chiropractic-care', label: '脊椎矫正护理如何帮助' },
      { href: '/what-to-expect', label: '第一次会诊会经历什么' },
    ],
    faqs: [
      {
        q: '姿势真的能被矫正吗?',
        a: '不是多数人以为的那种方式。舒适度与耐力通常会改善,大家也常发现自己能撑住较好的姿势更久才开始费力。任何护理都无法承诺永久重塑固定的结构,或给您一个自动维持的完美姿势。我们宁愿诚实说明这点,专注在真正会有反应的部分,通常是力量、活动度与习惯,脊椎矫正师会诚实告诉您,您的情况可能改变什么、不会改变什么。',
      },
      {
        q: '我一整天坐在办公桌前,这是原因吗?',
        a: '久坐是常见的成因之一,但很少是唯一原因。多数办公族的不适,问题出在维持同一个姿势太久,而不是单一个「错误」姿势,因此常常活动往往比找到完美的摆设更重要。我们会结合实际的办公桌调整与力量训练,因为您能在一整天工作中维持住的姿势,才是真正算数的姿势。',
        links: [{ phrase: '力量训练', href: '/services/physiotherapy' }],
      },
      {
        q: '哪些运动对头部前倾和圆肩有帮助?',
        a: '最常见的有四种。收下巴运动,是将下巴水平往后收而非往下压,能锻炼撑住头部在肩膀正上方的深层颈屈肌;门框胸部伸展能打开将肩膀往前拉的胸肌;墙壁天使运动,背贴墙面让手臂沿墙滑动,能训练上背伸展与肩胛骨的活动;上斜方肌伸展能舒缓一整天对着螢幕累积的颈肩紧绷。这些是常见的起点,而非固定处方,哪些适合您、顺序与频率如何,正是评估要确认的事。',
        links: [{ phrase: '评估要确认的事', href: '/what-to-expect' }],
      },
      {
        q: '是我的椅子的问题吗?',
        a: '单靠椅子的情况较少见。维持同一个姿势的时间,往往比椅子本身更关键,坐在昂贵的椅子上四小时不动一样不算解决方案。把摆设大致调整好,然后常常活动。',
      },
      {
        q: '姿势矫正带有帮助吗?',
        a: '矫正带可以当作提醒,但它无法锻炼出不靠它也能维持姿势所需的力量,长期依赖矫正带而不经评估,我们并不建议。购买前请先询问您的脊椎矫正师。',
      },
      {
        q: '多久才会感觉到改变?',
        a: '这取决于这个型态存在多久,以及您执行运动的持续程度。许多人在几周内就感觉更舒适,但不假思索地维持较好姿势则需要更长时间。我们会随着进度检视并调整方案,而不是一开始就承诺一个时间表。',
      },
      {
        q: '姿势问题该看脊椎矫正师还是物理治疗师?',
        a: '这取决于评估的发现,姿势调整通常两者都会用到。大致来说,脊椎矫正护理处理僵硬关节的活动方式,物理治疗则建立维持较好姿势所需的力量与控制。若不确定,欢迎透过 WhatsApp 告诉我们您主要的困扰,我们会为您指出正确的起点。',
      },
      {
        q: '整天坐着的话,多久该起身一次?',
        a: '一般建议大约每三十分钟一次,起身站一下也算数。重点不在数字,而是没有任何姿势应该维持好几个小时,而且短暂但频繁的休息,通常比长但少的休息更有效。设定重复提醒,对多数人而言比靠自己记得更有用。',
      },
      {
        q: '我在家用笔电工作,可以帮我吗?',
        a: '可以,笔电是我们最常见到的办公配置之一。常见的起点很简单:螢幕上缘接近视线高度,让颈部不必整天维持前屈;手肘约呈直角,肩膀放松而非耸起;双脚平放地面或踏在脚踏上;螢幕距离约一个手臂长。笔电本身很难同时满足这些条件,因为螢幕与键盘想要在两个不同的位置,因此常见的解决方式是笔电架搭配独立键盘,或使用外接螢幕。请告诉我们您实际的工作配置与坐姿,针对您没有的办公桌给建议帮助不大。',
      },
    ],
    draft: false,
  },
  {
    slug: 'chiropractic-care',
    title: 'Cheras, Kuala Lumpur 脊椎矫正护理',
    metaTitle: 'Cheras 脊椎矫正护理 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri 的 Gonstead 脊椎矫正。逐节脊椎评估,精准调整,针对骨骼与身体排列,而非笼统的整套推拿。',
    // 正骨 1,600/mo,SD 40(Ubersuggest,locId 2458)——马来西亚华人常搜索的是「正骨」而非
    // 「脊医」或「整脊」(两者皆为 0/mo)。诚实处理这个相邻的搜索意图:内容清楚说明脊椎
    // 矫正护理是受马来西亚卫生部规范的专业,与传统正骨不完全相同,详见下方 FAQ,而非借用
    // 「正骨」的名号招揽,与 推拿/物理治疗 页面采用相同的诚实处理方式。
    targetKeyword: '正骨',
    intro:
      'Cheras 的 Gonstead 脊椎矫正护理。我们先逐节评估脊椎,才进行任何调整,确保处理的方向真正针对造成您问题的那一节,而这未必是您感觉疼痛的位置。',
    heroImage: {
      src: '/img/adjustment-back.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师双手放在病患下背部,准备进行调整',
    },
    ogImage: '/og/chiropractic-care.jpg',
    midImage: {
      src: '/img/consultation-assessment.webp',
      alt: '在 Cheras, Kuala Lumpur,Gonstead 脊椎矫正师在调整前评估脊椎排列',
    },
    assurances: [
      '逐节评估后才进行任何调整',
      '若脊椎矫正护理不是正确的处理方式,我们会如实告知',
      '每周七天营业 · Cheras, Maluri',
    ],
    outcomes: [
      {
        text: '想要逐节评估的背痛、颈痛或关节疼痛',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: '插图:一名男子手扶颈侧,颈肩肌肉部位标示发亮',
        },
      },
      {
        text: '反复发作、希望了解成因而非只是掩盖症状的问题',
        image: {
          src: '/img/hero-consult-xray.webp',
          alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师为病患讲解脊椎 X-ray',
        },
      },
      {
        text: '精准的调整,而非笼统的整套推拿',
        image: {
          src: '/img/adjustment-hip.webp',
          alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师在诊疗台上为病患处理髋部',
        },
      },
      {
        text: '想知道 Gonstead 方式是否适合自己的情况',
        image: {
          src: '/img/hero-consult-spine-model.webp',
          alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师用脊椎模型为病患讲解脊椎结构',
        },
      },
    ],
    qualifierConcerns: [
      '我有背痛、颈痛或关节疼痛',
      '我的问题反复发作',
      '我想了解真正的成因',
      '我是运动员,想管理运动伤害或提升表现',
      '我怀孕或带着孩子,想要温和的评估',
      '我没有特定问题,但对保健护理有兴趣',
      '我好奇脊椎矫正护理是否适合我的情况',
    ],
    citations: [
      {
        claim: '对于非特异性脊椎疼痛,常规影像检查并非必要,只有在有明确临床指征时才建议进行。',
        source: 'NICE guideline NG59, Low back pain and sciatica',
        url: 'https://www.nice.org.uk/guidance/ng59',
      },
      {
        claim: '脊椎矫正是受规范的医疗执业;在马来西亚,执业者依卫生部框架注册。',
        source: 'Association of Chiropractic Malaysia; Ministry of Health Malaysia',
        url: 'https://www.moh.gov.my/en/corporate-info/division-information/traditional-and-complementary-medicine-division',
      },
    ],
    fitCheck: {
      rightFor: [
        '您希望问题先经过逐节评估,才进行任何调整。',
        '您希望在评估结果不适合当天调整时,被诚实告知。',
        '您想了解是什么让问题反复出现,而不只是暂时缓解。',
        '您想要针对相关节段的精准调整,而非笼统的整套推拿。',
      ],
      notRightFor: [
        '您希望不经评估就直接被调整。',
        '您期望每次会诊都以「咔」一声结束,不论评估结果如何。',
        '您希望在还没被检查前,就先谈好固定的疗程次数或承诺的结果。',
        '您的问题不属于机械性问题。脊椎矫正护理不处理感染、骨折或器官疾病,遇到这类情况我们会转介,而不会为您调整。',
      ],
      note: '以上任何一点都不代表您是「难搞」的病患。它只是说明,来我们这里的第一次会诊可能无法满足您真正的需求,我们宁愿现在就说清楚,也不愿让您为一次没有帮助的会诊付费。如果您想要的是先经过评估,再获得关于是否适合调整的诚实答案,那正是第一次会诊会提供的。',
    },
    helpsWith: ['back-pain', 'slipped-disc', 'sciatica', 'neck-pain', 'scoliosis'],
    relatedLinks: [
      { href: '/what-to-expect', label: '第一次会诊会经历什么' },
      { href: '/services/physiotherapy', label: '与物理治疗比较' },
      { href: '/services/dry-needling', label: 'Cheras 的干针' },
    ],
    faqs: [
      {
        q: '第一次会诊就会被调整吗?',
        a: '通常会,但并非绝对。评估永远在前,若评估结果指向当天不适合调整,我们会如实告知,而不会勉强进行。',
      },
      {
        q: '什么是 Gonstead 方法?',
        a: 'Gonstead 是一种脊椎矫正技术,建立在详细的六步评估之上,任何调整都在评估之后才进行。评估包含仪器检测,以及在有需要时的 X-ray 分析。目标是精确找出受影响的节段,而非笼统地处理整个区域。',
      },
      {
        q: '接受脊椎矫正护理前需要照 X-ray 吗?',
        a: 'X-ray 能让我们更清楚看见脊椎的实际状况:每一节的位置,以及是否存在任何病变。这正是 Gonstead 评估能指出具体受影响节段,而非笼统描述的依据。不过这并非强制项目,孕妇与儿童通常会避免照 X-ray。脊椎矫正师会说明您的情况是否适合进行影像检查,以及原因。',
      },
      {
        q: '脊椎矫正护理和正骨或跌打一样吗?',
        a: '不一样。脊椎矫正是受规范的医疗专业,需要正式的大学训练,而且任何调整之前一定先经过评估。传统正骨的做法不同,也不受相同方式规范。建议您在接受任何一种护理前,先询问执业者的资历。',
      },
      {
        q: '怀孕期间可以接受脊椎矫正护理吗?',
        a: '可以,怀孕是许多人前来求诊的常见原因之一,我们也会在整个孕期持续为她们调整。除非有充分理由,否则我们会避免在孕期进行影像检查,评估方式与调整姿势也会随孕期进展而调整。请在第一次会诊时告知脊椎矫正师您的孕期阶段,以便据此安排合适的方式。',
      },
      {
        q: '你们有为儿童与青少年提供护理吗?',
        a: '有,诊所照顾各个年龄层的病患,儿童的评估方式与成人不同,而非只是缩小版的成人护理。我们通常会避免为儿童照 X-ray。会诊全程都会有家长或监护人在场,我们也会边进行边说明我们在观察什么。',
      },
      {
        q: '脊椎矫正护理有什么风险与副作用?',
        a: '脊椎矫正调整广泛用于处理机械性脊椎与关节问题,在经过适当评估后进行的护理中,严重并发症被认为相当罕见。若有后续反应,通常也是短暂的,最常见的是一两天的轻微酸痛或僵硬。评估过程也会筛检出少数不适合调整的情况,若结果指向物理治疗会更合适,我们会如实告知并从那里开始。',
        links: [
          { phrase: '经过适当评估', href: '/what-to-expect' },
          { phrase: '物理治疗', href: '/services/physiotherapy' },
        ],
      },
      {
        q: '调整的感觉是怎样的?我很紧张怎么办?',
        a: '多数人形容是短暂的压力感,接着是一种放松感,而非疼痛,过程中常伴随的「啵」声是关节内气体移动的声音,而非骨头摩擦,也不代表调整是否有效。若感觉超出不适的范围,请告诉脊椎矫正师,力道与接触方式都可以调整,对不希望以常规方式被调整的病患,也有力道较轻的替代方式。当评估指向肌肉紧绷而非关节受限时,我们可能会建议搭配或改用干针。',
        links: [{ phrase: '干针', href: '/services/dry-needling' }],
      },
      {
        q: '会要求我购买套餐或承诺固定疗程吗?',
        a: '不会。在还没评估您之前,没有任何诚实的方式能预测病情会如何发展,因此我们不会在第一次会诊就给出固定次数或推销套餐。有些人只来一段特定期间就停止,有些人则在原本的问题稳定后,选择偶尔回诊,我们会随着进度诚实检视状况,并在认为您不再需要时如实告知。',
        links: [{ phrase: '第一次会诊', href: '/what-to-expect' }],
      },
      {
        q: '诊所确切地点在哪里?怎么过去?',
        a: '诊所位于 Maluri 的 Sunway Velocity 发展区内的 Signature 2,属于 Cheras, Kuala Lumpur 一带。开车前来可停在商场停车场,搭乘轻快铁的话,Maluri 站与 Cochrane 站皆在步行范围内。Maluri 是转乘站,安邦线、斯里白沙罗线与加影线皆可抵达。我们每周七天营业:星期一至星期四及星期六营业至晚上八点,星期五至下午五点,星期日至下午三点。',
        links: [{ phrase: '每周七天营业', href: '/book-now' }],
      },
      {
        q: '如果脊椎矫正护理不适合我,会怎样?',
        a: '我们会告诉您,而不会勉强为您调整。六步评估的其中一个目的,正是找出真正应该转往其他地方处理的情况,不论是转介到物理治疗、先做影像检查,或协助您安排医疗意见。知道什么时候不属于我们的处理范围,是这份工作的一部分,而我们认为不需要的护理疗程,也不会向您收费。',
      },
    ],
    dedicatedRoute: true,
    // Flipped for local preview only, at the user's request — still needs a Chinese-speaking
    // reviewer before this ships to production. Flip back to `true` if that hasn't happened.
    draft: false,
  },
  {
    /**
     * 运动按摩. Targets 运动按摩 at 50/mo, SD 42 (Ubersuggest, Malaysia locId 2458, pulled
     * 2026-09-03, twelve months of data between 30 and 70 so the number is real rather than a
     * reporting-floor artefact). NOT a translation of the English target: `sports massage kl`
     * is a Latin-script query with its own 170/mo, and the Chinese page earns its own term.
     * 深层按摩 was measured at the same time and returned 0, so it is not used anywhere here.
     *
     * ⚠️ NO `sports-injury-rehabilitation` LINK ANYWHERE ON THIS RECORD. That service has no
     * Chinese entry, so `linkifyBody` and `WhereToGoNext` would both silently drop the link and
     * leave prose pointing at a page a Chinese reader cannot reach. The copy sends those readers
     * to 物理治疗 instead, which is live in this locale.
     *
     * 冲击波疗法, not 冲击波治疗. 疗法 says "method of therapy" and carries none of the banned
     * 治疗 string, so the technique can be named without extending the whitelist in
     * `content.test.ts`. AGENTS.md is explicit that the Chinese banned-word list is a strong
     * draft pending client review, so widening its carve-outs unilaterally is not ours to do.
     * Worth confirming 疗法 reads naturally to the clinic's Chinese-speaking patients.
     *
     * Same review contract as the rest of this file: adapted from the clinic-reviewed English
     * record, `lastReviewed` unset, not yet read by a Chinese-speaking reviewer.
     */
    slug: 'sports-massage',
    title: 'Cheras, Kuala Lumpur 运动按摩',
    metaTitle: 'Cheras 运动按摩 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri 的运动按摩,先评估再开始。适合训练累积的紧绷、久坐的颈肩,以及一直没好起来的旧伤。每周七天营业。',
    targetKeyword: '运动按摩',
    intro:
      'Cheras 的运动按摩,适合有训练习惯的人、整周坐在办公桌前的人,以及带着一个一直没真正好起来的旧伤的人。我们会先评估再动手,让这一个小时用在真正引起问题的组织上。',
    heroImage: {
      src: '/img/therapy-neck.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,物理治疗师为坐着的病患处理颈部与肩膀',
    },
    midImage: {
      src: '/img/cupping-therapy.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,为病患上背进行拔罐',
    },
    assurances: ['先评估,才开始动手', '每次六十分钟', '每周七天营业 · Cheras, Maluri'],
    /**
     * ⚠️ 替代图,ALT 不带地区修饰语: 这几张是共用的症状示意图,不是本诊所、本执行者或本病患
     * 的照片。目前还没有运动按摩的实拍照,已记录在 OPEN-ITEMS.md。
     */
    outcomes: [
      {
        text: '一整周训练累积下来的肌肉紧绷',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: '示意图:一名男子手扶颈侧,颈部与肩膀肌肉亮起',
        },
      },
      {
        text: '久坐或搬重物之后紧起来的下背',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: '示意图:一名男子站在厨房台面前,一手扶着下背,下背亮起',
        },
      },
      {
        text: '训练量一加就开始抗议的旧伤',
        image: {
          src: '/img/physio-weakness.webp',
          alt: '示意图:一名女子坐在办公桌前双脚踩地,脚踝疼痛处亮起',
        },
      },
      {
        text: '比赛前的准备,或比赛后的舒缓',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: '一名女子站在平衡垫上单脚站立,治疗师在旁扶着她的手',
        },
      },
    ],
    qualifierConcerns: [
      '训练之间肌肉一直是酸的',
      '在办公桌前颈肩会绷紧',
      '旧伤在训练时会抗议',
      '我快要比赛了',
      '不确定自己需要按摩还是复健',
      '做过 spa 按摩,但撑不了几天',
    ],
    citations: [
      {
        claim:
          '目前规模最大的运动按摩综合分析没有找到证据显示按摩能提升力量、冲刺、跳跃或耐力表现,但在柔软度与训练后延迟性肌肉酸痛上有小幅但具统计意义的改善。',
        source:
          'Davis, Alabed and Chico (2020), Effect of sports massage on performance and recovery: a systematic review and meta-analysis, BMJ Open Sport & Exercise Medicine',
        url: 'https://bmjopensem.bmj.com/content/6/1/e000614',
      },
      {
        claim:
          '一项比较运动后各种恢复方式的综合分析发现,在所研究的方式当中,按摩对减轻延迟性肌肉酸痛与主观疲劳感最为有效。',
        source:
          'Dupuy et al. (2018), An Evidence-Based Approach for Choosing Post-exercise Recovery Techniques, Frontiers in Physiology',
        url: 'https://www.frontiersin.org/articles/10.3389/fphys.2018.00403/full',
      },
    ],
    comparison: {
      heading: '运动按摩和 spa 按摩的分别',
      intro:
        '两者都是一个小时的徒手工作,名字听起来也差不多,所以值得把分别说清楚。一个照顾的是你躺在床上那一个小时的感觉,另一个照顾的是你为什么会躺上来。',
      columns: ['我们的运动按摩', 'spa 按摩'],
      rows: [
        {
          label: '由谁进行',
          a: '脊骨神经科医师或物理治疗师,看评估结果决定。',
          b: '按摩师,通常事前没有临床评估。',
        },
        {
          label: '先做什么',
          a: '先评估。看这个部位怎么动、被什么牵着,才开始动手。',
          b: '从菜单上选,通常按时间长短和力度。',
        },
        {
          label: '这一个小时的目标',
          a: '真正限制你的那一块组织,以及它变成这样的原因。',
          b: '整体放松与全身的肌肉疲劳感。',
        },
        {
          label: '结束后带走什么',
          a: '知道按摩本身够不够,如果不够,这个部位还需要什么。',
          b: '一个放松的小时,想去的时候再约。',
        },
      ],
      note: '两者没有好坏。如果你想要的就是安静的一个小时,那 spa 是对的选择。分别在于这一个小时是为了什么。如果同一个部位过几天又紧回去,值得问的是什么一直在牵着它,而那是评估回答的问题,不是按摩本身。',
    },
    fitCheck: {
      rightFor: [
        '希望紧的地方先被评估,才有人动手。',
        '希望有人直接告诉你,按摩是不是你现在需要的。',
        '希望这一个小时针对你的训练或你的办公桌真正造成的问题。',
        '愿意听到这个部位需要的是力量训练,而不是再来一次按摩。',
      ],
      notRightFor: [
        '想要安静放松的一个小时,不需要评估,也不想被问问题。',
        '想用按摩代替这个伤真正需要的复健。',
        '想在还没有人看过之前,就先讲好要来几次。',
        '这个问题可能需要先看医生或做影像检查。我们会转介,不会照做下去。',
      ],
      note: '这些都不代表你是难搞的病人,第一项其实就是大多数人说想去按摩时的意思。它的意思只是,我们宁可把你介绍到更合适的地方,也不愿卖你一个撑不住的小时。如果你想把这个紧绷好好看一次,那就从第一次会诊开始。',
    },
    sections: [
      {
        heading: 'Cheras, Kuala Lumpur 的运动按摩',
        body: 'Cheras, Maluri 的运动按摩,处理的是自己不再松开的肌肉。你不需要有在打球才能来。我们看到的紧绷大多来自训练、办公桌和长途开车,而不是球场,做法两者一样:先找出什么在牵着这个部位,再动手。',
      },
      {
        heading: '先评估,才开始动手',
        body: '在看过这个部位怎么动之前不会开始,因为紧的肌肉常常是在保护别的东西,而不是问题本身。这一步也顺便回答了更有用的问题:运动按摩到底适不适合你。',
      },
      {
        heading: '一次运动按摩的内容',
        body: '六十分钟的徒手工作,处理肌肉与周围的组织,力度控制在你还能正常呼吸的范围。我们会边做边说明现在在处理哪里、为什么。',
      },
      {
        heading: '冲击波疗法与运动按摩搭配',
        body: '有些组织单靠双手不够,尤其是已经酸痛几个月的肌腱。冲击波疗法以聚焦的压力波作用在那一个点上,评估结果需要时会安排在同一次进行。',
      },
      {
        heading: '运动按摩能做到什么,不能做到什么',
        body: '规模最大的综合分析没有找到证据显示按摩会让人变强或变快,但在柔软度与训练后的酸痛上有小而真实的改善。所以它适合处理酸、紧、一直在保护的肌肉,不是表现提升的工具。',
      },
      {
        heading: '什么时候复健比再来一次按摩重要',
        body: '如果每次做完几天内同一个部位又紧回去,那再多按摩通常不是答案。这代表还有东西在持续牵着它,而这在按摩床上不会改变,我们会直接说,并转向分阶段的力量与复健安排。',
      },
    ],
    helpsWith: ['back-pain', 'neck-pain', 'hip-pain', 'shoulder-imbalance'],
    relatedLinks: [
      { href: '/services/physiotherapy', label: 'Cheras 物理治疗' },
      { href: '/services/dry-needling', label: '肌肉一直松不开时的干针' },
      { href: '/services/chiropractic-care', label: '比较脊椎矫正护理' },
    ],
    faqs: [
      {
        q: '运动按摩和一般按摩一样吗?',
        a: '不一样。徒手的动作看起来可能相似,但我们这里的运动按摩是在评估之后进行,针对某一个部位、某一个原因,而不是整体放松。执行的人是脊骨神经科医师或物理治疗师,不是 spa 的按摩师。如果一块肌肉紧了好几个月、徒手怎么弄都松不开,我们可能会建议搭配干针。',
        links: [{ phrase: '干针', href: '/services/dry-needling' }],
      },
      {
        q: '运动按摩会痛吗?',
        a: '有些部位会不舒服,尤其是保护了很久的组织,但不应该超过你还能正常呼吸的程度。力度按你的耐受度设定,过程中随时可以说太重。做完隔天有点像练完的酸,通常会自己退。',
      },
      {
        q: '运动按摩应该多久做一次?',
        a: '看评估结果,也看你平常让身体做什么,所以第一次不会先讲好要来几次。训练量大的人可能会想固定来;紧绷来自办公桌的人,往往次数少一些、加上坐姿与活动的调整效果更好。如果每次做完几天内又紧回去,那就是次数不是答案的讯号。',
      },
      {
        q: '比赛前还是比赛后做比较好?',
        a: '两种都有,而且是不同的事。赛前的处理比较短、比较轻,目的是让身体活动起来舒服,而不是改变什么。赛后的处理针对的是用力过后的酸和紧。我们不建议在重要比赛前一天做重的处理,因为组织可能会有点敏感,那不是你想要的出发状态。',
      },
      {
        q: '一定要有在运动才能做运动按摩吗?',
        a: '不用,来做的人有不少并没有在打球。这个名字说的是处理的方式,不是限定给谁。颈肩在办公桌前紧起来、长途开车之后下背绷住、整周坐着造成的僵硬,都是常见的原因。如果你的问题是明确的伤而不是紧绷,先从物理治疗的评估开始通常比较合适。',
        links: [{ phrase: '物理治疗', href: '/services/physiotherapy' }],
      },
      {
        q: '会由谁来进行?',
        a: '脊骨神经科医师或物理治疗师,看评估结果和这个部位需要什么。两者都是有注册的执业人员,不是 spa 按摩师,而且评估你的人就是动手的人。我们的物理治疗师目前还没有在网站上列名,那是关于试用期的决定,与他们的资历无关,你也可以直接询问当天为你处理的人的注册资料。',
      },
    ],
    practitionersWithheld:
      'Sports massage and shockwave are delivered by either a chiropractor or a physiotherapist depending on the presentation (client, 2026-09-03), and the physiotherapists cannot be named while they are within their probation period. Naming only the chiropractors here would imply they are the only people who deliver this.',
    draft: false,
  },
  {
    /**
     * 运动复健. Built 2026-09-03 so the shockwave and sports massage bundle has a Chinese page
     * to sit on, which was the one locale gap left after the bundle was added to the English
     * and Malay sports rehabilitation pages.
     *
     * TARGETS 复健 AT 90/mo, SD 32 (Ubersuggest, Malaysia locId 2458, pulled 2026-09-03, twelve
     * months between 70 and 140 so the figure is solid). That is NINE TIMES the English record's
     * own target, `sports injury treatment malaysia` at 10/mo, which is the clearest example yet
     * of why these pages are localised rather than translated: the Chinese demand for this
     * service is real where the English demand barely registers. Measured at the same time and
     * rejected: 运动伤害 10/mo, 运动损伤 10/mo (a mainland form), 扭伤 0.
     *
     * ⚠️ 复健 IS BROADER THAN THIS PAGE. It covers stroke and general medical rehabilitation as
     * well as sport, so some of that traffic is not ours to serve. The copy therefore says what
     * the clinic does work on and where it refers out, rather than implying the term's whole
     * scope. Do not widen the copy to chase the rest of the keyword.
     *
     * NO `practitionersWithheld`, mirroring the English record deliberately rather than by
     * omission. Whether physiotherapists deliver this service is OPEN-ITEMS.md item 2 and still
     * unanswered; the two records should answer it the same way, because locales disagreeing
     * about who delivers a service is worse than either answer. When item 2 is settled, set or
     * leave the field on BOTH at once.
     *
     * Same review contract as the rest of this file: adapted from the clinic-reviewed English
     * record, `lastReviewed` unset, not yet read by a Chinese-speaking reviewer.
     */
    slug: 'sports-injury-rehabilitation',
    title: 'Cheras, Kuala Lumpur 运动伤害与复健',
    metaTitle: 'Cheras 运动复健 | Kuala Lumpur',
    metaDescription:
      'Cheras, Maluri 的运动伤害评估与分阶段复健。拉伤、扭伤与使用过度的伤,以能力测试决定回场时机。每周七天营业。',
    targetKeyword: '复健',
    intro:
      'Cheras 的运动伤害护理。我们先找出是什么失守、为什么会失守,再按阶段安排复健,目标是让你回到运动场上,而不是带着同一个弱点回去。拉伤、扭伤与使用过度的伤都包括在内,不管你是选手,还是只在周末动一动的人。',
    heroImage: {
      src: '/img/rehab-ankle.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,执行者为病患小腿贴上运动贴布',
    },
    midImage: {
      src: '/img/adjustment-hip.webp',
      alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊骨神经科医师在诊疗床上处理病患髋部',
    },
    assurances: ['先评估,才给方案', '分阶段回到运动,而不是只叫你休息', '每周七天营业 · Cheras, Maluri'],
    /**
     * ⚠️ 替代图,ALT 不带地区修饰语: 前三张是共用的症状示意图,不是本诊所、本执行者或本病患的
     * 照片。最后两张是本页自己的照片。与英文版同一组图。
     */
    outcomes: [
      {
        text: '想先弄清楚的拉伤、扭伤或使用过度的伤',
        image: {
          src: '/img/physio-weakness.webp',
          alt: '示意图:一名女子坐在办公桌前双脚踩地,脚踝疼痛处亮起',
        },
      },
      {
        text: '运动中或运动后会发作的疼痛',
        image: {
          src: '/img/physio-recent-strain.webp',
          alt: '示意图:一名男子站在厨房台面前,一手扶着下背,下背亮起',
        },
      },
      {
        text: '一回到训练就又回来的旧伤',
        image: {
          src: '/img/physio-pain-stiffness.webp',
          alt: '示意图:一名男子手扶颈侧,颈部与肩膀肌肉亮起',
        },
      },
      {
        text: '一份分阶段回到运动的安排,而不是单纯休息',
        image: {
          src: '/img/sports-staged-return.webp',
          alt: '一名女子站在平衡垫上单脚站立,治疗师在旁扶着她的手',
        },
      },
      {
        text: '手术后在外科医师设定的范围内继续的复健',
        image: {
          src: '/img/sports-post-surgical.webp',
          alt: '在诊所房间内,执行者引导一名坐着的男子活动肩膀',
        },
      },
    ],
    qualifierConcerns: [
      '我有拉伤、扭伤或使用过度的伤',
      '运动中或运动后会痛',
      '一回到训练,伤就又回来',
      '我想要一份清楚的回场安排',
      '我在手术后做复健',
      '我周末受伤,但我不是选手',
    ],
    citations: [
      {
        claim:
          '回到运动的决定,较适合依据力量与功能测试等条件来判断,而不是单看时间,这有助于降低再次受伤的风险。',
        source:
          'Ardern et al. (2016), Consensus statement on return to sport, British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/50/14/853',
      },
      {
        claim:
          '对大多数软组织伤害而言,在不引起疼痛的范围内及早开始有指导的活动,通常优于长时间完全固定不动。',
        source: 'British Journal of Sports Medicine',
        url: 'https://bjsm.bmj.com/content/54/2/72',
      },
    ],
    fitCheck: {
      rightFor: [
        '希望回场时机由这个部位能做到什么决定,而不是由日历决定。',
        '愿意按阶段做力量训练,而不是等疼痛自己过去。',
        '希望在安全范围内继续训练,调整负荷而不是全面停下。',
        '希望听到关于恢复程度的实话,即使那不是你想听的答案。',
      ],
      notRightFor: [
        '想在这个部位还没做过负荷测试之前,就先要一个回场日期。',
        '想让疼痛安静下来,但不想做让它保持安静的力量训练。',
        '想完全照原来的方式继续训练,负荷和动作都不改。',
        '这个伤可能需要先看外科医师或做影像检查。我们会转介,不会照做下去。',
      ],
      note: '这些都不代表你是难搞的病人,大部分其实就是急着想回去的样子。它的意思只是,我们会对恢复程度说实话,而不是签一个日期给你,而这一点决定了同一个伤三个月后会不会再回来。如果你想要的是这样的诊所,那就从第一次会诊开始。',
    },
    sections: [
      {
        heading: 'Cheras, Kuala Lumpur 的运动伤害与复健',
        body: 'Cheras 的运动伤害护理。我们先弄清楚是什么失守、为什么失守,再按阶段安排复健,目标是让你回去时不带着同一个弱点。选手和周末才动的人都一样处理。',
      },
      {
        heading: '找出失守的地方,以及原因',
        body: '疼的位置常常不是问题的起点。评估会看这个部位在负荷下能做到什么、上下相连的环节怎么代偿,以及训练量最近是怎么变化的。',
      },
      {
        heading: '分阶段的复健,不是一次到底',
        body: '早期先保护受伤的部位,同时让它在不加重的范围内活动。稳定下来之后重建活动度、力量,再到你的运动需要的速度、控制与变向。每个阶段站得住,才进下一个。',
      },
      {
        heading: '冲击波疗法与运动按摩的搭配',
        body: '肌腱酸痛几个月不退时,冲击波疗法会以聚焦的压力波作用在那一点上;肌肉一直绷着放不开时,运动按摩或干针会和力量训练一起用。用不用,看评估结果。',
      },
      {
        heading: '回场时机怎么决定',
        body: '以这个部位在测试下能做到什么为准,而不是以症状或日历为准。太早回去是伤复发最常见的原因,所以第一次会诊我们不会给你日期。',
      },
      {
        heading: '什么时候不是我们该处理的',
        body: '如果评估结果指向需要影像检查、外科意见或其他专科,我们会直接说,并协助你安排,而不是照原计划做下去。知道什么不该自己处理,是这份工作的一部分。',
      },
    ],
    helpsWith: ['back-pain', 'shoulder-imbalance', 'hip-pain'],
    relatedLinks: [
      { href: '/services/sports-massage', label: 'Cheras 运动按摩' },
      { href: '/services/physiotherapy', label: '我们的物理治疗做法' },
      { href: '/services/dry-needling', label: '处理肌肉紧绷的干针' },
    ],
    faqs: [
      {
        q: '需要转介信吗?',
        a: '不需要。你可以直接预约,不必先经过医生。如果评估结果显示这个伤需要影像检查或外科意见,我们会告诉你,并协助你安排。',
      },
      {
        q: '多久可以回到运动场上?',
        a: '这要看伤的性质、你的运动,以及复健的进展,所以第一次会诊我们不会给日期。我们以这个部位在测试下能做到什么来判断,而不是只看症状,因为在组织还承受不了负荷之前回去,是伤复发最常见的原因。',
      },
      {
        q: '复健期间还可以训练吗?',
        a: '通常可以,做法是调整而不是全面停下。完全休息很少是目标,因为体能掉下来会带来另一批问题。会改的是引起疼痛的那个动作、总量,有时还有场地或节奏。哪些可以继续做,是评估的一部分。如果某块肌肉一直绷着,我们可能会在力量训练之外加上干针。',
        links: [{ phrase: '干针', href: '/services/dry-needling' }],
      },
      {
        q: '你们也看非选手,或者周末和办公桌造成的伤吗?',
        a: '看。搬东西扭到的背、周末跑步后发作的膝盖、重复动作造成的使用过度伤,处理方式都一样,先弄清楚发生了什么,再把这个部位好好重建。你不需要在比赛,也可以来。',
      },
      {
        q: '开始之前需要先做扫描或 X 光吗?',
        a: '通常不需要。大多数拉伤和扭伤靠评估本身就能判断。如果有迹象指向更严重的伤、需要影像或医疗意见,我们会告诉你并协助安排,而不是照做下去。',
      },
      {
        q: '手术后的复健可以在这里做吗?',
        a: '多数情况可以,前提是你的外科医师同意开始复健,并且在他设定的限制范围内进行。我们会按你手术的方案安排,依组织的承受程度推进负荷。第一次来请带上外科团队给你的纪录或指示。',
      },
      {
        q: '复健和运动按摩,我应该选哪一个?',
        a: '如果你有的是明确的伤,从复健开始;如果是训练或久坐累积下来的紧绷,运动按摩通常更合适。不确定的话不用自己决定,评估会告诉你从哪里开始,有时两者会一起安排。',
        links: [{ phrase: '运动按摩', href: '/services/sports-massage' }],
      },
    ],
    draft: false,
  },
]
