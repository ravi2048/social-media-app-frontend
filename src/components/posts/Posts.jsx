import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";
import Post from "../post/Post";
import "./Posts.scss";

const Posts = ({userId}) => {
    const { token } = useContext(AuthUserContext);
    const { data, error, isLoading } = useQuery(["posts", userId], () => {
        const config = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        if(userId) {
            return axios.get(`${process.env.REACT_APP_API_HOST}/posts/user-posts/${userId}`, config).then(res => {
                return res.data;
            });
        } else {
            return axios.get(`${process.env.REACT_APP_API_HOST}/posts/all-posts`, config).then(res => {
                return res.data;
            });
        }
    });

    return (
        <div className='posts'>
            {error ? (
                "Something went wrong"
            ) : !isLoading ? (
                data.map((post) => <Post post={post} key={post?.id} />)
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

export default Posts;
