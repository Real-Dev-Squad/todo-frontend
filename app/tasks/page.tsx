"use client";

import { useEffect, useState } from "react";
import TaskSection from "@/components/TaskSection";
import TaskList from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "../types/task";

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  return (
    <div className="md:w-5/6 lg:w-3/4 flex flex-col mx-auto">
      <section>
        <TaskSection title="To Do" />
        <TaskList tasks={todoTasks} />
      </section>

      <section>
        <TaskSection title="In Progress" icon="/assets/InProgressEllipse.svg" />
        <TaskList tasks={inProgressTasks} />
      </section>
    </div>
  );
};

export default TasksPage;
