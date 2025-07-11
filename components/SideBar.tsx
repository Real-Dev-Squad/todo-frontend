import React from 'react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar'

export const SideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-center">
          <div className="rounded-full border border-neutral-800 bg-neutral-800 px-4 py-2 text-sm font-medium text-white">
            TODO
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex items-center">
        <SidebarMenu className="items-center">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/">Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/tasks">Tasks</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/teams">Teams</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
