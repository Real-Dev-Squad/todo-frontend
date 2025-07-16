import { SigninButton } from '@/components/signin-button'
import { appConfig } from '@/config/app-config'
import { Zap } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="relative z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">{appConfig.appName}</span>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="group relative text-gray-600 transition-all duration-200 hover:text-black"
            >
              Features
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-200 group-hover:w-full" />
            </a>
            <SigninButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
