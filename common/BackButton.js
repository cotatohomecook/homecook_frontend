import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const BackButton = ({ onPress, top }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.backbutton, { top }]}>
      <Image
        source={{
          uri: "https://velog.velcdn.com/images/kkaerrung/post/3491de93-cc54-45b2-94cd-d1426a1e2217/image.png",
        }}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backbutton: {
    left: 22,
  },
});
