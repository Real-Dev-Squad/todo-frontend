import StrideAppLogo from '@/components/Animated-logo'
import { appConfig } from '@/config/app-config'

export function Navbar() {
  return (
    <nav className="relative z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <StrideAppLogo />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-bold tracking-tight">{appConfig.appName}</span>
              <span className="text-xs text-neutral-500">By RDS</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
