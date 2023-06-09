import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../common/Header";
import ContentBox from "../../common/ContentBox";
import ModalComponent from "../../common/ModalComponent";
import SortButton from "../../common/SortButton";
import BackButton from "../../common/BackButton";

const SearchResult = ({ route }) => {
  const { searchText, searchType } = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderByDistance, setOrderByDistance] = useState(false);

  const navigation = useNavigation();

  const handleResultPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDefaultSort = () => {
    setOrderByDistance(false);
  };

  const toggleOrderByDistance = () => {
    setOrderByDistance(!orderByDistance);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const orderBy = orderByDistance ? "distance" : "reviewCount";

        const url =
          searchType === "상호명"
            ? `http://3.38.33.21:8080/api/shops/search?latitude=37.60264&longitude=126.924805&shopName=${searchText}&page=0&size=10&orderBy=${orderBy}`
            : `http://3.38.33.21:8080/api/shops/search?latitude=37.602643&longitude=126.924805&menuName=${searchText}&page=0&size=10&orderBy=${orderBy}`;

        const response = await fetch(url);
        const data = await response.json();

        let sortedResults = data.data.content;
        if (orderByDistance) {
          sortedResults = sortedResults.sort((a, b) => a.distance - b.distance);
        }
        setSearchResults(sortedResults);
      } catch (error) {
        console.error("검색 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText, orderByDistance]);

  useEffect(() => {
    handleDefaultSort(); // 컴포넌트가 마운트될 때 기본적으로 "기본순"으로 설정
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 설정

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Header height={139} style={styles.header} />
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <BackButton onPress={handleGoBack} />
          <TouchableOpacity onPress={handleResultPress} style={styles.whitebox}>
            <Text style={styles.searchtext}>{searchText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttoncontainer}>
          <SortButton
            label={"기본순"}
            onPress={handleDefaultSort}
            active={!orderByDistance}
          ></SortButton>
          <SortButton
            label={"거리순"}
            onPress={toggleOrderByDistance}
            active={orderByDistance}
          ></SortButton>
          {/* 인기순과 배달빠른순은 미구현 상태*/}
          <SortButton label={"인기순"}></SortButton>
          <SortButton label={"배달빠른순"}></SortButton>
        </View>
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
          ListEmptyComponent={() => (
            <View style={styles.noresultContainer}>
              <Text style={styles.noresult}>검색 결과가 없습니다.</Text>
            </View>
          )}
        />
      </View>
      <ModalComponent modalVisible={modalVisible} closeModal={closeModal} />
    </>
  );
};
export default SearchResult;

const windowHeight = Dimensions.get("window").height; // 화면의 높이

const styles = StyleSheet.create({
  noresult: {
    width: 193,
    height: 23,
    left: 25,
    fontWeight: 500,
    fontSize: 16,
    color: "#AFAFAF",
  },
  header: {
    zIndex: 1,
  },
  container: {
    height: windowHeight - 80,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: -10,
  },
  whitebox: {
    height: 39,
    top: -70,
    left: 77,
    width: 259,
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
  },
  searchtext: {
    fontWeight: "500",
    fontSize: 16,
    left: 16,
  },
  resultbox: {
    elevation: 3,
    marginBottom: 20,
    alignItems: "center",
  },
  noresultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250, // 이 부분을 수정하여 메시지가 화면에서 보이도록 조정
  },
});
