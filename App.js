import { StatusBar } from 'expo-status-bar';
import { StyleSheet ,Image, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerStartScreen from './pages/CustomerStartScreen';
import CustomerMap from './pages/CustomerMap';
import SearchScreen from "./ButtomTab/SearchScreen";
import ListScreen from "./ButtomTab/ListScreen";
import BookmarkScreen from "./ButtomTab/BookmarkScreen";
import MypageScreen from "./ButtomTab/MypageScreen";
import { View } from 'react-native-animatable';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator  screenOptions={({ route }) => ({
      tabBarStyle: { backgroundColor: '#ffb15f', height: 51 }, // 탭의 배경색과 높이
      tabBarIconStyle: { marginBottom: 1, marginTop: 10 },
        tabBarLabelStyle: { display: 'none' },
    })}>
      <Tab.Screen name="List" 
        component={ListScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/9945ec5c-1f25-4992-93d6-f20dfe86c18e/image.png' }} 
              style={{
                width: 18,
                height: 20.5,
              }}
            />
          ),
        }}
      />

      <Tab.Screen name="Bookmark" component={BookmarkScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/2018910e-32b1-4d7f-aeb9-7d7e9e7c712f/image.png' }} 
              style={{
                width: 27,
                height: 27,
              }}
            />
          ),
        }}
      />
      
      <Tab.Screen name="CustomerStartScreen" 
        component={CustomerStartScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View 
            style={{
              top: -20,
              width: 71,
              height: 71,
              borderRadius: 100, 
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffb15f", 
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4, 
            }}
            >
              <Image
              source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/29e392b5-ae80-4edc-9492-56b5b868971d/image.png' }}
              style={{
                width: 27.8,
                height: 27.4,
              }}
            />
            </View>
            
            
          ),
        }}
      />
      <Tab.Screen name="Search" 
        component={SearchScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/24bc745f-f288-4cec-b0f9-e0e46a60f889/image.png' }}
              style={{
                width: 18,
                height: 18,
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Mypage" 
        component={MypageScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/d4caa6f3-826b-4fb5-910f-6d34726fd7c4/image.png' }} 
              style={{
                width: 19,
                height: 19,
              }}
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  ); 
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerMap"
            component={CustomerMap}
            options={{
              headerTitle: '',
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
  // ...
});