import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export const SideBar = () => {
  return (
    <aside className="fixed left-0 top-0 bg-white h-screen w-56 border-r border-neutral-200 flex flex-col min-h-screen z-40">
      <div className="mt-6 flex justify-center">
        <div className="bg-neutral-800 text-white px-4 py-2 rounded-full text-sm font-medium border border-neutral-800">
          TODO
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center space-y-2 px-4">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-800 hover:bg-neutral-100 rounded-none px-6 py-3"
          >
            Home
          </Button>
        </Link>
        <Link href="/tasks" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-800 hover:bg-neutral-100 rounded-none px-6 py-3"
          >
            Tasks
          </Button>
        </Link>
        <Link href="/teams" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-neutral-800 hover:bg-neutral-100 rounded-none px-6 py-3"
          >
            Teams
          </Button>
        </Link>
      </div>
    </aside>
  );
};
