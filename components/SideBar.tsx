import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

export const SideBar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen min-h-screen w-56 flex-col border-r border-neutral-200 bg-white">
      <div className="mt-6 flex justify-center">
        <div className="rounded-full border border-neutral-800 bg-neutral-800 px-4 py-2 text-sm font-medium text-white">
          TODO
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center space-y-2 px-4">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-6 py-3 text-neutral-800 hover:bg-neutral-100"
          >
            Home
          </Button>
        </Link>
        <Link href="/tasks" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-6 py-3 text-neutral-800 hover:bg-neutral-100"
          >
            Tasks
          </Button>
        </Link>
        <Link href="/teams" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none px-6 py-3 text-neutral-800 hover:bg-neutral-100"
          >
            Teams
          </Button>
        </Link>
      </div>
    </aside>
  )
}
