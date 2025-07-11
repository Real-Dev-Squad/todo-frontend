"use client"

import { Suspense } from "react";
import { DashboardTasksTableTabs } from "./DashboardTasksTableTabs";
import { TTask } from "@/lib/api/tasks/tasks.dto";

export const DashboardTasksTable = ({ tasks }: { tasks: TTask[] }) => {
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