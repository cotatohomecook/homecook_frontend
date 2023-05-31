import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

const SearchScreen = ({ closeModal }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchType, setSearchType] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "상호명", value: "상호명" },
    { label: "메뉴명", value: "메뉴명" },
  ]);

  // 검색 기록 초기화
  const clearSearchHistory = async () => {
    try {
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
      const updatedHistory = [...searchHistory, { keyword, searchType }];
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

      setSearchText(""); // 검색 완료 후에 검색어 리셋
    } catch (error) {
      console.error("검색 에러:", error);
    }
  };

  const handleDropdownChange = (selectedValue) => {
    setSearchType(selectedValue);
  };

  useEffect(() => {
    // 검색 기록 불러오기
    loadSearchHistory();
  }, []);

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="필터"
        style={styles.dropdown}
        onChangeValue={handleDropdownChange}
      />
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
      <View style={styles.history}>
        <FlatList
          data={searchHistory.filter((item) => item.searchType === searchType)} // 검색 타입에 맞게 필터링
          renderItem={({ item }) => <Text>{item.keyword}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.clearbutton} onPress={clearSearchHistory}>
          검색 기록 초기화
        </Text>
        <Text onPress={closeModal}>close</Text>
      </View>
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
    top: 100,
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
    top: 120,
  },
  clearbutton: {
    top: 190,
  },
  closebutton: {
    top: 200,
  },
  dropdown: {},
  history: {
    top: 100,
  },
});
