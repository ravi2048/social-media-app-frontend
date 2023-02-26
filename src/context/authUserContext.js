import axios from "axios";
import { createContext, useEffect, useState } from "react";

// create context
export const AuthUserContext = createContext();

// create context provider
export const AuthUserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")) || null);

    const login = async (inputs) => {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, inputs, { withCredentials: true });
        setCurrUser(res.data);
    }

    useEffect(() => {
        // check localstorage and update, locastorage does not store objects, so convert to string first
        localStorage.setItem("currUser", JSON.stringify(currUser));
    }, [currUser]);

    // retuen the context and variables and functions to mutate them
    return (
        <AuthUserContext.Provider value={{ currUser, setCurrUser, login }}>
            {children}
        </AuthUserContext.Provider>
    );
};
