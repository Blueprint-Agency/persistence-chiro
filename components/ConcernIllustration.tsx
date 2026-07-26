/**
 * Line illustrations for the "reasons people come in" cards, across every service page.
 *
 * Drawn rather than photographed on purpose. These describe a *symptom* — a knot, a referral
 * pattern, a guarded muscle — and no honest photograph shows a symptom; it shows a room with
 * people in it. A diagram can say the thing the sentence underneath says, which a stock-ish
 * treatment photo cannot.
 *
 * THE SYSTEM, so the next one stays part of the set:
 *   ground   pale aqua, the clinic's own reception colour, full bleed
 *   line     slate, 2px, round caps — anatomy and structure
 *   accent   ONE marker per illustration, and only ever on the thing being pointed at
 *
 * PROBLEM vs PLAN. The accent colour carries meaning, not decoration:
 *   a card describing a PROBLEM  → the marker heats gold → red at the peak of its animation
 *   a card describing what we DO → the marker stays gold and calm
 * So "pain that keeps returning" reddens and "a staged plan back to your sport" does not.
 * Red is a state, never a palette colour — see The Diagnostic Signal Rule in DESIGN.md.
 *
 * MOTION states what the diagram means, never a generic entrance. Amplitudes are small,
 * durations are 1.6–5s and share few common factors, so a grid of five never beats in
 * unison. Every keyframe resolves to the resting drawing at 0% AND 100%, which is what makes
 * the global prefers-reduced-motion rule land on a correct static illustration.
 *
 * `aria-hidden` throughout: the card's sentence carries the meaning, and a screen reader
 * describing a diagram that restates the text below it is noise.
 */

export type ConcernIllustrationName =
  // Dry needling
  | 'muscle-knot'
  | 'spine-tension'
  | 'trigger-point'
  | 'guarded-muscle'
  // Shared across physiotherapy / sports / posture
  | 'recurring'
  | 'flare-up'
  // Physiotherapy
  | 'limited-range'
  | 'weakness'
  | 'tailored-plan'
  // Sports injury
  | 'sprain'
  | 'staged-return'
  | 'bounded-limit'
  // Posture
  | 'desk-tension'
  | 'forward-head'
  | 'workstation'
  | 'hold-position'

const SLATE = 'var(--brand-slate)'
const GOLD = 'var(--brand-gold)'
const GOLD_INK = 'var(--brand-gold-ink)'

/** The gold marker. `hot` opts it into the tension signal for problem cards. */
function Marker({
  cx,
  cy,
  r = 10,
  hot = false,
  delay,
}: {
  cx: number
  cy: number
  r?: number
  hot?: boolean
  delay?: number
}) {
  return (
    <circle
      className={hot ? 'cx-source' : 'cx-site'}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      cx={cx}
      cy={cy}
      r={r}
      fill={GOLD}
      stroke={GOLD_INK}
      strokeWidth="1.5"
    />
  )
}

/* ------------------------------------------------------------------ dry needling */

function MuscleKnot() {
  const fibres: [number, number][] = [
    [64, 104],
    [92, 112],
    [120, 120],
    [148, 128],
    [176, 136],
  ]
  return (
    <>
      <g className="cx-fibres">
        {fibres.map(([rest, pinch]) => (
          <path
            key={rest}
            d={`M34 ${rest} C 96 ${rest}, 126 ${pinch}, 160 ${pinch} C 194 ${pinch}, 224 ${rest}, 286 ${rest}`}
          />
        ))}
      </g>
      <circle className="cx-halo" cx="160" cy="120" r="21" stroke={SLATE} strokeDasharray="3 5" />
      <circle
        className="cx-core"
        cx="160"
        cy="120"
        r="10"
        fill={GOLD}
        stroke={GOLD_INK}
        strokeWidth="1.5"
      />
    </>
  )
}

