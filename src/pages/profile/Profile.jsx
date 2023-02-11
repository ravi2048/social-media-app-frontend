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
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";

const Profile = () => {
    const { currUser } = useContext(AuthUserContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);
    const { data, isLoading, error } = useQuery(["user"], () => {
        return makeRequest.get(`/users/${userId}`).then(res => {
            return res.data;
        });
    });

    return (
        <>
            {isLoading ? (
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
                                    (currUser.id === userId) ? <button>Update</button>
                                    : <button>follow</button>
                                }
                
                            </div>
                            <div className='right'>
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts />
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
