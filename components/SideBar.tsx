import React from 'react';
import { usePathname } from 'next/navigation';

export const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', path: '/dashboard' },
    { label: 'Updates', path: '/updates' },
    { label: 'My Tasks', path: '/tasks' },
    { label: 'Teams', path: '/teams' }
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="fixed left-0 top-0 bg-gray-400 h-screen w-56 md:w-64 lg:w-56 xl:w-64 flex flex-col">
    
      <div className="mt-4 flex justify-center px-2">
        <div className="bg-gray-400 text-black px-3 md:px-4 py-2 rounded-full text-sm font-medium border border-black">
          TODO
        </div>
      </div>
      
     
      <div className="mt-8 md:mt-12 flex flex-col items-center space-y-3 md:space-y-4 px-2 md:px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button 
              key={item.path}
              type='button' 
              className={`w-full max-w-36 md:max-w-40 h-10 md:h-12 bg-transparent cursor-pointer hover:bg-gray-500 transition-colors duration-200 rounded-2xl md:rounded-3xl flex items-center justify-center ${
                isActive 
                  ? 'text-black underline' 
                  : 'text-white'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="text-base md:text-lg font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
