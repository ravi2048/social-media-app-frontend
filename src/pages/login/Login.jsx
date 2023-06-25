import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context/authUserContext";
import "./Login.scss";

export default function Login(){
    const { login } = useContext(AuthUserContext);
    const navigate = useNavigate();
    const defaultInputs = {
        username: "",
        password: ""
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
        if(inputs.username === "" || inputs.password === "") {
            setErr('Please fill all the fields!');
            setLoading(false);
            return;
        }

        try {
            await login(inputs);
            setErr(null);
            setInputs(defaultInputs);
            navigate('/');
        } catch (error) {
            setErr(error.response.data);
        }
        setLoading(false);
    }

    return (
        <div className='login'>
            <div className='card'>
                <div className='left-section'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                </div>
                <div className='right-section'>
                    <h1>Login</h1>
                    <form>
                        <input name='username' type='text' placeholder="Username" onChange={handleChange}/>
                        <input name='password' type='password' placeholder="Password" onChange={handleChange}/>
                        {err && <span>{err}</span>}
                        <button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'On it...' : 'Login'}
                        </button>
                    </form>
                    <span>Don't have an account? &nbsp;
                    <Link to="/register">
                        Register                   
                    </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};
