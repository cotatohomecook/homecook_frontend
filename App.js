import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigator/BottomTabNavigator";
import CustomerMap from "./pages/CustomerMap";
import SearchScreen from "./navigator/BottomTab/SearchScreen";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import ReviewScreen from "./pages/ReviewScreen";
import WriteReviewScreen from "./pages/WriteReviewScreen";
import EditCustomerProfile from "./pages/EditCustomerProfile";
 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
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
            {/*<Stack.Screen name="ReviewScreen" component={ReviewScreen} />*/}
            <Stack.Screen
              name="ReviewScreen"
              component={ReviewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WriteReviewScreen"
              component={WriteReviewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditCustomerProfile"
              component={EditCustomerProfile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
