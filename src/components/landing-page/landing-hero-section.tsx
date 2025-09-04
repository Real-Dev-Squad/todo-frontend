import { SigninButton } from '@/components/signin-button'
import { Button } from '@/components/ui/button'
import { Star, Target } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative px-6 pt-16 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-900">
            <Target className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Organize your work, <span className="text-blue-600">achieve your goals</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Streamline your tasks, collaborate with your team, and track progress with our intuitive
          todo management platform.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <SigninButton />
          <Button variant="outline" size="lg">
            Learn more <Star className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
