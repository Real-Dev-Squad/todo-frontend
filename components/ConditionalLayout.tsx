"use client";
import React from 'react';
import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { useAuth } from "../app/hooks/useAuth";
import { LandingPage } from "./LandingPage";

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <LandingPage />;
  // }

  return (
    <>
      <SideBar />
      <NavBar />
      <main className="ml-56 pt-16 min-h-screen">
        {children}
      </main>
    </>
  );
}; 