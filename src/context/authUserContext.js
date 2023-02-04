import axios from "axios";
import { createContext, useEffect, useState } from "react";

// create context
export const AuthUserContext = createContext();

// create context provider
export const AuthUserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")) || null);
    const backendUrl = 'http://localhost:8800/auth';


    const login = async (inputs) => {
        const res = await axios.post(`${backendUrl}/login`, inputs, { withCredentials: true });
        setCurrUser(res.data);
    }

    useEffect(() => {
        // check localstorage and update, locastorage does not store objects, so convert to string first
        localStorage.setItem("currUser", JSON.stringify(currUser));
        console.log(`inside setting token, ${JSON.stringify(currUser)}`);
    }, [currUser]);

    // retuen the context and variables and functions to mutate them
    return (
        <AuthUserContext.Provider value={{ currUser, login }}>
            {children}
        </AuthUserContext.Provider>
    );
};
