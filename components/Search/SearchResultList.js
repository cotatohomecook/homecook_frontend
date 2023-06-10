import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import ContentBox from "../../common/ContentBox";

const SearchResultList = ({ item }) => {
  return (
    <View style={styles.resultbox}>
      <ContentBox
        width={371}
        height={116}
        imgUrl={item.imageUrl}
        title={item.shopName}
        detail={item.bestMenuName}
        rating={item.rating}
      >
        <TouchableOpacity>
          <Image
            style={styles.bookmark}
            source={{
              uri: "https://velog.velcdn.com/images/kkaerrung/post/f3e7ba16-f0eb-4be2-9b5c-c3f5660cb647/image.png",
              width: 34.7,
              height: 33,
            }}
          ></Image>
        </TouchableOpacity>
      </ContentBox>
    </View>
  );
};

export default SearchResultList;

const styles = StyleSheet.create({
  resultbox: {
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
  },
  bookmark: {
    left: 120,
    top: -5,
  },
});
