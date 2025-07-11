import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name?: string): string {
  if (!name || typeof name !== "string") return "GU";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "GU";

  const firstInitial = words[0][0]?.toUpperCase() ?? "";
  const secondInitial = words[1]?.[0]?.toUpperCase() ?? "";

  return firstInitial + secondInitial;
}
