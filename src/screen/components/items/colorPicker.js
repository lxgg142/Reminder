import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../../context/theme";

export default function ColorPicker({ children }) {
  return <View style={[{ flexDirection: "row" }]}>{children}</View>;
}

export function ColorItem({ color, onColor, onPress }) {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.colorItem, { backgroundColor: color }]}
      onPress={onPress}
    >
      {onColor ? (
        <MaterialIcons name={"check"} size={28} color={theme.text} />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    paddingHorizontal: 20,
  },
  colorItem: {
    height: 55,
    width: 55,
    borderRadius: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
