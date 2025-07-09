"use client";
import React from 'react';
import { DashboardWelcomeScreen } from './DashboardWelcomeScreen';
import { TasksDashboard } from './TasksDashboard';
import { useTasks } from '@/app/hooks/useTasks';



export const DashboardContainer = () => {
  const { tasks } = useTasks();
  const hasTasks = tasks?.tasks?.length > 0;
  
  return (
    <div className="max-h-screen ">
      {hasTasks ? <TasksDashboard /> : <DashboardWelcomeScreen />}
    </div>
  );
}; 