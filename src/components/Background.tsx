const BLOBS = [
  { c: 'bg-butter', cls: 'left-[-8%] top-[4%] h-80 w-80', d: '0s', t: '24s' },
  { c: 'bg-candy', cls: 'right-[-6%] top-[22%] h-96 w-96', d: '-6s', t: '28s' },
  { c: 'bg-sky', cls: 'left-[8%] top-[48%] h-72 w-72', d: '-11s', t: '26s' },
  { c: 'bg-mint', cls: 'right-[6%] top-[72%] h-80 w-80', d: '-3s', t: '30s' },
  { c: 'bg-butter', cls: 'left-[-5%] bottom-[-6%] h-72 w-72', d: '-15s', t: '22s' },
]

/** Slowly drifting, very low-opacity pastel shapes behind the whole page. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className={`absolute animate-drift rounded-full opacity-30 blur-3xl ${b.c} ${b.cls}`}
          style={{ animationDelay: b.d, animationDuration: b.t }}
        />
      ))}
    </div>
  )
}
