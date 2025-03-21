import React from 'react';
import AddTaskFormDropdown from "src/components/taskForm/AddTaskFormDropdown.jsx";

const StatusField = ({ options, onChange, selectedOption }) => {
    return (
        <div className='flex flex-col gap-[3px] w-1/2'>
            <div className="text-[#343A40] text-sm font-medium">სტატუსი*</div>
            <div className="relative">
                <AddTaskFormDropdown
                    options={options}
                    onChange={onChange}
                    validation={{ touched: false, isValid: true }}
                    selectedOption={selectedOption}
                />
            </div>
        </div>
    );
};

export default StatusField;