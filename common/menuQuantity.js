import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MenuQuantity = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity onPress={onDecrease} style={styles.minusButton}>
        <Text style={styles.minusText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}개</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.plusButton}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    width: 120,
    height: 33,
    backgroundColor: "#F9F9F9",
    borderRadius: 9,
    elevation: 5,
  },
  minusButton: {
    left: 10,
    top: 4,
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    elevation: 5,
  },
  plusButton: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    elevation: 5,
    left: 37,
    top: 4,
  },
  minusText: {
    fontSize: 30,
    left: 8,
    top: -10,
  },
  plusText: {
    fontSize: 20,
    left: 7,
    top: -2,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 500,
    left: 25,
    top: 5,
  },
});

export default MenuQuantity;
