import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BookmarkListButton = ({ shopId, shopName, imageUrl }) => {
  const navigation = useNavigation();

  const GoToShopScreen = () => {
    navigation.navigate("ShopScreen", { shopId: shopId });
  };

  return (
    <TouchableOpacity onPress={GoToShopScreen}>
      <View style={styles.borderBox}>
        <Text style={styles.shopName}>{shopName}</Text>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderBox: {
    width: 302,
    height: 142,
    top: 9,
    background: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 0.5,
    marginVertical: 10,
  },
  shopName: {
    width: 113,
    height: 23,
    left: 164,
    top: 12,
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    left: 17,
    borderRadius: 17,
  },
});

export default BookmarkListButton;
