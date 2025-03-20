import React from 'react';

const SubComment = ({ subComment }) => {
    return (
        <div className='reply_comment flex gap-[12px] mt-[20px]'>
            <img
                src={subComment.author_avatar}
                alt='author avatar'
                className='w-[38px] h-[38px] rounded-full'
            />
            <div className='reply_comment_data'>
                <div className='flex flex-col gap-[8px]'>
                    <div className='text-[18px]'>
                        {subComment.author_nickname}
                    </div>
                    <div className='text-[#343A40] w-[548px]'>
                        {subComment.text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubComment;