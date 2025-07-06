"use client"

import { DashboardTasksTableTabs } from "./DashboardTasksTableTabs";

export const DashboardTasksTable = () => {
  return (
    <div className="lg:col-span-2 max-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">All Tasks</h2>
        <DashboardTasksTableTabs />
      </div>
  </div>
  );
};