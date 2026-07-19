import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { clinic } from '@/lib/clinic'
import { publishedPosts } from '@/lib/posts'
import { postImages } from '@/lib/home'
import { CtaBand, PageHero, Vertebrae } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Chiropractic & Spinal Health Blog',
  description:
    'Articles on back pain, posture, sports injury and spinal health from registered chiropractors in Cheras, Kuala Lumpur.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const posts = publishedPosts()

  return (
    <>
      <PageHero
        eyebrow="From the clinic"
        title="Spine notes"
        intro="Spinal health, posture and recovery — written by our chiropractors, not a content agency."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        {posts.length === 0 ? (
          <p className="text-ink-muted">Posts are being migrated.</p>
        ) : (
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  {/* Only three posts carried artwork off Wix. The rest get the vertebral
                      mark on a tint rather than a stock photo that means nothing. */}
                  {postImages[p.slug] ? (
                    <Image
                      src={postImages[p.slug]}
                      alt={p.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-brand-aqua/60">
                      <Vertebrae className="scale-[2.2] text-brand-slate/40" />
                    </div>
                  )}

                  <time
                    dateTime={p.datePublished}
                    className="mt-5 block label text-brand-slate"
                  >
                    {new Date(p.datePublished).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-2 text-lg font-bold leading-snug group-hover:text-brand-slate">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaBand
        bookingUrl={clinic.bookingUrl}
        phone={clinic.phone}
        phoneE164={clinic.phoneE164}
      />
    </>
  )
}
