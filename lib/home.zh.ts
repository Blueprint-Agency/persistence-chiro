/**
 * Chinese translation of the homepage's `homeIntro`/`offers` content. Same facts and the
 * same claim discipline as `lib/home.ts` (no promissory outcomes) — see that file's header
 * comment for the full history. `testimonials`/`accreditations` are not duplicated here:
 * testimonials are real, supplied reviews that stay as given (see `GoogleReviews`'s own
 * locale handling), and accreditation logos carry no language-specific text.
 *
 * `href` values are intentionally absent — the English `offers` array's `href`s are reused
 * directly and passed through `pathFor(locale, ...)` in the page template, so a slug never
 * has to be kept in sync across three files.
 */

export const homeIntroZh = {
  heading: '脊椎矫正与物理治疗,以您的脊椎为核心。',
  body: [
    'Persistence Chiropractic Care 是 Cheras, Kuala Lumpur 值得信赖的脊椎矫正与物理治疗中心,专注于脊椎调整与个人化的徒手护理。',
    '我们先妥善评估,再以简单易懂的方式说明发现,包括护理不太可能改变的部分。',
  ],
}

export const offersZh = [
  {
    title: '个人化脊椎矫正护理',
    image: '/img/hero-adjustment.webp',
    alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,进行 Gonstead 脊椎矫正调整',
    body: '根据您整体的健康状况、目标与生活方式,我们在 Kuala Lumpur 的脊椎矫正师会为您拟定护理方案。方案内容因人而异,差异可能相当大。',
  },
  {
    title: 'X-ray 分析',
    image: '/img/xray-assessment.webp',
    alt: '在 Cheras, Kuala Lumpur 的 Persistence Chiropractic Care,脊椎矫正师在灯箱上标示全脊椎 X-ray',
    body: 'X-ray 是 Gonstead 评估的一部分:它有助于排除病变、显示椎间盘与脊椎关节的状况,并让脊椎矫正师判断问题所在及最佳的处理方式。我们会在病情需要时才进行影像检查,若其他医疗人员更适合协助,也会转介。',
  },
]
