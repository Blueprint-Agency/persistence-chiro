/**
 * Bulging vs herniated disc, drawn rather than described.
 *
 * The distinction the post makes is entirely structural — outer layer intact against outer
 * layer torn — and that is a shape, not a sentence. Three side-on cross-sections put the
 * healthy disc, the bulge and the herniation in the same frame, so the one thing that
 * changes between them is the only thing that moves.
 *
 * Follows the illustration system in DESIGN.md, same as ConcernIllustration:
 *   ground   pale aqua, full bleed
 *   line     slate, 2px, round caps — the vertebrae, the disc wall, the cord behind it
 *   accent   gold, and only ever on the nucleus, the material the whole comparison tracks
 * No red: nothing here is a live nervoscope reading. No motion either — the difference sits
 * between the panels rather than inside any one of them.
 *
 * Drawn side-on rather than from above because a stack of two bones with something between
 * them is legible to a patient at a glance; an axial slice needs to be explained before it
 * can be read.
 *
 * Used from MDX as `<DiscComparison />` — see mdx-components.tsx.
 */

const SLATE = 'var(--brand-slate)'
const GOLD = 'var(--brand-gold)'

/** The two vertebral bodies the disc sits between, identical in all three panels. */
function Vertebrae() {
  return (
    <>
      <rect x="40" y="18" width="110" height="58" rx="9" fill="#fff" />
      <rect x="40" y="126" width="110" height="58" rx="9" fill="#fff" />
    </>
  )
}

/** The cord running down behind the spine — the thing a herniation can reach. */
function Cord() {
  return <rect x="178" y="12" width="14" height="180" rx="7" />
}

function HealthyDisc() {
  return (
    <>
      <Vertebrae />
      <path
        d="M52 84 H 138 C 147 84, 150 92, 150 101 C 150 110, 147 118, 138 118 H 52 C 43 118, 40 110, 40 101 C 40 92, 43 84, 52 84 Z"
        fill="#fff"
      />
      <ellipse cx="94" cy="101" rx="27" ry="12" fill={GOLD} stroke="none" />
      <Cord />
    </>
  )
}

function BulgingDisc() {
  return (
    <>
      <Vertebrae />
      {/* One continuous outline: the back wall bows out past the edge of the bone, but it
          never breaks. */}
      <path
        d="M52 84 H 138 C 156 85, 168 92, 168 101 C 168 110, 156 117, 138 118 H 52 C 43 118, 40 110, 40 101 C 40 92, 43 84, 52 84 Z"
        fill="#fff"
      />
      <ellipse cx="106" cy="101" rx="34" ry="13" fill={GOLD} stroke="none" />
      <Cord />
    </>
  )
}

function HerniatedDisc() {
  return (
    <>
      <Vertebrae />
      {/* Cord before the escaped material, so the material sits in front of it — which is
          the whole point of this panel. */}
      <Cord />
      {/* An open path: the fill still closes the disc, but no stroke is drawn down the back
          between y=90 and y=112. That missing line is the tear. */}
      <path
        d="M150 90 C 149 86, 145 84, 138 84 H 52 C 43 84, 40 92, 40 101 C 40 110, 43 118, 52 118 H 138 C 145 118, 149 116, 150 112"
        fill="#fff"
      />
      <ellipse cx="98" cy="101" rx="29" ry="13" fill={GOLD} stroke="none" />
      {/* Straddling the tear: part still inside the disc, part out against the cord. */}
      <ellipse cx="156" cy="101" rx="22" ry="11" fill={GOLD} stroke="none" />
    </>
  )
}

const PANELS = [
  {
    title: 'Healthy disc',
    body: 'The soft centre sits in the middle, and the tougher outer layer holds its shape all the way round.',
    Art: HealthyDisc,
  },
  {
    title: 'Bulging disc',
    body: 'The centre pushes outward and the outer layer stretches past the edge of the bone with it, but stays intact. The material is still contained.',
    Art: BulgingDisc,
  },
  {
    title: 'Herniated disc',
    body: 'The outer layer has torn, and some of the centre has escaped through it, where it can press on the nerve behind.',
    Art: HerniatedDisc,
  },
]

export function DiscComparison() {
  return (
    <figure className="my-0">
      <div className="grid gap-4 sm:grid-cols-3">
        {PANELS.map(({ title, body, Art }) => (
          <div key={title} className="overflow-hidden rounded-2xl border border-line bg-white">
            <svg
              viewBox="0 0 240 204"
              className="aspect-[240/204] w-full"
              role="presentation"
              aria-hidden="true"
              fill="none"
              stroke={SLATE}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="240" height="204" fill="var(--brand-aqua)" stroke="none" />
              <Art />
            </svg>
            <div className="px-5 py-4">
              <p className="font-bold text-ink">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">
        A disc seen side-on between two spinal bones, with the back of the spine on the right
        and the cord running behind it. Simplified for clarity, not drawn to scale.
      </figcaption>
    </figure>
  )
}
