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
import { TTask, TASK_PRIORITY } from "@/lib/api/tasks/tasks.dto";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api/tasks/tasks.api";
import { toast } from "sonner";
import { FORM_MODE } from "@/app/constants/Task";
import { TaskFormData, TodoForm } from "../TodoForm";

export const DashboardTasksTable = ({
  type,
  tasks,
}: {
  type: DashboardTasksTableTabs;
  tasks: TTask[];
}) => {
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (task: TTask) => tasksApi.updateTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksApi.getTasks.key });
      toast.success("Task updated successfully");
      setShowEditTaskForm(false);
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const handleEditTask = (task: TaskFormData) => {
    updateTaskMutation.mutate(task as TTask);
  };

  const handleTaskClick = (task: TTask) => {
    setSelectedTask(task);
    setShowEditTaskForm(true);
  };
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
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow 
                key={task.id}
                className="hover:bg-gray-50 transition-colors"
              >
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
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(task);
                    }}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Task Form */}
      <TodoForm 
        key={selectedTask?.id || 'edit-form'} 
        open={showEditTaskForm} 
        onClose={() => {
          setShowEditTaskForm(false);
          setSelectedTask(null);
        }}
        onSubmit={handleEditTask as (data: TaskFormData) => void}
        mode={FORM_MODE.EDIT}
        initialData={selectedTask ? {
          id: selectedTask.id,
          title: selectedTask.title,
          description: selectedTask.description || "",
          dueDate: selectedTask.dueDate || "",
          tags: selectedTask.tags || [],
          taskId: selectedTask.taskId,
          status: selectedTask.status,
        } : undefined}
      />
    </div>
  );
};
