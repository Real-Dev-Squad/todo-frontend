export type TSidebarLink = {
  id?: string
  url: string
  title: string
  items?: TSidebarLink[]
}

export const SIDEBAR_LINKS: TSidebarLink[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    title: 'Tasks',
    url: '/tasks',
  },
  {
    title: 'Teams',
    url: '/teams',
  },
]
