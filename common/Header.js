import React from "react";
import { View, StyleSheet } from "react-native";

const Header = ({ height }) => {
  return <View style={[styles.header, { height }]} />;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F3AC61",
    borderRadius: 20,
  },
});

export default Header;
