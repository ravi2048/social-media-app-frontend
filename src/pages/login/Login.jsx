import { Link } from "react-router-dom";
import "./Login.scss";

export default function Login(){
    return (
        <div className='login'>
            <div className='card'>
                <div className='left-section'>
                    <h1>Hello World.</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>                    
                    </Link>
                </div>
                <div className='right-section'>
                    <h1>Login</h1>
                    <form>
                        <input id='username' type='text' placeholder="Username" />
                        <input id='password' type='password' placeholder="Password" />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
