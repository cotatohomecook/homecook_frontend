import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import ContentBox from "../../common/ContentBox";

const SearchResult = ({ route }) => {
  const { searchText, searchType } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true); // 로딩 상태를 true로 설정

        const url =
          searchType === "상호명"
            ? `http://3.38.33.21:8080/api/shops/search?latitude=37.60264&longitude=126.924805&shopName=${searchText}&page=0&size=10&orderBy=distance`
            : `http://3.38.33.21:8080/api/shops/search?latitude=37.602643&longitude=126.924805&menuName=${searchText}&page=0&size=10&orderBy=reviewCount`;

        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data.data.content);
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
    <>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.shopId}
        renderItem={({ item }) => (
          <View style={styles.resultbox} key={item.shopId}>
            <ContentBox
              width={371}
              height={116}
              imgUrl={item.imageUrl}
              title={item.shopName}
              detail={item.bestMenuName}
              rating={item.rating}
            ></ContentBox>
          </View>
        )}
      />
    </>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  resultbox: {
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
  },
});
