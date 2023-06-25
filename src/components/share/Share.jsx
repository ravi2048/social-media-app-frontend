import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthUserContext } from "../../context/authUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Share = () => {
    const { currUser, token } = useContext(AuthUserContext);
    const [img, setImg] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    }
    const queryClient = useQueryClient();
    // create new post
    const mutation = useMutation((newPost) => {
            setLoading(true);
            return axios.post(`${process.env.REACT_APP_API_HOST}/posts/create`, newPost, config);
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

    // uploading base64 file string is expansive, using server disk
    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // };

    const handleFileUpload = async(e) => {
        const file = e.target.files[0];
        if(file.size > 2097152) {
            alert('Please upload image of size less than 2MB');
            return;
        }
        // const base64 = await convertToBase64(file);
        setImg(file);
    };

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", img);
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/upload`, formData, config);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (e) => {
        if(desc === '') {
            alert('Please enter your post description');
            return;
        }
        e.preventDefault();
        let imgUrl = "";
        if(img) {
            imgUrl = await upload();
        }
        mutation.mutate({desc, img: imgUrl});
    };

    return (
        <div className='share'>
            <div className='container'>
                <div className='top'>
                    <div className="left">
                        <img src={`${process.env.REACT_APP_API_HOST}/files/${currUser?.profilePic}`} alt='profileImg' />
                        <input
                            type='text'
                            placeholder={`What's on your mind ${currUser?.name.split(" ")[0]}?`}
                            onChange={e => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {img && <img alt="chosenImg" src={URL.createObjectURL(img)}/>}
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
