import React from 'react';
import DeleteButton from 'src/assets/x.svg?react';

const FilterTag = ({ name, onDelete }) => {
    return (
        <div className='border border-[#CED4DA] flex py-[6px] px-[10px] rounded-[43px] items-center gap-[4px] text-[#343A40] text-sm font-normal transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-4'>
            {name}
            <div className="cursor-pointer" onClick={onDelete}>
                <DeleteButton />
            </div>
        </div>
    );
};

export default FilterTag;