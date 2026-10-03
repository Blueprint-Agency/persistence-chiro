import Image from 'next/image'

/**
 * An image inside a blog post body, used from MDX as
 * `<PostFigure src="/img/..." alt="..." width={500} height={500} />`.
 *
 * Width and height are required (AGENTS.md: every image through next/image with real
 * dimensions) and double as the display cap: the figure never renders wider than its
 * source, so a small file is shown at its own size instead of being stretched soft.
 */
export function PostFigure({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <figure className="mt-6" style={{ maxWidth: width }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={`(max-width: ${width}px) 100vw, ${width}px`}
        className="h-auto w-full rounded-2xl"
      />
    </figure>
  )
}
