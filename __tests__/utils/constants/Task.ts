import { Task } from "@/app/types/tasks";

export const initialData: Task = {
  id: "1",
  title: "Sample Task",
  description: "This is a test task description.",
  dueDate: "2024-12-31T23:59:59Z",
  assignee: "John Doe",
  status: "Pending",
  tags: "Urgent",
  taskId: "#12345",
};
