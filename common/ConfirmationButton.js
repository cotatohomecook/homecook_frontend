import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const ConfirmationButtons = ({ onConfirm, onCancel, width, height }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, { width, height }]}>
        <TouchableOpacity style={styles.yesModalbutton} onPress={onConfirm}>
          <Text style={styles.modalButtonText}>예</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.NoModalbutton} onPress={onCancel}>
          <Text style={styles.modalButtonText}>아니오</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 11,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  yesModalbutton: {
    width: 132,
    height: 46,
    left: 10,
    backgroundColor: "#80FF6B",
    borderRadius: 14,
    marginRight: 30,
  },
  NoModalbutton: {
    width: 132,
    height: 46,
    backgroundColor: "#FF7979",
    borderRadius: 14,
  },
  modalButtonText: {
    marginTop: 12,
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ConfirmationButtons;
