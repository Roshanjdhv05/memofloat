import type { CSSProperties } from 'react'
import { NOTE_BG, type NoteColor } from './ui'

export type NavMode = 'strand' | 'arc'

const W = 560
const H = 360

export const TAB_COLORS: NoteColor[] = ['butter', 'candy', 'mint', 'sky', 'butter']

function place(mode: NavMode, i: number, n: number, active: boolean) {
  const k = i - (n - 1) / 2
  if (mode === 'strand') {
    return { x: W - 22 - (active ? 22 : 0), y: H / 2 + k * 56, r: 0 }
  }
  const theta = k * 27
  const rad = (theta * Math.PI) / 180
  const R = 138 + (active ? 18 : 0)
  const cx = W + 14
  return { x: cx - R * Math.cos(rad), y: H / 2 + R * Math.sin(rad), r: -theta }
}

type Props = {
  mode: NavMode
  /** Index of the tab whose note is currently out (or null). */
  active?: number | null
  /** When provided, tabs become buttons. */
  onSelect?: (index: number) => void
  labels?: string[]
  count?: number
}

/**
 * Renders edge tabs inside a parent that is `relative` with a 560:360 aspect
 * ratio. Everything is positioned in percentages so it scales to any size, and
 * left/top/transform are transitioned so Strand <-> Semi-Circle animates.
 */
export function EdgeTabs({ mode, active = null, onSelect, labels = [], count = 5 }: Props) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }, (_, i) => {
        const p = place(mode, i, count, active === i)
        const style: CSSProperties = {
          left: `${(p.x / W) * 100}%`,
          top: `${(p.y / H) * 100}%`,
          width: `${(66 / W) * 100}%`,
          aspectRatio: '66 / 46',
          transform: `translate(-50%, -50%) rotate(${p.r}deg)`,
        }
        const cls = `edge-tab absolute rounded-[22%] border-2 border-white/70 ${NOTE_BG[TAB_COLORS[i % TAB_COLORS.length]]} shadow-pill`
        const grip = (
          <span className="absolute left-[14%] top-1/2 h-[46%] w-[6%] -translate-y-1/2 rounded-full bg-espresso/25" />
        )
        if (!onSelect) {
          return (
            <div key={i} aria-hidden="true" className={cls} style={style}>
              {grip}
            </div>
          )
        }
        return (
          <button
            key={i}
            type="button"
            aria-pressed={active === i}
            aria-label={labels[i] ? `Toggle note: ${labels[i]}` : `Toggle note ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`${cls} cursor-pointer hover:brightness-105 focus-visible:z-10`}
            style={style}
          >
            {grip}
          </button>
        )
      })}
    </div>
  )
}
