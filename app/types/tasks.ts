export type Task = {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  profile?: string;
  status: "Todo" | "In-Progress" | "Completed" | string;
  tags: string;
  taskId: string;
  description: string;
};
