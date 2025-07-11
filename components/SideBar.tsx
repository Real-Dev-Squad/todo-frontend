import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

export const SideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-center">
          <div className="bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-medium border border-neutral-800">
            TODO
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex items-center">
        <SidebarMenu className="items-center">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/">
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/tasks">
                Tasks
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="justify-center">
              <Link href="/teams">
                Teams
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
