import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const OrderButton = ({ title, onPress, color }) => {
  const buttonStyles = {
    ...styles.button,
    backgroundColor: color,
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={buttonStyles}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    width: 326,
    height: 60,
    backgroundColor: "#FFB15F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 27,
    marginTop: 68,
    marginLeft: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default OrderButton;
