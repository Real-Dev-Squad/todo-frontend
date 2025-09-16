import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Github,
  Globe,
  Linkedin,
  MessageSquare,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Zap,
} from 'lucide-react'

export const AppFeatures = [
  {
    icon: Target,
    title: 'Personal Organization',
    description:
      'Clean, intuitive interface for managing your tasks, projects, and goals. Stay focused on what matters most.',
    highlight: 'Distraction-free',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Seamlessly invite team members, assign tasks, and track progress together. Perfect for any team size.',
    highlight: 'Real-time sync',
  },
  {
    icon: MessageSquare,
    title: 'Smart Communication',
    description:
      'Comments, mentions, and notifications keep everyone informed without overwhelming your inbox.',
    highlight: 'Context-aware',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Visual dashboards and analytics help you understand your productivity patterns and optimize workflows.',
    highlight: 'Data insights',
  },
  {
    icon: Calendar,
    title: 'Flexible Planning',
    description:
      'Multiple views including lists, boards, and calendar to plan and organize work exactly how you prefer.',
    highlight: 'Your way',
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description:
      'Recurring tasks, templates, and smart suggestions help you work more efficiently and consistently.',
    highlight: 'Effortless efficiency',
  },
]

export const DemoState = {
  title: 'Project Timeline',
  tasks: [
    { text: 'Q1 Product Launch', assignee: 'Team', status: 'active', team: true },
    { text: 'Marketing campaign prep', assignee: 'Lisa', status: 'in-progress', team: false },
    { text: 'Beta user feedback', assignee: 'John', status: 'completed', team: false },
  ],
}

export const RDSSocialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/realdevsquad' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/real-dev-squad' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/Real-Dev-Squad' },
  { name: 'Website', icon: Globe, href: 'https://realdevsquad.com' },
]

export const AppStats = [
  {
    number: '50K+',
    label: 'Active Users',
    description: 'Individuals and teams worldwide',
    icon: Users,
  },
  {
    number: '2.5M+',
    label: 'Tasks Completed',
    description: 'Goals achieved every month',
    icon: CheckCircle,
  },
  {
    number: '99.9%',
    label: 'Uptime',
    description: 'Reliable when you need it most',
    icon: Clock,
  },
  {
    number: '40%',
    label: 'Faster Delivery',
    description: 'Average team improvement',
    icon: TrendingUp,
  },
]
