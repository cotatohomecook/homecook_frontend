import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import { addCategory, sendBookmarkData } from "../store/redux/bookmark";
import { useDispatch, useSelector } from "react-redux";

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
        <Image
          style={{ marginLeft: 90 }}
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

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favoriteCategories = useSelector((state) => state.bookmark.categories);
  const selectedCategory = useSelector(
    (state) => state.bookmark.selectedCategory
  );
  const favoriteIds = useSelector((state) => state.bookmark.ids);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const handleAddCategoryPress = () => {
    setShowNewCategoryInput(!showNewCategoryInput);
  };

  const handleSaveCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
      dispatch(
        sendBookmarkData({ ids: favoriteIds, categories: favoriteCategories })
      );
    }
    setShowNewCategoryInput(false);
  };

  const handleCategoryInputChange = (text) => {
    setNewCategory(text);
  };

  const handleDeleteCategory = (category) => {
    dispatch(deleteBookmarkData({ id: category, category }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity activeOpacity={1} style={styles.screen}>
        <Header height={114} title={"즐겨찾기"} />
        <BackButton onPress={handleGoBack} top={-45} />
        <Image
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/d30e70af-cbc7-4ccf-a81e-03049d5d8ba9/image.png",
            width: 78,
            height: 78,
          }}
          style={{ marginTop: 17, marginLeft: 158 }}
        />
        <View style={styles.buttonsContainer}>
          {favoriteCategories.map((category) => (
            <FavoriteCategoryButton
              key={category}
              title={category}
              onPress={() =>
                dispatch(
                  sendBookmarkData({ ids: favoriteIds, categories: [category] })
                )
              }
            />
          ))}
          {showNewCategoryInput ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={newCategory}
                onChangeText={handleCategoryInputChange}
                placeholder="추가하실 폴더명을 입력해주세요."
              />
              <TouchableOpacity onPress={handleSaveCategory}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAddCategoryPress}>
              <Image
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/88b67bfb-585b-43e1-b49d-643690665248/image.png",
                  width: 61,
                  height: 61,
                }}
                style={{
                  marginTop: 21,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  screen: {
    flex: 1,
    width: "100%",
  },
  buttonsContainer: {
    alignItems: "center",
    marginTop: 35,
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
  buttonText: {
    fontSize: 16,
    left: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    width: 150,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 322,
    height: 42,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    borderWidth: 0.8,
    borderColor: "#C0C0C0",
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3",
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFB15F",
  },
});

export default FavoriteScreen;
