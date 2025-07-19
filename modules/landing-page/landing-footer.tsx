import StrideAppLogo from '@/components/Animated-logo'
import { appConfig } from '@/config/app-config'
import { ArrowUpRight } from 'lucide-react'
import { SocialLinks } from './landing-social-links'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center space-x-3">
              <div className="relative">
                <StrideAppLogo />
              </div>
              <span className="text-2xl font-bold">{appConfig.appName}</span>
            </div>
            <p className="mb-6 max-w-md leading-relaxed text-gray-600">
              The task manager that grows with you - from personal productivity to team
              collaboration, all in one place.
            </p>
            <SocialLinks />
          </div>

          {[
            {
              title: 'Product',
              links: ['Features', 'Integrations', 'API', 'Security', 'Pricing'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
            },
            {
              title: 'Resources',
              links: ['Help Center', 'Community', 'Tutorials', 'Status', 'Changelog'],
            },
          ].map((column, index) => (
            <div key={index}>
              <h4 className="mb-6 font-bold text-black">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="group flex items-center text-gray-600 transition-colors duration-200 hover:text-black"
                    >
                      {link}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-100 pt-8 lg:flex-row">
          <p className="text-sm text-gray-600">© 2025 {appConfig.appName}. All rights reserved.</p>
          <div className="mt-4 flex space-x-8 lg:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-600 transition-colors hover:text-black"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
