import React, { useContext } from "react";
import { LanguageContext } from "../context/Language";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
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
            selected={currentLanguage == languages.de}
            title="Deutsch"
            onPress={() => changeLanguage(languages.de)}
            value={
              currentLanguage == languages.de ? (
                <MaterialIcons name="check" size={20} color={theme.secondary} />
              ) : (
                <></>
              )
            }
          />
          <Separator />
          <SettingsItem
            selected={currentLanguage == languages.en}
            title="English"
            onPress={() => changeLanguage(languages.en)}
            value={
              currentLanguage == languages.en ? (
                <MaterialIcons name="check" size={20} color={theme.secondary} />
              ) : (
                <></>
              )
            }
          />
          <Separator />
          <SettingsItem
            selected={currentLanguage == languages.fra}
            title="Français"
            onPress={() => changeLanguage(languages.fra)}
            value={
              currentLanguage == languages.fra ? (
                <MaterialIcons name="check" size={20} color={theme.secondary} />
              ) : (
                <></>
              )
            }
          />
          <Separator />
          <SettingsItem
            selected={currentLanguage == languages.ita}
            title="Italiano"
            onPress={() => changeLanguage(languages.ita)}
            value={
              currentLanguage == languages.ita ? (
                <MaterialIcons name="check" size={20} color={theme.secondary} />
              ) : (
                <></>
              )
            }
          />
          <Separator />
          <SettingsItem
            selected={currentLanguage == languages.rus}
            title="Русский"
            onPress={() => changeLanguage(languages.rus)}
            value={
              currentLanguage == languages.rus ? (
                <MaterialIcons name="check" size={20} color={theme.secondary} />
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
