import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { postBySlug } from './posts'

const countWords = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [link text](url) -> link text
    .replace(/[#>*_`-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

/**
 * Approximate reading time in minutes, computed from the post's actual content at render
 * time rather than a hand-set field on `Post`. A stored number drifts the moment someone
 * edits the body and forgets to update it; this can't drift because it has no separate
 * value to forget.
 *
 * Counts the raw MDX source PLUS `keyTakeaways`/`faqs`, because a post built with
 * `<KeyTakeawayList>`/`<FaqList>` (see mdx-components.tsx) carries that Q&A as structured
 * data in lib/posts.ts, not as words in the .mdx file — scanning the file alone would
 * undercount exactly the two sections most posts open and close with.
 */
export function readingTime(slug: string): number {
  const raw = readFileSync(join(process.cwd(), 'content/blog', `${slug}.mdx`), 'utf-8')
  const post = postBySlug(slug)
  const structured = [...(post?.keyTakeaways ?? []), ...(post?.faqs ?? [])]
    .map((qa) => `${qa.q} ${qa.a}`)
    .join(' ')
  const words = countWords(raw) + countWords(structured)
  return Math.max(1, Math.round(words / 200))
}
