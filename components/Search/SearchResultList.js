import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addFavorite, removeFavorite } from "../../store/redux/bookmark";
import ContentBox from "../../common/ContentBox";

const SearchResultList = ({ item }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.bookmark.ids);

  const isFavorite = favorites.includes(item.shopId);
  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ id: item.shopId }));
    } else {
      dispatch(addFavorite({ id: item.shopId }));
    }
    navigation.navigate("AddBookmarkScreen");
  };

  return (
    <View>
      <ContentBox
        width={371}
        height={116}
        imgUrl={item.imageUrl}
        title={item.shopName}
        detail={item.bestMenuName}
        rating={item.rating}
        handleToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
      />
    </View>
  );
};

export default SearchResultList;
