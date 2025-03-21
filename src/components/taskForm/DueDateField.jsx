import React from 'react';

const DueDateField = ({ value, onChange, validation, today }) => {
    return (
        <div className='mb-[20px]'>
            <div className="text-[#343A40] text-sm font-medium mb-[3px]">დავალების ვადა*</div>
            <input
                type="date"
                value={value}
                onChange={onChange}
                min={today}
                className={`w-[384px] h-[50px] rounded-[6px] border bg-white ${
                    !validation.touched
                        ? 'border-[#CED4DA]'
                        : validation.isValid
                            ? 'border-[#08A508]'
                            : 'border-[#FA4D4D]'
                } p-[14px] focus:outline-none ${!validation.touched && 'focus:border-[#8338EC]'}`}
            />
        </div>
    );
};

export default DueDateField;