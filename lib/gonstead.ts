/**
 * The Gonstead 6-step approach. Sourced from the live Wix /our-services page (extracted
 * 2026-07-19 from the Wix page JSON — the steps are lightboxes, not in the rendered HTML).
 *
 * The six step descriptions are clinical process the clinic stands behind. The intro and the
 * outcome language in steps 5 and 6 were REWRITTEN 2026-07-21: "brings proven results", "how
 * best to correct it" and "rectify it" promised outcomes the clinic cannot guarantee.
 * Describing the method is fine; promising what it delivers is not.
 *
 * SHORTENED 2026-08-23 at the client's direction, from roughly 55 words a step to 30. They
 * were close to the Wix original until then, which is why they carried its grammar ("These
 * important information help to evaluate") into a rebuild that reads nothing like it. Every
 * clinical fact survives the cut, including the two that are protective rather than
 * descriptive: the X-ray step still says we refer rather than adjust, and the adjustment step
 * still says it comes last and by hand alone. Do not trim either away for length.
 *
 * NOT REVIEWED SINCE. `lastReviewed` on the service is untouched, because rewriting copy is
 * not the same as a practitioner re-reading it.
 */

export const gonsteadIntro =
  'We practice the Gonstead method because it is thorough. It involves a detailed analysis of overall spine health and of any restricted segments that may be contributing to your pain. The aim is to work out precisely where the problem sits before anything is adjusted, so that the work is directed at the segment that needs it.'

export const gonsteadSteps = [
  {
    name: 'History Taking',
    body: 'We ask where the problem sits, what makes it better or worse, and what it has stopped you doing. The history narrows the search before anything is touched.',
  },
  {
    name: 'Visualisation',
    body: 'We watch how you stand and move: the curve of your spine, and whether your head, shoulders, hips and knees sit level. How you walk narrows it further.',
  },
  {
    name: 'Instrumentation',
    body: 'A nervoscope reads skin temperature down either side of your spine. Spinal nerves regulate blood flow to the skin, so a difference between the two sides points to the level involved.',
  },
  {
    name: 'Palpation',
    body: 'Your chiropractor feels along the spine for swelling, tenderness and tight muscle, then moves each spinal and pelvic joint to find the ones not moving as they should.',
  },
  {
    name: 'X-Ray Analysis',
    body: 'Where it is indicated, an X-ray rules out pathology and shows the discs and joints themselves. If it points to something that belongs with another provider, we refer you rather than adjust you.',
  },
  {
    name: 'Adjustments',
    body: 'Only then do we adjust. Everything gathered so far decides which segment is worked on and how, and the adjustment is delivered precisely and skilfully by hand alone.',
  },
] as const
