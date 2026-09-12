/**
 * Chinese practitioner bios, keyed by the same `slug` used in `lib/clinic.ts`'s
 * `practitioners` roster. `bioFor('zh', slug)` in `lib/clinic.ts` returns `undefined` for a
 * missing entry, which is what keeps `/zh/about/<slug>` out of `generateStaticParams`.
 *
 * Direct translations of the English bios (written 2026-09-12): bios carry no keyword and
 * the client's zh/ms rule (measured keyword first, translation only as fallback) has
 * nothing to measure here. Facts (degrees, institutions, memberships) are the roster's and
 * never vary by language; only the prose is translated. Names stay in Latin script.
 *
 * Same review contract as every other zh file: not yet read by a Chinese-speaking
 * reviewer. Delete an entry to take that page back down in Chinese.
 */
export const practitionerBiosZh: Record<string, readonly string[]> = {
  'valerie-na': [
    '作为 Persistence Chiropractic Care 的创办人兼总监,Valerie 在澳洲墨尔本一所享誉全球的大学修读脊椎矫正。她一直有着强烈的助人愿望。她对脊椎矫正师这个职业的着迷,始于一位童年好友带她认识了脊椎矫正这个领域。被朋友的故事和知识吸引之后,Valerie 便踏上了探索之路。',
    '在探索的早期,Valerie 做了大量的研究,并自学脊椎矫正的基础知识。透过参加网络研讨会和观摩众多脊椎矫正师的工作,她进一步磨练自己的技艺,并开始为受身体疼痛困扰的病患服务。她说,这份工作最好的部分,是当病患终于明白是什么在驱动他们的问题,并知道该怎么做的那一刻。',
    '如今,Persistence Chiropractic Care 为各年龄层、手术前后的人们提供服务,并提供急性、慢性与保健性的脊椎矫正护理及调整。',
  ],
  'kee-shan-lim': [
    'Kee Shan Lim 是 Persistence Chiropractic Care 的副脊椎矫正师,毕业于马来西亚国际医药大学(IMU),获得脊椎矫正理学(荣誉)学士学位。',
    '秉持着每个人都应该活得更健康、更快乐的信念,Kee Shan 选择了脊椎矫正,因为它以自然、徒手的方式,帮助人们动得更好、从疼痛中恢复、提升整体生活品质,而不单单依赖药物。',
    'Kee Shan 致力于终身学习,定期参加马来西亚与澳洲两地的专业研讨会、工作坊与持续进修课程,以精进临床技能,并掌握脊椎矫正护理的最新发展。他的目标是为各年龄、各职业、各活动量的人提供以病患为中心的护理。',
    '无论是照顾有颈痛与背痛的办公族、从运动伤害中恢复的活跃人士,或只是想维持脊椎健康的人,Kee Shan 相信每一位病患都值得被倾听、被理解,并被真诚地照顾。',
    '随着脊椎矫正职业生涯的持续成长,Kee Shan 始终致力于提供高品质的护理,透过脊椎矫正帮助更多人活出更健康、更有活力的生活。',
  ],
  'rynn-hoh': [
    'Rynn 是一位热爱运动的脊椎矫正师,对帮助人们动得更好、表现更好、保持活跃有着浓厚的兴趣。他的学术背景横跨神经科学与脊椎矫正,曾在墨尔本一所知名大学以及马来西亚求学。',
    '他对脊椎矫正的热情,源自对人体解剖学、生物力学,以及神经系统与身体表现之间关系的兴趣。作为一个自己也热爱运动的人,Rynn 对与运动员和活跃人士合作产生了浓厚的兴趣,帮助他们更了解自己的身体,并应对运动与日常活动带来的身体负荷。',
    '他认为,脊椎矫正护理不应只着重于缓解症状,还应着重理解造成一个人状况的各种因素。他的方式以帮助病患了解自己的身体、改善活动方式,并在自身的恢复与长期身体健康中扮演主动角色为核心。',
  ],
}
