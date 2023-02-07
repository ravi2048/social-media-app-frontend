import { useContext, useState } from "react";
import "./Comments.scss";
import { AuthUserContext } from "../../context/authUserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from 'moment';

const Comments = ({postId}) => {
    const { currUser } = useContext(AuthUserContext);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const {data, error, isLoading } = useQuery(["comments"], () => {
        return makeRequest.get(`/comments/${postId}`).then(res => {
            return res.data;
        })
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newCommentObj) => {
            setLoading(true);
            return makeRequest.post(`/comments/addComment/${postId}`, newCommentObj);
        },
        {
            onSuccess: () => {
                // refetch the posts to render updated data
                // invalidate the stale api and refetch
                queryClient.invalidateQueries(["comments"]);
                queryClient.invalidateQueries(["commentsCount"]);
                setLoading(false);
                setNewComment('');
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newComment === "") {
            alert('Please enter the comment');
            return;
        }
        mutation.mutate({
            desc: newComment,
            userId: currUser.id
        });
    }


    return (
        <div className='comments'>
            <div className='write'>
                <img src={currUser.profilePic} alt='' />
                <input type='text' placeholder='write a comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button onClick={handleSubmit}>{loading ? 'Sending..' : 'Send'}</button>
            </div>
            {error ? (
                "Something went wrong"
            ) : !isLoading ? (
                data.map((comment) => (
                    <div className='comment' key={comment.id}>
                        <img src={comment.user.profilePic} alt='' />
                        <div className='info'>
                            <span>{comment.user.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                    </div>
                ))
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

export default Comments;
