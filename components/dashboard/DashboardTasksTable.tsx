import { DashboardTasksTableTabs } from "./constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Task, TASK_PRIORITY } from "@/app/types/tasks";

export const DashboardTasksTable = ({
  type,
  tasks,
}: {
  type: DashboardTasksTableTabs;
  tasks: Task[];
}) => {
  const filteredTasks = tasks.filter(
    (task) => type === DashboardTasksTableTabs.All || task.isInWatchlist
  );

  return (
    <div className="p-4 border-gray-200 rounded-md border">
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
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {Array.isArray(task.labels)
                      ? typeof task.labels[0] === "object" &&
                        task.labels[0] !== null
                        ? (task.labels[0] as { name?: string }).name || "-"
                        : task.labels[0] || "-"
                      : "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    {task.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "text-xs font-medium rounded-full px-2 py-1",
                      task.priority === TASK_PRIORITY.HIGH
                        ? "bg-red-100 text-red-700"
                        : task.priority === TASK_PRIORITY.MEDIUM
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    )}
                  >
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="text-red-500">
                  {task.dueAt
                    ? new Date(task.dueAt).toLocaleDateString()
                    : task.dueDate || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
