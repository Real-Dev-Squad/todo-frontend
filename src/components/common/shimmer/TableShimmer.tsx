import { Shimmer } from '@/components/common/shimmer'
import { cn } from '@/lib/utils'

type TableShimmerProps = {
  className?: string
  count: number
  columns: number
}

export const TableShimmer = ({ className, count, columns }: TableShimmerProps) => {
  return (
    <>
      {[...Array(count)].map((_, rowIndex) => (
        <tr key={rowIndex} className={cn('animate-pulse', className)}>
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <Shimmer className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
