import React from 'react';

const ReplyForm = ({
                       commentId,
                       replyCommentText,
                       setReplyCommentText,
                       onReplyCommentSubmit
                   }) => {
    const isReplyCommentDisabled = !replyCommentText.trim();

    return (
        <div className='w-full relative mb-[20px] transition-all duration-300 transform origin-top'>
            <textarea
                className='relative w-[650px] right-[50px] h-[135px] bg-white outline-none rounded-[10px] text-sm border border-[0.3px] border-[#ADB5BD] resize-none pt-[18px] pb-[15px] px-[20px] transition-all duration-300 transform origin-top'
                placeholder="დაწერე პასუხი"
                value={replyCommentText}
                onChange={(e) => setReplyCommentText(e.target.value)}
            />
            <button
                className='absolute bottom-[20px] right-[70px] px-[20px] py-[10px] text-white rounded-[20px] bg-[#8338EC] flex gap-1 items-center hover:bg-[#B588F4] cursor-pointer transition-all ease-out duration-300 disabled:cursor-not-allowed'
                onClick={() => {
                    onReplyCommentSubmit(commentId, replyCommentText);
                }}
                disabled={isReplyCommentDisabled}
            >
                დააკომენტარე
            </button>
        </div>
    );
};

export default ReplyForm;