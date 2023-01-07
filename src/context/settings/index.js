import React, { createContext, useState } from "react";
import {
  DateViewLoader,
  DescriptionViewLoader,
} from "../loader/SettingsLoader";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [dateView, setDateView] = useState(true);
  const [descriptionView, setDescriptionView] = useState(true);

  const changeDateView = (value) => {
    setDateView(value);
  };

  const changeDescriptionView = (value) => {
    setDescriptionView(value);
  };

  DateViewLoader({ dateView, changeDateView });
  DescriptionViewLoader({ descriptionView, changeDescriptionView });

  return (
    <SettingsContext.Provider
      value={{
        dateView: dateView,
        changeDateView,
        descriptionView: descriptionView,
        changeDescriptionView,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
