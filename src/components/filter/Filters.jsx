import { useSelector, useDispatch } from "react-redux";
import { deleteFilter, setAppliedSelectedItems } from 'src/store/filterSlice';
import FilterTag from 'src/components/filter/FilterTag';
import { useState } from 'react';

const Filters = () => {
    const dispatch = useDispatch();
    const appliedSelectedItems = useSelector((state) => state.filter.appliedSelectedItems);
    const [itemsToRemove, setItemsToRemove] = useState({});

    const handleDeleteFilter = (category, itemId) => {
        setItemsToRemove(prev => ({
            ...prev,
            [`${category}-${itemId}`]: true
        }));

        setTimeout(() => {
            dispatch(deleteFilter({ category, itemId }));

            setItemsToRemove(prev => {
                const updated = {...prev};
                delete updated[`${category}-${itemId}`];
                return updated;
            });
        }, 300);
    };

    const handleDeleteAllFilters = () => {
        const allItems = {};
        Object.keys(appliedSelectedItems).forEach((category) => {
            appliedSelectedItems[category]?.forEach(item => {
                allItems[`${category}-${item.id}`] = true;
            });
        });
        setItemsToRemove(allItems);

        setTimeout(() => {
            Object.keys(appliedSelectedItems).forEach((category) => {
                dispatch(setAppliedSelectedItems({
                    category,
                    items: []
                }));
            });
            setItemsToRemove({});
        }, 300);
    };

    const hasFilters = Object.keys(appliedSelectedItems).some(
        category => appliedSelectedItems[category] && appliedSelectedItems[category].length > 0
    );

    if (!hasFilters) {
        return (
            <div className='h-[78px] flex justify-between items-center'>
            </div>
        );
    }

    return (
        <div className='h-[78px] flex justify-between items-center'>
            <div className='overflow-x-auto w-full'>
                <div className='flex items-center gap-2 min-w-max'>
                    {Object.keys(appliedSelectedItems).map(category => (
                        appliedSelectedItems[category] && appliedSelectedItems[category].map(item => {
                            const key = `${category}-${item.id}`;
                            const isRemoving = itemsToRemove[key];

                            return (
                                <div
                                    key={key}
                                    className={`transition-all duration-300 ease-in-out ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                                >
                                    <FilterTag
                                        name={category === 'თანამშრომელი' ? item.name + " " + item.surname : item.name}
                                        onDelete={() => handleDeleteFilter(category, item.id)}
                                    />
                                </div>
                            );
                        })
                    ))}
                    <button
                        className='text-[#343A40] text-sm font-normal cursor-pointer ml-2 transition-opacity duration-300 hover:opacity-75'
                        onClick={handleDeleteAllFilters}
                    >
                        გასუფთავება
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;