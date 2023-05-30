import React from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";

const SearchScreen = ({ closeModal }) => {
  return (
    <>
      <TextInput
        placeholder="검색어를 입력하세요"
        style={styles.searchWord}
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e0e0e0" }}
        cancelButtonProps={{ buttonTextStyle: { color: "gray" } }}
      />
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchWord: {
    width: 175,
    height: 26,
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#afafaf",
    left: 66,
    top: 12,
  },
  searchHistory: {
    width: 52,
    height: 40,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#7d7d7d",
    paddingVertical: 5,
  },
});
