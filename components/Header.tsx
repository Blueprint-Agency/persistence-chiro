import Link from 'next/link'
import { clinic } from '@/lib/clinic'
import { mainNav } from '@/lib/nav'

export function Header() {
  const nav = mainNav()
  return (
    <header className="border-b border-neutral-200">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight text-[#212121]">
          {clinic.name}
        </Link>

        <ul className="ml-auto hidden items-center gap-5 text-sm md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-[#414141] hover:text-[#2B5672]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={clinic.bookingUrl}
          target="_blank"
          rel="noopener"
          className="rounded bg-[#E8C111] px-4 py-2 text-sm font-medium text-[#212121]"
        >
          Book Now
        </a>
      </nav>
    </header>
  )
}
