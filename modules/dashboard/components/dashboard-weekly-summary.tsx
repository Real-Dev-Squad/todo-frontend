export const DashboardWeeklySummary = () => {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border bg-white p-4 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Weekly Summary</h3>
          <button className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
            See all tasks
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-gray-600">Task Completed</span>
              <span className="text-2xl font-bold">14</span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-gray-600">New Task</span>
              <span className="text-2xl font-bold">5</span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-gray-600">Time Spent</span>
              <span className="text-2xl font-bold">4 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
