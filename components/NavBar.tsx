import React from 'react';
import { Search, Bell } from 'lucide-react';
import Image from 'next/image';

export const NavBar = () => {
  return (
    <nav className="fixed top-0 left-56 right-0 bg-white h-16 flex items-center justify-end px-6 shadow-sm border-b border-gray-200 z-10">
     
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
          />
        </div>
        
       
        <button type='button' className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-6 h-6" />
         
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
       
        <div className="flex items-center space-x-2">
          <Image
            src="/user.png"
            width={32}
            height={32}
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
      </div>
    </nav>
  );
};

