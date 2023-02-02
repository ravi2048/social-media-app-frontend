import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";

const Share = () => {
    // const { currentUser } = useContext(AuthUserContext);
    const currentUser = {
        id: 1,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
        name: "John Doe",
        userId: 1,
        profilePicture:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    };
    
    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <img src={currentUser.profilePic} alt='' />
                    <input
                        type='text'
                        placeholder={`What's on your mind ${currentUser.name}?`}
                    />
                </div>
                <hr />
                <div className='bottom'>
                    <div className='left'>
                        <input
                            type='file'
                            id='file'
                            style={{ display: "none" }}
                        />
                        <label htmlFor='file'>
                            <div className='item'>
                                <img src={Image} alt='' />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className='item'>
                            <img src={Map} alt='' />
                            <span>Add Place</span>
                        </div>
                        <div className='item'>
                            <img src={Friend} alt='' />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className='right'>
                        <button>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
