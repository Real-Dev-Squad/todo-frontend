// app/teams/page.tsx

'use client';

import { NavBar } from '@/components/NavBar';
import { SideBar } from '@/components/SideBar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const TeamsPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="flex-1">
        <NavBar />
        <main className="flex flex-1 items-center justify-center mt-20 px-4">
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Your Team space awaits!</h1>
            <h2 className="text-gray-500 font-semibold mb-4">
              Collaborate better by joining or creating a team. Work together,
              <br className="hidden sm:inline" />
              assign tasks, and track progress as a unit
            </h2>

            <div className="flex flex-col justify-center gap-4 mt-12 items-center w-full">
              <Button className="w-full max-w-xs" onClick={() => router.push('/teams/create')}>
                Create a Team
              </Button>
              <Button className="w-full max-w-xs bg-white text-black border border-black font-bold">
                Join an Existing Team
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamsPage;
