import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Container, MiniNote, SectionHeading } from './ui'

function CaptureArt() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-2xl border border-white/60 bg-butter p-3 shadow-soft">
        <p className="font-display text-sm font-semibold">Reminder</p>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-2 w-4/5 rounded-full bg-espresso/20" />
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <div className="h-2 w-2/5 rounded-full bg-espresso/20" />
          <span className="animate-caret h-3.5 w-0.5 bg-espresso" />
        </div>
      </div>
    </div>
  )
}

function VisibleArt() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-[10%] top-[16%] bottom-[10%] rounded-2xl bg-white/80 p-3 shadow-soft">
        <div className="h-2 w-1/3 rounded-full bg-espresso/15" />
        <div className="mt-3 h-2 w-4/5 rounded-full bg-espresso/10" />
        <div className="mt-2 h-2 w-3/5 rounded-full bg-espresso/10" />
        <div className="mt-2 h-2 w-2/3 rounded-full bg-espresso/10" />
      </div>
      <div
        className="absolute right-[6%] top-[8%] w-[44%] animate-float"
        style={{ '--r': '5deg', animationDuration: '5s' } as CSSProperties}
      >
        <MiniNote color="candy" title="Call Mom">
          5:00 pm
        </MiniNote>
      </div>
    </div>
  )
}

function HideArt() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute right-[10%] top-1/2 w-[50%] -translate-y-1/2">
        <div className="animate-tuck">
          <MiniNote color="mint" title="Groceries">
            Oat milk, eggs
          </MiniNote>
        </div>
      </div>
      <span className="absolute right-0 top-1/2 h-[36%] w-[6%] -translate-y-1/2 rounded-l-xl bg-candy shadow-pill" />
    </div>
  )
}

const STEPS: { n: number; title: string; text: string; bg: string; badge: string; art: ReactNode }[] = [
  {
    n: 1,
    title: 'Capture a thought',
    text: 'Jot down an idea, reminder, or task the moment it pops into your head.',
    bg: 'from-butter/70 to-cream',
    badge: 'bg-butter',
    art: <CaptureArt />,
  },
  {
    n: 2,
    title: 'Keep it visible',
    text: 'Let the note float on your desktop so it stays right where you can see it.',
    bg: 'from-candy/40 to-cream',
    badge: 'bg-candy',
    art: <VisibleArt />,
  },
  {
    n: 3,
    title: 'Hide it when needed',
    text: 'Slide the note behind an edge tab to clear space, then bring it back later.',
    bg: 'from-mint/50 to-cream',
    badge: 'bg-mint',
    art: <HideArt />,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="How it works" title="Three simple moves">
            From a passing thought to a tidy desktop in a few clicks.
          </SectionHeading>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[3.1rem] hidden border-t-2 border-dashed border-espresso/20 md:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="h-full">
              <article className="relative h-full rounded-[2rem] border border-espresso/10 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span
                  className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-white font-display text-xl font-bold shadow-pill ${s.badge}`}
                >
                  {s.n}
                </span>
                <div className={`relative mt-4 aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br ${s.bg}`}>
                  {s.art}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-espresso/70">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
