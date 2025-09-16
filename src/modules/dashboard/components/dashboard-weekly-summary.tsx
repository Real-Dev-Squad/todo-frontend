type SummaryItemProps = {
  label: string
  value: string | number
}

const SummaryItem = ({ label, value }: SummaryItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  )
}

type DashboardWeeklySummaryProps = {
  className?: string
}

export const DashboardWeeklySummary = ({ className }: DashboardWeeklySummaryProps) => {
  return (
    <div className={className}>
      <div className="rounded-lg border bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between pb-6">
          <h3 className="text-lg font-semibold">Weekly Summary</h3>
          <button className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
            See all tasks
          </button>
        </div>

        <div className="space-y-3">
          <SummaryItem label="Task Completed" value={14} />
          <SummaryItem label="New Task" value={5} />
          <SummaryItem label="Time Spent" value="4 hrs" />
        </div>
      </div>
    </div>
  )
}
