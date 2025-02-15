"use client";
import { useEffect, useState } from "react";
import { TaskHeader } from "@/components/TaskHeader";
import { TaskList } from "@/components/TaskList";
import tasksData from "@/data/taskData.json";
import { Task } from "@/app/types/tasks";
import TodoForm from "@/components/TodoForm";
import { FORM_MODE, TASK_STATUS } from "../constants/Task";



const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateAndEditFormVisible, setIsCreateAndEditFormVisible] = useState(false)
  const [activeTask, setActiveTask] = useState<Task | undefined>();

  useEffect(() => {
    setTasks(tasksData);
  }, []);


  const handleTaskSelect = (task: Task) => {
    setActiveTask(task);
    setIsCreateAndEditFormVisible(false);
  };

  const todoTasks = tasks.filter((task) => task.status === TASK_STATUS.TODO);
  const inProgressTasks = tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS);

  const handleCreateSubmit = (data: Task) => {
    console.log("Creating todo:", data)
  }

  const handleAcknowledge = () => {
    console.log("Todo acknowledged")
  }


  const handleFormClose = () => {
    setIsCreateAndEditFormVisible(false);
    setActiveTask(undefined);
  };

  return (
    <>
      <div className="md:w-5/6 lg:w-3/4 w-full flex flex-row justify-end mx-auto p-2">
        <button
          onClick={() => {
            setIsCreateAndEditFormVisible(prev => !prev)
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
            <TaskList tasks={todoTasks} setActiveTask={handleTaskSelect} />
          </section>

          <section data-testid="in-progress-section">
            <TaskHeader title="In Progress" icon="/assets/InProgressEllipse.svg" />
            <TaskList tasks={inProgressTasks} setActiveTask={handleTaskSelect} />
          </section>
        </section>
        <section
          className="max-w-2xl mt-6 space-y-8"
        >
          {
            isCreateAndEditFormVisible && <TodoForm onClose={handleFormClose} mode={FORM_MODE.CREATE} onSubmit={handleCreateSubmit} />
          }
          {
            activeTask && <TodoForm onClose={handleFormClose} mode={FORM_MODE.VIEW} initialData={activeTask} onAcknowledge={handleAcknowledge} />
          }
        </section>
      </div>
    </>
  );
};

export default Tasks;