function SpineTension() {
  const segments = Array.from({ length: 9 }, (_, i) => 74 + i * 15)
  const isHot = (i: number) => i < 2 || i > 6
  return (
    <>
      <circle cx="160" cy="42" r="19" />
      <path d="M104 108 C 112 82, 136 68, 160 68 C 184 68, 208 82, 216 108" />
      <path d="M104 108 C 100 148, 108 186, 118 210" />
      <path d="M216 108 C 220 148, 212 186, 202 210" />
      {segments.map((y, i) => {
        const hot = isHot(i)
        return (
          <rect
            key={y}
            className={hot ? 'cx-hot' : undefined}
            style={hot ? { animationDelay: `${i < 2 ? i * 0.18 : 0.9 + (i - 7) * 0.18}s` } : undefined}
            x="146"
            y={y}
            width="28"
            height="9"
            rx="4"
            fill={hot ? GOLD : 'transparent'}
            stroke={hot ? GOLD_INK : SLATE}
            strokeWidth={hot ? 1.5 : 2}
          />
        )
      })}
    </>
  )
}

function TriggerPoint() {
  const rings: [number, number, number][] = [
    [28, 0.62, 0],
    [46, 0.4, 0.22],
    [64, 0.22, 0.44],
  ]
  return (
    <>
      {rings.map(([r, o, d]) => (
        <circle
          key={r}
          className="cx-ring"
          style={{ animationDelay: `${d}s` }}
          cx="100"
          cy="138"
          r={r}
          opacity={o}
        />
      ))}
      <path className="cx-refer" d="M128 118 C 166 72, 206 64, 234 76" strokeDasharray="7 7" />
      <path d="M234 76 l-15 -4 M234 76 l-4 14" />
      <circle className="cx-target" cx="252" cy="94" r="19" strokeDasharray="4 6" opacity="0.85" />
      <Marker cx={100} cy={138} r={13} hot />
    </>
  )
}

function GuardedMuscle() {
  return (
    <>
      <g className="cx-belly">
        <path d="M28 120 L58 120 C 92 76, 228 76, 262 120 C 228 164, 92 164, 58 120 Z" />
        <path d="M292 120 L262 120" />
        <path className="cx-ache" d="M78 120 C 112 100, 208 100, 242 120" opacity="0.55" />
        <path className="cx-ache" d="M78 120 C 112 140, 208 140, 242 120" opacity="0.55" />
        <path className="cx-ache" d="M70 120 H 250" opacity="0.4" />
      </g>
      <path className="cx-press-a" d="M160 52 v20 M151 64 l9 10 l9 -10" />
      <path className="cx-press-b" d="M160 188 v-20 M151 176 l9 -10 l9 10" />
      <path d="M138 138 L182 102" stroke={GOLD_INK} strokeWidth="3.5" />
      <Marker cx={160} cy={120} r={9} />
    </>
  )
}

/* ----------------------------------------------------------------------- shared */

/** A problem that resolves, then comes back to the same place. */
function Recurring() {
  // A closed loop, not an arc. The first pass drew three-quarters of a circle with a
  // detached arrowhead, which read as a broken shape rather than as a cycle.
  return (
    <>
      {/* The cycle, travelling clockwise and never finishing. */}
      <circle className="cx-refer" cx="160" cy="118" r="66" strokeDasharray="7 7" />
      {/* Direction, sitting ON the loop at the top. */}
      <path d="M170 53 L156 48 M170 53 L157 61" strokeWidth="2.4" />
      {/* And where it lands again, every time. */}
      <circle className="cx-target" cx="160" cy="184" r="24" strokeDasharray="4 6" opacity="0.65" />
      <Marker cx={160} cy={184} r={12} hot />
    </>
  )
}

/** Something acute, flaring at one point in a band of tissue. */
function FlareUp() {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8)
  return (
    <>
      <path d="M28 96 C 92 74, 228 74, 292 96" />
      <path d="M28 148 C 92 170, 228 170, 292 148" />
      <path d="M62 122 H 258" opacity="0.3" />
      <g className="cx-ring">
        {spokes.map((a) => (
          <path
            key={a}
            d="M160 92 V 76"
            transform={`rotate(${a} 160 122)`}
            opacity="0.6"
            strokeWidth="2.4"
          />
        ))}
      </g>
      <Marker cx={160} cy={122} r={13} hot />
    </>
  )
}

/* ---------------------------------------------------------------- physiotherapy */

