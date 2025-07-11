import React, { useState } from 'react'
import { Search, Bell, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchComponent } from './SearchComponent'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'
import { getUserInitials } from '@/lib/utils'
import { logoutUser } from '@/lib/api/api-client'
import Link from 'next/link'
import { Avatar, AvatarFallback } from './ui/avatar'

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const name = user?.data?.name || 'Guest'
  const initials = getUserInitials(name)

  const menuItems = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Updates', path: '/updates' },
    { label: 'My Tasks', path: '/tasks' },
    { label: 'Teams', path: '/teams' },
  ]

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false)
    window.location.href = path
  }

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-xs md:left-56 md:justify-end md:px-6 lg:left-56 xl:left-64">
        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="md:hidden">
          <div className="rounded-full border border-black bg-gray-400 px-3 py-1 text-sm font-medium text-black">
            TODO
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SearchComponent
            className="hidden w-40 sm:block sm:w-60 md:w-80"
            onResultSelect={(result) => {
              console.log('Navigation to:', result)
            }}
          />

          <button
            type="button"
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 sm:hidden"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="relative cursor-pointer rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <Bell className="h-5 w-5 md:h-6 md:w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" aria-label="User menu">
              <Avatar>
                <AvatarFallback className="bg-black text-white">{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mt-4 mr-4">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/profile'}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutUser}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-20 bg-black sm:hidden">
          <div className="fixed top-0 right-0 left-0 bg-white p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <SearchComponent
                className="flex-1"
                onResultSelect={(result) => {
                  console.log('Mobile navigation to:', result)
                  setIsSearchOpen(false)
                  // TODO: Add actual navigation logic
                }}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
                aria-label="Close search"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 right-0 left-0 bg-gray-400 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-3 p-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`flex w-full items-center justify-center rounded-2xl bg-transparent py-3 transition-colors duration-200 hover:bg-gray-500 ${
                      isActive ? 'text-black underline' : 'text-white'
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
