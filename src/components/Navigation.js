import React from 'react';

import MainScreen from '../screen/MainScreen';
import SplashScreen from '../screen/SplashScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from "react-native";
import { COLORS } from '../color';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    let colorScheme = useColorScheme();
    var theme = colorScheme === 'dark' ? COLORS.dark : COLORS.light

    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {
                  backgroundColor: theme.background
              }
            }}
          >
            <Stack.Screen 
              name="main"
              component={MainScreen}
              options={{
                title: "Simple-Todo",
                headerStyle: {
                  backgroundColor: theme.background
                },
                headerTintColor: theme.text
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
