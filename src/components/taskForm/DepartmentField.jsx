import React from 'react';
import AddTaskFormDropdown from "src/components/taskForm/AddTaskFormDropdown.jsx";

const DepartmentField = ({ options, onChange, selectedOption }) => {
    return (
        <div className='flex flex-col gap-[3px] mb-[90px]'>
            <div className="text-[#343A40] text-sm font-medium">დეპარტამენტი*</div>
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

export default DepartmentField;