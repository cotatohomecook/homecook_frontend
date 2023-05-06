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
          <Stack.Screen name="CostomerStartScreen" component={CostomerStartScreen} />
          <Stack.Screen name="CostomerMap" component ={CostomerMap}/>
        </Stack.Navigator>
      </NavigationContainer>
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
