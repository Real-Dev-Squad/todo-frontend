"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const TeamsPage = () => {
  const router = useRouter();

  return (
    <main className="flex flex-1 items-center justify-center px-4 md:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="text-center max-w-sm md:max-w-lg w-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 px-2">
          Your Team space awaits!
        </h1>
        <h2 className="text-gray-500 font-semibold mb-6 md:mb-4 text-sm md:text-base lg:text-lg px-2">
          Collaborate better by joining or creating a team. Work together,
          <br className="hidden sm:inline" />
          assign tasks, and track progress as a unit
        </h2>

        <div className="flex flex-col justify-center gap-3 md:gap-4 mt-8 md:mt-12 items-center w-full px-4">
          <Button
            className="w-full max-w-xs h-12 md:h-auto text-base md:text-sm"
            onClick={() => router.push("/teams/create")}
          >
            Create a Team
          </Button>
          <Button className="w-full max-w-xs h-12 md:h-auto bg-white text-black border border-black font-bold hover:bg-gray-50 text-base md:text-sm">
            Join an Existing Team
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TeamsPage;
