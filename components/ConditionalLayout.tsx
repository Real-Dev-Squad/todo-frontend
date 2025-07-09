"use client";
import React from 'react';
import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
// TODO: this is a temporary layout for the app, we will replace it with the actual layout later
// TBD will probably use zustand for this
// here is the task link
// https://github.com/Real-Dev-Squad/todo-frontend/issues/64
  const isLoggedIn = true;
  
  return (
    <>
      {isLoggedIn && (
        <div className="hidden md:block">
          <SideBar />
        </div>
      )}
      <NavBar />
      <main className={`${isLoggedIn ? 'md:ml-56 lg:ml-56 xl:ml-64' : 'ml-0'} pt-16 min-h-screen`}>
        {children}
      </main>
    </>
  );
}; 