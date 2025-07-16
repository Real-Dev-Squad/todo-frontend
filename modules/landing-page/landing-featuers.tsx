import { AppFeatures } from './constant'

export function Features() {
  return (
    <section id="features" className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Everything you need</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Powerful features that scale from personal productivity to team collaboration without
            losing sight of what matters
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {AppFeatures.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 transition-all duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-bold text-neutral-600">
                  {feature.highlight}
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
              <p className="leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
