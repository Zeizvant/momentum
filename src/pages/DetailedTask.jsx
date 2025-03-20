import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS, API_TOKEN } from 'src/config/api.js';
import TaskDetails from 'src/components/TaskDetails'
import CommentSection from 'src/components/CommentSection'

const DetailedTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    API_ENDPOINTS.tasks + "/" + id,
                    {
                        headers: { Authorization: API_TOKEN },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch task details. Status: ${response.status}`);
                }

                const data = await response.json();
                setTask(data);
            } catch (err) {
                console.error('Error fetching task details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(
                    API_ENDPOINTS.taskComments(id),
                    {
                        headers: { Authorization: API_TOKEN },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch comments. Status: ${response.status}`);
                }

                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error('Error fetching comments:', err);
            }
        };

        if (id) {
            fetchTaskDetails();
            fetchComments();
        }
    }, [id]);

    const handleMainCommentSubmit = async (text) => {
        try {
            const response = await fetch(
                API_ENDPOINTS.taskComments(id),
                {
                    method: 'POST',
                    headers: {
                        'Authorization': API_TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to post comment. Status: ${response.status}`);
            }

            const newComment = await response.json();
            setComments([newComment, ...comments]);
        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Failed to post comment. Please try again.');
        }
    };

    const handleReplyCommentSubmit = async (parentId, text) => {
        try {
            const response = await fetch(
                API_ENDPOINTS.taskComments(id),
                {
                    method: 'POST',
                    headers: {
                        'Authorization': API_TOKEN,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text,
                        parent_id: parentId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to post reply. Status: ${response.status}`);
            }

            const newReply = await response.json();

            const updatedComments = comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        sub_comments: [...(comment.sub_comments || []), newReply],
                    };
                }
                return comment;
            });

            setComments(updatedComments);
        } catch (err) {
            console.error('Error posting reply:', err);
            alert('Failed to post reply. Please try again.');
        }
    };

    if (loading) {
        return <div className='w-full max-w-[1920px] px-[120px] mt-[40px] font-[FiraGO]'>Loading...</div>;
    }

    if (error) {
        return <div className='w-full max-w-[1920px] px-[120px] mt-[40px] font-[FiraGO]'>Error: {error}</div>;
    }

    if (!task) {
        return <div className='w-full max-w-[1920px] px-[120px] mt-[40px] font-[FiraGO]'>No task found</div>;
    }

    return (
        <div className='w-full max-w-[1920px] px-[120px] mt-[40px] font-[FiraGO]'>
            <div className='flex justify-between'>
                <TaskDetails task={task} />
                <CommentSection
                    comments={comments}
                    onMainCommentSubmit={handleMainCommentSubmit}
                    onReplyCommentSubmit={handleReplyCommentSubmit}
                />
            </div>
        </div>
    );
};

export default DetailedTask;