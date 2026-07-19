import type { MDXComponents } from 'mdx/types'

/**
 * Required at the project root by @next/mdx.
 *
 * Next 16 changed this signature: it now takes NO arguments (15 passed the inherited
 * components in). Adding a parameter back will not error — it will just silently receive
 * undefined.
 *
 * Blog posts are plain prose, so these are the only elements that need styling.
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
  }
}
