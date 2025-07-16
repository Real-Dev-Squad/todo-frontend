import { ArrowRight, ArrowUpRight, Play, Star, Target } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative px-6 pt-16 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`translate-y-0 text-center opacity-100 transition-all duration-1000`}>
          <div className="mb-8 inline-flex items-center space-x-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
            <Target className="h-4 w-4 text-black" />
            <span className="text-sm font-medium">For individuals and teams</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          </div>

          <h1 className="mb-8 text-5xl font-bold tracking-tight lg:text-7xl">
            Task Management Made Effortless
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-gray-600 lg:text-2xl">
            The task manager that adapts to how you work. Perfect for solo projects or team
            collaboration with crystal-clear organization.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group flex transform items-center rounded-full bg-black px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl">
              Forever Free
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="group flex items-center rounded-full border-2 border-gray-200 px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:border-black">
              <Play className="mr-3 h-5 w-5" />
              Watch demo
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-gray-200"
                  >
                    <Image src={`/img/user-${i}.jpg`} alt={`user-${i}`} width={32} height={32} />
                  </div>
                ))}
              </div>
              <span>10,000+ teams</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-black text-black" />
              ))}
              <span className="ml-2">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
