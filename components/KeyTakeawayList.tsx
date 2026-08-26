import { postBySlug } from '@/lib/posts'

/**
 * The answer-engine extraction block for a blog post, matching `KeyTakeaways` in
 * components/service.tsx (dt/dd pairs, gold rule down the left) but sized for the article's
 * narrower column rather than a full-bleed 6xl section.
 *
 * Reads `post.keyTakeaways` by slug rather than taking props directly, so the same array
 * also reaches `pageFaqSchema` from the page template without being authored twice — see
 * the field comment on `Post.keyTakeaways` in lib/posts.ts.
 *
 * Used from MDX as `<KeyTakeawayList slug="gonstead-technique" />` — see mdx-components.tsx.
 */
export function KeyTakeawayList({ slug }: { slug: string }) {
  const items = postBySlug(slug)?.keyTakeaways
  if (!items || items.length === 0) return null

  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      {items.map((t) => (
        <div key={t.q} className="border-l-2 border-brand-gold pl-5">
          <dt className="font-bold leading-snug text-ink">{t.q}</dt>
          <dd className="mt-2 leading-relaxed text-ink-muted">{t.a}</dd>
        </div>
      ))}
    </dl>
  )
}
