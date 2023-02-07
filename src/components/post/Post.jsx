import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from 'moment';
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    let likesCount = 0;
    let commentsCount = 0;

    const likesObj = useQuery(["likes"], () => {
        return makeRequest.get(`/likes/${post.id}`, (res) => {
            return res.data;
        })
    });
    const commentsObj = useQuery(["commentsCount"], () => {
        return makeRequest.get(`/comments/count/${post.id}`, (res) => {
            return res.data;
        })
    });
    if(!likesObj.isLoading) {
        likesCount = likesObj.data.data;
    }
    if(!commentsObj.isLoading) {
        commentsCount = commentsObj.data.data;
    }
    console.log(`likesObj: ${JSON.stringify(likesObj.data)}`);
    //TEMPORARY
    const liked = true;

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
                    <MoreHorizIcon />
                </div>
                <div className='content'>
                    <p>{post.desc}</p>
                    <img src={post.img} alt='' />
                </div>
                <div className='info'>
                    <div className='item'>
                        {liked ? (
                            <FavoriteOutlinedIcon style={{color:"red"}}/>
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
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    );
};

export default Post;
