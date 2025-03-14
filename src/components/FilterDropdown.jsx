import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, API_TOKEN } from 'src/config/api';
import DropdownContent from 'src/components/DropdownContent';
import DropdownFooter from 'src/components/DropdownFooter';
import SkeletonLoader from 'src/components/SkeletonLoader';

const FilterDropdown = ({ isOpen, dropdownRef, position, options, selectedOption }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(API_ENDPOINTS[options[selectedOption]], {
                        headers: { Authorization: API_TOKEN },
                    });
                    if (!response.ok) throw new Error('Failed to fetch data');
                    setData(await response.json());
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen, selectedOption, options]);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    return (
        <div
            ref={dropdownRef}
            className={`absolute w-[688px] h-[274px] border border-[#8338EC] rounded-[10px] bg-white px-[30px] py-[20px] transition-all duration-300 ease-out ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px] pointer-events-none'
            }`}
            style={{ top: position.top, left: position.left }}
        >
            <div className='py-[20px] h-[200px] font-normal'>
                {loading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <p className='text-red-500'>Error: {error}</p>
                ) : (
                    <DropdownContent
                        data={data}
                        selectedItems={selectedItems}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedOption={options[selectedOption]}
                    />
                )}
            </div>
            <DropdownFooter />
        </div>
    );
};

export default FilterDropdown;