import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbutton}>
      <Image
        source={{
          uri: "https://velog.velcdn.com/images/kkaerrung/post/3491de93-cc54-45b2-94cd-d1426a1e2217/image.png",
        }}
        style={{ width: 20, height: 20 }} // 올바른 스타일 속성 이름은 "height"입니다.
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backbutton: {
    top: -58,
    left: 22,
  },
});
