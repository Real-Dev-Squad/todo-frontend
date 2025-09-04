import { cn } from '@/lib/utils'

type ShimmerProps = {
  className?: string
}

export const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      data-testid="shimmer"
      className={cn('bg-secondary relative h-full animate-pulse rounded-md', className)}
    />
  )
}
