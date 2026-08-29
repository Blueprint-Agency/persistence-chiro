import { conditionBySlug } from '@/lib/conditions'
import { serviceBySlug } from '@/lib/services'
import { ServiceQualifier } from '@/components/ServiceQualifier'
import { qualifierCopyFrom } from '@/lib/qualifier-copy'
// Blog is English-only (see AGENTS.md § Multilingual) and MDX has no locale plumbing
// running through it, so this reaches for the English dictionary directly rather than
// threading `locale`/`getDictionary` through the whole MDX component registry for a
// context that only ever renders one language.
import enDict from '@/dictionaries/en'

/**
 * Drops the sitewide "Is this right for you?" qualifier into the middle of a blog post,
 * fed by the concerns already declared on the condition or service the post links to
 * (`qualifierConcerns` in lib/conditions.ts / lib/services.ts) rather than a fresh list
 * invented per post. One real data source, and a post can't drift from the page it sends
 * readers to.
 *
 * Used from MDX as `<InlineQualifier slug="chiropractic-care" />` — see
 * mdx-components.tsx. Renders nothing if the target carries no qualifierConcerns, so an
 * MDX file referencing a target that hasn't been filled in yet fails quietly, not broken.
 */
export function InlineQualifier({ slug }: { slug: string }) {
  const target = conditionBySlug(slug) ?? serviceBySlug(slug)
  if (!target?.qualifierConcerns || target.qualifierConcerns.length === 0) return null

  const serviceName = target.title.split(' in ')[0]
  return (
    <ServiceQualifier
      copy={qualifierCopyFrom(enDict, serviceName)}
      concerns={target.qualifierConcerns}
    />
  )
}
