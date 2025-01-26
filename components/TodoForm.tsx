'use client'

import { Task } from '@/app/types/tasks'
import { useState, FormEvent } from 'react'
import TaskDetails from './TaskDetails'

import Image from 'next/image'

//Import Svg for icons
import calendarIcon from "@/public/assets/calendar 3.svg"
import AccountIcon from "@/public/assets/profile-user 5.svg"
import StatusIcon from "@/public/assets/status 1.svg"
import TagsIcon from "@/public/assets/price-tag 1.svg"
import IDIcon from "@/public/assets/id 1.svg"
import saveIcon from "@/public/assets/Vector-1.svg"
import sendIcon from "@/public/assets/Vector.svg"



interface TodoFormProps {
    initialData?: Task
    onSubmit?: (data: Task) => void
    mode: 'create' | 'edit' | 'view'
    onAcknowledge?: () => void
}

export default function TodoForm({ initialData, onSubmit, mode, onAcknowledge }: TodoFormProps) {
    const [formData, setFormData] = useState<Task>({
        id: initialData?.title || '',
        title: initialData?.title || '',
        description: initialData?.description || '',
        dueDate: initialData?.dueDate || '',
        assignee: initialData?.assignee || '',
        tags: initialData?.tags || '',
        taskId: initialData?.taskId || '',
        status: initialData?.status || 'Todo',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit?.(formData)
    }


    if (mode === 'view' && initialData && onAcknowledge) {
        return <TaskDetails onAcknowledge={onAcknowledge} initialData={initialData} />
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm shadow-gray-400 border-gray-200 border-[1px] overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <h2 className="text-xl font-semibold text-[#6366F1]">{mode === "create" ? "Create a Todo" : "Edit Todo"}</h2>


                <hr className='mb-4' />

                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            placeholder="e.g Cool new title for my todo"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1] min-h-[100px]"
                            placeholder="Description"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Properties</h3>

                    <hr className='mb-4' />

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={calendarIcon} alt={"due data icon"} />

                        <label htmlFor="dueDate" className="block text-sm min-w-fit  font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Due Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="dueDate"
                            type="datetime-local"
                            placeholder='Please enter due date'
                            value={formData.dueDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            required
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={AccountIcon} alt={"due data icon"} />
                        <label htmlFor="dueDate" className="block text-sm min-w-fit  font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Assignee<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="assignee"
                            type="text"
                            value={formData.assignee}
                            onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            placeholder="Assignee"
                            required
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={TagsIcon} alt={"due data icon"} />
                        <label htmlFor="dueDate" className="block text-sm min-w-fit  font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Tags
                        </label>
                        <input
                            id="tags"
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            placeholder="Tags"
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={IDIcon} alt={"due data icon"} />
                        <label htmlFor="dueDate" className="block text-sm min-w-fit  font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Task ID<span className="text-red-500">*</span>
                        </label>
                        <input
                            id="taskId"
                            type="text"
                            value={formData.taskId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, taskId: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            placeholder="Task ID"
                            required
                        />
                    </div>

                    {mode === "edit" && (
                        <div className='flex flex-row gap-2 justify-start items-center'>
                            <Image src={StatusIcon} alt={"due data icon"} />
                            <label htmlFor="dueDate" className="block text-sm min-w-fit font-medium text-gray-700 mb-1 w-32">
                                Status
                            </label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Task["status"] }))}
                                className="w-full p-2 text-sm bg-[#F5F5FF] text-[#4541C6]  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                            >
                                <option value="Todo">Todo</option>
                                <option value="In-Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    )}
                </div>

                <hr className='mb-4' />

                <button
                    type="submit"
                    className="flex flex-row items-center justify-center gap-2 w-fit py-2 px-4 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1]"
                >


                    <span>
                        {mode === "create" ? <Image src={sendIcon} alt='create todo' /> : <Image src={saveIcon} alt='save edit icon' />}
                    </span>

                    {mode === "create" ? "Submit" : "Save"}
                </button>
            </form>
        </div>

    )
}
