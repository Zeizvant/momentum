import CategoryFilter from "src/components/filter/CategoryFilter.jsx";
import Listing from "src/components/listing/Listing.jsx";

const AddedTasks = () => {
    return (
        <div className="w-full max-w-[1920px] px-[120px]">
            <h1 className='text-[#212529] font-semibold text-[34px] my-[40px]'>დავალებების გვერდი</h1>
            <CategoryFilter />
            <Listing />
        </div>
    );
}

export default AddedTasks;