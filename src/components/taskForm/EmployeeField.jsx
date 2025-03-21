import React from 'react';
import AddTaskFormDropdown from "src/components/taskForm/AddTaskFormDropdown.jsx";

const EmployeeField = ({ options, onChange, selectedOption }) => {
    return (
        <div className='flex flex-col gap-[3px]'>
            <div className="text-[#343A40] text-sm font-medium">პასუხისმგებელი თანამშრომელი*</div>
            <div className="relative">
                <AddTaskFormDropdown
                    options={options}
                    onChange={onChange}
                    validation={{ touched: false, isValid: true }}
                    selectedOption={selectedOption}
                    showAvatar={true}
                />
            </div>
        </div>
    );
};

export default EmployeeField;