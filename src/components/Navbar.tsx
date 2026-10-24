import { useEffect, useState } from 'react'
import { CTA_ID } from '../config'
import { Logo } from './ui'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#compare', label: 'Compare' },
  { href: '#faqs', label: 'FAQs' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <nav aria-label="Primary" className="relative mx-auto max-w-5xl">
        <div
          className={`flex items-center justify-between rounded-full border border-espresso/10 bg-white/90 py-2 pl-4 pr-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-lift' : 'shadow-pill'
          }`}
        >
          <a href="#top" className="flex items-center gap-2" aria-label="MemoFloat home">
            <Logo size={34} />
            <span className="font-display text-lg font-semibold tracking-tight">MemoFloat</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-bold text-espresso/75 transition hover:bg-butter/60 hover:text-espresso"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`#${CTA_ID}`}
              className="rounded-full bg-espresso px-5 py-2.5 text-sm font-extrabold text-cream transition duration-300 hover:scale-105 active:scale-95"
            >
              Get MemoFloat
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-butter/70 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-espresso transition-all duration-300 ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-5 rounded bg-espresso transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-espresso transition-all duration-300 ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full mt-2 origin-top rounded-3xl border border-espresso/10 bg-white p-2 shadow-lift transition-all duration-300 md:hidden ${
            open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
          }`}
        >
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-bold hover:bg-butter/60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
