"use client";

import { useState } from "react";
import { TaskItem } from "./taskItem";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";

interface DeferredTask {
  id: number;
  title: string;
  status: "In Progress" | "Completed" | "Pending";
  priority: "High" | "Medium" | "Low";
  category: string;
  dueDate?: string;
  isDeferred?: boolean;
}

const initialDeferredTasks: DeferredTask[] = [
  {
    id: 6,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
    isDeferred: true,
  },
  {
    id: 7,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
    isDeferred: true,
  },
  {
    id: 8,
    title: "Website Design",
    status: "In Progress",
    priority: "High",
    category: "#Design #Frontend",
    dueDate: "Today",
    isDeferred: true,
  },
  {
    id: 9,
    title: "Mobile App Design",
    status: "In Progress",
    priority: "Medium",
    category: "#Design #Mobile",
    dueDate: "Tomorrow",
    isDeferred: true,
  },
  {
    id: 10,
    title: "API Integration",
    status: "Pending",
    priority: "High",
    category: "#Development #Backend",
    dueDate: "This Week",
    isDeferred: true,
  },
];

export function DeferredTask() {
  return (
    <div className="space-y-3">
      {initialDeferredTasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          status={task.status}
          priority={task.priority}
          category={task.category}
          dueDate={task.dueDate}
          isDeferred={true}
        />
      ))}
    </div>
  );
}
