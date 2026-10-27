import { Background } from './components/Background'
import { Compare } from './components/Compare'
import { DownloadModal } from './components/DownloadModal'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { NavStyles } from './components/NavStyles'
import { Navbar } from './components/Navbar'
import { DownloadProvider } from './context/DownloadContext'

export default function App() {
  return (
    <DownloadProvider>
      <Background />
      <div className="relative z-10 overflow-x-hidden w-full max-w-full">
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
      <DownloadModal />
    </DownloadProvider>
  )
}
