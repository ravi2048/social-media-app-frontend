import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import "./Profile.scss";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";
import { useState } from "react";
import Update from "../../components/update/Update";

const Profile = () => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [openUpdateModal, setOpenUpdate] = useState(false);

    const { currUser } = useContext(AuthUserContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { data, isLoading, error } = useQuery(["user", userId], () => {
        return makeRequest.get(`/users/${userId}`).then(res => {
            return res.data;
        });
    });


    const relationObj = useQuery(["relation", currUser.id, userId], () => {
        return makeRequest.get(`/relations?friendId=${userId}`).then(res => {
            return res.data;
        })
    });
    // {"status":"success","fetchStatus":"idle","isLoading":false,"isSuccess":true,"isError":false,"isInitialLoading":false,"data":{"id":3,"userId":7,"friendId":3,"UserId":7},"dataUpdatedAt":1676184385312,"error":null,"errorUpdatedAt":0,"failureCount":0,"failureReason":null,"errorUpdateCount":0,"isFetched":true,"isFetchedAfterMount":true,"isFetching":false,"isRefetching":false,"isLoadingError":false,"isPaused":false,"isPlaceholderData":false,"isPreviousData":false,"isRefetchError":false,"isStale":true}


    // follow/unfollow
    const mutation = useMutation((followed) => {
        if(followed) {
            return makeRequest.delete(`/relations?friendId=${userId}`);
        } else {
            return makeRequest.post(`/relations?friendId=${userId}`);
        }
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["relation", currUser.id, userId]);
        }
    });

    const followHandler = async () => {
        setLoading(true);
        // check if loggedin user has followed this current user whos prfile is being viewed
        if(relationObj.data) {
            // already followed, unfollow
            mutation.mutate(true);
        } else {
            mutation.mutate(false);
        }
        setLoading(false);
    };

    return (
        <>
            {error ? <span>Something went wrong</span> : isLoading ? (
                <span>Loading...</span>
            ) : (
                <div className='profile'>
                    <div className='images'>
                        <img src={data.coverPic} alt='' className='cover' />
                        <img
                            src={data.profilePic}
                            alt=''
                            className='profilePic'
                        />
                    </div>
                    <div className='profileContainer'>
                        <div className='uInfo'>
                            <div className='left'>
                                <a href='http://facebook.com'>
                                    <FacebookTwoToneIcon fontSize='large' />
                                </a>
                                <a href='http://instagram.com'>
                                    <InstagramIcon fontSize='large' />
                                </a>
                                <a href='http://twitter.com'>
                                    <TwitterIcon fontSize='large' />
                                </a>
                                <a href='http://linkedin.com'>
                                    <LinkedInIcon fontSize='large' />
                                </a>
                                <a href='http://pinterest.com'>
                                    <PinterestIcon fontSize='large' />
                                </a>
                            </div>
                            <div className='center'>
                                <span>{data.name}</span>
                                <div className='info'>
                                    <div className='item'>
                                        <PlaceIcon />
                                        <span>{data.city}</span>
                                    </div>
                                    <div className='item'>
                                        <LanguageIcon />
                                        <span>{data.website}</span>
                                    </div>
                                </div>
                                {
                                    (currUser.id === userId) ? <button onClick={() => setOpenUpdate(true)}>Update</button>
                                    : (relationObj.data) ? <button onClick={followHandler}>{loading ? "Unfollowing..": "Unfollow"}</button>
                                    : <button onClick={followHandler}>{loading ? "Following..": "Follow"}</button>
                                }
                
                            </div>
                            <div className='right'>
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts userId={userId}/>
                        {openUpdateModal && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
