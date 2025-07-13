import { Shimmer } from '@/components/Shimmer'
import { cn } from '@/lib/utils'

type ListShimmerProps = {
  className?: string
  count: number
}

export const ListShimmer = ({ className, count }: ListShimmerProps) => {
  return (
    <div className={cn('flex h-24 flex-col gap-2', className)} data-testid="list-shimmer">
      {[...Array(count)].map((_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  )
}
