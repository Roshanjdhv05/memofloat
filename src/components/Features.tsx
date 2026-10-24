import { useEffect, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks'
import { EdgeTabs } from './EdgeTabs'
import { Reveal } from './Reveal'
import { Container, MiniNote, MiniScreen, NOTE_BG, SectionHeading, type NoteColor } from './ui'

/* ---------- Preview demos ---------- */

function FloatDemo() {
  const items: { c: NoteColor; t: string; cls: string; r: number; d: number; s: number }[] = [
    { c: 'candy', t: 'Call Mom', cls: 'left-[6%] top-[14%] w-[40%]', r: -6, d: 0, s: 5 },
    { c: 'butter', t: 'Pay rent', cls: 'right-[6%] top-[8%] w-[38%]', r: 5, d: -1.5, s: 6 },
    { c: 'mint', t: 'Ideas ✨', cls: 'left-[28%] bottom-[8%] w-[42%]', r: 3, d: -3, s: 5.5 },
  ]
  return (
    <div className="relative h-full w-full">
      {items.map((n) => (
        <div
          key={n.t}
          className={`absolute animate-float ${n.cls}`}
          style={{ ['--r' as string]: `${n.r}deg`, animationDelay: `${n.d}s`, animationDuration: `${n.s}s` }}
        >
          <MiniNote color={n.c} title={n.t} />
        </div>
      ))}
    </div>
  )
}

function HideDemo() {
  const [hidden, setHidden] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setHidden((h) => !h)}
      aria-pressed={hidden}
      aria-label={hidden ? 'Show the note again' : 'Hide the note under the edge tab'}
      className="absolute inset-0 h-full w-full overflow-hidden text-left"
    >
      <div
        className="absolute right-[9%] top-1/2 w-[52%] transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
        style={{ transform: `translate(${hidden ? '130%' : '0'}, -50%)` }}
      >
        <MiniNote color="sky" title="Groceries">
          Oat milk, eggs, basil
        </MiniNote>
      </div>
      <span className="absolute right-0 top-1/2 h-[34%] w-[6%] -translate-y-1/2 rounded-l-xl bg-candy shadow-pill" />
      <span className="absolute bottom-2 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold shadow-soft">
        {hidden ? 'Tap to bring it back' : 'Tap to tuck it away'}
      </span>
    </button>
  )
}

function QuickDemo() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<number | null>(1)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => setActive((a) => ((a ?? -1) + 1) % 5), 1800)
    return () => window.clearInterval(id)
  }, [reduced, paused])
  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <MiniScreen className="!rounded-none !border-0">
        <EdgeTabs
          mode="strand"
          active={active}
          onSelect={(i) => setActive(i)}
          labels={['Today', 'Ideas', 'Errands', 'Work', 'Later']}
        />
        <div className="absolute left-[6%] top-[22%] w-[48%] space-y-[4%]">
          {[90, 70, 80].map((w, i) => (
            <div key={i} className="h-[11px] rounded-full bg-espresso/10" style={{ width: `${w}%` }} />
          ))}
        </div>
      </MiniScreen>
    </div>
  )
}

function StylesDemo() {
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-2.5">
      {(['strand', 'arc'] as const).map((m) => (
        <div key={m} className="flex flex-col justify-center">
          <MiniScreen bar={false}>
            <EdgeTabs mode={m} active={2} count={4} />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold">
              {m === 'strand' ? 'Strand' : 'Semi-Circle'}
            </span>
          </MiniScreen>
        </div>
      ))}
    </div>
  )
}

