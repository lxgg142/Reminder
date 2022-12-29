import React, { createContext } from "react";
import { useColorScheme } from "react-native";
import { COLORS } from "../color";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    let scheme = useColorScheme();
    const theme = scheme === 'dark' ? COLORS.dark : COLORS.light

    return (
        <ThemeContext.Provider
            value={{
                theme,
                scheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}