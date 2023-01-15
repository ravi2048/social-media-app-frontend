import { Link } from "react-router-dom";
import "./Register.scss";

export default function Register() {
    return (
        <div className='register'>
            <div className='card'>
                <div className='left-section'>
                    <h1>Register</h1>
                    <form>
                        <input
                            id='username'
                            type='text'
                            placeholder='Username'
                        />
                        <input id='email' type='email' placeholder='Email' />
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                        />
                        <button>Register</button>
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
