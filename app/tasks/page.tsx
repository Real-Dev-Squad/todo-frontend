"use client";
import { useEffect, useState } from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { TaskList } from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "@/app/types/tasks";
import TodoForm from "@/components/TodoForm";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateAndEditFormVisibile, setIsCreateAndEditFormVisibile] = useState(false)
  const [activeTask, setActiveTask] = useState<Task | undefined>();

  useEffect(() => {
    setTasks(tasksData);
  }, []);


  useEffect(() => {
    if (activeTask) {
      setIsCreateAndEditFormVisibile(false);
    }

  }, [activeTask])

  const todoTasks = tasks.filter((task) => task.status === "Todo");
  const inProgressTasks = tasks.filter((task) => task.status === "In-Progress");

  const handleCreateSubmit = (data: Task) => {
    console.log("Creating todo:", data)
  }

  // const handleEditSubmit = (data: Task) => {
  //   console.log("Editing todo:", data)
  // }

  const handleAcknowledge = () => {
    console.log("Todo acknowledged")
  }


  return (
    <>
      <div className="md:w-5/6 lg:w-3/4 w-full flex flex-row justify-end mx-auto p-2">
        <button
          onClick={() => {
            setIsCreateAndEditFormVisibile(prev => !prev)
            setActiveTask(undefined);
          }
          }
          className=" flex flex-row justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className='text-2xl text-white'>+</span>
          <p>
            Create new Task
          </p>
        </button>
      </div>
      <div
        data-testid="tasks-container"
        className="md:w-5/6 lg:w-3/4 flex flex-row mx-auto"
      >
        <section
          className="w-full flex flex-col"
        >
          <section data-testid="todo-section">
            <TaskHeader title="To Do" />
            <TaskList tasks={todoTasks} setActiveTask={setActiveTask} />
          </section>

          <section data-testid="in-progress-section">
            <TaskHeader title="In Progress" icon="/assets/InProgressEllipse.svg" />
            <TaskList tasks={inProgressTasks} setActiveTask={setActiveTask} />
          </section>
        </section>
        <section
          className="max-w-2xl mt-6 space-y-8"
        >
          {
            isCreateAndEditFormVisibile && <TodoForm onClose={() => {
              setIsCreateAndEditFormVisibile(false);
              setActiveTask(undefined)
            }} mode="create" onSubmit={handleCreateSubmit} />
          }
          {
            activeTask && <TodoForm onClose={() => {
              setIsCreateAndEditFormVisibile(false)
              setActiveTask(undefined)
            }} mode="view" initialData={activeTask} onAcknowledge={handleAcknowledge} />
          }
          {/* 
            <TodoForm mode="create" onSubmit={handleCreateSubmit} />
            <TodoForm mode="edit" initialData={tasksData[1]} onSubmit={handleEditSubmit} /> */}
        </section>
      </div>
    </>
  );
};

export default Tasks;
