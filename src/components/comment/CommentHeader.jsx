const CommentHeader = ({ commentCount }) => {
    return (
        <div className='flex items-center gap-[7px] mb-[40px]'>
            <div className='text-xl font-medium'>
                კომენტარები
            </div>
            <div className='px-[10px] py-[1px] text-white rounded-[30px] bg-[#8338EC] text-sm'>
                {commentCount}
            </div>
        </div>
    );
};

export default CommentHeader;