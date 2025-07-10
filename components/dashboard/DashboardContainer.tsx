"use client";
import React from 'react';
import { DashboardWelcomeScreen } from './DashboardWelcomeScreen';
import { TasksDashboard } from './TasksDashboard';
import { useTasks } from '@/app/hooks/useTasks';
import { TodoForm } from '../TodoForm';



export const DashboardContainer = () => {
  const  {data}  = useTasks();
  const hasTasks = (data?.tasks?.length ?? 0) > 0;
  
  return (
    <div className="min-h-screen w-full">
      {hasTasks ? <TasksDashboard /> : <DashboardWelcomeScreen />}
     
    </div>
  );
}; 