import { HomeIcon, LucideIcon, UsersRoundIcon, ShieldIcon } from 'lucide-react'

export type TSidebarLink = {
  id: string
  url: string
  title: string
  baseUrl: string
  items?: TSidebarLink[]
  icon?: LucideIcon
}

export const SIDEBAR_LINKS: TSidebarLink[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    baseUrl: '/dashboard',
    icon: HomeIcon,
  },
  // {
  //   id: 'tasks',
  //   title: 'Tasks',
  //   url: '/tasks',
  //   baseUrl: '/tasks',
  //   icon: ListTodoIcon,
  // },
  {
    id: 'teams',
    title: 'Teams',
    url: '/teams',
    baseUrl: '/teams',
    icon: UsersRoundIcon,
  },
  {
    id: 'admin',
    title: 'Admin',
    url: '/admin',
    baseUrl: '/admin',
    icon: ShieldIcon,
  },
]
