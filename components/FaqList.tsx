import { postBySlug } from '@/lib/posts'

/**
 * The FAQ accordion for a blog post, matching `Faqs` in components/service.tsx (native
 * `<details>`, no client JS) but sized for the article's narrower column.
 *
 * Reads `post.faqs` by slug rather than taking props directly — same reason as
 * `KeyTakeawayList`: one array feeds both the rendered page and `pageFaqSchema`, so they
 * cannot drift apart.
 *
 * Used from MDX as `<FaqList slug="gonstead-technique" />` — see mdx-components.tsx.
 */
export function FaqList({ slug }: { slug: string }) {
  const faqs = postBySlug(slug)?.faqs
  if (!faqs || faqs.length === 0) return null

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="faq py-5">
          <summary className="flex items-start justify-between gap-6">
            {/* mt-0: the global `.post-body h3` rule adds 2rem of top margin for prose
                headings, which this accordion does not want. */}
            <h3 className="mt-0 text-lg font-semibold text-ink">{f.q}</h3>
            <span
              aria-hidden="true"
              className="faq-sign mt-0.5 flex-none text-2xl font-light leading-none text-brand-slate transition-transform"
            >
              +
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
