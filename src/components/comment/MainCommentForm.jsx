import React, { useState } from 'react';

const MainCommentForm = ({ onMainCommentSubmit }) => {
    const [mainCommentText, setMainCommentText] = useState('');
    const isMainCommentDisabled = !mainCommentText.trim();

    return (
        <div className='w-full relative mb-[66px]'>
            <textarea
                className='w-full h-[135px] bg-white outline-none rounded-[10px] text-sm border border-[0.3px] border-[#ADB5BD] resize-none pt-[18px] pb-[15px] px-[20px]'
                placeholder="დაწერე კომენტარი"
                value={mainCommentText}
                onChange={(e) => setMainCommentText(e.target.value)}
            />
            <button
                className='absolute bottom-[20px] right-[20px] px-[20px] py-[10px] text-white rounded-[20px] bg-[#8338EC] flex gap-1 items-center hover:bg-[#B588F4] cursor-pointer transition-all ease-out duration-300 disabled:cursor-not-allowed'
                onClick={() => {
                    onMainCommentSubmit(mainCommentText);
                    setMainCommentText('');
                }}
                disabled={isMainCommentDisabled}
            >
                დააკომენტარე
            </button>
        </div>
    );
};

export default MainCommentForm;