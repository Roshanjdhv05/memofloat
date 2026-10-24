import { Background } from './components/Background'
import { Compare } from './components/Compare'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { NavStyles } from './components/NavStyles'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <NavStyles />
          <HowItWorks />
          <Compare />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  )
}