/** Movement that should sweep freely, stopping short. */
function LimitedRange() {
  return (
    <>
      {/* The pivot, and the range that ought to be available. */}
      <path d="M74 188 A 118 118 0 0 1 192 70" strokeDasharray="5 8" opacity="0.5" />
      <circle cx="74" cy="188" r="8" />
      <path d="M74 188 H 200" opacity="0.4" />
      {/* How far it actually goes before it is stopped. */}
      <g className="cx-sweep">
        <path d="M74 188 L 168 132" strokeWidth="2.6" />
      </g>
      {/* The block. */}
      <path className="cx-ache" d="M182 106 L 206 148" strokeWidth="3" />
      <Marker cx={176} cy={126} r={10} hot />
    </>
  )
}

/** Two anchors and something between them that no longer holds. */
function Weakness() {
  return (
    <>
      <path d="M52 66 V 174" />
      <path d="M268 66 V 174" />
      {/* What it should hold. */}
      <path d="M52 100 H 268" strokeDasharray="5 8" opacity="0.45" />
      {/* What it does. */}
      <path className="cx-sag" d="M52 100 C 110 186, 210 186, 268 100" strokeWidth="2.6" />
      <Marker cx={160} cy={158} r={10} />
    </>
  )
}

/** A plan shaped to one person, rather than a sheet handed to everybody. */
function TailoredPlan() {
  const rows: [number, number][] = [
    [86, 150],
    [116, 196],
    [146, 118],
    [176, 168],
  ]
  return (
    <>
      <rect x="76" y="52" width="168" height="140" rx="14" />
      <path d="M132 52 v-10 a 8 8 0 0 1 8 -8 h40 a 8 8 0 0 1 8 8 v10" />
      {rows.map(([y, w], i) => (
        <path
          key={y}
          className={i === 1 ? 'cx-draw' : undefined}
          d={`M104 ${y} H ${104 + w - 60}`}
          opacity={i === 1 ? 1 : 0.4}
          strokeWidth={i === 1 ? 3 : 2}
        />
      ))}
      <Marker cx={216} cy={116} r={9} />
    </>
  )
}

/* ------------------------------------------------------------------ sports injury */

/** A joint taken past what it holds. */
function Sprain() {
  // Two bones with real ends, a ligament spanning the joint, and the joint itself opening
  // slightly. The first pass was two thin lines meeting at a dot — it read as a bent wire.
  return (
    <>
      {/* Upper bone, fixed. */}
      <path d="M78 44 L 138 112" strokeWidth="3" />
      <path d="M70 38 a 12 12 0 1 0 17 13" strokeWidth="2.4" />
      {/* Lower bone, being levered away from it. */}
      <g className="cx-hinge">
        <path d="M146 132 L 236 176" strokeWidth="3" />
        <path d="M244 180 a 12 12 0 1 0 -15 -9" strokeWidth="2.4" />
        {/* The ligament, stretched across the joint on the side that is opening. */}
        <path className="cx-ache" d="M120 136 C 146 166, 186 178, 216 180" strokeWidth="2.6" />
      </g>
      <circle cx="142" cy="122" r="20" opacity="0.3" strokeDasharray="4 6" />
      <Marker cx={142} cy={122} r={11} hot />
    </>
  )
}

/** Load added back in stages, rather than rest then everything at once. */
function StagedReturn() {
  const steps: [number, number][] = [
    [64, 178],
    [124, 150],
    [184, 122],
    [244, 94],
  ]
  return (
    <>
      <path d="M40 200 H 288" opacity="0.4" />
      {steps.map(([x, y], i) => (
        <rect
          key={x}
          className="cx-step"
          style={{ animationDelay: `${i * 0.28}s` }}
          x={x - 22}
          y={y}
          width="44"
          height={200 - y}
          rx="6"
          opacity={0.35 + i * 0.16}
        />
      ))}
      <Marker cx={244} cy={78} r={10} />
    </>
  )
}

/** Progress, up to a line somebody else has drawn. */
function BoundedLimit() {
  return (
    <>
      <path d="M40 152 H 214" opacity="0.4" />
      <path className="cx-refer" d="M40 152 H 206" strokeDasharray="8 8" strokeWidth="3" />
      {/* The limit, and that it is not ours to move. */}
      <path d="M232 78 V 226" strokeWidth="3" />
      <path d="M232 86 h 26 v 20 h -26" opacity="0.55" />
      <path d="M40 196 H 214" opacity="0.2" />
      <Marker cx={206} cy={152} r={11} />
    </>
  )
}

/* ---------------------------------------------------------------------- posture */

