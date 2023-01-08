import React, { useContext } from "react";

import EditScreen from "./screen/edit/EditScreen";
import ViewTaskScreen from "./screen/edit/ViewTaskScreen";
import MainScreen from "./screen/MainScreen";
import InfoScreen from "./screen/settings/InfoScreen";
import SettingsScreen from "./screen/settings/SettingsScreen";
import TaskScreen from "./screen/TaskScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "./context/theme";

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
        <Stack.Group>
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
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="viewTask"
            component={ViewTaskScreen}
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
            name="edit"
            component={EditScreen}
            options={{
              title: "Edit",
              headerStyle: {
                backgroundColor: theme.background,
              },
              headerTintColor: theme.text,
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
