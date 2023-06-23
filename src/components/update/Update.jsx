import { useContext, useState } from "react";
import "./Update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { AuthUserContext } from "../../context/authUserContext";

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);
    const [website, setWebsite] = useState(user.website);

    const { setCurrUser } = useContext(AuthUserContext);
    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    }

    const handleFileUpload = async(e) => {
        const file = e.target.files[0];
        if(file.size > 2097152) {
            alert('Please upload image of size less than 2MB');
            return;
        }
        e.target.id === 'cover' ? setCover(file): setProfile(file);        
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return axios.put(`${process.env.REACT_APP_API_HOST}/users`, user, config);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["user", user.id]);
            },
        }
    );

    const upload = async (img) => {
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
        e.preventDefault();
        let coverImg = cover ? cover : user.coverPic;
        let profileImg = profile ? profile : user.profilePic;

        let coverUrl = "";
        let profileUrl = "";
        if(coverImg) {
            coverUrl = await upload(coverImg);
        }
        if(profileImg) {
            profileUrl = await upload(profileImg);
        }

        const updatedUserInfo = {
            id: user.id,
            name: name,
            email: email,
            website: website,
            city: city,
            coverPic: coverUrl? coverUrl : user.coverPic,
            profilePic: profileUrl ? profileUrl : user.profilePic
        };

        mutation.mutate(updatedUserInfo);
        setCurrUser(updatedUserInfo);
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
        // localStorage.setItem('currUser', JSON.stringify(updatedUserInfo))
    }

    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={ cover ? URL.createObjectURL(cover) : `${process.env.REACT_APP_API_HOST}/files/${user.coverPic}` }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                        />
                        <label htmlFor="profile">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={ profile ? URL.createObjectURL(profile) : `${process.env.REACT_APP_API_HOST}/files/${user.profilePic}` }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                        />
                    </div>

                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Country / City</label>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};

export default Update;