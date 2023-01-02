import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

const { appinfo } = require("../config.json");

export default function InfoScreen({ navigation }) {
  const { theme, scheme } = useContext(ThemeContext);

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
      >
        {/**header */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.header,
              {
                borderColor: theme.sep,
                borderBottomWidth: 1,
                marginTop: StatusBar.currentHeight,
              },
            ]}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}
            >
              Info
            </Text>
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons name={"close"} size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
        {/**content */}
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.items}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                paddingVertical: 10,
                color: theme.text,
              }}
            >
              Theme
            </Text>
            <View
              style={{
                marginTop: 5,
                borderColor: theme.sep,
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              <View style={styles.item}>
                <Text style={{ color: theme.text }}>
                  Aktuell: {String(scheme).toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.items}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                paddingVertical: 10,
                color: theme.text,
              }}
            >
              App Info
            </Text>
            <View
              style={{
                marginTop: 5,
                borderColor: theme.sep,
                borderWidth: 1,
                borderRadius: 15,
              }}
            >
              <View style={styles.item}>
                <Text style={{ color: theme.text }}>Name: {appinfo.name}</Text>
              </View>
              <View style={{ backgroundColor: theme.sep, height: 1 }} />
              <View style={styles.item}>
                <Text style={{ color: theme.text }}>
                  Version: {appinfo.version}
                </Text>
              </View>
              <View style={{ backgroundColor: theme.sep, height: 1 }} />
              <View style={styles.item}>
                <Text style={{ color: theme.text }}>
                  Release: {appinfo.release}
                </Text>
              </View>
              <View style={{ backgroundColor: theme.sep, height: 1 }} />
              <View style={styles.item}>
                <Text style={{ color: theme.secondary }}>
                  © {appinfo.name + " " + new Date().getFullYear()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    minHeight: 50,
    justifyContent: "center",
    marginLeft: 15,
    paddingVertical: 15,
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
