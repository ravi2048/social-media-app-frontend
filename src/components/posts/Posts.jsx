import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./Posts.scss";

const Posts = ({userId}) => {
    const { data, error, isLoading } = useQuery(["posts", userId], () => {
        if(userId) {
            return makeRequest.get(`/posts/user-posts/${userId}`).then(res => {
                return res.data;
            });
        } else {
            return makeRequest.get("/posts/all-posts").then(res => {
                return res.data;
            });
        }
    });

    return (
        <div className='posts'>
            {error ? (
                "Something went wrong"
            ) : !isLoading ? (
                data.map((post) => <Post post={post} key={post.id} />)
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

export default Posts;
