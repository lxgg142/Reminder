import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import MainScreen from "./screen/MainScreen";

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="main"
            component={MainScreen}
            options={{
              title: "Simple-Todo"
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

