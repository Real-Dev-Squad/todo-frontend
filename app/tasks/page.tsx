"use client";

import { useState } from "react";
import { TaskItem } from "@/components/tasks/taskItem";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, ArrowUpDown, Plus } from "lucide-react";
import { Watchlist } from "@/components/tasks/watchlistTask";
import { DeferredTask } from "@/components/tasks/deferredTask";

const sampleTasks = [
  {
    id: 1,
    title: "Website Design",
    status: "In Progress" as const,
    priority: "High" as const,
    category: "#Design",
    dueDate: "Today",
    team: "Design Ninjas",
  },
  {
    id: 2,
    title: "Website Design",
    status: "In Progress" as const,
    priority: "High" as const,
    category: "#Design",
    dueDate: "Today",
    team: "Design Ninjas",
  },
  {
    id: 3,
    title: "Website Design",
    status: "In Progress" as const,
    priority: "High" as const,
    category: "#Design",
    dueDate: "Today",
    team: "Design Ninjas",
  },
  {
    id: 4,
    title: "Website Design",
    status: "In Progress" as const,
    priority: "High" as const,
    category: "#Design",
    dueDate: "Today",
    team: "Design Ninjas",
  },
  {
    id: 5,
    title: "Website Design",
    status: "In Progress" as const,
    priority: "High" as const,
    category: "#Design",
    dueDate: "Today",
    team: "Design Ninjas",
  },
];

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState("my-tasks");

  return (
    <main className="flex-1 p-6 border-none">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tasks</h1>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-auto grid-cols-3 bg-transparent">
                <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="deferred">Deferred</TabsTrigger>
              </TabsList>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <TabsContent value="my-tasks" className="space-y-4">
              <div className="">
                <div className="space-y-3">
                  {sampleTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      title={task.title}
                      status={task.status}
                      priority={task.priority}
                      category={task.category}
                      dueDate={task.dueDate}
                      team={task.team}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="watchlist" className="space-y-4">
              <Watchlist />
            </TabsContent>

            <TabsContent value="deferred" className="space-y-4">
              <DeferredTask />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
