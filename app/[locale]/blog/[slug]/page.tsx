import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { postBySlug, publishedPosts } from '@/lib/posts'
import { postBodies } from '@/lib/post-content'
import { conditionBySlug } from '@/lib/conditions'
import { serviceBySlug } from '@/lib/services'
import { readingTime } from '@/lib/reading-time'
import { credentialsText, practitionerBySlug } from '@/lib/clinic'
import { JsonLd } from '@/components/JsonLd'
import { blogPostingSchema, breadcrumbSchema, pageFaqSchema, reviewedMedicalWebPage } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { getDictionary } from '@/lib/dictionaries'
import { CtaBand, Eyebrow } from '@/components/ui'
import { References, ReviewedBy, StickyCta } from '@/components/service'
import { waMessage } from '@/lib/whatsapp'

/** Same reviewer as every other clinical page — see the identical constant in
 * components/service.tsx. Declared again here rather than exported and shared, matching
 * how each page template already declares its own (app/services/[slug]/page.tsx,
 * app/services/chiropractic-care/page.tsx). */
const reviewer = practitionerBySlug('valerie-na')!

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

// Blog is English-only — colocated under `[locale]` only because Next allows one root
// layout per route subtree, not because it varies by locale. See proxy.ts.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== 'en') return []
  return publishedPosts().map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (locale !== 'en') return {}
  const post = postBySlug(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    // Blog stays English-only and unprefixed, outside the `[locale]` tree entirely.
    locale: 'en',
    availableIn: ['en'],
    type: 'article',
    publishedTime: post.datePublished,
    // Post titles are editorial headlines, not composed SEO strings — the brand suffix
    // pushed eleven of thirteen past what Google renders, and the brand is what got cut.
    // See the note on `brand` in lib/seo.ts before copying this to another route.
    brand: false,
  })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()
  const post = postBySlug(slug)
  if (!post || post.draft) notFound()

  const Body = postBodies[post.slug]
  if (!Body) notFound()

  const dict = await getDictionary(locale)

  // Every post links to exactly one condition or modality page, per the linking rules.
  const target = conditionBySlug(post.linksTo) ?? serviceBySlug(post.linksTo)
  const targetHref = conditionBySlug(post.linksTo)
    ? `/conditions/${post.linksTo}`
    : `/services/${post.linksTo}`

  // Most recent other posts, excluding this one. No taxonomy exists to pick a genuinely
  // related post by topic, so recency is the honest signal rather than a fabricated one.
  const more = publishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

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
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      {/* Only the posts carrying structured Q&A (post.keyTakeaways / post.faqs, rendered via
          <KeyTakeawayList>/<FaqList> in the MDX) emit FAQPage — a schema block with zero
          questions for a legacy prose-only post would be worse than no schema at all. */}
      {((post.keyTakeaways?.length ?? 0) > 0 || (post.faqs?.length ?? 0) > 0) && (
        <JsonLd data={pageFaqSchema(post.keyTakeaways, post.faqs ?? [])} />
      )}
      {/* reviewedBy + lastReviewed — the E-E-A-T signals for a YMYL page, same as conditions
          and services. Absent until `post.lastReviewed` is actually set. */}
      {post.lastReviewed && (
        <JsonLd
          data={reviewedMedicalWebPage({
            name: post.title,
            description: post.description,
            url: `/blog/${post.slug}`,
            lastReviewed: post.lastReviewed,
            reviewer: {
              name: reviewer.name,
              role: reviewer.role,
              credentials: credentialsText(reviewer),
              slug: reviewer.slug,
            },
          })}
        />
      )}

      {/* h1 renders from the index, not the MDX — the body files carry prose only, so the
          title can't drift between the listing page and the post. Widens to the 6xl
          service-hero container and gains a photo column only when the post carries a
          heroImage; text-only posts keep the narrower 3xl band unchanged.

          The reception photo behind the text is ambiance, not per-post topical imagery
          (that's what `post.heroImage` is for), so it runs on every post's hero rather than
          being tied to any one entry. Faded to 50% and sat under the slate-deep field colour
          at 80% so it reads as texture, not a competing photograph — the white h1 above it
          still needs the same contrast the flat colour gave it. */}
      <section className="relative overflow-hidden bg-brand-slate-deep text-white">
        <Image
          src="/img/clinic-reception.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          // Only the LCP candidate when a post has no topical heroImage of its own — two
          // priority images racing to preload on the same post is wasted bandwidth.
          priority={!post.heroImage}
        />
        <div className="absolute inset-0 bg-brand-slate-deep/80" aria-hidden="true" />
        <div
          className={`relative mx-auto px-4 py-14 lg:py-20 ${
            post.heroImage ? 'max-w-6xl' : 'max-w-3xl'
          }`}
        >
          <div
            className={
              post.heroImage
                ? 'grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16'
                : ''
            }
          >
            <div>
              <Eyebrow tone="light">Spine notes</Eyebrow>
              <h1 className="mt-6 max-w-2xl text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
                <span>
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  {' · '}
                  {post.author}
                </span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
                <span>{readingTime(post.slug)} min read</span>
              </div>
            </div>

            {post.heroImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
                <Image
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 lg:py-20">
        <div className="post-body">
          <Body />
        </div>

        {more.length > 0 && (
          <section className="mt-14">
            <Eyebrow>More from Spine notes</Eyebrow>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-3xl border border-line bg-white p-6 shadow-ambient transition-shadow hover:shadow-ambient-raise"
                >
                  <time dateTime={p.datePublished} className="label text-brand-slate">
                    {formatDate(p.datePublished)}
                  </time>
                  <h3 className="mt-2 text-base font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                    Read the article
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {target && (
          <section className="mt-14 rounded-3xl border border-line bg-white p-8 shadow-ambient">
            <Eyebrow>Related</Eyebrow>
            <h2 className="mt-4 text-xl font-bold">{target.title.split(' in ')[0]}</h2>
            <p className="mt-2 leading-relaxed text-ink-muted">{target.metaDescription}</p>
            <Link
              href={targetHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate"
            >
              Read about {target.title.split(' in ')[0]}
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

      {/* Both render nothing when their data is absent (see ReviewedBy/References in
          components/service.tsx) — a post with no lastReviewed and no citations shows
          neither band, same contract as conditions and services. */}
      {/* Blog stays English-only and unprefixed, outside the `[locale]` tree. */}
      <ReviewedBy locale="en" dict={dict} date={post.lastReviewed} />
      <References dict={dict} items={post.citations} />

      <CtaBand dict={dict} message={waMessage.article(locale, post.title)} />
      <StickyCta dict={dict} message={waMessage.article(locale, post.title)} />
    </>
  )
}
