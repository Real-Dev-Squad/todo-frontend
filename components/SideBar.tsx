import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed left-0 top-0 bg-gray-400 h-screen w-64 flex flex-col min-h-screen lg:w-56 md:w-64 sm:w-56">
      <div className="mt-4 flex justify-center">
        <div className="bg-gray-400 text-black px-4 py-2 rounded-full text-sm font-medium border border-black">
          TODO
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center space-y-4 px-4">
        <Link href="/">
          <button
            type="button"
            className={`w-full max-w-40 h-12 transition-colors duration-200  flex items-center justify-center ${
              pathname === "/" ? "text-black underline" : "text-white"
            }`}
          >
            <span className="text-lg font-medium">Home</span>
          </button>
        </Link>

        <Link href="/updates">
          <button
            type="button"
            className={`w-full max-w-40 h-12 transition-colors duration-200 flex items-center justify-center ${
              pathname === "/updates" ? "text-black underline" : "text-white"
            }`}
          >
            <span className="text-lg font-medium">Updates</span>
          </button>
        </Link>

        <Link href="/tasks">
          <button
            type="button"
            className={`w-full max-w-40 h-12 transition-colors duration-200 flex items-center justify-center ${
              pathname === "/tasks" ? "text-black underline" : "text-white"
            }`}
          >
            <span className="text-lg font-medium">My Tasks</span>
          </button>
        </Link>

        <Link href="/teams">
          <button
            type="button"
            className={`w-full max-w-40 h-12 transition-colors duration-200 flex items-center justify-center ${
              pathname === "/teams" ? "text-black underline" : " text-white"
            }`}
          >
            <span className="text-lg font-medium">Teams</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
