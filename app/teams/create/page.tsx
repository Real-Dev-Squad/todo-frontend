"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function CreateTeamPage() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-sm bg-gray-200 p-6 rounded-2xl shadow-md">
        <CardContent className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-center">Create your Team</h2>

          <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-gray-500 flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="text-sm text-gray-500">+</div>
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-1">Add Avatar</span>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>

          <Input placeholder="Team Name" />
          <Input placeholder="Team Description ( optional )" />

          <Button className="w-full bg-[#2d2626] text-white hover:bg-[#1e1a1a]">Next</Button>
        </CardContent>
      </Card>
    </div>
  );
}
