import React from 'react';
import Badge from "src/components/task/Badge.jsx";
import CommentIcon from 'src/assets/comments.svg?react';
import formatToGeorgianDate from "src/utils/formatToGeorgianDate.js";
import convertDepartmentName from "src/utils/convertDepartmentName.js";
import generateColor from "src/utils/generateColor.js";

const Task = ({
                  priority,
                  department,
                  status,
                  due_date,
                  name,
                  description,
                  avatar,
                  commentsCount,
              }) => {
    const statusColorMap = {
        დასაწყები: '#F7BC30',
        პროგრესში: '#FB5607',
        'მზად ტესტირებისთვის': '#FF006E',
        დასრულებული: '#3A86FF',
    };
    const borderColor = statusColorMap[status];

    return (
        <div
            className='w-[381px] h-[217px] rounded-[10px] border text-xl font-medium cursor-pointer p-[20px]'
            style={{ borderColor }}
        >
            <div className='flex flex-col justify-between h-full'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-[10px]'>
                        <Badge priority={priority} />
                        <div
                            className='px-[18.5px] py-[5px] text-xs font-normal rounded-[15px] text-white flex justify-center min-w-[88px]'
                            style={{backgroundColor: generateColor(department)}}
                        >
                            {convertDepartmentName(department)}
                        </div>
                    </div>
                    <div className='text-xs font-normal text-[#212529] w-[76px]'>
                        {formatToGeorgianDate(due_date)}
                    </div>
                </div>

                <div className='flex flex-col gap-[12px] ml-[10.5px]'>
                    <p className='text-[15px] font-medium text-[#212529]'>
                        {name}
                    </p>
                    <div className='max-h-[40px] overflow-y-auto w-full'>
                        <p className='text-sm font-normal text-[#343A40] text-start'>
                            {description}
                        </p>
                    </div>
                </div>

                <div className='flex justify-between items-center'>
                    <img src={avatar} alt='employee avatar' className='w-[24px] h-[24px] rounded-full' />
                    <div className='flex items-center gap-[4px] text-sm font-normal text-[#212529]'>
                        <CommentIcon />
                        {commentsCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;