import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import "./Profile.scss";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";
import { useState } from "react";
import Update from "../../components/update/Update";
import axios from "axios";

const Profile = () => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [openUpdateModal, setOpenUpdate] = useState(false);

    const { currUser } = useContext(AuthUserContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    }

    const { data, isLoading, error } = useQuery(["user", userId], () => {
        return axios.get(`${process.env.REACT_APP_API_HOST}/users/${userId}`, config).then((res) => {
            return res.data;
        })
    });

    const relationObj = useQuery(["relation", currUser?.id, userId], () => {
        return axios.get(`${process.env.REACT_APP_API_HOST}/relations?friendId=${userId}`, config).then((res) => {
            return res.data;
        });
    });

    // follow/unfollow
    const mutation = useMutation(
        (followed) => {
            if (followed) {
                return axios.delete(`${process.env.REACT_APP_API_HOST}/relations`, {friendId: userId}, config);
            } else {
                return axios.post(`${process.env.REACT_APP_API_HOST}/relations`, {friendId: userId}, config);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "relation",
                    currUser?.id,
                    userId,
                ], ["user", userId]);
            },
        }
    );

    const followHandler = async () => {
        setLoading(true);
        if(!relationObj) {
            return;
        }
        // check if loggedin user has followed this current user whos prfile is being viewed
        if (relationObj.data) {
            // already followed, unfollow
            mutation.mutate(true);
        } else {
            mutation.mutate(false);
        }
        setLoading(false);
    };

    const userData = currUser?.id == userId ? currUser : data;
    return (
        <>
            {error ? (
                <span>Something went wrong</span>
            ) : isLoading ? (
                <span>Loading...</span>
            ) : (
                <div className='profile'>
                    <div className='images'>
                        <img src={`${process.env.REACT_APP_API_HOST}/files/${userData.coverPic}`} alt='' className='cover' />
                        <img
                            src={`${process.env.REACT_APP_API_HOST}/files/${userData?.profilePic}`}
                            alt=''
                            className='profilePic'
                        />
                    </div>
                    <div className='profileContainer'>
                        <div className='uInfo'>
                            <div className='user-name'>
                                <span>{userData?.name}</span>
                            </div>
                            <div className='other-info'>
                                <div className='left'>
                                    <div className='item'>
                                        <EmailOutlinedIcon />
                                        <span>{userData.email}</span>
                                    </div>
                                    <div className='item'>
                                        <PlaceIcon />
                                        <span>{userData.city}</span>
                                    </div>
                                    <div className='item'>
                                        <LanguageIcon />
                                        <span>{userData.website}</span>
                                    </div>
                                </div>
                                <div className='right'>
                                    {currUser?.id == userId ? (
                                        <button
                                            onClick={() => setOpenUpdate(true)}
                                        >
                                            Update
                                        </button>
                                    ): (relationObj.data ? (
                                        <button onClick={followHandler}>
                                            {loading
                                                ? "Unfollowing.."
                                                : "Unfollow"}
                                        </button>
                                    ) : (
                                        <button onClick={followHandler}>
                                            {loading ? "Following.." : "Follow"}
                                        </button>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                        <Posts userId={userId} />
                        {openUpdateModal && (
                            <Update setOpenUpdate={setOpenUpdate} user={userData} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
