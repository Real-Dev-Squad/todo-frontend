"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { TaskFormData, TodoForm } from '../TodoForm';
import { tasksApi } from '@/lib/api/tasks/tasks.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { TTask } from '@/lib/api/tasks/tasks.dto';

export const DashboardWelcomeScreen = () => {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation({
    mutationFn: (task: TTask) => tasksApi.createTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: tasksApi.getTasks.key });
      toast.success("Task created successfully");
      setShowCreateTaskForm(false);
    },
    onError: (error: AxiosError) => {
      toast.error(error.response?.data as string); 
    },
  });

  const handleCreateTask = (task: TTask) => {
    createTaskMutation.mutate(task);
  };

  return (
    <div className="flex flex-col min-h-[60vh] p-4 md:p-6">
      <div className="text-left mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome, Anaya</h1>
        <p className="text-gray-600 text-base md:text-lg">Let&apos;s setup your workspace</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 md:mb-8">
          <div className="border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            <Image 
              src="/dashboard-welcome.png" 
              alt="Welcome" 
              width={300} 
              height={300} 
              className="w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-md">
          <button className="py-3 md:py-4 px-6 md:px-10 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium text-sm md:text-base flex-1 hover:cursor-pointer"
          onClick={() => setShowCreateTaskForm(true)}
          >
            Create Task
          </button>
          <button className="py-3 md:py-4 px-6 md:px-10 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium text-sm md:text-base flex-1" >
            Create Team
          </button>
        </div>
      </div>
      <TodoForm 
        open={showCreateTaskForm} 
        onClose={() => setShowCreateTaskForm(false)}
        onSubmit={handleCreateTask as (data: TaskFormData) => void}
      />
    </div>
  );
}; 