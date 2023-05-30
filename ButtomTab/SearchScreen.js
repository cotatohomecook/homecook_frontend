import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = ({ closeModal }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchByMenu, setIsSearchByMenu] = useState(false);
  const [isSearchByShopName, setIsSearchByShopName] = useState(false);

  // 검색 기록 초기화
  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory([]);
    } catch (error) {
      console.error("검색 기록 초기화 에러:", error);
    }
  };

  // 검색 기록 불러오기
  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error("검색 기록 불러오기 에러:", error);
    }
  };

  // 검색 기록 저장하기
  const saveSearchHistory = async (keyword) => {
    try {
      const updatedHistory = [...searchHistory, keyword];
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error("검색 기록 저장하기 에러:", error);
    }
  };

  const handleSearch = async () => {
    try {
      saveSearchHistory(searchText);
      const response = await fetch(
        `http://3.38.33.21:8080/api/shops/search?latitude=37.60264&longitude=126.924805&shopName=${searchText}&page=0&size=10&orderBy=distance`
      );
      const data = await response.json();
      setSearchResults(data.data.content);
    } catch (error) {
      console.error("검색 에러:", error);
    }
  };
  useEffect(() => {
    // 검색 기록 불러오기
    loadSearchHistory();
  }, []);

  return (
    <>
      <TextInput
        placeholder="검색어를 입력하세요"
        style={styles.searchWord}
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e0e0e0" }}
        cancelButtonProps={{ buttonTextStyle: { color: "gray" } }}
      />
      <View>
        <FlatList
          data={searchHistory}
          renderItem={({ item }) => (
            <Text style={styles.searchHistory}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.searchHistoryContainer}
        />
        <Text onPress={clearSearchHistory}>검색 기록 초기화</Text>
      </View>
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchWord: {
    width: 175,
    height: 26,
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#afafaf",
    left: 66,
    top: 12,
  },
  searchHistory: {
    width: 52,
    height: 40,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#7d7d7d",
    paddingVertical: 5,
  },
});
