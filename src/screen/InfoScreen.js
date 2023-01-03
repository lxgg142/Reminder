import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import List, { ListItem, Separator, SettingsButton } from "../components/List";
import Header from "../components/Header";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { LanguageContext } from "../context/Language";

export default function InfoScreen({ navigation }) {
  const { theme, scheme } = useContext(ThemeContext);
  const { language, currentLanguage } = useContext(LanguageContext);

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        {/**header */}
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.info.title}
          </Text>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons name={"close"} size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        {/**content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <List title={language.info.theme.title}>
              <ListItem
                title={language.info.theme.current}
                value={String(scheme).toUpperCase()}
              />
            </List>

            <List title={language.info.app.title}>
              <ListItem
                title={language.info.app.name}
                value={Application.applicationName}
              />
              <Separator />
              <ListItem
                title={language.info.app.version}
                value={Application.nativeApplicationVersion}
              />
              <Separator />
              <ListItem
                title={language.info.app.build}
                value={Application.nativeBuildVersion}
              />
              <Separator />
              <ListItem
                title={language.info.app.language}
                value={String(currentLanguage).toUpperCase()}
              />
              <Separator />
              <ListItem
                color={theme.secondary}
                title={
                  "© " +
                  Application.applicationName +
                  " " +
                  new Date().getFullYear()
                }
              />
            </List>
            <List>
              <SettingsButton
                title={language.settings.title}
                color={theme.del}
                onPress={() => navigation.push("settings")}
              />
            </List>

            <List title={language.info.phone.title}>
              <ListItem
                title={language.info.phone.brand}
                value={Device.brand}
              />
              {Platform.OS == "ios" ? (
                <>
                  <Separator />
                  <ListItem
                    title={language.info.phone.modelID}
                    value={Device.modelId}
                  />
                </>
              ) : (
                <></>
              )}
              <Separator />
              <ListItem
                title={language.info.phone.model}
                value={Device.modelName}
              />
              <Separator />
              <ListItem
                title={language.info.phone.osVersion}
                value={Device.osVersion}
              />
            </List>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
