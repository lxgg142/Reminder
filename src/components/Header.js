import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
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
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
