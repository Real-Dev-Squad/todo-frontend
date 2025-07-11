"use client";
import React from "react";
import { TaskDashboardHeader } from "./TaskDashboardHeader";
import { DashboardWeeklySummary } from "./DashboardWeeklySummary";
import { DashboardTasksTableTabs } from "./DashboardTasksTableTabs";
import { TTask } from "@/lib/api/tasks/tasks.dto";

export const TasksDashboard = ({ tasks }: { tasks: TTask[] }) => {
  return (
    <div className="p-6">
      <TaskDashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 max-h-screen">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">All Tasks</h2>
            <DashboardTasksTableTabs tasks={tasks} />
          </div>
        </div>
        <DashboardWeeklySummary />
      </div>
    </div>
  );
};
