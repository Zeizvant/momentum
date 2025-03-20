import React from 'react';
import Comment from 'src/components/comment/Comment.jsx';

const CommentsList = ({
                          comments,
                          replyingTo,
                          toggleReply,
                          replyCommentText,
                          setReplyCommentText,
                          onReplyCommentSubmit
                      }) => {
    return (
        <div className='flex flex-col gap-[38px] comments'>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    isReplying={replyingTo === comment.id}
                    toggleReply={toggleReply}
                    replyCommentText={replyCommentText}
                    setReplyCommentText={setReplyCommentText}
                    onReplyCommentSubmit={onReplyCommentSubmit}
                />
            ))}
        </div>
    );
};

export default CommentsList;