"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InviteForm } from "./InviteForm"; 

export default function CreateTeamPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ avatar?: string; teamName?: string }>({});
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setErrors((prev) => ({ ...prev, avatar: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!avatar) newErrors.avatar = "Avatar is required";
    if (!teamName.trim()) newErrors.teamName = "Team name is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowInviteForm(true);
  };

  if (showInviteForm) {
    return <InviteForm />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-sm bg-gray-200 p-6 rounded-2xl shadow-md">
          <CardContent className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-center">Create your Team</h2>

            <label htmlFor="avatar-upload" className="cursor-pointer flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-gray-500 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
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
              {errors.avatar && <p className="text-red-600 text-xs mt-1">{errors.avatar}</p>}
            </label>

            <div className="w-full">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  setErrors((prev) => ({ ...prev, teamName: undefined }));
                }}
              />
              {errors.teamName && <p className="text-red-600 text-xs mt-1">{errors.teamName}</p>}
            </div>

            <div className="w-full">
              <Label htmlFor="description">Team Description (optional)</Label>
              <Input
                id="description"
                placeholder="Team Description ( optional )"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-neutral-800 text-white hover:bg-neutral-900"
            >
              Next
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
