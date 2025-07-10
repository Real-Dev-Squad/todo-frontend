"use client"

import { Suspense } from "react";
import { DashboardTasksTableTabs } from "./DashboardTasksTableTabs";
import { Task } from "@/app/types/tasks";

export const DashboardTasksTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <Suspense>
      <div className="lg:col-span-2 max-h-screen">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">All Tasks</h2>
          <DashboardTasksTableTabs tasks={tasks} />
        </div>
      </div>
    </Suspense>
  );
};