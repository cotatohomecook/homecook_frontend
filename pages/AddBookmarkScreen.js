import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import {
  addCategory,
  sendBookmarkData,
  resetBookmark,
  fetchBookmarkData,
} from "../store/redux/bookmark";
import { useDispatch, useSelector } from "react-redux";
import RegistrationModal from "../common/RegistrationModal";

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

const FavoriteScreen = ({ route }) => {
  const searchText = route.params && route.params.searchText;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteCategories = useSelector((state) => state.bookmark.categories);
  const favoriteIds = useSelector((state) => state.bookmark.ids);

  // / fetchBookmarkData를 디스패치하여 기존 카테고리 목록을 보이게 함
  useEffect(() => {
    dispatch(fetchBookmarkData());
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 뒤로가기
  const handleGoBack = () => {
    navigation.goBack();
  };

  // 폴더명 추가하는 입력 필드
  const handleAddCategoryPress = () => {
    setShowNewCategoryInput(!showNewCategoryInput);
  };

  //폴더명 저장
  const handleSaveCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
    setShowNewCategoryInput(false);
  };

  const handleCategoryInputChange = (text) => {
    setNewCategory(text);
  };

  //모달 확인 버튼을 눌렀을 때 이동
  const handleModalConfirm = () => {
    setIsModalVisible(false);
    navigation.navigate("BookmarkScreen");
  };

  //모달 취소 버튼을 눌렀을 때 이동
  const handleModalCancel = () => {
    setIsModalVisible(false);
    navigation.navigate("SearchResult", { searchText: searchText });
  };

  //폴더 클릭시 즐겨찾기 등록
  const handleCategoryPress = (category) => {
    setIsModalVisible(true);
    dispatch(resetBookmark());
    dispatch(sendBookmarkData({ ids: favoriteIds, categories: category }));
    console.log(favoriteIds), console.log(category);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity activeOpacity={0.8} style={styles.screen}>
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
              onPress={() => handleCategoryPress(category)}
            />
          ))}
          {/* 새로운 카테고리 추가 영역 표시 */}
          {showNewCategoryInput ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={newCategory}
                onChangeText={handleCategoryInputChange}
                placeholder="폴더명을 입력해주세요"
              />
              <TouchableOpacity onPress={handleSaveCategory}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAddCategoryPress}>
              <Image
                style={{ marginTop: 17 }}
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/88b67bfb-585b-43e1-b49d-643690665248/image.png",
                  width: 61,
                  height: 61,
                }}
              ></Image>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <RegistrationModal
        visible={isModalVisible}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
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
  saveButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFB15F",
  },
});

export default FavoriteScreen;
