import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export function LanguageLoader({ currentLanguage, changeLanguage }) {
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
      const value = await AsyncStorage.getItem("language");
      if (value != null) {
        changeLanguage(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function DateViewLoader({ dateView, changeDateView }) {
  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [dateView]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("dateView", JSON.stringify(dateView));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("dateView");
      if (value != null) {
        changeDateView(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function DescriptionViewLoader({
  descriptionView,
  changeDescriptionView,
}) {
  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [descriptionView]);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem(
        "descriptionView",
        JSON.stringify(descriptionView)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("descriptionView");
      if (value != null) {
        changeDescriptionView(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
