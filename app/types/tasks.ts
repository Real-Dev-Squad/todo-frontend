export type Task = {
  id: string;
  title: string;
  labels?: { name: string }[] | string[];
  label?: string;
  status: TASK_STATUS;
  priority: TASK_PRIORITY;
  dueAt?: string;
  dueDate?: string;
  isInWatchlist?: boolean;
}

export enum TASK_STATUS {
  TODO = "Todo",
  IN_PROGRESS = "In-Progress",
  COMPLETED = "Completed",
}

export enum TASK_PRIORITY {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export type Mode = "create" | "view" | "edit";

export type FormMode = { [key: string]: Mode };
