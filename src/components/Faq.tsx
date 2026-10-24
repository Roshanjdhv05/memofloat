import { useState } from 'react'
import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

const FAQS = [
  {
    q: 'What is MemoFloat?',
    a: 'MemoFloat is a desktop sticky-note app. Colorful notes float on your desktop so your ideas, reminders, and tasks stay within reach.',
  },
  {
    q: 'How does edge navigation work?',
    a: 'Tabs sit along the edge of your desktop. You can hide a note beneath its tab to clear space, and use the tabs to bring notes back whenever you need them.',
  },
  {
    q: "What's the difference between Strand and Semi-Circle?",
    a: 'They are two ways to arrange your edge tabs. Strand lines them up as straight, stacked tabs. Semi-Circle spreads them as curved, fan-shaped tabs. Pick whichever feels better to you.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'MemoFloat is a desktop app. This page does not list supported operating systems, so please check the download page for the latest details.',
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing is not listed on this page. Check the download page for current pricing information.',
  },
  {
    q: 'How do I get started?',
    a: 'Use any Get MemoFloat button on this page to head to the download page, install the app, and create your first note.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faqs" className="py-20 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="FAQs" title="Questions, answered">
            The essentials about MemoFloat in a few lines.
          </SectionHeading>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div
                  className={`rounded-3xl border bg-white shadow-soft transition duration-300 hover:shadow-pill ${
                    isOpen ? 'border-espresso/25' : 'border-espresso/10'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left text-base font-semibold sm:px-6 sm:py-5 sm:text-lg"
                    >
                      {f.q}
                      <span
                        aria-hidden="true"
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen ? 'rotate-45 bg-butter' : 'bg-cream'
                        }`}
                      >
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#30271F" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M10 4v12M4 10h12" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 leading-relaxed text-espresso/75 sm:px-6">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
