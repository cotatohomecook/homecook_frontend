import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Touchable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookmarkData } from "../../store/redux/bookmark";
import FavoriteCategoryButton from "../../common/FavoriteCategoryButton";
import BookmarkListButton from "../../common/BookmarkListButton";

const BookmarkScreen = () => {
  const folderNames = useSelector((state) => state.bookmark.folderNames);
  const folderData = useSelector((state) => state.bookmark.bookmarks);
  const dispatch = useDispatch();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [uniqueShopIds, setUniqueShopIds] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchBookmarkData());
  }, []);

  useEffect(() => {
    const uniqueIds = [...new Set(folderData.map((item) => item.shopId))];
    setUniqueShopIds(uniqueIds);
  }, [folderData]);

  const handleGoBack = () => {
    navigation.navigate("CustomerStartScreen");
  };

  const handleCategoryPress = (category) => {
    const selectedFolderData = folderData.filter(
      (item) => item.folderName === category
    );
    setSelectedFolder(selectedFolderData.length > 0 ? category : null);
    setShowCategories(false);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header height={114} title={"즐겨찾기"} />
        <BackButton onPress={handleGoBack} top={-45} />
        <ScrollView style={styles.container}>
          <Image
            source={{
              uri: "https://velog.velcdn.com/images/kkaerrung/post/d30e70af-cbc7-4ccf-a81e-03049d5d8ba9/image.png",
              width: 78,
              height: 78,
            }}
            style={{ marginTop: 17, marginLeft: 32 }}
          />
          <Text style={styles.textStyle}>
            <Text style={styles.blueText}>'박세라'</Text>님{"\n"}
            <Text style={styles.textSize}>즐겨찾기 내역이에요.</Text>
          </Text>
          {showCategories ? (
            <View style={styles.buttonsContainer}>
              {folderNames &&
                folderNames.map((category) => (
                  <FavoriteCategoryButton
                    key={category}
                    title={category}
                    onPress={() => handleCategoryPress(category)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>{category}</Text>
                  </FavoriteCategoryButton>
                ))}
            </View>
          ) : (
            <View style={styles.selectedFolderContainer}>
              <View style={styles.selectedFolderBox}>
                <Image
                  style={{ marginLeft: 90 }}
                  source={{
                    uri: "https://velog.velcdn.com/images/kkaerrung/post/bd4f2268-be39-406a-90d8-6b8e94da9c7d/image.png",
                    width: 22,
                    height: 20,
                  }}
                ></Image>
                <Text style={styles.selectedFolderText}>{selectedFolder}</Text>
              </View>
              <TouchableOpacity onPress={handleGoBack}>
                <Image
                  style={{ marginTop: 9 }}
                  source={{
                    uri: "https://velog.velcdn.com/images/kkaerrung/post/8ff31b30-29cc-4a5f-a70d-2b1e340bab91/image.png",
                    width: 19,
                    height: 19,
                  }}
                ></Image>
              </TouchableOpacity>
              {uniqueShopIds.map((shopId) => {
                const item = folderData.find((item) => item.shopId === shopId);
                if (item && item.folderName === selectedFolder) {
                  return (
                    <BookmarkListButton
                      key={item.shopId}
                      shopName={item.shopName}
                      imageUrl={item.imageUrl}
                    />
                  );
                }
                return null;
              })}
            </View>
          )}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginLeft: 163,
              marginTop: 35,
              marginBottom: 50,
            }}
          ></View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: "100%",
    marginTop: -15,
  },
  textSize: {
    fontSize: 24,
  },
  textStyle: {
    width: 213,
    height: 70,
    left: 134,
    top: -70,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
  },
  blueText: {
    color: "#3D67FF",
  },
  selectedFolderBox: {
    width: 258,
    height: 52,
    marginTop: -70,
    backgroundColor: "#FFFFFF",
    borderRadius: 27,
    borderWidth: 0.5,
    borderColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedFolderContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  selectedFolderText: {
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsContainer: {
    alignItems: "center",
  },
  borderBox: {
    width: 327,
    height: 135,
    top: 322,
    background: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default BookmarkScreen;
