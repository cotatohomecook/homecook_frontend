import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import ModalComponent from "../../common/ModalComponent";
import SortButton from "../../common/SortButton";
import BackButton from "../../common/BackButton";
import SearchResultList from "./SearchResultList";
import { useDispatch } from "react-redux";
import { fetchSearchResults } from "../../store/redux/searchResult";

const SearchResult = ({ route }) => {
  const { searchText, searchType } = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderByDistance, setOrderByDistance] = useState(false);
  const [orderBy, setOrderBy] = useState("distance");
  const searchResults = useSelector(
    (state) => state.searchResult.searchResults
  );
  const loading = useSelector((state) => state.searchResult.loading);
  const navigation = useNavigation();

  const handleResultPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleOrderByDistance = () => {
    setOrderByDistance(!orderByDistance);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDefaultSorted = () => {
    setOrderBy("distance");
    setOrderByDistance(false);
  };

  useEffect(() => {
    dispatch(
      fetchSearchResults({
        searchText: searchText,
        searchType: searchType,
        currentPage: 0,
        orderBy: orderBy,
      })
    );
  }, [searchText, searchType, orderBy]);

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
          <BackButton onPress={handleGoBack} top={-58} />
          <TouchableOpacity onPress={handleResultPress} style={styles.whitebox}>
            <Text style={styles.searchtext}>{searchText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttoncontainer}>
          <SortButton
            label={"거리순"}
            onPress={() => setOrderBy("distance")}
            active={orderByDistance}
          ></SortButton>
          <SortButton
            label={"주문수"}
            onPress={() => setOrderBy("orderCount")}
          ></SortButton>
          <SortButton
            label={"리뷰순"}
            onPress={() => setOrderBy("reviewCount")}
          ></SortButton>
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.shopId}
          renderItem={({ item }) => (
            <SearchResultList item={item} searchText={searchText} />
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

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
  },
  container: {
    height: windowHeight - 145,
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
  noresultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
  },
  noresult: {
    width: 193,
    height: 23,
    left: 25,
    fontWeight: 500,
    fontSize: 16,
    color: "#AFAFAF",
  },
});
