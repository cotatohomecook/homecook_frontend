import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigator/BottomTabNavigator";
import CustomerMap from "./pages/CustomerMap";
import SearchScreen from "./navigator/BottomTab/SearchScreen";
import ShopScreen from "./pages/ShopScreen";
import OrderMenuScreen from "./pages/OrderMenuScreen";
import PaymentScreen from "./pages/PaymentScreen";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import WriteReviewScreen from "./pages/WriteReviewScreen";
import EditCustomerProfile from "./pages/EditCustomerProfile";
import SignUpScreen from "./pages/Auth/SignInScreen";
import LoginScreen from "./pages/Auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                headerTitle: "계정 만들기",
                headerHeight: 20,
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
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
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
