export type TSidebarLink = {
  id: string
  url: string
  title: string
  items?: TSidebarLink[]
}

export const SIDEBAR_LINKS: TSidebarLink[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    url: '/tasks',
  },
  {
    id: 'teams',
    title: 'Teams',
    url: '/teams',
  },
]
