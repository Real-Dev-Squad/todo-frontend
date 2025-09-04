import { Shimmer } from '@/components/Shimmer'

export const DashboardShimmer = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header Shimmer */}
        <div className="space-y-4">
          <Shimmer className="h-8 w-64" />
          <Shimmer className="h-4 w-96" />
        </div>

        {/* Tabs Shimmer */}
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <Shimmer key={i} className="h-10 w-20" />
          ))}
        </div>

        {/* Table Shimmer */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Shimmer key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
