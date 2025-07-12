import { cn } from '@/utils/classname'

type ShimmerProps = {
  className?: string
}

export const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={cn(
        'relative h-full max-w-full animate-pulse overflow-hidden rounded-lg bg-indigo-50 opacity-90',
        className,
      )}
      data-testid="shimmer"
    />
  )
}
