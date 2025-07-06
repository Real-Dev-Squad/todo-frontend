"use client";
import React from 'react';
import { DashboardWelcomeScreen } from './DashboardWelcomeScreen';
import { TasksDashboard } from './TasksDashboard';


export const DashboardContainer = () => {
  // TODO: Replace with actual logic to check if user has tasks
  const hasTasks = true; 
  
  return (
    <div className="max-h-screen bg-gray-50">
      {hasTasks ? <TasksDashboard /> : <DashboardWelcomeScreen />}
    </div>
  );
}; 