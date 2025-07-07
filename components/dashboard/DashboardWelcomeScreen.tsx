"use client";
import React from 'react';
import Image from 'next/image';

export const DashboardWelcomeScreen = () => {
  return (
    <div className="flex flex-col  min-h-[60vh] p-6">
      <div className="text-left mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Anaya</h1>
        <p className="text-gray-600 text-lg">Let&apos;s setup your workspace</p>
      </div>
      <div className="flex flex-col items-center justify-center">
      <div className="mb-8">
        <div className="border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
         <Image src="/dashboard-welcome.png" alt="Welcome" width={300} height={300} />
        </div>
      </div>
      
      <div className="flex gap-4 ">
        <button className="py-4 px-10 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium w-content">
          Create Task
        </button>
        <button className="py-4 px-10 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium w-content">
          Create Team
        </button>
      </div>
      </div>

    </div>
  );
}; 