import { HomeIcon, ListTodoIcon, LucideIcon, UsersRoundIcon } from 'lucide-react'

export type TSidebarLink = {
  id: string
  url: string
  title: string
  items?: TSidebarLink[]
  icon?: LucideIcon
}

export const SIDEBAR_LINKS: TSidebarLink[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 'tasks',
    title: 'Tasks',
    url: '/tasks',
    icon: ListTodoIcon,
  },
  {
    id: 'teams',
    title: 'Teams',
    url: '/teams',
    icon: UsersRoundIcon,
  },
]
