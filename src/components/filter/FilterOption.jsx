import React from 'react';
import Arrow from 'src/assets/arrow.svg?react';
import ClickedArrow from 'src/assets/clickedArrow.svg?react';

const FilterOption = ({ label, onClick, isActive }) => {
    return (
        <div
            className={`flex gap-[8px] text-[#0D0F10] cursor-pointer transition-all duration-300 ease-out ${isActive ? 'text-[#8338EC]' : ''}`}
            onClick={onClick}
        >
            {label}
            <div className={`transition-transform duration-300 ease-out ${isActive ? 'rotate-180' : ''}`}>
                {isActive ? <ClickedArrow /> : <Arrow />}
            </div>
        </div>
    );
};

export default FilterOption;