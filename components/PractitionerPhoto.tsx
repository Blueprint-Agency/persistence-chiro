import Image from 'next/image'

/**
 * A practitioner's headshot, or an initials tile while the clinic has not supplied one.
 *
 * `photo` is null for a practitioner added before their headshot arrived (Chek Ru-E, from
 * 2026-11-08). A tile at the same 4:5 ratio keeps the card grid even. Leaving the slot empty
 * makes one card shorter than the rest, and a stock face would show someone who does not work
 * here. Once the photo lands in public/img, set `photo` in lib/clinic.ts. Nothing else changes.
 */
export function PractitionerPhoto({
  name,
  role,
  photo,
  width,
  height,
  sizes,
  priority,
  className,
}: {
  name: string
  role: string
  photo: string | null
  width: number
  height: number
  sizes: string
  priority?: boolean
  className?: string
}) {
  const alt = `${name}, ${role} at Persistence Chiropractic Care in Cheras, Kuala Lumpur`

  if (photo) {
    return (
      <Image
        src={photo}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    )
  }

  const initials = name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex aspect-[4/5] w-full items-center justify-center bg-brand-slate ${className ?? ''}`}
    >
      <span aria-hidden="true" className="text-6xl font-extrabold tracking-wide text-brand-gold">
        {initials}
      </span>
    </div>
  )
}
