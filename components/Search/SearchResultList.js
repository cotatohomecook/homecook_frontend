import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addFavorite, fetchBookmarkData } from "../../store/redux/bookmark";
import { fetchData } from "../../store/redux/shopInfo";
import ContentBox from "../../common/ContentBox";

const SearchResultList = ({ item }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { searchText } = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(
    "https://velog.velcdn.com/images/kkaerrung/post/f3e7ba16-f0eb-4be2-9b5c-c3f5660cb647/image.png"
  );

  useEffect(() => {
    const fetchAndSetBookmarkData = async () => {
      try {
        dispatch(fetchBookmarkData());
      } catch (error) {
        console.error("Failed to fetch bookmark data:", error);
      }
    };

    fetchAndSetBookmarkData();
  }, [dispatch]);

  const bookmarkData = useSelector((state) => state.bookmark.bookmarks);
  const isItemFavorite = bookmarkData.some(
    (bookmark) => bookmark.shopId === item.shopId
  );

  useEffect(() => {
    if (isItemFavorite) {
      setImageUri(
        "https://velog.velcdn.com/images/kkaerrung/post/c7ab4139-e04f-4831-a385-a7aebd29bee9/image.png"
      );
    }
  }, [isItemFavorite]);

  const handleToggleFavorite = () => {
    const isFavorite = isItemFavorite;
    if (!isFavorite) {
      dispatch(addFavorite({ id: item.shopId }));
    }
    navigation.navigate("AddBookmarkScreen", { searchText: searchText });
  };

  const handleShopPress = () => {
    dispatch(fetchData(item.shopId));
    navigation.navigate("ShopScreen", {
      shopId: item.shopId,
      searchText: searchText,
    });
  };

  return (
    <TouchableOpacity onPress={handleShopPress}>
      <View>
        <ContentBox
          width={371}
          height={116}
          imgUrl={item.imageUrl}
          title={item.shopName}
          detail={item.bestMenuName}
          rating={item.rating}
          handleToggleFavorite={handleToggleFavorite}
          isFavorite={isItemFavorite}
          imageUri={imageUri}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultList;
