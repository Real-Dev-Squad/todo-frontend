import { cn } from '@/lib/utils'

type Props = {
  className?: string
  children: React.ReactNode
}

export const PageContainer = ({ children, className }: Props) => {
  return <div className={cn('px-4 md:px-6', className)}>{children}</div>
}
