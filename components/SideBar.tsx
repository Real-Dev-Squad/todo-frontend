import React from 'react';

export const SideBar = () => {
  return (
    <div className="fixed left-0 top-0 bg-gray-400 h-screen w-64 flex flex-col min-h-screen lg:w-56 md:w-64 sm:w-56">
    
      <div className="mt-4 flex justify-center">
        <div className="bg-gray-400 text-black px-4 py-2 rounded-full text-sm font-medium border border-black">
          TODO
        </div>
      </div>
      
     
      <div className="mt-12 flex flex-col items-center space-y-4 px-4">
        <button type='button' className="w-full max-w-40 h-12 bg-transparent text-white hover:bg-gray-500 transition-colors duration-200 rounded-3xl flex items-center justify-center">
          <span className="text-lg font-medium">Home</span>
        </button>
        
        <button type='button' className="w-full max-w-40 h-12 bg-transparent text-white hover:bg-gray-500 transition-colors duration-200 rounded-3xl flex items-center justify-center">
          <span className="text-lg font-medium">Updates</span>
        </button>

        <button type='button' className="w-full max-w-40 h-12 bg-transparent text-white hover:bg-gray-500 transition-colors duration-200 rounded-3xl flex items-center justify-center">
          <span className="text-lg font-medium">My Tasks</span>
        </button>

        <button type='button' className="w-full max-w-40 h-12 bg-transparent text-black hover:bg-gray-500 transition-colors duration-200 rounded-3xl flex items-center justify-center underline">
          <span className="text-lg font-medium">Teams</span>
        </button>
      </div>
    </div>
  );
};
