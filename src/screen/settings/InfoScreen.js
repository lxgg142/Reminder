import { MaterialIcons } from "@expo/vector-icons";
import * as Application from "expo-application";
import * as Device from "expo-device";
import React, { useContext } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../../context/language";
import { ThemeContext } from "../../context/theme";
import Content from "../components/Content";
import Header from "../components/Header";
import List, { Button, ListItem, Separator } from "../components/List";

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
            <MaterialIcons name={"arrow-back"} size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        {/**content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content style={{ marginBottm: 20 }}>
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
                  "?? " +
                  Application.applicationName +
                  " " +
                  new Date().getFullYear()
                }
              />
            </List>
            <List>
              <Button
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
          </Content>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
