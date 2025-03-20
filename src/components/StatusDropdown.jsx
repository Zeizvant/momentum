import React, { useState, useRef, useEffect } from 'react';
import { API_ENDPOINTS, API_TOKEN } from 'src/config/api.js';

const StatusDropdown = ({ task }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(task.status.name);
    const [options, setOptions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.statuses, {
                    headers: { Authorization: API_TOKEN },
                });
                const data = await response.json();
                setOptions(data);
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };

        fetchStatuses();
    }, []);

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

    const handleSelect = async (option) => {
        setSelectedOption(option.name);
        setIsOpen(false);

        try {
            const response = await fetch(API_ENDPOINTS.tasks + "/" + task.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: API_TOKEN
                },
                body: JSON.stringify({
                    status_id: option.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const filteredOptions = options.filter(option => option.name !== selectedOption);

    return (
        <div className="flex flex-col gap-[3px]">
            <div className="relative" ref={dropdownRef}>
                <div
                    className="w-full h-[50px] rounded-[6px] border border-[#CED4DA] p-[14px] text-sm font-light text-[#0D0F10] flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>{selectedOption}</span>
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
                    <div className="absolute left-0 right-0 w-full bg-white shadow-lg z-10 max-h-60 overflow-auto">
                        {filteredOptions.map((option) => (
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

export default StatusDropdown;