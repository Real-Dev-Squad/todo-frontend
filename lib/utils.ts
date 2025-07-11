import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name?: string): string {
  if (!name || typeof name !== "string") return "GU";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "GU";
  if (words.length >= 2) {
    const [first, second] = words;
    return `${first[0]}${second[0]}`.toUpperCase();
  }
  const [first] = words;
  if (first.length >= 2) {
    return first.slice(0, 2).toUpperCase();
  }
  return first[0].toUpperCase();
}
