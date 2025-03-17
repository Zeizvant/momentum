import { useSelector, useDispatch } from "react-redux";
import { deleteFilter, setAppliedSelectedItems } from 'src/store/filterSlice';
import FilterTag from 'src/components/filter/FilterTag';

const Filters = () => {
    const dispatch = useDispatch();
    const appliedSelectedItems = useSelector((state) => state.filter.appliedSelectedItems);

    const handleDeleteFilter = (category, itemId) => {
        dispatch(deleteFilter({ category, itemId }));
    };

    const handleDeleteAllFilters = () => {
        Object.keys(appliedSelectedItems).forEach((category) => {
            dispatch(setAppliedSelectedItems({
                category,
                items: []
            }));
        });
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
                        appliedSelectedItems[category] && appliedSelectedItems[category].map(item => (
                            <FilterTag
                                key={`${category}-${item.id}`}
                                name={category === 'თანამშრომელი' ? item.name + " " + item.surname : item.name}
                                onDelete={() => handleDeleteFilter(category, item.id)}
                            />
                        ))
                    ))}
                    <button
                        className='text-[#343A40] text-sm font-normal cursor-pointer ml-2'
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