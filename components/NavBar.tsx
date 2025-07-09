import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import Image from "next/image";
import { SearchComponent } from "./SearchComponent";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Updates", path: "/updates" },
    { label: "My Tasks", path: "/tasks" },
    { label: "Teams", path: "/teams" },
  ];

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    window.location.href = path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 md:left-56 lg:left-56 xl:left-64 right-0 bg-white h-16 flex items-center justify-between md:justify-end px-4 md:px-6 shadow-sm border-b border-gray-200 z-10">
        <button
          type="button"
          className="md:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <div className="md:hidden">
          <div className="bg-gray-400 text-black px-3 py-1 rounded-full text-sm font-medium border border-black">
            TODO
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SearchComponent
            className="hidden sm:block w-40 sm:w-60 md:w-80"
            onResultSelect={(result) => {
              console.log("Navigation to:", result);
            }}
          />

          <button
            type="button"
            className="sm:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2">
            <Image
              src="/user.png"
              width={32}
              height={32}
              alt="User Profile"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden">
          <div className="fixed top-0 left-0 right-0 bg-white p-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <SearchComponent
                className="flex-1"
                onResultSelect={(result) => {
                  console.log("Mobile navigation to:", result);
                  setIsSearchOpen(false);
                  // TODO: Add actual navigation logic
                }}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-16 left-0 right-0 bg-gray-400 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-4 space-y-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    className={`w-full py-3 bg-transparent hover:bg-gray-500 transition-colors duration-200 rounded-2xl flex items-center justify-center ${
                      isActive ? "text-black underline" : "text-white"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
