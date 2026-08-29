/**
 * Chinese translation of the Gonstead six-step walkthrough. Same clinical content as
 * `lib/gonstead.ts` — no new claims, adapted for natural Chinese phrasing. `draft: true`
 * gate does not apply here (no per-record gating field, unlike Condition/Service); this
 * file is only read once the `chiropractic-care` Service record for `zh` exists and is
 * non-draft, so it inherits that gate.
 */

export const gonsteadIntroZh =
  '我们采用 Gonstead 方法,因为它够彻底。它包含对整体脊椎健康的详细分析,以及可能造成疼痛的受限节段。目标是在任何调整之前,先精确找出问题真正的位置,让处理直接针对需要它的那一节。'

export const gonsteadStepsZh = [
  {
    name: '病史询问',
    body: '我们询问问题的位置、什么情况会让它好转或恶化,以及它妨碍了您做什么。病史能在触碰您之前先缩小范围。',
  },
  {
    name: '姿态观察',
    body: '我们观察您站立与活动的方式:脊椎的弯曲程度,以及头部、肩膀、髋部与膝盖是否水平。您走路的方式能进一步缩小范围。',
  },
  {
    name: '仪器检测',
    body: 'Nervoscope 读取脊椎两侧的皮肤温度。脊神经调节皮肤的血流,因此两侧的温差能指出受影响的节段。',
  },
  {
    name: '触诊',
    body: '脊椎矫正师沿着脊椎触诊,检查是否有肿胀、压痛与肌肉紧绷,再活动每一节脊椎与骨盆关节,找出活动不如预期的那些。',
  },
  {
    name: 'X-ray 分析',
    body: '在有需要的情况下,X-ray 能排除病变,并显示椎间盘与关节本身的状况。若结果指向应交由其他医疗人员处理的情况,我们会转介,而不会为您调整。',
  },
  {
    name: '调整',
    body: '到这一步才会进行调整。前面收集的所有资讯,决定要处理哪一节以及如何处理,调整以徒手方式精准且熟练地完成。',
  },
] as const

/**
 * The closing paragraph in the sticky column below the six steps on the chiropractic-care
 * route — page-specific prose, not part of the shared `gonsteadIntro`, so it lives here
 * alongside the steps it explains rather than in a dictionary key.
 */
export const gonsteadClosingNoteZh =
  'Gonstead 是一个逐步排除的过程:每一步都缩小范围,直到只剩下真正造成疼痛的那一节,让我们只调整那一个关节,而非整条脊椎笼统处理。当节段变得活动受限时,调整的目标是透过改善其活动方式,帮助骨骼与身体的排列。实际能改变多少,取决于成因,以及它存在了多久。'
