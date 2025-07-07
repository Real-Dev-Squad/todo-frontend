import { FormMode } from "@/app/types/tasks";

export const TASK_STATUS = {
  TODO: "Todo",
  IN_PROGRESS: "In-Progress",
  PENDING: "Pending",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  DEFERRED: "Deferred",
};

export const FORM_MODE: FormMode = {
  CREATE: "create",
  VIEW: "view",
  EDIT: "edit",
};
