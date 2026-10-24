import { useState, type CSSProperties } from 'react'
import { EdgeTabs, TAB_COLORS, type NavMode } from './EdgeTabs'
import { Reveal } from './Reveal'
import { Container, MiniScreen, NOTE_BG, SectionHeading } from './ui'

const NOTES = [
  { title: 'Today', text: 'Reply to Priya · Book dentist' },
  { title: 'Ideas', text: 'Floating notes for the launch post' },
  { title: 'Errands', text: 'Oat milk · Stamps · Dry cleaning' },
  { title: 'Work', text: 'Draft the Q4 outline' },
  { title: 'Later', text: 'Plan weekend trip' },
]

const STYLES: { mode: NavMode; name: string; text: string }[] = [
  { mode: 'strand', name: 'Strand', text: 'Straight, stacked tabs along the edge. Calm and easy to scan.' },
  { mode: 'arc', name: 'Semi-Circle', text: 'Curved, fan-shaped tabs that sweep out from the edge.' },
]

export function NavStyles() {
  const [mode, setMode] = useState<NavMode>('strand')
  const [active, setActive] = useState<number | null>(0)

  const toggle = (i: number) => setActive((a) => (a === i ? null : i))

  return (
    <section id="navigation-styles" className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Navigation styles" title="Pick the shape that fits how you work">
            Try it: switch between Strand and Semi-Circle, then click a tab to slide its note out from the edge.
          </SectionHeading>
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_1fr]">
          {/* Interactive stage */}
          <Reveal>
            <div className="rounded-[2rem] border border-espresso/10 bg-white p-4 shadow-soft sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label="Navigation style"
                  className="relative inline-grid grid-cols-2 rounded-full bg-cream p-1 ring-1 ring-espresso/10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-butter shadow-soft transition-transform duration-500 ease-[cubic-bezier(.34,1.3,.4,1)]"
                    style={{ transform: `translateX(${mode === 'strand' ? '0%' : '100%'})` }}
                  />
                  {STYLES.map((s) => (
                    <button
                      key={s.mode}
                      type="button"
                      aria-pressed={mode === s.mode}
                      onClick={() => setMode(s.mode)}
                      className="relative z-10 rounded-full px-5 py-2 text-sm font-extrabold"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                <p className="text-sm font-bold text-espresso/60" aria-live="polite">
                  {active === null ? 'All notes tucked away' : `Showing: ${NOTES[active].title}`}
                </p>
              </div>

              <div className="rounded-[1.4rem] bg-espresso p-2 shadow-lift sm:p-3">
                <div style={{ containerType: 'inline-size' } as CSSProperties}>
                  <MiniScreen className="!rounded-2xl">
                    {/* faux app window */}
                    <div className="absolute left-[5%] top-[16%] h-[62%] w-[40%] rounded-[4%] bg-white/80 p-[2.5%] shadow-soft">
                      <div className="mb-[6%] h-[6%] w-1/2 rounded-full bg-espresso/15" />
                      {[100, 86, 94, 60, 78].map((w, i) => (
                        <div
                          key={i}
                          className="mb-[5%] h-[5%] rounded-full bg-espresso/10"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>

                    {/* notes that slide out from behind the edge */}
                    {NOTES.map((n, i) => {
                      const color = TAB_COLORS[i]
                      const out = active === i
                      return (
                        <div
                          key={n.title}
                          aria-hidden={!out}
                          className={`absolute top-1/2 w-[34%] rounded-[6%] border border-white/60 p-[2.4%] shadow-lift ${NOTE_BG[color]}`}
                          style={{
                            right: mode === 'strand' ? '15%' : '24%',
                            transform: `translate(${out ? '0' : '135%'}, -50%) rotate(${out ? (i % 2 ? 2 : -2) : 0}deg)`,
                            opacity: out ? 1 : 0,
                            pointerEvents: out ? 'auto' : 'none',
                            transition:
                              'transform .7s cubic-bezier(.65,0,.35,1), right .7s cubic-bezier(.34,1.25,.4,1), opacity .3s ease ' +
                              (out ? '0s' : '.4s'),
                            zIndex: out ? 5 : 1,
                          }}
                        >
                          <p className="font-display font-semibold" style={{ fontSize: '3.2cqw' }}>
                            {n.title}
                          </p>
                          <p className="mt-[3%] leading-snug text-espresso/70" style={{ fontSize: '2.3cqw' }}>
                            {n.text}
                          </p>
                        </div>
                      )
                    })}

                    <EdgeTabs
                      mode={mode}
                      active={active}
                      onSelect={toggle}
                      labels={NOTES.map((n) => n.title)}
                    />
                  </MiniScreen>
                </div>
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-espresso/60">
                Click a tab to slide its note out. Click it again to tuck it back behind the edge.
              </p>
            </div>
          </Reveal>

          {/* Side-by-side previews */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {STYLES.map((s, i) => {
              const selected = mode === s.mode
              return (
                <Reveal key={s.mode} delay={i * 100} className="h-full">
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setMode(s.mode)}
                    className={`group h-full w-full rounded-[2rem] border bg-white p-4 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
                      selected ? 'border-espresso ring-2 ring-butter' : 'border-espresso/10'
                    }`}
                  >
                    <MiniScreen bar={false}>
                      <EdgeTabs mode={s.mode} active={selected ? 2 : null} />
                    </MiniScreen>
                    <div className="mt-4 flex items-center justify-between gap-2 px-1">
                      <h3 className="text-lg font-semibold">{s.name}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                          selected ? 'bg-butter' : 'bg-cream text-espresso/60'
                        }`}
                      >
                        {selected ? 'Selected' : 'Preview'}
                      </span>
                    </div>
                    <p className="mt-1 px-1 text-sm leading-relaxed text-espresso/70">{s.text}</p>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
