import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, onChange, validation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    const getBorderColor = () => {
        if (!validation || !validation.touched) return 'border-[#CED4DA]';
        return validation.isValid ? 'border-[#08A508]' : 'border-[#FA4D4D]';
    };

    return (
        <div className="flex flex-col gap-[3px]">
            <div className="text-[#343A40] text-sm font-medium">დეპარტამენტი*</div>
            <div className="relative" ref={dropdownRef}>
                <div
                    className={`w-[384px] h-[50px] rounded-[6px] border ${getBorderColor()} p-[14px] text-sm font-light text-[#0D0F10] flex justify-between items-center cursor-pointer`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{selectedOption ? selectedOption.name : ''}</span>
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M1 1L5 5L9 1" stroke="#6C757D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="absolute left-0 right-0 w-[384px] bg-white shadow-lg z-10 max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="p-[14px] text-sm font-light text-[#0D0F10] hover:bg-[#F8F9FA] cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomDropdown;