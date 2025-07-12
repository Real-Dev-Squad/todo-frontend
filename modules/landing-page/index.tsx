import { SigninButton } from '@/components/signin-button'
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Shield,
  Star,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

export const LandingPage = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Smart Task Organization',
      description:
        "Organize tasks with priorities, labels, and custom workflows that adapt to your team's needs.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description:
        'Assign tasks, track progress, and collaborate seamlessly with your team members.',
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Deadline Management',
      description: 'Never miss a deadline with intelligent scheduling and automated reminders.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Progress Analytics',
      description:
        'Get insights into team productivity and project progress with detailed analytics.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      content:
        'Real Flow transformed how our team manages projects. The intuitive interface and powerful features make task management effortless.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Engineering Lead',
      company: 'StartupXYZ',
      content:
        "The best task management tool we've used. Clean, fast, and exactly what our development team needed.",
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Director',
      company: 'GrowthCo',
      content:
        "Real Flow's analytics help us identify bottlenecks and optimize our workflow. Highly recommended!",
      rating: 5,
    },
  ]

  const stats = [
    { id: '1', number: '10K+', label: 'Active Users' },
    { id: '2', number: '50K+', label: 'Tasks Completed' },
    { id: '3', number: '99.9%', label: 'Uptime' },
    { id: '4', number: '24/7', label: 'Support' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 z-50 flex w-full justify-center border-b border-neutral-200 bg-white">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">Real Flow</span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="#features"
              className="text-neutral-800 transition-colors hover:text-neutral-600"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-neutral-800 transition-colors hover:text-neutral-600"
            >
              How it works
            </Link>
            <SigninButton />
          </div>
        </div>
      </nav>

      <section className="bg-white pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-800">
              <Shield className="mr-2 h-4 w-4" />
              Get Things Done. Simplified.
            </div>

            <h1 className="mb-6 text-5xl leading-tight font-bold text-neutral-800 md:text-6xl">
              Real Flow is your
              <br />
              <span className="text-neutral-800">personal task manager</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-800">
              Stay on top of everyday tasks. Streamline your workflow and boost productivity with
              our intuitive task management platform.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="flex transform items-center gap-2 rounded-lg bg-neutral-800 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-700"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-lg px-8 py-4 font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
              >
                See how it works
              </button>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
              <div className="border-b border-neutral-200 bg-neutral-100 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="flex min-h-96 items-center justify-center bg-white p-8">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-neutral-100">
                    <BarChart3 className="h-12 w-12 text-neutral-800" />
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-neutral-800">
                    Screenshot of App
                  </h3>
                  <p className="text-neutral-800">Beautiful task management interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="mb-2 text-3xl font-bold text-neutral-800 md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-neutral-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-800">
              Everything you need to stay organized
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-neutral-800">
              Powerful features designed to help you and your team work more efficiently
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-800">{feature.title}</h3>
                <p className="leading-relaxed text-neutral-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-800">
              Simple workflow, powerful results
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-neutral-800">
              Get started in minutes with our intuitive three-step process
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-800">Create Tasks</h3>
              <p className="text-neutral-800">
                Add tasks with priorities, due dates, and assign them to team members
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-700 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-800">Track Progress</h3>
              <p className="text-neutral-800">
                Monitor task status and team progress with real-time updates
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-800">Get Results</h3>
              <p className="text-neutral-800">
                Complete projects faster with improved team collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-800">Loved by teams worldwide</h2>
            <p className="mx-auto max-w-2xl text-xl text-neutral-800">
              See what our customers have to say about Real Flow
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex items-center justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-neutral-800">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-neutral-800">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-800 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">Ready to transform your workflow?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-200">
            Join thousands of teams who have already improved their productivity with Real Flow
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-neutral-800 transition-colors hover:bg-neutral-100"
            >
              Start Free Trial
            </button>
            <button
              type="button"
              className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-neutral-800"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <footer className="flex justify-center bg-neutral-900 py-16 text-white">
        <div className="w-screen px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Real Flow</span>
              </div>
              <p className="leading-relaxed text-neutral-400">
                The modern task management platform for teams who want to get things done.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 Real Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
