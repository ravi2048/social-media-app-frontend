import { useState } from "react";
import { makeRequest } from "../../axios";
import "./Update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext } from "react";
import { AuthUserContext } from "../../context/authUserContext";

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);
    const [website, setWebsite] = useState(user.website);
    const { setCurrUser } = useContext(AuthUserContext);

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
        if(e.target.id === 'cover') {
            setCover(base64);
        }
        if(e.target.id === 'pofile') {
            setProfile(base64);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["user", user.id]);
                console.log(`after onsuccess hook ${JSON.stringify(user)}`);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;
        coverUrl = cover ? cover : user.coverPic;
        profileUrl = profile ? profile : user.profilePic;

        mutation.mutate({ name: name, email: email, website: website, city: city, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
        setCover(null);
        setProfile(null);
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
                                    src={ cover ? cover : user.coverPic }
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
                                    src={ profile ? profile : user.profilePic }
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