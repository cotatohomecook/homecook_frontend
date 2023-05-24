import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CostomerStartScreen from './pages/CostomerStartScreen';
import CustomerMap from './pages/CustomerMap';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
     
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CostomerStartScreen" component={CostomerStartScreen} options={{headerShown: false}} />
          <Stack.Screen name="CustomerMap" component={CustomerMap} options={{headerTitle: '',  headerStyle: { backgroundColor: "#ffb15f"}, headerHeight: 20,
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
