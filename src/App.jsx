import ScrollProgress from './components/ScrollProgress'
import PawTrail from './components/PawTrail'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import MarqueeSection from './components/MarqueeSection'
import Gallery from './components/Gallery'
import Diferenciais from './components/Diferenciais'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <PawTrail />
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <HowItWorks />
        <MarqueeSection />
        <Gallery />
        <Diferenciais />
        <FAQ />
        <Testimonials />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
