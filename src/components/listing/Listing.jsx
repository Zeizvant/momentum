import React, { useEffect, useState } from 'react';
import ListingHeader from "src/components/listing/ListingHeader.jsx";
import Task from "src/components/task/Task.jsx";
import TaskSkeleton from "src/components/task/TaskSkeleton.jsx";
import { API_TOKEN } from "src/config/api.js";

const Listing = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('https://momentum.redberryinternship.ge/api/tasks', {
                    headers: { Authorization: API_TOKEN },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const headers = [
        { text: "დასაწყები", bgColor: "bg-[#F7BC30]" },
        { text: "პროგრესში", bgColor: "bg-[#FB5607]" },
        { text: "მზად ტესტირებისთვის", bgColor: "bg-[#FF006E]" },
        { text: "დასრულებული", bgColor: "bg-[#3A86FF]" },
    ];

    const filteredTasks = {
        1: tasks.filter(task => task.status.id === 1),
        2: tasks.filter(task => task.status.id === 2),
        3: tasks.filter(task => task.status.id === 3),
        4: tasks.filter(task => task.status.id === 4),
    };

    return (
        <div className="mt-[68px]">
            <div className="flex justify-between mb-[30px]">
                {headers.map((header, index) => (
                    <ListingHeader
                        key={index}
                        text={header.text}
                        bgColor={header.bgColor}
                    />
                ))}
            </div>

            <div className='flex justify-between mb-[30px]'>
                {[1, 2, 3, 4].map((statusId) => (
                    <div key={statusId} className="w-[381px] flex flex-col gap-[30px]">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <TaskSkeleton key={index} />
                            ))
                        ) : (
                            filteredTasks[statusId].map((task) => (
                                <Task
                                    key={task.id}
                                    priority={task.priority}
                                    department={task.department.name}
                                    status={task.status.name}
                                    due_date={task.due_date}
                                    name={task.name}
                                    description={task.description}
                                    avatar={task.employee.avatar}
                                    commentsCount={8}
                                />
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listing;