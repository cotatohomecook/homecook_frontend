import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ConfirmationButtons from "./ConfirmationButton";

const RegistrationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <Image
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/ca3e4ff6-82c4-47b6-b4a1-fcb82fb73966/image.png",
            width: 200,
            height: 200,
          }}
        />
        <Text style={styles.modalText}>즐겨찾기 등록이 완료되었습니다.</Text>
        <Text style={styles.confirmText}>확인하러 가시겠습니까?</Text>
        <View style={styles.modalButtonContainer}>
          <ConfirmationButtons onConfirm={onConfirm} onCancel={onCancel} />
        </View>
      </View>
    </Modal>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: "center",
  },
  modalText: {
    marginTop: 11,
    width: 175,
    height: 76,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmText: {
    textAlign: "center",
    width: 190,
    height: 26,
    fontWeight: "bold",
    fontSize: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistrationModal;
