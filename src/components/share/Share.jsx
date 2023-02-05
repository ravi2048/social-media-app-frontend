import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthUserContext } from "../../context/authUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
    const { currUser } = useContext(AuthUserContext);
    const [img, setImg] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation((newPost) => {
            setLoading(true);
            return makeRequest.post("/posts/create", newPost);
        },
        {
            onSuccess: () => {
                // refetch the posts to render updated data
                // invalidate the stale api and refetch
                queryClient.invalidateQueries(["posts"]);
                setLoading(false);
                setDesc('');
                setImg('');
            }
        }
    );

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async(e) => {
        const file = e.target.files[0];
        if(file.size > 2097152) {
            alert('Please upload image of size less than 2MB');
            return;
        }
        const base64 = await convertToBase64(file);
        setImg(base64);
    };

    const handleClick = (e) => {
        if(desc === '') {
            alert('Please enter your post description');
            return;
        }
        e.preventDefault();
        mutation.mutate({desc, img});
    };

    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <div className="left">
                        <img src={currUser.profilePic} alt='profileImg' />
                        <input
                            type='text'
                            placeholder={`What's on your mind ${currUser.name.split(" ")[0]}?`}
                            onChange={e => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {img && <img alt="chosenImg" src={img}/>}
                    </div>
                </div>
                <hr />
                <div className='bottom'>
                    <div className='left'>
                        <input
                            type='file'
                            id='file'
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                            accept=".jpg, .png, .jpeg, .svg"
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
                        <button onClick={handleClick} disabled={loading}>{loading ? 'Posting..': 'Post'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
