import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";

const FavoriteCategoryButton = ({ title }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.buttonContent}>
        <Image
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/bd4f2268-be39-406a-90d8-6b8e94da9c7d/image.png",
            width: 22,
            height: 20,
          }}
        />
        <Text style={styles.buttonText}>{title}</Text>
        <Image
          style={{ marginLeft: 170 }}
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/a18cb522-3dd5-42b6-88d2-35e2d9424416/image.png",
            width: 21,
            height: 21,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const BookmarkScreen = () => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header height={114} title={"즐겨찾기"} />
      <BackButton onPress={handleGoBack} top={-45} />
      <Image
        source={{
          uri: "https://velog.velcdn.com/images/kkaerrung/post/d30e70af-cbc7-4ccf-a81e-03049d5d8ba9/image.png",
          width: 78,
          height: 78,
        }}
        style={{ marginTop: 17, marginLeft: 158 }}
      ></Image>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <FavoriteCategoryButton title="한식" />
          <FavoriteCategoryButton title="양식" />
          <FavoriteCategoryButton title="베이커리" />
          <FavoriteCategoryButton title="일식" />
        </View>
      </View>
      <TouchableOpacity>
        <Image
          style={{ marginTop: 55, marginLeft: 166 }}
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/88b67bfb-585b-43e1-b49d-643690665248/image.png",
            width: 61,
            height: 61,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 35,
    alignItems: "center",
  },
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
  activeButton: {
    backgroundColor: "#2196F3",
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

export default BookmarkScreen;
