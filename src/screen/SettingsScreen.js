import React, { useContext } from "react";
import { LanguageContext } from "../context/language";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import {
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import List, {
  Button,
  ListItem,
  Separator,
  SettingsItem,
} from "../components/List";
import { SettingsContext } from "../context/settings";

const SettingsScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { language, languages, currentLanguage, changeLanguage } =
    useContext(LanguageContext);
  const { dateView, changeDateView } = useContext(SettingsContext);

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
        </List>
        <List title={language.settings.task.title}>
          <View
            style={{
              minHeight: 50,
              justifyContent: "space-between",
              marginHorizontal: 15,
              paddingVertical: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.text }}>
              {language.settings.task.showDate}
            </Text>
            <Switch
              trackColor={{ false: theme.background, true: theme.secondary }}
              thumbColor={theme.text}
              ios_backgroundColor={theme.background}
              onValueChange={changeDateView}
              value={dateView}
            />
          </View>
        </List>
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
