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
import List, { ListItem, Separator } from "../components/List";
import Header from "../components/Header";
import * as Application from "expo-application";
import * as Device from "expo-device";

export default function InfoScreen({ navigation }) {
  const { theme, scheme } = useContext(ThemeContext);

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        {/**header */}
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            Info
          </Text>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons name={"close"} size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        {/**content */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <List title="Theme">
              <ListItem title="Aktuell:" value={String(scheme).toUpperCase()} />
            </List>

            <List title="App Information">
              <ListItem title="Name:" value={Application.applicationName} />
              <Separator />
              <ListItem
                title="Version:"
                value={Application.nativeApplicationVersion}
              />
              <Separator />
              <ListItem
                title="Build Version:"
                value={Application.nativeBuildVersion}
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

            <List title="Handy Information">
              <ListItem title="Brand:" value={Device.brand} />
              {Platform.OS == "ios" ? (
                <>
                  <Separator />
                  <ListItem title="Model ID:" value={Device.modelId} />
                </>
              ) : (
                <></>
              )}
              <Separator />
              <ListItem title="Model Name:" value={Device.modelName} />
              <Separator />
              <ListItem title="OS Version:" value={Device.osVersion} />
            </List>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
