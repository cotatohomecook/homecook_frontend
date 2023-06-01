import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const SearchResult = ({ route }) => {
  const { searchText, searchType } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true); // 로딩 상태를 true로 설정

        const url =
          searchType === "상호명"
            ? `http://3.38.33.21:8080/api/shops/search?latitude=37.60264&longitude=126.924805&shopName=${searchText}&page=0&size=10&orderBy=distance`
            : `http://3.38.33.21:8080/api/shops/map?latitude=37.602643&longitude=126.924805&menuName=${searchText}&page=0&size=10&orderBy=reviewCount`;

        const response = await fetch(url);
        const data = await response.json();

        setSearchResults(
          searchType === "상호명" ? data.data.content : data.data
        );
      } catch (error) {
        console.error("검색 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (searchResults.length === 0) {
    return <Text>검색 결과가 없습니다!</Text>;
  }

  return (
    <View>
      <Text>검색 결과:</Text>
      {searchResults.map((result) => (
        <Text key={result.shopId}>{result.shopName}</Text>
      ))}
      <Text>검색어: {searchText}</Text>
    </View>
  );
};

export default SearchResult;
