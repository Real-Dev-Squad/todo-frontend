"use client";
import React from 'react';
import { TaskDashboardHeader } from './TaskDashboardHeader';
import { DashboardWeeklySummary } from './DashboardWeeklySummary';
import { DashboardTasksTable } from './DashboardTasksTableContainer';
import { useAuth } from '@/app/hooks/useAuth';
import { useTasks } from '@/app/hooks/useTasks';

export const TasksDashboard = () => {
  const { user } = useAuth();
  const username = user?.data?.name;
  console.log(user)
  const { data, isLoading, isError } = useTasks();

  if (isLoading) return <div className="p-6">Loading tasks...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load tasks.</div>;
  const taskList = data?.tasks || []

  return (
    <div className="p-6">
      <TaskDashboardHeader userName={username} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardTasksTable tasks={taskList} />
        <DashboardWeeklySummary />
      </div>
    </div>
  );
}; 