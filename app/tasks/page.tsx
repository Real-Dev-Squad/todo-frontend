"use client";
import { useEffect, useState } from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { TaskList } from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "@/app/types/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  return (
    <div
      data-testid="tasks-container"
      className="md:w-5/6 lg:w-3/4 flex flex-col mx-auto"
    >
      <section data-testid="todo-section">
        <TaskHeader title="To Do" />
        <TaskList tasks={todoTasks} />
      </section>

      <section data-testid="in-progress-section">
        <TaskHeader title="In Progress" icon="/assets/InProgressEllipse.svg" />
        <TaskList tasks={inProgressTasks} />
      </section>
    </div>
  );
};

export default Tasks;
