import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
// import { DarkThemeContext } from "../../context/themeContext";
import { AuthUserContext } from "../../context/authUserContext";
import appIcon from "../../assets/app-icon.png";

export default function Navbar() {
    // const { darkMode, toggleTheme } = useContext(DarkThemeContext);
    const { currUser } = useContext(AuthUserContext);

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
                <Link
                    to={`/profile/${currUser.id}`}
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    <div className='user-icon'>
                        <img
                            alt='user-icon'
                            src={`${process.env.REACT_APP_API_HOST}/files/${currUser.profilePic}`}
                        />
                        <span style={{textTransform: "capitalize"}}>{currUser.name}</span>
                    </div>
                </Link>

            </div>
        </div>
    );
}
