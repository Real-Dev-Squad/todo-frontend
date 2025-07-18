import { AppStats } from './constant'

function Testimonials() {
  return (
    <section>
      <div className="mx-auto max-w-7xl py-20">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black lg:text-5xl">
            The numbers speak for themselves
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Join thousands who've transformed their productivity with Todo
          </p>
        </div>

        <div className="mb-20 grid gap-8 lg:grid-cols-4">
          {AppStats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-300 group-hover:scale-110">
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              <div className="mb-3 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                {stat.number}
              </div>
              <div className="mb-2 text-xl font-semibold text-black">{stat.label}</div>
              <div className="text-sm leading-relaxed text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-netural-500 mb-2 text-lg">Backed by team at</p>
          <div className="flex flex-wrap items-center justify-center gap-2 opacity-70">
            <span className="text-2xl font-bold text-black">Real Dev Squad 💜</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
