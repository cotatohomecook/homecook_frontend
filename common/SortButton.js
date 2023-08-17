import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress, active }) => {
  const buttonStyle = active
    ? [styles.button, styles.activeButton]
    : styles.button;
  const textStyle = !active
    ? [styles.buttonText, styles.activeButtonText]
    : styles.buttonText;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 69,
    height: 27,
    backgroundColor: "#FFDDB9",
    elevation: 3,
    borderRadius: 9,
    marginVertical: 10,
  },
  activeButton: {
    backgroundColor: "#FFB15F",
  },
  buttonText: {
    width: 56,
    height: 17,
    left: 5,
    top: 5,
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
    color: "#FFFFFF",
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
});

export default Button;
