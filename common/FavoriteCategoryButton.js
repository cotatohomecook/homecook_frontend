import React, { useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { deleteBookmarkFolder, deleteCategory } from "../store/redux/bookmark";
import ConfirmModal from "./ConfirmModal";

const FavoriteCategoryButton = ({
  title,
  onPress,
  isChecked,
  handleCancel,
}) => {
  const dispatch = useDispatch();
  const [buttonChecked, setButtonChecked] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleConfirmDelete = () => {
    setButtonChecked(true);
    setConfirmModalVisible(true);
  };

  const onConfirm = () => {
    dispatch(deleteBookmarkFolder({ folderName: title }));
    dispatch(deleteCategory(title));
  };

  const onCancel = () => {
    setButtonChecked((prevState) => !prevState);
    setConfirmModalVisible(false);
    handleCancel();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={isChecked}
      >
        <View style={styles.buttonContent}>
          <Image
            source={{
              uri: "https://velog.velcdn.com/images/kkaerrung/post/bd4f2268-be39-406a-90d8-6b8e94da9c7d/image.png",
              width: 22,
              height: 20,
            }}
          />
          <Text style={styles.buttonText}>{title}</Text>
          {isChecked && (
            <TouchableOpacity onPress={handleConfirmDelete}>
              <Image
                style={styles.checkIcon}
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/694fddf5-d67c-4c36-98a0-a88376230088/image.png",
                  width: 18,
                  height: 18,
                }}
              />
            </TouchableOpacity>
          )}
          {buttonChecked && (
            <TouchableOpacity onPress={handleConfirmDelete}>
              <Image
                style={{ marginLeft: -15 }}
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/990f0f3b-aaaa-4814-9f89-5d75741ae6e7/image.png",
                  width: 13,
                  height: 13,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <ConfirmModal
        text={"즐겨찾기 내역을\n삭제하시겠습니까?"}
        onConfirm={onConfirm}
        onCancel={onCancel}
        modalVisible={confirmModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 322,
    height: 42,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#F6F6F6",
    borderRadius: 9,
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    left: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    width: 200,
  },
  checkIcon: {
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 80,
    marginLeft: 30,
  },
});

export default FavoriteCategoryButton;
