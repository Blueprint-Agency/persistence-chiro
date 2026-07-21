import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { postBySlug, publishedPosts } from '@/lib/posts'
import { postBodies } from '@/lib/post-content'
import { conditionBySlug } from '@/lib/conditions'
import { serviceBySlug } from '@/lib/services'
import { JsonLd } from '@/components/JsonLd'
import { blogPostingSchema } from '@/lib/schema'
import { clinic } from '@/lib/clinic'
import { CtaBand, Eyebrow } from '@/components/ui'

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
  const target = conditionBySlug(post.linksTo) ?? serviceBySlug(post.linksTo)
  const targetHref = conditionBySlug(post.linksTo)
    ? `/conditions/${post.linksTo}`
    : `/services/${post.linksTo}`

  return (
    <>
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
      <section className="bg-brand-slate-deep text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 lg:py-20">
          <Eyebrow tone="light">Spine notes</Eyebrow>
          <h1 className="mt-6 text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-white/60">
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {' · '}
            {post.author}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 lg:py-20">
        <div className="post-body">
          <Body />
        </div>

        {target && (
          <section className="mt-14 rounded-3xl border border-line bg-white p-8">
            <Eyebrow>Related</Eyebrow>
            <h2 className="mt-4 text-xl font-bold">{target.title.split(' in ')[0]}</h2>
            <p className="mt-2 leading-relaxed text-ink-muted">{target.metaDescription}</p>
            <Link
              href={targetHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate"
            >
              Read more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </section>
        )}

        <p className="mt-12">
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand-slate underline underline-offset-4"
          >
            &larr; All posts
          </Link>
        </p>
      </article>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
