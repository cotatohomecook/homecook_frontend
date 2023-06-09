import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigator/BottomTabNavigator";
import CustomerMap from "./pages/CustomerMap";
import SearchScreen from "./navigator/BottomTab/SearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CustomerStartScreen"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerMap"
            component={CustomerMap}
            options={{
              headerTitle: "",
              headerStyle: { backgroundColor: "#ffb15f" },
              headerHeight: 20,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
