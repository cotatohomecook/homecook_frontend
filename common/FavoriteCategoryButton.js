import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

const FavoriteCategoryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Image
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/bd4f2268-be39-406a-90d8-6b8e94da9c7d/image.png",
            width: 22,
            height: 20,
          }}
        />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 322,
    height: 42,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
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
    width: 66,
  },
});

export default FavoriteCategoryButton;
