import React, { useCallback, useContext, useState } from "react";
import { LanguageContext } from "../context/Language";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import List, { Separator, SettingsItem } from "../components/List";

const SettingsScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { language, languages, currentLanguage, changeLanguage } =
    useContext(LanguageContext);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.settings.title}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        <List title={language.settings.app.language}>
          <SettingsItem
            title="Deutsch"
            onPress={() => changeLanguage(languages.de)}
            value={
              currentLanguage == languages.de ? (
                <MaterialIcons name="check" size={20} color={theme.text} />
              ) : (
                <></>
              )
            }
          />
          <Separator />
          <SettingsItem
            title="English"
            onPress={() => changeLanguage(languages.en)}
            value={
              currentLanguage == languages.en ? (
                <MaterialIcons name="check" size={20} color={theme.text} />
              ) : (
                <></>
              )
            }
          />
        </List>
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
