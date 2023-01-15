import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
import { DarkThemeContext } from "../../context/themeContext";
import { AuthUserContext } from "../../context/authUserContext";

export default function Navbar() {
    const { darkMode, toggleTheme } = useContext(DarkThemeContext);
    const { currUser } = useContext(AuthUserContext);

    return (
        <div className='navbar'>
            <div className='left-section'>
                <Link style={{ textDecoration: "none" }} to='/home'>
                    <span>Reactbook</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggleTheme} />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggleTheme} />
                )}
                <GridViewOutlinedIcon />
                <div className='search'>
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search...' />
                </div>
            </div>
            <div className='right-section'>
                <PersonOutlineOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className='user-icon'>
                    <img
                        alt='user-icon'
                        src={currUser.profilePic}
                    />
                    <span>{currUser.name}</span>
                </div>
            </div>
        </div>
    );
}
