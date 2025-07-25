import { Dashboard } from '@/modules/dashboard'
import { DashboardShimmer } from '@/modules/dashboard/components/dashboard-shimmer'
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardShimmer />}>
      <Dashboard />
    </Suspense>
  )
}