function ColorDemo() {
  const notes: { c: NoteColor; t: string; l: string; r: number }[] = [
    { c: 'butter', t: 'Today', l: '6%', r: -10 },
    { c: 'candy', t: 'Personal', l: '28%', r: -3 },
    { c: 'mint', t: 'Errands', l: '50%', r: 4 },
    { c: 'sky', t: 'Ideas', l: '70%', r: 10 },
  ]
  return (
    <div className="relative h-full w-full">
      {notes.map((n, i) => (
        <div
          key={n.t}
          className="absolute top-[22%] w-[26%] transition-transform duration-300 hover:-translate-y-2"
          style={{ left: n.l, transform: `rotate(${n.r}deg)`, zIndex: i }}
        >
          <div className={`${NOTE_BG[n.c]} aspect-[4/5] rounded-2xl border border-white/60 p-2.5 shadow-soft`}>
            <p className="font-display text-xs font-semibold">{n.t}</p>
            <div className="mt-2 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-espresso/15" />
              <div className="h-1.5 w-4/5 rounded-full bg-espresso/15" />
              <div className="h-1.5 w-3/5 rounded-full bg-espresso/15" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TidyDemo() {
  const [tidy, setTidy] = useState(false)
  const notes: { c: NoteColor; ml: [string, string, number]; tt: string }[] = [
    { c: 'butter', ml: ['8%', '18%', -8], tt: '14%' },
    { c: 'candy', ml: ['28%', '28%', 6], tt: '34%' },
    { c: 'mint', ml: ['14%', '48%', 5], tt: '54%' },
    { c: 'sky', ml: ['38%', '42%', -5], tt: '74%' },
  ]
  return (
    <button
      type="button"
      onClick={() => setTidy((t) => !t)}
      aria-pressed={tidy}
      aria-label={tidy ? 'Spread the notes out again' : 'Tidy the notes under the edge'}
      className="absolute inset-0 h-full w-full overflow-hidden text-left"
    >
      {notes.map((n, i) => (
        <div
          key={i}
          className={`edge-tab absolute h-[24%] w-[38%] rounded-xl border border-white/60 shadow-soft ${NOTE_BG[n.c]}`}
          style={{
            left: tidy ? 'calc(100% - 22px)' : n.ml[0],
            top: tidy ? n.tt : n.ml[1],
            transform: `rotate(${tidy ? 0 : n.ml[2]}deg)`,
            zIndex: i,
          }}
        />
      ))}
      <span className="absolute bottom-2 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold shadow-soft">
        {tidy ? 'Clutter-free ✓' : 'Tap to tidy up'}
      </span>
    </button>
  )
}

/* ---------- Cards ---------- */

type Feature = { title: string; text: string; bg: string; demo: ReactNode }

const FEATURES: Feature[] = [
  {
    title: 'Floating desktop notes',
    text: 'Notes stay right on your desktop, so reminders are visible without opening another app.',
    bg: 'from-butter/70 to-cream',
    demo: <FloatDemo />,
  },
  {
    title: 'Hide notes under edge tabs',
    text: 'Tuck a note out of the way behind the screen edge and bring it back whenever you need it.',
    bg: 'from-candy/40 to-cream',
    demo: <HideDemo />,
  },
  {
    title: 'Quick edge navigation',
    text: 'Tabs along the edge of your desktop keep every note one click away.',
    bg: 'from-sky/80 to-cream',
    demo: <QuickDemo />,
  },
  {
    title: 'Two navigation styles',
    text: 'Choose Strand for straight stacked tabs, or Semi-Circle for curved, fan-shaped tabs.',
    bg: 'from-mint/50 to-cream',
    demo: <StylesDemo />,
  },
  {
    title: 'Colorful note organization',
    text: 'Give notes their own pastel color so you can tell them apart at a glance.',
    bg: 'from-butter/60 to-candy/30',
    demo: <ColorDemo />,
  },
  {
    title: 'A cleaner, clutter-free workspace',
    text: 'Keep what matters in reach and everything else tucked away, so your desktop stays calm.',
    bg: 'from-sky/60 to-mint/30',
    demo: <TidyDemo />,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Features" title="Everything your notes need, nothing they don't">
            Colorful notes that float, tuck away, and stay one click from wherever you're working.
          </SectionHeading>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90} className="h-full">
              <article className="group flex h-full flex-col rounded-[2rem] border border-espresso/10 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div
                  className={`relative aspect-[560/360] overflow-hidden rounded-3xl bg-gradient-to-br ${f.bg}`}
                >
                  {f.demo}
                </div>
                <h3 className="mt-5 px-2 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 px-2 pb-2 leading-relaxed text-espresso/70">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
