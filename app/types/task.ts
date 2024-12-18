export type Task = {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  status: string;
  profile?: string;
};