import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerStartScreen from "./pages/CustomerStartScreen";
import CustomerMap from "./pages/CustomerMap";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CustomerStartScreen"
            component={CustomerStartScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  ///
});
