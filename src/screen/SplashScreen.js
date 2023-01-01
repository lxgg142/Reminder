import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const SplashScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.secondary} />
    </View>
  );
};

export default SplashScreen;
