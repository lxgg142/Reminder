import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../../context/language";
import { SettingsContext } from "../../context/settings";
import { ThemeContext } from "../../context/theme";
import Content from "../components/Content";
import Header from "../components/Header";
import List, { Separator, SettingsItem } from "../components/List";

const SettingsScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { language, languages, currentLanguage, changeLanguage } =
    useContext(LanguageContext);
  const { dateView, changeDateView, descriptionView, changeDescriptionView } =
    useContext(SettingsContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.settings.title}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={"close"} size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        <Content>
          <List title={language.settings.app.language}>
            <SettingsItem
              selected={currentLanguage == languages.de}
              title="Deutsch"
              onPress={() => changeLanguage(languages.de)}
              value={
                currentLanguage == languages.de ? (
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={theme.secondary}
                  />
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
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={theme.secondary}
                  />
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
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={theme.secondary}
                  />
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
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={theme.secondary}
                  />
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
                trackColor={{
                  false: theme.backgroundlight,
                  true: theme.secondary,
                }}
                thumbColor={"#fff"}
                ios_backgroundColor={theme.background}
                onValueChange={changeDateView}
                value={dateView}
              />
            </View>
            <Separator />
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
                {language.settings.task.description}
              </Text>
              <Switch
                trackColor={{
                  false: theme.backgroundlight,
                  true: theme.secondary,
                }}
                thumbColor={"#fff"}
                ios_backgroundColor={theme.background}
                onValueChange={changeDescriptionView}
                value={descriptionView}
              />
            </View>
          </List>
        </Content>
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
