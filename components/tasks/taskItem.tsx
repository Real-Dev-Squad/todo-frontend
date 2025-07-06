"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface TaskItemProps {
  title: string;
  status: "In Progress" | "Completed" | "Pending";
  priority: "High" | "Medium" | "Low";
  category: string;
  dueDate?: string;
  team?: string;
  assignedUsers?: string[];
  isWatchlist?: boolean;
  isDeferred?: boolean;
}

export function TaskItem({
  title,
  status,
  priority,
  category,
  team,
  assignedUsers,
  isWatchlist,
  isDeferred,
}: TaskItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 pr-0 pb-8 border-b border-primary">
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 mt-2">
            <Badge
              variant="secondary"
              className={`${getStatusColor(status)} rounded-sm`}
            >
              {status}
            </Badge>
            <Badge
              variant="secondary"
              className={`${getPriorityColor(priority)} rounded-sm`}
            >
              {priority}
            </Badge>
            {team && <span className="text-sm text-gray-500">{team}</span>}
            <span className="text-sm text-gray-500">{category}</span>
            {assignedUsers && assignedUsers.length > 0 && (
              <div className="flex -space-x-1">
                {assignedUsers.slice(0, 3).map((user, index) => (
                  <div
                    key={index}
                    className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center border border-white"
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {isDeferred ? (
          <Button variant="ghost" size="sm">
            Remove from deferred
          </Button>
        ) : isWatchlist ? (
          <Button variant="ghost" size="sm">
            Remove from watchlist
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            Deferred
          </Button>
        )}
        <Button variant="ghost" size="sm">
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          Acknowledge
        </Button>

        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
