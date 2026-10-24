import type { CSSProperties, ReactNode } from 'react'
import { CTA_ID, asset } from '../config'
import { EdgeTabs } from './EdgeTabs'
import { Button, Container, MiniNote, MiniScreen } from './ui'

const rise = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` })

function Floater({
  children,
  className,
  rotate,
  enter,
  duration,
  offset,
}: {
  children: ReactNode
  className: string
  rotate: number
  enter: number
  duration: number
  offset: number
}) {
  return (
    <div className={`absolute animate-pop ${className}`} style={rise(enter)}>
      <div
        className="animate-float"
        style={{ '--r': `${rotate}deg`, animationDuration: `${duration}s`, animationDelay: `${offset}s` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative pb-20 pt-32 sm:pt-36 lg:pb-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="text-center lg:text-left">
          <p
            className="animate-rise mx-auto inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-white/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-soft lg:mx-0"
            style={rise(0)}
          >
            <span className="h-2 w-2 rounded-full bg-mint" />
            Sticky notes for your desktop
          </p>
          <h1
            className="animate-rise mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            style={rise(120)}
          >
            Your thoughts deserve a place to{' '}
            <span className="relative inline-block">
              <span className="relative z-10">float.</span>
              <span className="absolute -inset-x-1 bottom-1 z-0 h-3 -rotate-1 rounded-full bg-butter sm:h-4" />
            </span>
          </h1>
          <p
            className="animate-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-espresso/75 lg:mx-0 sm:text-xl"
            style={rise(240)}
          >
            Keep your ideas, reminders, and tasks within reach with colorful sticky notes that float on your desktop.
          </p>
          <div
            className="animate-rise mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={rise(360)}
          >
            <Button href={`#${CTA_ID}`}>Get MemoFloat</Button>
            <Button href="#features" variant="light">
              Explore Features
            </Button>
          </div>
          <div
            className="animate-rise mt-8 flex items-center justify-center gap-2 lg:justify-start"
            style={rise(480)}
            aria-hidden="true"
          >
            {['bg-butter', 'bg-candy', 'bg-mint', 'bg-sky'].map((c) => (
              <span key={c} className={`h-4 w-4 rounded-full border-2 border-white shadow-soft ${c}`} />
            ))}
            <span className="ml-1 text-sm font-bold text-espresso/60">Four pastel note colors</span>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-butter/70 via-candy/30 to-sky/70 blur-2xl" />

          <div className="absolute inset-[8%] animate-pop" style={rise(150)}>
            <div
              className="animate-float h-full w-full"
              style={{ '--r': '0deg', animationDuration: '7s' } as CSSProperties}
            >
              <img
                src={asset('logo.png')}
                alt="A stack of yellow, pink and green sticky notes with a smiling yellow note on top"
                width={640}
                height={640}
                className="h-full w-full select-none object-contain drop-shadow-[0_28px_30px_rgba(48,39,31,0.22)]"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>

          <Floater className="left-[-2%] top-[8%] w-[38%]" rotate={-7} enter={500} duration={5.5} offset={0}>
            <MiniNote color="candy" title="Call Mom">
              Today · 5:00 pm
            </MiniNote>
          </Floater>
          <Floater className="right-[-2%] top-[16%] w-[36%]" rotate={6} enter={650} duration={6.5} offset={-2}>
            <MiniNote color="mint" title="Ship the draft">
              Before lunch
            </MiniNote>
          </Floater>
          <Floater className="left-[2%] bottom-[10%] w-[34%]" rotate={5} enter={800} duration={6} offset={-4}>
            <MiniNote color="sky" title="Water plants">
              Every Friday
            </MiniNote>
          </Floater>

          <Floater className="bottom-[2%] right-[0%] w-[46%]" rotate={0} enter={950} duration={7.5} offset={-1}>
            <div className="rounded-2xl border border-espresso/10 bg-white p-1.5 shadow-lift">
              <MiniScreen>
                <EdgeTabs mode="strand" active={1} count={4} />
              </MiniScreen>
              <p className="px-1 pb-0.5 pt-1.5 text-center text-[11px] font-extrabold text-espresso/70">
                Desktop-edge tabs
              </p>
            </div>
          </Floater>
        </div>
      </Container>
    </section>
  )
}
