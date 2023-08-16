import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = ({ height, title }) => {
  return (
    <View style={[styles.header, { height }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F3AC61",
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 10,
    top: 50,
  },
});

export default Header;
