"use client";
import { useAuth } from "@/app/hooks/useAuth";
import React from "react";
import { getUserInitials } from "@/lib/utils";
import { logoutUser } from "@/lib/api/api-client";

export default function Page() {
  const { user } = useAuth();
  const name = user?.data?.name || "Guest";
  const email = user?.data?.email || "No email";
  const initials = getUserInitials(name);

  return (
    <div className="bg-gray-50 min-h-screen flex items-start justify-start p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mt-8 ml-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 mb-4 border-4 border-white shadow">
          {initials}
        </div>
        <div className="mb-4 w-full text-center">
          <div className="text-xl font-semibold mb-1">{name}</div>
          <div className="text-gray-500 text-sm">{email}</div>
        </div>
        <button
          onClick={logoutUser}
          type="button"
          className="w-full py-2 cursor-pointer px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium transition-colors mt-2 shadow-sm"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
