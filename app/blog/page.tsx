import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { publishedPosts } from '@/lib/posts'
import { readingTime } from '@/lib/reading-time'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { CtaBand, Eyebrow, PageHero, Vertebrae } from '@/components/ui'

export const metadata: Metadata = pageMetadata({
  title: 'Chiropractic & Spinal Health Blog',
  description:
    'Articles on back pain, muscle knots, posture, sleep and sports injury, written by the registered chiropractors at our clinic in Cheras, Kuala Lumpur.',
  path: '/blog',
})

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function BlogIndex() {
  const posts = publishedPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Blog', url: '/blog' }])} />
      {posts.length > 0 && (
        <JsonLd
          data={collectionPageSchema({
            name: 'Chiropractic & Spinal Health Blog',
            description:
              'Articles on back pain, posture, sports injury and spinal health from registered chiropractors in Cheras, Kuala Lumpur.',
            url: '/blog',
            items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
          })}
        />
      )}

      <PageHero
        eyebrow="From the clinic"
        title="Spine notes"
        intro="Articles on spinal health, posture and recovery, written by our own chiropractors in Cheras."
      />

      {!featured ? (
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <p className="text-ink-muted">Posts are being migrated.</p>
        </section>
      ) : (
        <>
          {/* The newest post gets a full band to itself rather than sitting in the grid as an
              identical tile to everything else. Most posts carry no dedicated photograph
              (this clinic's photography is of the clinic, not stock filler), so a photo-less
              featured post reuses the site's own slate-deep info card rather than an empty
              image slot pretending to be one. */}
          <section className="border-y border-line bg-white">
            <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
              <Eyebrow>Latest</Eyebrow>

              {featured.heroImage ? (
                <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
                  <div>
                    <Link href={`/blog/${featured.slug}`} className="group">
                      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
                        {featured.description}
                      </p>
                      <div className="mt-6 flex items-center gap-4 text-sm text-ink-muted">
                        <time dateTime={featured.datePublished}>
                          {formatDate(featured.datePublished)}
                        </time>
                        <span className="h-3 w-px bg-line" aria-hidden="true" />
                        <span>{readingTime(featured.slug)} min read</span>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5">
                        Read the article
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </Link>
                  </div>
                  <Link href={`/blog/${featured.slug}`} tabIndex={-1} aria-hidden="true">
                    <Image
                      src={featured.heroImage!.src}
                      alt=""
                      width={800}
                      height={640}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="aspect-[5/4] w-full rounded-3xl object-cover shadow-ambient"
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group mt-8 block overflow-hidden rounded-3xl bg-brand-slate-deep p-10 lg:p-14"
                >
                  <Vertebrae className="text-brand-gold" />
                  <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
                    <time dateTime={featured.datePublished}>
                      {formatDate(featured.datePublished)}
                    </time>
                    <span className="h-3 w-px bg-white/20" aria-hidden="true" />
                    <span>{readingTime(featured.slug)} min read</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5">
                    Read the article
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              )}
            </div>
          </section>

          {rest.length > 0 && (
            <section className="border-t border-line">
              <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                  <div>
                    <Eyebrow>More reading</Eyebrow>
                    <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">
                      Every article from the clinic
                    </h2>
                  </div>

                  <div className="divide-y divide-line border-y border-line">
                    {rest.map((p) => {
                      return (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}`}
                          className="group flex items-center gap-6 py-6"
                        >
                          {p.heroImage && (
                            <Image
                              src={p.heroImage.src}
                              alt=""
                              width={112}
                              height={112}
                              sizes="112px"
                              className="aspect-square w-24 flex-none rounded-2xl object-cover sm:w-28"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <time dateTime={p.datePublished} className="label text-brand-slate">
                              {formatDate(p.datePublished)}
                            </time>
                            <h3 className="mt-1.5 text-lg font-bold leading-snug">{p.title}</h3>
                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                              {p.description}
                            </p>
                          </div>
                          <span className="hidden flex-none items-center gap-1.5 text-sm font-semibold text-brand-slate group-hover:gap-2.5 sm:inline-flex">
                            Read
                            <span aria-hidden="true">&rarr;</span>
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <CtaBand />
    </>
  )
}
