import React, { useContext } from "react";

import MainScreen from "../screen/MainScreen";
import SplashScreen from "../screen/SplashScreen";
import TaskScreen from "../screen/TaskScreen";
import InfoScreen from "../screen/InfoScreen";
import SettingsScreen from "../screen/SettingsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "../context/ThemeContext";
import SettingsLoader from "../loader/SettingsLoader";
import TaskLoader from "../loader/TaskLoader";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { theme } = useContext(ThemeContext);

  SettingsLoader();
  TaskLoader();

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
          component={TaskScreen}
          options={{
            title: "Task",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="info"
          component={InfoScreen}
          options={{
            title: "Info",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
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
