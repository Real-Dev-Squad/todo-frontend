import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(name?: string): string {
  if (!name) return "GU";
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  } else if (words[0].length >= 2) {
    return words[0].slice(0, 2).toUpperCase();
  } else {
    return words[0][0].toUpperCase();
  }
}
