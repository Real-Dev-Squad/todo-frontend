export const DashboardWeeklySummary = () => {
  return (
    <div className="lg:col-span-1">
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Weekly Summary</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">See all tasks</button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Task Completed</span>
            <span className="text-2xl font-bold">14</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">New Task</span>
            <span className="text-2xl font-bold">5</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Time Spent</span>
            <span className="text-2xl font-bold">4 hrs</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};