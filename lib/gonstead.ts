/**
 * The Gonstead 6-step approach. Sourced from the live Wix /our-services page (extracted
 * 2026-07-19 from the Wix page JSON — the steps are lightboxes, not in the rendered HTML).
 *
 * The six step descriptions are clinical process the clinic stands behind and are kept
 * close to the original. The intro and the outcome language in steps 5 and 6 were
 * REWRITTEN 2026-07-21: "brings proven results", "how best to correct it" and "rectify it"
 * promised outcomes the clinic cannot guarantee. Describing the method is fine; promising
 * what it delivers is not.
 */

export const gonsteadIntro =
  'We practice the Gonstead method because it is thorough. It involves a detailed analysis of overall spine health and of any restricted segments that may be contributing to your pain. The aim is to work out precisely where the problem sits before anything is adjusted, so that treatment is directed at the segment that needs it.'

export const gonsteadSteps = [
  {
    name: 'History Taking',
    body: 'Your chiropractor will ask you questions regarding the location and issue of your problem and what activities that typically relieve or aggravate it. These important information help to evaluate your condition and overall health.',
  },
  {
    name: 'Visualisation',
    body: 'By observing your spine, a lot of information can be obtained. The curves of the spine, the level of your head, ears, shoulders, hips and knees; give a visual indication of your spinal health. Often by the way you walk, or move your body give clues as to the location of subluxation.',
  },
  {
    name: 'Instrumentation',
    body: 'A "nervoscope" is an instrument that we use; for the measurement of skin temperature on either side of the spine. The blood flow to the skin is regulated by spinal nerves. An alteration in spinal function will cause a change in nerve function, affecting blood flow to the skin and changing the temperature. This is an important piece of puzzle in the determination of the root cause.',
  },
  {
    name: 'Palpation',
    body: 'Palpation is a method where your chiropractor feels your spine and the surrounding tissues for problems with her fingers. Your chiropractor feels for the presence of swelling, tenderness and tight muscle fibres around. In addition, a full-motion assessment will also be conducted to evaluate each spinal and pelvic joints. A great deal of information can be obtained from every motion of the body.',
  },
  {
    name: 'X-Ray Analysis',
    body: 'The X-Ray imaging is a valuable tool, both in helping to determine where the problem is located and in deciding how it is best approached. X-Rays are used to rule out pathologies, assess intervertebral discs and spinal joints. If your chiropractor feels another healthcare provider would better help you, you will be referred appropriately.',
  },
  {
    name: 'Adjustments',
    body: 'After your comprehensive assessment, your Gonstead Chiropractor will consider all the information gathered to build a clear picture of what is driving your problem, and decide which adjustment is most appropriate. The adjustments will be delivered precisely and skilfully by hands only.',
  },
] as const
