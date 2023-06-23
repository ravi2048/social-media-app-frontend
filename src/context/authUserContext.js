import axios from "axios";
import { createContext, useEffect, useState } from "react";

// create context
export const AuthUserContext = createContext();

// create context provider
export const AuthUserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")) || null);
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null)
    const login = async (inputs) => {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, inputs);
        setCurrUser(res.data.userInfo);
        setToken(res.data.accessToken);
    }

    useEffect(() => {
        // check localstorage and update, locastorage does not store objects, so convert to string first
        localStorage.setItem("currUser", JSON.stringify(currUser));
    }, [currUser]);

    useEffect(() => {
        // check localstorage and update, locastorage does not store objects, so convert to string first
        localStorage.setItem("accessToken", token);
    }, [token]);

    // retuen the context and variables and functions to mutate them
    return (
        <AuthUserContext.Provider value={{ currUser, setCurrUser, token, setToken, login }}>
            {children}
        </AuthUserContext.Provider>
    );
};
