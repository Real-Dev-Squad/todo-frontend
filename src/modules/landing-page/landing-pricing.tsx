import { ArrowRight, Calendar } from 'lucide-react'

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-black px-6 py-32 text-white lg:px-8"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
          radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
        `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-5xl leading-tight font-bold lg:text-6xl">
          Ready to get
          <br />
          <span className="text-gray-400">organized?</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300">
          Join thousands of individuals and teams who've transformed their productivity with simple,
          powerful task management.
        </p>

        <div className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="group flex items-center rounded-full bg-white px-10 py-5 text-lg font-bold text-black shadow-2xl transition-all duration-300 hover:bg-gray-100">
            Start Shipping
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="group flex items-center rounded-full border-2 border-gray-600 px-10 py-5 text-lg font-medium text-white transition-all duration-300 hover:border-white">
            Schedule demo
            <Calendar className="ml-3 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
