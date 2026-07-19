import type { Metadata } from 'next'
import Link from 'next/link'
import { publishedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Chiropractic & Spinal Health Blog',
  description:
    'Articles on back pain, posture, sports injury and spinal health from registered chiropractors in Cheras, Kuala Lumpur.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const posts = publishedPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Spinal health, posture and recovery — written by our chiropractors.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-ink-muted">Posts are being migrated.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="text-brand-slate underline">
                <h2 className="inline text-lg font-medium">{p.title}</h2>
              </Link>
              <p className="mt-1 text-sm text-ink-muted">{p.description}</p>
              <time dateTime={p.datePublished} className="text-xs text-neutral-500">
                {new Date(p.datePublished).toLocaleDateString('en-MY', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
