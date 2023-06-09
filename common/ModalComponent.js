import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import SearchScreen from "../navigator/BottomTab/SearchScreen";

const ModalComponent = ({ modalVisible, closeModal }) => {
  return (
    <View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SearchScreen closeModal={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    width: 371,
    height: 510,
  },
});

export default ModalComponent;
