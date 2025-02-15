"use client"

import { Task } from '@/app/types/tasks'
import Image from 'next/image'
import React, { useState } from 'react'


//Import Svg for icons
import calendarIcon from "@/public/assets/calendar.svg"
import AccountIcon from "@/public/assets/profile-user 5.svg"
import StatusIcon from "@/public/assets/status 1.svg"
import TagsIcon from "@/public/assets/price-tag 1.svg"
import IDIcon from "@/public/assets/id 1.svg"

type Props = {
    onAcknowledge: () => void,
    initialData: Task,
    onClose: () => void,
}

const Tabs: {
    [key: string]: string;
} = {
    All: "all", History: "history", Comments: 'comments'
}


function TaskDetails({ onAcknowledge, initialData, onClose }: Props) {

    const [activeTab, setActiveTab] = useState(Tabs.All)

    return (
        <div data-testid="task-details-1" className="w-full absolute rounded-none top-0 left-0 h-full mt-auto md:static md:max-w-2xl bg-white md:rounded-xl shadow-sm shadow-gray-400 border-gray-200 border-[1px] overflow-hidden">
            <div className="p-6 space-y-6">
                <div className='flex flex-row justify-between items-center'>
                    <h2 className="text-xl font-semibold text-indigo-600">{initialData?.title}</h2>
                    <div className='flex flex-row gap-2'>
                        <button
                            onClick={onAcknowledge}
                            data-testid='details-acknowledge-button'
                            className=" flex flex-row justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className='text-2xl text-white'>+</span>
                            <p>
                                Acknowledge
                            </p>
                        </button>
                        <button
                            data-testid='details-close-button'
                            className="md:hidden flex flex-row items-center justify-center gap-2 w-fit py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                            onClick={onClose}
                        >X</button>
                    </div>
                </div>

                <div className="text-gray-600 text-sm mb-4 max-h-40 whitespace-pre-wrap overflow-y-scroll no-scrollbar ">{initialData?.description}</div>

                <hr className='mb-4' />

                <div className="space-y-6 mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Properties</h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-2">
                            <Image src={calendarIcon} alt={"due data icon"} width={15} height={15} />
                            <span className="text-sm ">Due Date:</span>
                            <span className="text-sm text-gray-500">{new Date(initialData?.dueDate || '').toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src={AccountIcon} alt={"due data icon"} width={15} height={15} />
                            <span className="text-sm ">Assignee:</span>
                            <span className="text-sm text-gray-500">{initialData?.assignee}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src={StatusIcon} alt={"due data icon"} width={15} height={15} />
                            <span className="text-sm ">Status:</span>
                            <span className="text-sm text-gray-500">{initialData?.status}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src={TagsIcon} alt={"due data icon"} width={15} height={15} />
                            <span className="text-sm ">Tags:</span>
                            <span className="text-sm text-gray-500">{initialData?.tags}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Image src={IDIcon} alt={"due data icon"} width={15} height={15} />
                            <span className="text-sm ">Task ID:</span>
                            <span className="text-sm text-gray-500">#{initialData?.taskId}</span>
                        </div>
                    </div>
                </div>

                <hr className='mb-4' />

                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Activity</h3>
                    <div className="">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {Object.keys(Tabs).map((tab) => (
                                <button
                                    data-testid={Tabs[tab]}
                                    key={tab}
                                    onClick={() => setActiveTab(Tabs[tab])}
                                    className={`${activeTab === Tabs[tab]
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-4">
                        <div className="h-fit rounded-xl overflow-hidden bg-[#F5F5FF]">
                            <textarea
                                placeholder="Leave a comment..."
                                className="w-full h-full text-sm bg-[#F5F5FF] text-indigo-600 border-none p-2 placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails