import React from "react";
import { Modal, View, StyleSheet, Text } from "react-native";
import ConfirmationButtons from "./ConfirmationButton";

const ConfirmModal = ({
  modalVisible,
  closeModal,
  text,
  onConfirm,
  onCancel,
}) => {
  return (
    <View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.modalButton}>
              <ConfirmationButtons onConfirm={onConfirm} onCancel={onCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(191, 191, 191, 0.4)",
    marginTop: -60,
  },
  modalContent: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    width: 302,
    height: 142,
  },
  modalText: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: 10,
  },
  modalButton: {
    marginTop: -27,
    marginLeft: -7,
  },
});

export default ConfirmModal;
