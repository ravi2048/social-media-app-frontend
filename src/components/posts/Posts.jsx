import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./Posts.scss";

const Posts = () => {
    const { data, error, isLoading } = useQuery(["posts"], () => {
        return makeRequest.get("/posts/all-posts").then(res => {
            return res.data;
        })
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
