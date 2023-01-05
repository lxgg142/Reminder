import React, { createContext, useState } from "react";
import { DateViewLoader } from "../loader/SettingsLoader";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [dateView, setDateView] = useState(true);

  const changeDateView = (value) => {
    setDateView(value);
  };

  DateViewLoader({ dateView, changeDateView });

  return (
    <SettingsContext.Provider
      value={{
        dateView: dateView,
        changeDateView,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
