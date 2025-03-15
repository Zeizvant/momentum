const ListingHeader = ({ text, bgColor }) => {
    return (
        <div
            className={`w-[381px] h-[54px] flex justify-center items-center rounded-[10px] text-white text-xl font-medium cursor-pointer ${bgColor}`}
        >
            {text}
        </div>
    );
};

export default ListingHeader;