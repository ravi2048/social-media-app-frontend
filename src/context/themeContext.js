import { createContext, useEffect, useState } from "react";

export const DarkThemeContext = createContext();

export const DarkThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    return (
        <DarkThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </DarkThemeContext.Provider>
    );
};

