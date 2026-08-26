import { gonsteadSteps } from '@/lib/gonstead'

/**
 * The six-step Gonstead assessment, in the exact numbered-list treatment
 * `/services/chiropractic-care` uses (`app/services/chiropractic-care/page.tsx`), reading
 * straight from `gonsteadSteps` rather than a retyped copy in the MDX prose. One source of
 * fact for the six steps; a future edit to gonstead.ts reaches both places at once.
 *
 * Used from MDX as `<GonsteadStepList />` — see mdx-components.tsx.
 */
export function GonsteadStepList() {
  return (
    // list-none pl-0: neutralise the global `.post-body ol` rule (decimal markers, left
    // padding) — this list carries its own gold step numbers instead.
    <ol className="list-none divide-y divide-line border-y border-line pl-0">
      {gonsteadSteps.map((step, i) => (
        <li key={step.name} className="mt-0 flex gap-5 py-6">
          <span aria-hidden="true" className="label flex-none pt-1 text-brand-gold-ink">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            {/* mt-0: the global `.post-body h3` rule adds 2rem of top margin for prose
                headings, which this list does not want — its own spacing comes from the
                <li> padding and the flex gap instead. */}
            <h3 className="mt-0 text-lg font-bold text-ink">{step.name}</h3>
            <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
