"use client";

import { useState } from "react";
import { TaskItem } from "./taskItem";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";

interface WatchlistTask {
  id: number;
  title: string;
  status: "In Progress" | "Completed" | "Pending";
  priority: "High" | "Medium" | "Low";
  category: string;
  dueDate?: string;
}

const initialWatchlistTasks: WatchlistTask[] = [
  {
    id: 6,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
  },
  {
    id: 7,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
  },
  {
    id: 8,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
  },
  {
    id: 9,
    title: "Mobile App Design",
    status: "In Progress",
    priority: "Medium",
    category: "#Design #Mobile",
    dueDate: "Tomorrow",
  },
  {
    id: 10,
    title: "API Integration",
    status: "Pending",
    priority: "High",
    category: "#Development #Backend",
    dueDate: "This Week",
  },
];

export function Watchlist() {
  return (
    <div className="space-y-3">
      {initialWatchlistTasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          status={task.status}
          priority={task.priority}
          category={task.category}
          dueDate={task.dueDate}
          isWatchlist={true}
        />
      ))}
    </div>
  );
}
