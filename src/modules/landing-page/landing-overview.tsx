import { appConfig } from '@/config/app-config'
import { DashboardPreview } from './landing-dashboard-overview'

function AppOverview() {
  return (
    <section className="px-6 py-16 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-6xl font-bold">See productivity in action</h2>
          <p className="mx-auto max-w-xl text-xl text-gray-600">
            Whether working solo or with a team, see how {appConfig.appName} keeps you organized and
            focused on what matters most
          </p>
        </div>

        <DashboardPreview />
      </div>
    </section>
  )
}

export default AppOverview
