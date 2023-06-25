import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useContext, useState } from "react";
// import { DarkThemeContext } from "../../context/themeContext";
import { AuthUserContext } from "../../context/authUserContext";
import appIcon from "../../assets/app-icon.png";

export default function Navbar() {
    // const { darkMode, toggleTheme } = useContext(DarkThemeContext);
    const { currUser } = useContext(AuthUserContext)
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currUser");
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <div className='navbar'>
            <div className='left-section'>
                <Link className="app-icon" style={{ textDecoration: "none" }} to='/'>
                    <img src={appIcon} alt="app-logo"/>
                    <span>reactSocial</span>
                </Link>
                <HomeOutlinedIcon/>
                {/* {darkMode ? (
                    <WbSunnyOutlinedIcon style={{ cursor: "pointer" }} onClick={toggleTheme} />
                ) : (
                    <DarkModeOutlinedIcon style={{ cursor: "pointer" }} onClick={toggleTheme} />
                )} */}
                <GridViewOutlinedIcon />
                <div className='search'>
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search...' />
                </div>
            </div>
            <div className='right-section'>
                {/* <PersonOutlineOutlinedIcon /> */}
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                    <div className='user-icon' onClick={() => setShowProfilePanel(!showProfilePanel)}>
                        <div className="on-navbar">
                            <img
                                alt='user-icon'
                                src={`${process.env.REACT_APP_API_HOST}/files/${currUser?.profilePic}`}
                            />
                            <span style={{textTransform: "capitalize"}}>{currUser?.name}</span>
                        </div>
                        
                        {showProfilePanel ? 
                            <div className="profile-panel">
                                <div className="profile-link">
                                    <Link
                                        to={`/profile/${currUser?.id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        View Profile
                                    </Link>
                                </div>
                                <div className="logout-link" onClick={() => handleLogout()}>Logout</div>
                            </div>
                        : null}
                    </div>
            </div>
        </div>
    );
}
