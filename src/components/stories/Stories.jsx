import { useContext } from "react";
import "./Stories.scss";
import { AuthUserContext } from "../../context/authUserContext";

const Stories = () => {
    const { currUser } = useContext(AuthUserContext);

    //TEMPORARY
    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        {
            id: 5,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
        
        {
            id: 6,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];

    return (
        <div className='stories'>
            <div className='story'>
                <img src={`${process.env.REACT_APP_API_HOST}/files/${currUser.profilePic}`} alt='' />
                <span>{currUser.name}</span>
                <button>+</button>
            </div>
            {stories.map((story) => (
                <div className='story' key={story.id}>
                    <img src={story.img} alt='' />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
