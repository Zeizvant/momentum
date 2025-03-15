import React from 'react';

const DropdownFooter = ({ onApply }) => (
    <div className='w-full flex items-center justify-end'>
        <div
            className='text-white bg-[#8338EC] w-[155px] h-[35px] flex items-center justify-center rounded-[20px] font-normal cursor-pointer'
            onClick={onApply}
        >
            არჩევა
        </div>
    </div>
);

export default DropdownFooter;