import { createContext, useEffect, useState } from "react";

// create context
export const AuthUserContext = createContext();

// create context provider
export const AuthUserContextProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState({
            id: "1",
            name: "Ravi Yadav",
            profilePic:
                "https://images.pexels.com/photos/1426497/pexels-photo-1426497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }
    );

    const login = () => {
        // To Do 
    }

    useEffect(() => {
        // check localstorage and update, locastorage does not store objects, so convert to string first
        localStorage.setItem("currUser", JSON.stringify(currUser));
    }, [currUser]);

    // retuen the context and variables and functions to mutate them
    return (
        <AuthUserContext.Provider value={{ currUser }}>
            {children}
        </AuthUserContext.Provider>
    );
};
