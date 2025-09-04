import { Shimmer } from '@/components/Shimmer'

export const DashboardShimmer = () => {
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col items-center space-y-1 py-12">
        <Shimmer className="h-6 w-32" />
        <Shimmer className="h-6 w-48" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Shimmer className="h-48 xl:col-span-8 2xl:col-span-9" />
        <Shimmer className="h-48 xl:col-span-4 2xl:col-span-3" />
      </div>
    </div>
  )
}
