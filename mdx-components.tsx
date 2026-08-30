import type { MDXComponents } from 'mdx/types'

import { DiscComparison } from '@/components/DiscComparison'
import { FaqList } from '@/components/FaqList'
import { GonsteadStepList } from '@/components/GonsteadStepList'
import { InlineQualifier } from '@/components/InlineQualifier'
import { KeyTakeawayList } from '@/components/KeyTakeawayList'

/**
 * Required at the project root by @next/mdx.
 *
 * Next 16 changed this signature: it now takes NO arguments (15 passed the inherited
 * components in). Adding a parameter back will not error — it will just silently receive
 * undefined.
 *
 * Blog posts are plain prose, so the element overrides below are the only styling most
 * posts need. `GonsteadStepList` and `InlineQualifier` are the exception: real, data-backed
 * components a post can drop in by tag name (`<GonsteadStepList />`,
 * `<InlineQualifier slug="..." />`) when its content genuinely calls for one, rather than
 * every post getting a table/qualifier/step-list bolted on whether it fits or not.
 */
export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-semibold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
    p: ({ children }) => <p className="mt-4 leading-relaxed text-ink-muted">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-1 pl-6 text-ink-muted">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal space-y-1 pl-6 text-ink-muted">{children}</ol>,
    a: ({ href, children }) => (
      <a href={href} className="text-brand-slate underline">
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-brand-aqua/40">{children}</thead>,
    th: ({ children }) => (
      <th className="border-b border-line px-4 py-3 text-left font-bold text-ink">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-b border-line px-4 py-3 align-top text-ink-muted">{children}</td>
    ),
    DiscComparison,
    GonsteadStepList,
    InlineQualifier,
    KeyTakeawayList,
    FaqList,
  }
}
