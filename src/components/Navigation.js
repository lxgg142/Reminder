import React, { useContext } from "react";

import MainScreen from "../screen/MainScreen";
import SplashScreen from "../screen/SplashScreen";
import TaskContainer from "../screen/TaskContainer";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "../context/ThemeContext";
import { Pressable, SafeAreaView, Text } from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{
            title: "Simple Todo",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="task"
          component={TaskContainer}
          options={{
            title: "Simple Todo",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
