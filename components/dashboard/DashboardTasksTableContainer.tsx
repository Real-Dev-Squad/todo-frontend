"use client"

import { DashboardTasksTableTabs } from "./DashboardTasksTableTabs";

export const DashboardTasksTable = () => {
  return (
    <div className="lg:col-span-2">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold">All Tasks</h2>
        <DashboardTasksTableTabs />
      </div>
  </div>
  );
};