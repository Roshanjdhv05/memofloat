import { PRIVACY_URL, SUPPORT_URL, TERMS_URL } from '../config'
import { Container, Logo } from './ui'

const NAV = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#compare', label: 'Compare' },
  { href: '#faqs', label: 'FAQs' },
]
const SUPPORT = [
  { href: SUPPORT_URL, label: 'Support' },
  { href: PRIVACY_URL, label: 'Privacy' },
  { href: TERMS_URL, label: 'Terms' },
]

function LinkList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-extrabold uppercase tracking-widest text-espresso/50">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="font-bold text-espresso/80 transition hover:text-espresso hover:underline">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-white/60 py-12 backdrop-blur-sm">
      <Container className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2">
            <Logo size={40} />
            <span className="font-display text-xl font-semibold">MemoFloat</span>
          </a>
          <p className="mt-3 max-w-xs text-espresso/70">
            Colorful sticky notes that float on your desktop and tuck away at the edge.
          </p>
        </div>
        <LinkList title="Navigate" links={NAV} />
        <LinkList title="Support" links={SUPPORT} />
      </Container>
      <Container>
        <p className="mt-10 border-t border-espresso/10 pt-6 text-sm text-espresso/60">
          © {new Date().getFullYear()} MemoFloat. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
