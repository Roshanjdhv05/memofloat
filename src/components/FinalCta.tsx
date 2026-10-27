import type { CSSProperties } from 'react'
import { CTA_ID, asset } from '../config'
import { useDownload } from '../context/DownloadContext'
import { Reveal } from './Reveal'
import { Button, Container } from './ui'

export function FinalCta() {
  const { openModal } = useDownload()

  return (
    <section id={CTA_ID} className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-espresso/10 bg-gradient-to-br from-butter via-candy/60 to-sky p-8 text-center shadow-lift sm:p-14">
            <span aria-hidden="true" className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-mint/60 blur-2xl" />
            <span aria-hidden="true" className="absolute -bottom-12 -right-8 h-52 w-52 rounded-full bg-white/50 blur-2xl" />

            <div
              className="relative mx-auto h-28 w-28 animate-float sm:h-32 sm:w-32"
              style={{ '--r': '-4deg', animationDuration: '6s' } as CSSProperties}
            >
              <img
                src={asset('logo.png')}
                alt=""
                width={128}
                height={128}
                loading="lazy"
                className="h-full w-full object-contain drop-shadow-[0_16px_18px_rgba(48,39,31,0.25)]"
              />
            </div>
            <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
              Give your thoughts a little room to float.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-espresso/75">
              Colorful notes on your desktop, tucked away whenever you need the space.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Button onClick={openModal}>Get MemoFloat</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
