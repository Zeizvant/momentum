import React from 'react';
import Checkbox from './Checkbox';

const DropdownContent = ({ data, selectedItems, handleCheckboxChange, selectedOption }) => (
    <div className='overflow-x-auto'>
        <div
            className='grid gap-4 w-max font-normal'
            style={{ gridTemplateRows: 'repeat(4, minmax(0, 1fr))', gridAutoFlow: 'column' }}
        >
            {data.map((item) => (
                <label key={item.id} className='flex items-center space-x-2 cursor-pointer'>
                    <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                    />
                    {selectedOption === 'თანამშრომელი' ? (
                        <div className='flex items-center space-x-2'>
                            <img
                                src={item.avatar}
                                alt={`${item.name} ${item.surname}`}
                                className='w-6 h-6 rounded-full'
                            />
                            <span className='text-[#212529]'>
                {item.name} {item.surname}
              </span>
                        </div>
                    ) : (
                        <span className='text-[#212529]'>{item.name}</span>
                    )}
                </label>
            ))}
        </div>
    </div>
);

export default DropdownContent;