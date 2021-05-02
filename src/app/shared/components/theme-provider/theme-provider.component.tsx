import React, { useEffect, useState } from "react";
// Core
import Storage from '../../services/web-storage.service';
import { STORAGE_KEY } from '../../constants/storage.constants';

type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
    {} as ThemeContext
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        const themeSelected = theme === "light" ? "dark" : "light";
        setTheme(themeSelected);

        Storage.local.set(STORAGE_KEY.THEME, themeSelected);
    };

    useEffect(() => {
        Storage.local.get(STORAGE_KEY.THEME);
        if (theme !== Storage.local.get(STORAGE_KEY.THEME)) {
            toggleTheme();
        }
    },[]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
