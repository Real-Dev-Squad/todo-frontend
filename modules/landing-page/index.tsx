import { Features } from './landing-featuers'
import { Footer } from './landing-footer'
import { HeroSection } from './landing-hero-section'
import { Navbar } from './landing-navbar'
import AppOverview from './landing-overview'
import { Pricing } from './landing-pricing'
import Testimonials from './landing-testimonials'

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <div className="pointer-events-none fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <Navbar />
      <HeroSection />
      <AppOverview />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  )
}