/** A day at a desk, and where it accumulates. */
function DeskTension() {
  return (
    <>
      {/* Desk and screen. */}
      <path d="M176 176 H 292" />
      <rect x="206" y="92" width="76" height="56" rx="6" opacity="0.55" />
      <path d="M244 148 v 16" opacity="0.55" />
      {/* Seated figure. */}
      <circle cx="112" cy="76" r="19" />
      <path d="M112 95 C 100 118, 100 140, 108 158" strokeWidth="2.6" />
      <path d="M108 158 H 166" strokeWidth="2.6" />
      <path d="M108 158 C 96 176, 92 196, 94 214" opacity="0.5" />
      <path d="M118 106 H 168" opacity="0.5" />
      {/* Where it lands. */}
      <path className="cx-ache" d="M104 96 C 116 104, 126 110, 136 112" strokeWidth="3" />
      <Marker cx={116} cy={100} r={9} hot />
    </>
  )
}

/** The head sitting forward of where it is carried most easily. */
function ForwardHead() {
  return (
    <>
      {/* The line it would sit on. */}
      <path d="M150 34 V 214" strokeDasharray="5 8" opacity="0.45" />
      {/* Where it actually sits. */}
      <circle className="cx-lean" cx="196" cy="66" r="22" />
      <path className="cx-lean" d="M186 88 C 168 108, 156 124, 150 140" strokeWidth="2.6" />
      <path d="M150 140 C 148 168, 150 192, 154 214" strokeWidth="2.6" />
      <path d="M150 140 H 118" opacity="0.45" />
      <Marker cx={168} cy={116} r={10} hot />
    </>
  )
}

/** The desk changed to fit the person, rather than the other way round. */
function Workstation() {
  return (
    <>
      <path d="M44 178 H 276" />
      <path d="M70 178 V 210 M250 178 V 210" opacity="0.5" />
      <rect x="146" y="72" width="112" height="76" rx="7" />
      <path d="M202 148 v 12 M178 160 h 48" opacity="0.55" />
      {/* Chair, and the eye line the screen is set to. */}
      <path d="M64 148 h 46 v 30 h -46 z" opacity="0.5" />
      <path d="M64 148 C 56 128, 58 108, 66 96" opacity="0.5" />
      <path className="cx-refer" d="M84 96 H 146" strokeDasharray="6 7" opacity="0.7" />
      <Marker cx={152} cy={96} r={9} />
    </>
  )
}

/** Held without thinking about it, because something underneath is doing the work. */
function HoldPosition() {
  return (
    <>
      <path d="M160 30 V 216" strokeDasharray="5 8" opacity="0.4" />
      <circle cx="160" cy="62" r="19" />
      <path d="M160 81 V 146" strokeWidth="2.6" />
      <path d="M124 106 H 196" strokeWidth="2.6" />
      <path d="M160 146 C 146 172, 138 194, 136 216" strokeWidth="2.6" />
      <path d="M160 146 C 174 172, 182 194, 184 216" strokeWidth="2.6" />
      {/* The support doing the holding. */}
      <path className="cx-hold" d="M132 128 C 148 140, 172 140, 188 128" strokeWidth="3" />
      <Marker cx={160} cy={136} r={9} />
    </>
  )
}

const ART: Record<ConcernIllustrationName, () => React.ReactElement> = {
  'muscle-knot': MuscleKnot,
  'spine-tension': SpineTension,
  'trigger-point': TriggerPoint,
  'guarded-muscle': GuardedMuscle,
  recurring: Recurring,
  'flare-up': FlareUp,
  'limited-range': LimitedRange,
  weakness: Weakness,
  'tailored-plan': TailoredPlan,
  sprain: Sprain,
  'staged-return': StagedReturn,
  'bounded-limit': BoundedLimit,
  'desk-tension': DeskTension,
  'forward-head': ForwardHead,
  workstation: Workstation,
  'hold-position': HoldPosition,
}

export function ConcernIllustration({ name }: { name: ConcernIllustrationName }) {
  const Art = ART[name]
  return (
    <svg
      viewBox="0 0 320 240"
      className="cx aspect-[4/3] w-full"
      role="presentation"
      aria-hidden="true"
      fill="none"
      stroke={SLATE}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="320" height="240" fill="var(--brand-aqua)" stroke="none" />
      <Art />
    </svg>
  )
}
