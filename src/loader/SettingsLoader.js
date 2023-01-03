import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { LanguageContext } from "../context/Language";

export default function SettingsLoader() {
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [currentLanguage]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("language", JSON.stringify(currentLanguage));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const language = await AsyncStorage.getItem("language");
      if (language != null) {
        changeLanguage(JSON.parse(language));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
