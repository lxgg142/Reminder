import React, { createContext, useState } from "react";

export const LanguageContext = createContext();
const { de, en, fra, ita } = require("./translations/language.json");

export const LanguageProvider = ({ children }) => {
  const languages = {
    de: "de",
    en: "en",
    fra: "fra",
    ita: "ita",
  };
  const [currentLanguage, setCurrentLanguage] = useState(languages.en);

  const changeLanguage = (value) => {
    setCurrentLanguage(value);
  };

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
