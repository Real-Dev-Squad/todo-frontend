
import axios from "axios";
import { Task } from "./tasks.dto";


export const tasksApi = {
  createTask: async (task: Task) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/tasks`, task);
    return response.data;
  },
  updateTask: async (task: Task) => {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/v1/tasks`, task);
    return response.data;
  },
}
