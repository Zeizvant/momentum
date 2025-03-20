import React from 'react';
import ReplyIcon from "src/assets/reply.svg?react";
import ReplyForm from 'src/components/comment/ReplyForm';
import SubComment from 'src/components/comment/SubComment'

const Comment = ({
                     comment,
                     isReplying,
                     toggleReply,
                     replyCommentText,
                     setReplyCommentText,
                     onReplyCommentSubmit
                 }) => {
    return (
        <div className='flex gap-[12px] comment'>
            <img
                src={comment.author_avatar}
                alt='author avatar'
                className='w-[38px] h-[38px] rounded-full'
            />
            <div>
                <div className='flex flex-col gap-[8px]'>
                    <div className='text-[18px]'>
                        {comment.author_nickname}
                    </div>
                    <div className='text-[#343A40] w-[548px]'>
                        {comment.text}
                    </div>
                    <div className='flex items-center gap-[6px] mt-[10px] mb-[20px]'>
                        <ReplyIcon className="cursor-pointer" />
                        <div
                            className='text-xs text-[#8338EC] text-normal cursor-pointer hover:text-[#B588F4]'
                            onClick={() => toggleReply(comment.id)}
                        >
                            უპასუხე
                        </div>
                    </div>
                </div>

                {isReplying && (
                    <ReplyForm
                        commentId={comment.id}
                        replyCommentText={replyCommentText}
                        setReplyCommentText={setReplyCommentText}
                        onReplyCommentSubmit={onReplyCommentSubmit}
                    />
                )}

                {(comment.sub_comments || []).map(subComment => (
                    <SubComment key={subComment.id} subComment={subComment} />
                ))}
            </div>
        </div>
    );
};

export default Comment;