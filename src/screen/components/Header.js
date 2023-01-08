import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { ThemeContext } from "../../context/theme";

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
