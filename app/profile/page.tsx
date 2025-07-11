"use client";
import { useAuth } from "@/app/hooks/useAuth";
import React from "react";
import { logoutUser } from "@/lib/api/api-client";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();
  const name = user?.data?.name || "Guest";
  const email = user?.data?.email || "No email";

  return (
    <div className="bg-gray-50 min-h-screen flex items-start justify-start p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mt-8 ml-4 flex flex-col items-center">
        <div className="mb-4 w-full text-center">
          <div className="text-xl font-semibold mb-1">{name}</div>
          <div className="text-gray-500 text-sm">{email}</div>
        </div>
        <Button
          onClick={logoutUser}
          type="button"
          variant="destructive"
          className="w-full cursor-pointer"
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
