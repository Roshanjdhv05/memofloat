import { Reveal } from './Reveal'
import { Container, SectionHeading } from './ui'

type Cell = 'yes' | 'no' | 'varies'

const COLUMNS = ['MemoFloat', 'Traditional desktop notes', 'Browser-based notes']

const ROWS: { feature: string; values: [Cell, Cell, Cell] }[] = [
  { feature: 'Floating notes on your desktop', values: ['yes', 'varies', 'no'] },
  { feature: 'Desktop-edge access', values: ['yes', 'no', 'no'] },
  { feature: 'Hide notes under edge tabs', values: ['yes', 'no', 'no'] },
  { feature: 'Strand layout (straight stacked tabs)', values: ['yes', 'no', 'no'] },
  { feature: 'Semi-Circle layout (curved fan tabs)', values: ['yes', 'no', 'no'] },
  { feature: 'Quick desktop access', values: ['yes', 'varies', 'varies'] },
]

function Mark({ value }: { value: Cell }) {
  if (value === 'yes') {
    return (
      <span className="inline-grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-mint shadow-soft">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="#30271F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 10.5l4 4 8-9" />
        </svg>
        <span className="sr-only">Yes</span>
      </span>
    )
  }
  if (value === 'no') {
    return (
      <span className="inline-grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-candy/30">
        <svg viewBox="0 0 20 20" className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="#30271F" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    )
  }
  return (
    <span className="inline-block rounded-full bg-sky px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-extrabold text-espresso">
      Varies
    </span>
  )
}

export function Compare() {
  return (
    <section id="compare" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Compare" title="How MemoFloat stacks up">
            See how floating notes with edge tabs differ from the usual ways of keeping notes.
          </SectionHeading>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto rounded-[1.5rem] sm:rounded-[2rem] border border-espresso/10 bg-white shadow-soft">
            <table className="w-full min-w-[460px] sm:min-w-[580px] border-separate border-spacing-0 text-center">
              <caption className="sr-only">Feature comparison of MemoFloat, traditional desktop notes and browser-based notes</caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-white p-2.5 sm:p-4 text-left text-xs sm:text-sm font-extrabold text-espresso/60">
                    Feature
                  </th>
                  {COLUMNS.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-2.5 sm:p-4 font-display text-xs sm:text-sm md:text-base font-semibold leading-snug ${
                        i === 0 ? 'rounded-t-2xl sm:rounded-t-3xl bg-butter/70' : ''
                      }`}
                    >
                      {i === 0 && (
                        <span className="mb-0.5 sm:mb-1 block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-espresso/60">
                          This app
                        </span>
                      )}
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, ri) => (
                  <tr key={r.feature} className="group">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-t border-espresso/10 bg-white p-2.5 sm:p-4 text-left text-xs sm:text-sm font-semibold sm:font-bold leading-snug"
                    >
                      {r.feature}
                    </th>
                    {r.values.map((v, ci) => (
                      <td
                        key={ci}
                        className={`border-t border-espresso/10 p-2 sm:p-3.5 transition-colors group-hover:bg-cream/70 ${
                          ci === 0 ? `bg-butter/50 group-hover:bg-butter/70 ${ri === ROWS.length - 1 ? 'rounded-b-2xl sm:rounded-b-3xl' : ''}` : ''
                        }`}
                      >
                        <Mark value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-espresso/60">
            Comparison reflects typical behavior of generic desktop and browser note tools. Individual apps differ.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
