import { useEffect, useState } from 'react'
import { useDownload } from '../context/DownloadContext'
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
  const { openModal, downloadCount } = useDownload()

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
    <header className="fixed inset-x-0 top-2.5 z-40 px-2 sm:top-4 sm:px-4">
      <nav aria-label="Primary" className="relative mx-auto max-w-5xl">
        <div
          className={`flex items-center justify-between rounded-full border border-espresso/10 bg-white/95 py-1.5 pl-2.5 pr-1.5 sm:py-2 sm:pl-4 sm:pr-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-lift' : 'shadow-pill'
          }`}
        >
          {/* Logo & Brand Name */}
          <a href="#top" className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-label="MemoFloat home">
            <Logo size={28} />
            <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-espresso">
              MemoFloat
            </span>
          </a>

          {/* Desktop Links */}
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

          {/* Action cluster on the right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Download counter pill */}
            <div
              className="flex items-center gap-1.5 rounded-full border border-espresso/10 bg-butter/40 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-espresso shadow-xs select-none shrink-0"
              title={`Total Downloads: ${downloadCount.toLocaleString()}`}
            >
              <svg className="h-3.5 w-3.5 text-espresso/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline text-espresso/75">Total Downloads:</span>
              <span className="sm:hidden text-espresso/75">Downloads:</span>
              <span className="font-extrabold text-espresso">{downloadCount.toLocaleString()}</span>
            </div>

            {/* Get MemoFloat Button (Hidden on phone screen, shown on sm: screens and up) */}
            <button
              type="button"
              onClick={openModal}
              className="hidden sm:inline-flex cursor-pointer rounded-full bg-espresso px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold text-cream transition duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Get MemoFloat
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-butter/70 shrink-0 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-2.5 w-4 sm:h-3 sm:w-5">
                <span
                  className={`absolute left-0 h-0.5 w-4 sm:w-5 rounded bg-espresso transition-all duration-300 ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-4 sm:w-5 rounded bg-espresso transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 sm:w-5 rounded bg-espresso transition-all duration-300 ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-full mt-2 origin-top rounded-3xl border border-espresso/10 bg-white p-3 shadow-lift transition-all duration-300 md:hidden ${
            open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
          }`}
        >
          <div className="mb-2 flex items-center justify-between rounded-2xl bg-butter/30 px-4 py-2.5 text-xs font-bold text-espresso">
            <span className="text-espresso/80 flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-espresso/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Total Downloads
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 font-extrabold text-espresso shadow-xs">
              {downloadCount.toLocaleString()}
            </span>
          </div>

          <ul className="mb-2 space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm font-bold text-espresso hover:bg-butter/50 transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openModal()
            }}
            className="w-full rounded-2xl bg-espresso py-3 text-center text-sm font-extrabold text-cream shadow-pill transition hover:scale-[1.02] active:scale-95"
          >
            Get MemoFloat
          </button>
        </div>
      </nav>
    </header>
  )
}
