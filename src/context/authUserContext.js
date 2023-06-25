import axios from "axios";
import { createContext, useEffect, useState } from "react";

// create context
export const AuthUserContext = createContext();

// create context provider
export const AuthUserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("currUser")) || null);
    const token = localStorage.getItem("accessToken") || '';

    const login = async (inputs) => {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, inputs);
        setCurrUser(res.data.userInfo);
        localStorage.setItem("accessToken", res.data.accessToken);
    }

    useEffect(() => {
        if(currUser) {
            localStorage.setItem("currUser", JSON.stringify(currUser));
        }
    }, [currUser]);

    // retuen the context and variables and functions to mutate them
    return (
        <AuthUserContext.Provider value={{ currUser, setCurrUser, token, login }}>
            {children}
        </AuthUserContext.Provider>
    );
};
