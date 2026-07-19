import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { postBySlug, publishedPosts } from '@/lib/posts'
import { postBodies } from '@/lib/post-content'
import { conditionBySlug } from '@/lib/conditions'
import { modalityBySlug } from '@/lib/physiotherapy'
import { JsonLd } from '@/components/JsonLd'
import { blogPostingSchema } from '@/lib/schema'

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.datePublished,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post || post.draft) notFound()

  const Body = postBodies[post.slug]
  if (!Body) notFound()

  // Every post links to exactly one condition or modality page, per the linking rules.
  const target = conditionBySlug(post.linksTo) ?? modalityBySlug(post.linksTo)
  const targetHref = conditionBySlug(post.linksTo)
    ? `/conditions/${post.linksTo}`
    : `/physiotherapy/${post.linksTo}`

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.datePublished,
          author: post.author,
        })}
      />

      {/* h1 renders from the index, not the MDX — the body files carry prose only, so the
          title can't drift between the listing page and the post. */}
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        <time dateTime={post.datePublished}>
          {new Date(post.datePublished).toLocaleDateString('en-MY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {' · '}
        {post.author}
      </p>

      <div className="mt-8">
        <Body />
      </div>

      {target && (
        <section className="mt-12 rounded border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-xl font-semibold">{target.title.split(' in ')[0]}</h2>
          <p className="mt-2 text-ink-muted">{target.metaDescription}</p>
          <Link href={targetHref} className="mt-4 inline-block text-brand-slate underline">
            Read more
          </Link>
        </section>
      )}

      <p className="mt-12">
        <Link href="/blog" className="text-brand-slate underline">
          ← All posts
        </Link>
      </p>
    </article>
  )
}
