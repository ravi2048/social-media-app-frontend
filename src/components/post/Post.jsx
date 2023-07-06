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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUserContext } from "../../context/authUserContext";
import axios from "axios";

const Post = ({ post }) => {
    const { currUser } = useContext(AuthUserContext);
    const [commentOpen, setCommentOpen] = useState(false);
    const [openPostActionMenu, setOpenPostActionMenu] = useState(false);
    const queryClient = useQueryClient();
    let likesCount = 0;
    let commentsCount = 0;
    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    }

    // fetch likes
    const likesObj = useQuery(["likesCount", post?.id], () => {
        return axios.get(`${process.env.REACT_APP_API_HOST}/likes/${post?.id}`, config).then(res => {
            return res.data;
        });
    });
    if(!likesObj.isLoading) {
        likesCount = likesObj.data.length;
    }

    // fetch comments
    const commentsObj = useQuery(["commentsCount", post?.id], () => {
        return axios.get(`${process.env.REACT_APP_API_HOST}/comments/count/${post?.id}`, config).then(res => {
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
                postId: post?.id,
                userId: currUser?.id
            }
            return axios.post(`${process.env.REACT_APP_API_HOST}/likes/${post?.id}`, newLikeObj, config);
        } else {
            return axios.delete(`${process.env.REACT_APP_API_HOST}/likes/${post?.id}`, config);
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["likesCount", post?.id]);
        }
    });


    const likesHandler = async() => {
        const isLiked = likesObj.data.includes(currUser?.id);
        mutation.mutate(isLiked);
    };

    const deleteMutation = useMutation((postId) => {
        return axios.delete(`${process.env.REACT_APP_API_HOST}/posts/${postId}`, config);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    });

    const postDeleteHandler = async () => {
        deleteMutation.mutate(post?.id);
    }

    return (
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={`${process.env.REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL}/${post.user?.profilePic}`} alt='' />
                        <div className='details'>
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span className='name'>{post.user?.name}</span>
                            </Link>
                            <span className='date'>
                                {moment(
                                    post.createdAt,
                                    "YYYY-MM-DD HH:mm:ss"
                                ).fromNow()}
                            </span>
                        </div>
                    </div>
                    {currUser?.id === post?.userId && (
                        <MoreHorizIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setOpenPostActionMenu(!openPostActionMenu)
                            }
                        />
                    )}
                    {openPostActionMenu && (
                        <div className="delete-post" onClick={postDeleteHandler}>
                            Delete
                        </div>
                    )}
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    {post.img && (
                        <img
                            src={`${process.env.REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL}/${post.img}`}
                            alt=''
                        />
                    )}
                </div>
                <div className='info'>
                    <div className='item' onClick={likesHandler}>
                        {!likesObj.isLoading &&
                        likesObj.data.includes(currUser?.id) ? (
                            <FavoriteOutlinedIcon style={{ color: "red" }} />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
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
                {commentOpen && <Comments postId={post?.id} commentsCount={commentsCount} />}
            </div>
        </div>
    );
};

export default Post;
