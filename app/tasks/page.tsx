"use client";
import { useEffect, useState } from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { TaskList } from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "@/app/types/tasks";
import { ShimmerSkeleton } from "@/components/SimmerSkeleton";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetchingTaskData, setIsFetchingTaskData] = useState(true);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  useEffect(() => {
    setTasks(tasksData);
    setIsFetchingTaskData(false);
  }, []);


  return (
    <div
      data-testid="tasks-container"
      className="md:w-5/6 lg:w-3/4 flex flex-col mx-auto"
    >

      <section data-testid="todo-section">
        <TaskHeader title="To Do" />
        <ShimmerSkeleton loading={isFetchingTaskData}>
          <TaskList tasks={todoTasks} />
        </ShimmerSkeleton>
      </section>

      <section data-testid="in-progress-section">
        <TaskHeader title="In Progress" icon="/assets/InProgressEllipse.svg" />
        <ShimmerSkeleton loading={isFetchingTaskData}>
          <TaskList tasks={inProgressTasks} />
        </ShimmerSkeleton>
      </section>
    </div>
  );
};

export default Tasks;
