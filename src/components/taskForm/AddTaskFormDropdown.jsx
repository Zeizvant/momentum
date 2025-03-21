import React, { useState, useEffect, useRef } from 'react';
import PlusIcon from 'src/assets/plus.svg?react';

const AddTaskFormDropdown = ({
                                 options,
                                 onChange,
                                 selectedOption,
                                 placeholder = "",
                                 showAvatar = false
                             }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const getBorderColor = () => {
        return isOpen ? 'border-[#8338EC]' : 'border-[#CED4DA]';
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex justify-between items-center h-[50px] px-[14px] rounded-[6px] border bg-white ${getBorderColor()} cursor-pointer`}
            >
                <div className="flex items-center">
                    {selectedOption && (
                        <>
                            {showAvatar && selectedOption.avatar && (
                                <img
                                    src={selectedOption.avatar}
                                    alt={selectedOption.name}
                                    className="h-[24px] w-[24px] rounded-full mr-2 object-cover"
                                />
                            )}

                            {selectedOption.color && !showAvatar && (
                                <div
                                    className="h-[10px] w-[10px] rounded-full mr-2"
                                    style={{ backgroundColor: selectedOption.color }}
                                />
                            )}

                            {selectedOption.icon && (
                                <img
                                    src={selectedOption.icon}
                                    alt={`${selectedOption.name} icon`}
                                    className="h-[16px] w-[16px] mr-2"
                                />
                            )}

                            <span className="text-[#343A40] text-sm">
                                {selectedOption.id === 'add'
                                    ? selectedOption.name
                                    : showAvatar && selectedOption.surname
                                        ? `${selectedOption.name} ${selectedOption.surname}`
                                        : selectedOption.name}
                            </span>
                        </>
                    )}

                    {!selectedOption && (
                        <span className="text-[#343A40] text-sm">{placeholder}</span>
                    )}
                </div>

                <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path
                        d="M1 1L7 7L13 1"
                        stroke="#6C757D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-[#CED4DA] rounded-[6px] shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className={`flex items-center h-[40px] px-[14px] hover:bg-[#F8F9FA] cursor-pointer ${
                                selectedOption && selectedOption.id === option.id ? 'bg-[#F8F9FA]' : ''
                            } ${option.name === "დაამატე თანამშრომელი" ? 'text-[#8338EC]': ''}`}
                        >
                            {option.name === "დაამატე თანამშრომელი" && (
                                <PlusIcon className='mr-[8px]' />
                            )}

                            {showAvatar && option.avatar && (
                                <img
                                    src={option.avatar}
                                    alt={option.name}
                                    className="h-[24px] w-[24px] rounded-full mr-2 object-cover"
                                />
                            )}

                            {option.color && !showAvatar && (
                                <div
                                    className="h-[10px] w-[10px] rounded-full mr-2"
                                    style={{ backgroundColor: option.color }}
                                />
                            )}
                            {option.icon && (
                                <img
                                    src={option.icon}
                                    alt={`${option.name} icon`}
                                    className="h-[16px] w-[16px] mr-2"
                                />
                            )}

                            <span className={`${option.name !== "დაამატე თანამშრომელი" && 'text-[#343A40]' } text-sm`}>
                                {option.id === 'add'
                                    ? option.name
                                    : showAvatar && option.surname
                                        ? `${option.name} ${option.surname}`
                                        : option.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddTaskFormDropdown;