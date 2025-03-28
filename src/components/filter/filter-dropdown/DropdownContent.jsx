import React from 'react';
import Checkbox from 'src/components/filter/filter-dropdown/Checkbox.jsx';

const DropdownContent = ({ data, selectedItems, handleCheckboxChange, selectedOption, isSingleSelect }) => (
    <div className='overflow-x-auto'>
        <div
            className='grid gap-[10px] w-max font-normal'
            style={{ gridTemplateRows: 'repeat(4, minmax(0, 1fr))', gridAutoFlow: 'column', columnGap: '40px' }}
        >
            {data.map((item) => (
                <label key={item.id} className='flex items-center space-x-2 cursor-pointer'>
                    <Checkbox
                        checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                        onChange={() => handleCheckboxChange(item)}
                        type={isSingleSelect ? 'radio' : 'checkbox'}
                    />
                    {selectedOption === 'თანამშრომელი' ? (
                        <div className='flex items-center space-x-2'>
                            <img
                                src={item.avatar}
                                alt={`${item.name} ${item.surname}`}
                                className='w-6 h-6 rounded-full object-cover'
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