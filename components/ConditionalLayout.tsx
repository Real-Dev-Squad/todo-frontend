"use client";
import React from 'react';
import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";
import { useAuth } from "../app/hooks/useAuth";
import { LandingPage } from "./LandingPage";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarInset } from "./ui/sidebar";

export const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <SideBar />
        <SidebarInset>
          <NavBar />
          <main className="pt-16 min-h-screen p-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}; 