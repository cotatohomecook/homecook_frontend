import React, {useState} from 'react';
import { MEALS } from "../data/dummy-data";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function MealList() {
    const App = () => {
        const [category, setCategory] = useState('전체');
      
        const filteredMeals = category === '전체' ? MEALS : MEALS.filter(meal => meal.category === category);
      
        return (
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setCategory('전체')}>
                <Text style={styles.buttonText}>전체</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setCategory('한식')}>
                <Text style={styles.buttonText}>한식</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setCategory('중식')}>
                <Text style={styles.buttonText}>중식</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setCategory('양식')}>
                <Text style={styles.buttonText}>양식</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mealsContainer}>
              {filteredMeals.map((meal, index) => (
                <View key={index} style={styles.meal}>
                  <Text style={styles.mealText}>{meal.name}</Text>
                  <Text style={styles.mealText}>{meal.menu}</Text>
                  <Text style={styles.mealText}>{meal.price}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      };
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 50,
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        },
        button: {
          backgroundColor: '#007aff',
          borderRadius: 20,
          padding: 10,
          marginHorizontal: 10,
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
        }
    });
}
export default MealList;
    