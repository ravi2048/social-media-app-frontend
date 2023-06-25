import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Register.scss";
import { AuthUserContext } from "../../context/authUserContext";

export default function Register() {
    const navigate = useNavigate();
    const { setCurrUser } = useContext(AuthUserContext);

    const defaultInputs = {
        username: "",
        email: "",
        password: "",
        name: ""
    };

    const [inputs, setInputs] = useState(defaultInputs);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
        setErr(null);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(inputs.username === "" || inputs.email === "" || inputs.password === "" || inputs.name === "") {
            setErr('Please fill all the fields!');
            setLoading(false);
            return;
        }

        try {
            const newUser = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/register`, inputs);
            // localStorage.setItem("currUser", JSON.stringify(newUser.data));
            setCurrUser(newUser.data.userInfo);
            localStorage.setItem("accessToken", newUser.data.accessToken);
            // setToken(newUser.data.accessToken);
            setErr(null);
            setInputs(defaultInputs);
            navigate('/');
        } catch (error) {
            const errorContainer = error.response.data;

            // check email validation seperately
            if(typeof errorContainer === "object" && errorContainer !== null) {
                setErr(error.response.data.error);
            } else {
                setErr(error.response.data);
            }
        }
        setLoading(false);
    }

    return (
        <div className='register'>
            <div className='card'>
                <div className='left-section'>
                    <h1>Register</h1>
                    <form>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            onChange={handleChange}
                        />
                        <input name='email' type='email' placeholder='Email' onChange={handleChange} />
                        <input
                            name='password'
                            type='password'
                            placeholder='Password'
                            onChange={handleChange}
                        />
                        <input
                            name='name'
                            type='text'
                            placeholder='Full Name'
                            onChange={handleChange}
                        />
                        {err && <span>{err}</span>}
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'On it...' : 'Register'}
                        </button>
                        <span>Already have an account? &nbsp;
                        <Link to="/login">
                            Login
                        </Link>
                        </span>
                    </form>
                </div>
                <div className='right-section'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    );
}
