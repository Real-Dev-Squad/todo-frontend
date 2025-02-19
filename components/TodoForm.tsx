'use client'

import { Mode, Task } from '@/app/types/tasks'
import { useState } from 'react'
import TaskDetails from './TaskDetails'

import Image from 'next/image'

//Import Svg for icons
import calendarIcon from "@/public/assets/calendar.svg"
import AccountIcon from "@/public/assets/profile.svg"
import StatusIcon from "@/public/assets/status.svg"
import TagsIcon from "@/public/assets/priceTag.svg"
import IDIcon from "@/public/assets/id.svg"
import SaveIcon from "@/public/assets/save.svg"
import SendIcon from "@/public/assets/send.svg"
import { FormEvent } from 'react'
import { FORM_MODE } from '@/app/constants/Task'



interface TodoFormProps {
    initialData?: Task
    onSubmit?: (data: Task) => void
    mode: Mode;
    onAcknowledge?: () => void
    onClose: () => void
}

export default function TodoForm({ initialData, onSubmit, mode, onAcknowledge, onClose }: TodoFormProps) {
    const [formData, setFormData] = useState<Task>({
        id: initialData?.id || '',
        title: initialData?.title || '',
        description: initialData?.description || '',
        dueDate: initialData?.dueDate || '',
        assignee: initialData?.assignee || '',
        tags: initialData?.tags || '',
        taskId: initialData?.taskId || '',
        status: initialData?.status || 'Todo',
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(formData)
    }


    if (mode === FORM_MODE.VIEW && initialData && onAcknowledge) {
        return <TaskDetails onClose={onClose} onAcknowledge={onAcknowledge} initialData={initialData} />
    }

    return (
        <div className="w-full absolute rounded-none top-0 left-0 h-full mt-auto md:static md:max-w-2xl bg-white md:rounded-xl shadow-sm shadow-gray-400 border-gray-200 border-[1px] overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className='flex flex-row justify-between items-center'>
                    <h2 className="text-xl font-semibold text-indigo-600">{mode === FORM_MODE.CREATE ? "Create a Todo" : "Edit Todo"}</h2>
                    <button
                        data-testid='form-close-button'
                        className="md:hidden flex flex-row items-center justify-center gap-2 w-fit py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        onClick={onClose}
                    >X</button>
                </div>
                <hr className='mb-4' />

                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            data-testid="title"
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="e.g Cool new title for my todo"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            data-testid="description"
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 min-h-[100px]"
                            placeholder="e.g Nothing is cool in here"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Properties</h3>

                    <hr className='mb-4' />

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={calendarIcon} alt={"due data icon"} width={15} height={15} />

                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Due Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            data-testid="due-date"
                            id="dueDate"
                            type="date"
                            placeholder='Please enter due date'
                            value={formData.dueDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={AccountIcon} alt={"due data icon"} width={15} height={15} />
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Assignee<span className="text-red-500">*</span>
                        </label>
                        <input
                            data-testid="assignee"
                            id="assignee"
                            type="text"
                            value={formData.assignee}
                            onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="e.g @ankush"
                            required
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center'>
                        <Image src={TagsIcon} alt={"due data icon"} width={15} height={15} />
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Tags
                        </label>
                        <input
                            id="tags"
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="e.g frontend"
                        />
                    </div>

                    <div className='flex flex-row gap-2 justify-start items-center  '>
                        <Image src={IDIcon} alt={"due data icon"} width={15} height={15} />
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1 w-32 max-w-44">
                            Task ID<span className="text-red-500">*</span>
                        </label>
                        <input
                            data-testid="task-id"
                            id="taskId"
                            type="text"
                            value={formData.taskId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, taskId: e.target.value }))}
                            className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="e.g #kda4dyodajd73j"
                            required
                        />
                    </div>

                    {mode === FORM_MODE.EDIT && (
                        <div className='flex flex-row gap-2 justify-start items-center'>
                            <Image src={StatusIcon} alt={"due data icon"} width={15} height={15} />
                            <label htmlFor="dueDate" className="block text-sm ont-medium text-gray-700 mb-1 w-32 max-w-44">
                                Status
                            </label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Task["status"] }))}
                                className="w-full p-2 text-sm bg-[#F5F5FF] text-indigo-700  border-none border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                    data-testid="task-form-submit-button"
                    type="submit"
                    className="flex flex-row items-center justify-center gap-2 w-fit py-2 px-4 bg-indigo-600 hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                    <span className='flex flex-row gap-2'>
                        {mode === FORM_MODE.CREATE ? <><Image src={SendIcon} alt='create todo' width={15} height={15} />  Submit </> : <> <Image src={SaveIcon} alt='save edit icon' width={15} height={15} /> Save </>}
                    </span>
                </button>
            </form>
        </div>

    )
}
