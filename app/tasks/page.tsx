"use client";
import { useEffect, useState } from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { TaskList } from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "@/app/types/tasks";
import TodoForm from "@/components/TodoForm";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In-Progress");

  const handleCreateSubmit = (data: Task) => {
    console.log("Creating todo:", data)
  }

  const handleEditSubmit = (data: Task) => {
    console.log("Editing todo:", data)
  }

  const handleAcknowledge = () => {
    console.log("Todo acknowledged")
  }


  return (
    <div
      data-testid="tasks-container"
      className="md:w-5/6 lg:w-3/4 flex flex-row mx-auto"
    >
      <section
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
      </section>
      <section>
        <div className="max-w-2xl mx-auto mt-6 space-y-8">
          <TodoForm mode="view" initialData={tasksData[1]} onAcknowledge={handleAcknowledge} />
          <TodoForm mode="create" onSubmit={handleCreateSubmit} />
          <TodoForm mode="edit" initialData={tasksData[1]} onSubmit={handleEditSubmit} />
        </div>
      </section>
    </div>
  );
};

export default Tasks;
