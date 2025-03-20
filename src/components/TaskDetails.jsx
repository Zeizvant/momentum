import React from 'react';
import Badge from "src/components/task/Badge.jsx";
import generateColor from "src/utils/generateColor.js";
import convertDepartmentName from "src/utils/convertDepartmentName.js";
import PersonIcon from "src/assets/person.svg?react"
import PieChart from "src/assets/pie-chart.svg?react"
import CalendarIcon from "src/assets/calendar.svg?react"
import StatusDropdown from "src/components/StatusDropdown.jsx";
import formatDateToGeorgianDateWithDay from "src/utils/formatDateToGeorgianDateWithDay.js";

const TaskDetails = ({ task }) => {
    return (
        <div className='w-[715px]'>
            <div className='flex flex-start gap-[18px]'>
                <Badge priority={task.priority} />
                <div
                    className='px-[18.5px] py-[5px] text-xs font-normal rounded-[15px] text-white flex justify-center min-w-[88px]'
                    style={{ backgroundColor: generateColor(task.department.name) }}
                >
                    {convertDepartmentName(task.department.name)}
                </div>
            </div>
            <div className='mt-[12px] text-[#212529] font-semibold text-[34px] font-[Inter] mb-[36px]'>
                {task.name}
            </div>
            <div className='text-black text-lg font-normal'>
                {task.description}
            </div>
            <div>
                <div className='font-medium text-2xl mt-[70px] text-[#2A2A2A] mb-[28px]'>
                    დავალების დეტალები
                </div>
                <div>
                    <div className='h-[70px] w-[493px] flex items-center justify-between'>
                        <div className='flex text-[#474747] font-medium gap-[6px]'>
                            <PieChart />
                            სტატუსი
                        </div>
                        <div className='w-[260px]'>
                            <StatusDropdown task={task} />
                        </div>
                    </div>
                    <div className='h-[70px] w-[493px] flex items-center justify-between'>
                        <div className='flex text-[#474747] font-medium gap-[6px]'>
                            <PersonIcon />
                            თანამშრომელი
                        </div>
                        <div className='w-[260px] flex gap-[12px] h-[48px]'>
                            <div className='flex justify-center items-center'>
                                <img src={task.employee.avatar} alt='employee avatar'
                                     className='w-[32px] h-[32px] rounded-full' />
                            </div>
                            <div className='flex flex-col'>
                                <div className='font-light text-[11px] text-[#474747]'>
                                    {task.employee.department.name}
                                </div>
                                <div className='text-[#0D0F10] font-normal text-sm'>
                                    {task.employee.name} {task.employee.surname}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[70px] w-[493px] flex items-center justify-between'>
                        <div className='flex text-[#474747] font-medium gap-[6px]'>
                            <CalendarIcon />
                            დავალების ვადა
                        </div>
                        <div className='w-[260px] text-sm text-[#0D0F10] font-normal'>
                            {formatDateToGeorgianDateWithDay(task.due_date)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;