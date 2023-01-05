import React, { createContext, useState } from "react";
import { LanguageLoader } from "../loader/SettingsLoader";

export const LanguageContext = createContext();
const { languages, de, en, fra, ita } = require("./translations/language");

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages.en);

  const changeLanguage = (value) => {
    setCurrentLanguage(value);
  };

  LanguageLoader({ currentLanguage, changeLanguage });

  const switchLanguage = () => {
    switch (currentLanguage) {
      case languages.de:
        return de;
      case languages.en:
        return en;
      case languages.fra:
        return fra;
      case languages.ita:
        return ita;
      default:
        return en;
    }
  };

  const language = switchLanguage();

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage,
        languages,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
