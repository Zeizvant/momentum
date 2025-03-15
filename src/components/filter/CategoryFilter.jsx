import React, { useState, useRef, useEffect } from 'react';
import FilterOption from "src/components/filter/FilterOption.jsx";
import FilterDropdown from "src/components/filter/filter-dropdown/FilterDropdown.jsx";

const CategoryFilter = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [appliedSelectedItems, setAppliedSelectedItems] = useState([]); // Applied state

    const handleFilterClick = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null); // Close dropdown
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownPosition = {
        top: 'calc(100% + 11px)',
        left: 0,
    };

    const filterOptions = ['დეპარტამენტი', 'პრიორიტეტი', 'თანამშრომელი'];

    return (
        <div className='w-[688px] h-[44px] flex items-center my-[12px] border border-[#DEE2E6] rounded-[10px] relative'>
            <div className='w-[688px] flex items-center justify-between px-[18px]'>
                {filterOptions.map((label, index) => (
                    <FilterOption
                        key={index}
                        label={label}
                        onClick={() => handleFilterClick(index)}
                        isActive={openDropdown === index}
                    />
                ))}
            </div>

            <FilterDropdown
                isOpen={openDropdown !== null}
                dropdownRef={dropdownRef}
                position={dropdownPosition}
                options={filterOptions}
                selectedOption={openDropdown}
                appliedSelectedItems={appliedSelectedItems} // Pass applied state
                setAppliedSelectedItems={setAppliedSelectedItems} // Pass setter for applied state
                setOpenDropdown={setOpenDropdown} // Pass setter to close dropdown
            />
        </div>
    );
}

export default CategoryFilter;