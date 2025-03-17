const SkeletonLoader = () => (
    <div className='space-y-4'>
        {[...Array(4)].map((_, index) => (
            <div key={index} className='flex items-center space-x-2'>
                <div className='w-5 h-5 bg-gray-200 rounded-[6px]'></div>
                <div className='w-24 h-5 bg-gray-200 rounded'></div>
            </div>
        ))}
    </div>
);
export default SkeletonLoader;