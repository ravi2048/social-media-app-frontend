import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from 'moment';
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUserContext } from "../../context/authUserContext";

const Post = ({ post }) => {
    const { currUser } = useContext(AuthUserContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [openPostActionMenu, setOpenPostActionMenu] = useState(false);
    const queryClient = useQueryClient();
    let likesCount = 0;
    let commentsCount = 0;

    
    // fetch likes
    const likesObj = useQuery(["likesCount", post.id], () => {
        return makeRequest.get(`/likes/${post.id}`).then(res => {
            return res.data;
        });
    });
    if(!likesObj.isLoading) {
        likesCount = likesObj.data.length;
    }

    // fetch comments
    const commentsObj = useQuery(["commentsCount", post.id], () => {
        return makeRequest.get(`/comments/count/${post.id}`).then(res => {
            return res.data;
        });
    });
    if(!commentsObj.isLoading) {
        commentsCount = commentsObj.data;
    }


    // add/delete like mutation
    const mutation = useMutation((isLiked) => {
        if(!isLiked) {
            const newLikeObj = {
                postId: post.id,
                userId: currUser.id
            }
            return makeRequest.post(`/likes/${post.id}`, newLikeObj);
        } else {
            return makeRequest.delete(`/likes/${post.id}`);
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["likesCount", post.id]);
        }
    });


    const likesHandler = async() => {
        const isLiked = likesObj.data.includes(currUser.id);
        mutation.mutate(isLiked);
    };

    const deleteMutation = useMutation((postId) => {
        return makeRequest.delete(`/posts/${postId}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const postDeleteHandler = async () => {
        deleteMutation.mutate(post.id);
    }

    return (
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={post.user.profilePic} alt='' />
                        <div className='details'>
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span className='name'>{post.user.name}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
                        </div>
                    </div>
                    {(currUser.id === post.userId) && <MoreHorizIcon style={{cursor: "pointer"}} onClick={() => setOpenPostActionMenu(!openPostActionMenu)}/>}
                    {openPostActionMenu && <button onClick={postDeleteHandler}>Delete</button>}
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    <img src={post.img} alt='' />
                </div>
                <div className='info'>
                    <div className='item' onClick={likesHandler}>
                        { !likesObj.isLoading && likesObj.data.includes(currUser.id) ? (
                            <FavoriteOutlinedIcon style={{color:"red"}}/>
                        ) : (
                            <FavoriteBorderOutlinedIcon/>
                        )}
                        {likesCount} Likes
                    </div>
                    <div
                        className='item'
                        onClick={() => setCommentOpen(!commentOpen)}
                    >
                        <TextsmsOutlinedIcon />
                        {commentsCount} Comments
                    </div>
                    <div className='item'>
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    );
};

export default Post;
