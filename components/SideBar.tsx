import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export const SideBar = () => {
  return (
    <Sidebar className="border-r border-neutral-200">
      <SidebarHeader className="flex justify-center items-center pt-6 pb-4 w-full">
        <div className="bg-neutral-800 text-white px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-800 w-fit mx-auto">
          TODO
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center">
        <div className="mt-8 w-full px-4 max-w-48">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="w-full justify-center text-neutral-800 hover:bg-neutral-100 rounded-md px-6 py-3 h-10">
                <Link href="/">
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="w-full justify-center text-neutral-800 hover:bg-neutral-100 rounded-md px-6 py-3 h-10">
                <Link href="/tasks">
                  Tasks
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="w-full justify-center text-neutral-800 hover:bg-neutral-100 rounded-md px-6 py-3 h-10">
                <Link href="/teams">
                  Teams
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
