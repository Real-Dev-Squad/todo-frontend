import { Tasks } from "@/app/constants/dashboard"
import { DashboardTasksTableTabs } from "./constants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const DashboardTasksTable = ({type}: {type: DashboardTasksTableTabs}) => {
  const tasks = Tasks.filter((task) => 
    type === DashboardTasksTableTabs.All || task.isInWatchlist
  )
  
  return (
    <div className="p-4 border-grey-200 rounded-md border">
      <div className="w-full max-h-[500px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  {task.label}
                </span>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                  {task.status}
                </span>
              </TableCell>
              <TableCell>
                <span className={`text-${task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}-500`}>
                  {task.priority}
                </span>
              </TableCell>
              <TableCell className="text-red-500">{task.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}