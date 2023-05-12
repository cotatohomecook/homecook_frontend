import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CostomerStartScreen from './pages/CostomerStartScreen';
import CostomerMap from './pages/CostomerMap';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
     
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CostomerStartScreen" component={CostomerStartScreen} options={{headerShown: false}} />
          <Stack.Screen name="CostomerMap" component ={CostomerMap} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
