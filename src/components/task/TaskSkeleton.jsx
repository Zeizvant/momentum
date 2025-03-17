import React from 'react';

const TaskSkeleton = () => {
    return (
        <div className="w-[381px] h-[217px] rounded-[10px] border border-[#F7BC30] p-[20px] animate-pulse">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                        <div className="w-[60px] h-[26px] bg-gray-200 rounded-[4px]"></div>
                        <div className="w-[80px] h-[26px] bg-gray-200 rounded-[15px]"></div>
                    </div>
                    <div className="w-[80px] h-[20px] bg-gray-200 rounded-[4px]"></div>
                </div>

                <div className="flex flex-col gap-[12px] ml-[10.5px]">
                    <div className="w-[200px] h-[20px] bg-gray-200 rounded-[4px]"></div>
                    <div className="w-full h-[40px] bg-gray-200 rounded-[4px]"></div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="w-[24px] h-[24px] bg-gray-200 rounded-full"></div>
                    <div className="w-[40px] h-[20px] bg-gray-200 rounded-[4px]"></div>
                </div>
            </div>
        </div>
    );
};

export default TaskSkeleton;