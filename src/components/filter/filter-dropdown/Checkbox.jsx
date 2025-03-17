import React from 'react';
import Tick from 'src/assets/tick.svg?react';

const Checkbox = ({ checked, onChange, type = 'checkbox' }) => (
    <div className='relative mr-[15px]'>
        <input
            type={type}
            checked={checked}
            onChange={onChange}
            className='absolute opacity-0 h-0 w-0'
        />
        <div
            className={`w-5 h-5 border-[1.5px] border-[#212529] rounded-[6px] flex items-center justify-center transition-colors ${
                checked ? 'bg-white border-[#212529]' : 'bg-white border-[#212529]'
            }`}
        >
            {checked && <Tick />}
        </div>
    </div>
);

export default Checkbox;