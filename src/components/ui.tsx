import type { CSSProperties, ReactNode } from 'react'
import { asset } from '../config'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="inline-block rounded-full border border-espresso/10 bg-white/80 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-espresso/70 shadow-soft">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base text-espresso/70 sm:text-lg">{children}</p>}
    </div>
  )
}

const BUTTONS = {
  dark: 'bg-espresso text-cream shadow-pill hover:shadow-lift',
  light: 'border border-espresso/15 bg-white text-espresso shadow-soft hover:shadow-pill',
  butter: 'bg-butter text-espresso shadow-pill hover:shadow-lift',
} as const

export function Button({
  href,
  children,
  variant = 'dark',
  className = '',
  onClick,
}: {
  href?: string
  children: ReactNode
  variant?: keyof typeof BUTTONS
  className?: string
  onClick?: () => void
}) {
  const commonClasses = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition duration-300 hover:scale-[1.04] active:scale-95 sm:text-base ${BUTTONS[variant]} ${className}`

  if (onClick && !href) {
    return (
      <button type="button" onClick={onClick} className={commonClasses}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href || '#'}
      onClick={(e) => {
        if (onClick) {
          if (!href || href === '#') {
            e.preventDefault()
          }
          onClick()
        }
      }}
      className={commonClasses}
    >
      {children}
    </a>
  )
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <img
      src={asset('logo-sm.png')}
      width={size}
      height={size}
      alt=""
      className="select-none"
      style={{ width: size, height: size }}
    />
  )
}

export const NOTE_BG = {
  butter: 'bg-butter',
  candy: 'bg-candy',
  mint: 'bg-mint',
  sky: 'bg-sky',
} as const
export type NoteColor = keyof typeof NOTE_BG

export function MiniNote({
  color,
  title,
  children,
  className = '',
  style,
}: {
  color: NoteColor
  title: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`${NOTE_BG[color]} rounded-xl sm:rounded-2xl border border-white/60 p-2 sm:p-3 shadow-soft ${className}`}
      style={style}
    >
      <p className="font-display text-xs sm:text-sm font-semibold leading-tight truncate sm:whitespace-normal">{title}</p>
      {children && <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-snug text-espresso/70">{children}</p>}
    </div>
  )
}

/** A tiny desktop "screen" that fills its parent's width at a 560:360 ratio. */
export function MiniScreen({
  children,
  className = '',
  bar = true,
}: {
  children?: ReactNode
  className?: string
  bar?: boolean
}) {
  return (
    <div
      className={`relative aspect-[560/360] w-full overflow-hidden rounded-xl border border-espresso/10 bg-cream bg-gradient-to-br from-sky/70 via-cream to-butter/40 ${className}`}
    >
      {bar && (
        <div className="absolute inset-x-0 top-0 flex h-[7%] items-center gap-[1.2%] bg-white/50 px-[2%]">
          <span className="h-[40%] aspect-square rounded-full bg-candy" />
          <span className="h-[40%] aspect-square rounded-full bg-butter" />
          <span className="h-[40%] aspect-square rounded-full bg-mint" />
        </div>
      )}
      {children}
    </div>
  )
}
