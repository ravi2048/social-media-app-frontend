import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Register.scss";

export default function Register() {
    const backendUrl = 'http://localhost:8800/auth';
    const defaultInputs = {
        username: "",
        email: "",
        password: "",
        name: ""
    };

    const [inputs, setInputs] = useState(defaultInputs);
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
        setErr(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs.username === "" || inputs.email === "" || inputs.password === "" || inputs.name === "") {
            setErr('Please fill all the fields!');
            return;
        }

        try {
            await axios.post(`${backendUrl}/register`, inputs);
            setErr(null);
            setInputs(defaultInputs);
        } catch (error) {
            const errorContainer = error.response.data;

            // check email validation seperately
            if(typeof errorContainer === "object" && errorContainer !== null) {
                setErr(error.response.data.error);
            } else {
                setErr(error.response.data);
            }
        }
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
                        <button onClick={handleSubmit}>Register</button>
                    </form>
                </div>
                <div className='right-section'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <span>Already have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
