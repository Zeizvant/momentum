import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINTS, API_TOKEN } from 'src/config/api.js';
import DropdownContent from 'src/components/filter/filter-dropdown/DropdownContent.jsx';
import DropdownFooter from 'src/components/filter/filter-dropdown/DropdownFooter.jsx';
import SkeletonLoader from 'src/components/filter/filter-dropdown/SkeletonLoader.jsx';
import { setAppliedSelectedItems } from 'src/store/filterSlice';

const FilterDropdown = ({
                            isOpen,
                            dropdownRef,
                            position,
                            options,
                            selectedOption,
                            setOpenDropdown,
                        }) => {
    const dispatch = useDispatch();
    const appliedSelectedItems = useSelector((state) => state.filter.appliedSelectedItems);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [temporarySelectedItems, setTemporarySelectedItems] = useState([]);

    const currentCategory = options[selectedOption];
    const categorySelectedItems = appliedSelectedItems[currentCategory] || [];

    const isEmployeeCategory = currentCategory === 'თანამშრომელი';

    useEffect(() => {
        if (isOpen) {
            setTemporarySelectedItems(categorySelectedItems);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(API_ENDPOINTS[currentCategory], {
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
    }, [isOpen, currentCategory]);

    const handleCheckboxChange = (item) => {
        setTemporarySelectedItems((prev) => {
            const existingItemIndex = prev.findIndex(selectedItem => selectedItem.id === item.id);

            if (existingItemIndex >= 0) {
                return prev.filter(selectedItem => selectedItem.id !== item.id);
            } else {
                if (isEmployeeCategory) {
                    return [{ id: item.id, name: item.name }];
                }
                return [...prev, { id: item.id, name: item.name }];
            }
        });
    };

    const handleApplySelection = () => {
        dispatch(
            setAppliedSelectedItems({
                category: currentCategory,
                items: temporarySelectedItems,
            })
        );
        setOpenDropdown(null);
    };

    if (!isOpen) return null;

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
                        selectedItems={temporarySelectedItems}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedOption={currentCategory}
                    />
                )}
            </div>
            <DropdownFooter onApply={handleApplySelection} />
        </div>
    );
};

export default FilterDropdown;