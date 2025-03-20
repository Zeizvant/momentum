import React, { useState } from 'react';
import MainCommentForm from 'src/components/comment/MainCommentForm';
import CommentsList from 'src/components/comment/CommentsList';
import CommentHeader from "src/components/comment/CommentHeader";

const CommentSection = ({ comments, onMainCommentSubmit, onReplyCommentSubmit }) => {
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyCommentText, setReplyCommentText] = useState('');

    const toggleReply = (commentId) => {
        setReplyingTo(replyingTo === commentId ? null : commentId);
    };

    const handleReplySubmit = (commentId, text) => {
        onReplyCommentSubmit(commentId, text);
        setReplyCommentText('');
        setReplyingTo(null);
    };

    return (
        <div className='w-[741px] bg-[#F8F3FEA6] border border-[0.3px] border-[#DDD2FF] rounded-10px px-[45px] pt-[40px] pb-[50px] font-[FiraGO]'>
            <MainCommentForm onMainCommentSubmit={onMainCommentSubmit} />

            <CommentHeader commentCount={comments.length} />

            <CommentsList
                comments={comments}
                replyingTo={replyingTo}
                toggleReply={toggleReply}
                replyCommentText={replyCommentText}
                setReplyCommentText={setReplyCommentText}
                onReplyCommentSubmit={handleReplySubmit}
            />
        </div>
    );
};

export default CommentSection;