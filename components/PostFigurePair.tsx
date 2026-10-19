import Image from 'next/image'

type Panel = { src: string; alt: string; label: string; caption: string }

/**
 * Two labelled illustrations side by side inside a blog post body, used from MDX as
 * `<PostFigurePair panels={[{ src, alt, label, caption }, { ... }]} />`.
 *
 * For a "this vs that" picture. The labels are real text rather than words baked into the
 * image, so they stay sharp, translate, and reach screen readers. Source images are square
 * and 640px; on a phone the panels stack.
 */
export function PostFigurePair({ panels }: { panels: [Panel, Panel] }) {
  return (
    <figure className="mt-6 grid gap-6 sm:grid-cols-2">
      {panels.map((p) => (
        <div key={p.src}>
          <Image
            src={p.src}
            alt={p.alt}
            width={640}
            height={640}
            sizes="(max-width: 640px) 100vw, 320px"
            // Same reason as PostFigure: small WebP sources showed artifacts at the default 75.
            quality={95}
            className="h-auto w-full rounded-2xl"
          />
          <div className="mt-3 border-l-2 border-brand-gold pl-4">
            <p className="font-bold leading-snug text-ink">{p.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.caption}</p>
          </div>
        </div>
      ))}
    </figure>
  )
}
