"use client";
import React from 'react';
import { TaskDashboardHeader } from './TaskDashboardHeader';
import { DashboardWeeklySummary } from './DashboardWeeklySummary';
import { DashboardTasksTable } from './DashboardTasksTableContainer';

export const TasksDashboard = () => {
  return (
    <div className="p-6">
      <TaskDashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <DashboardTasksTable />
      <DashboardWeeklySummary />
      </div>
    </div>
  );
}; 