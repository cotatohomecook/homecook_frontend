import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import LocationText from "../Places/LocationText";

const CustomerStoreCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [showCategoryData, setShowCategoryData] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리
  const [initialLoad, setInitialLoad] = useState(false); // 초기 로드 여부

  const pageSize = 10;

  const handleButtonPress = async (category) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);

    try {
      let BACKEND_URL =
        "http://3.38.33.21:8080/api/shops/list?latitude=37.602643&longitude=126.924805&page=0&size=" +
        pageSize;
      let url = "";

      switch (category) {
        case "korean":
          url = BACKEND_URL + "&category=한식";
          break;
        case "chinese":
          url = BACKEND_URL + "&category=중식";
          break;
        case "western":
          url = BACKEND_URL + "&category=양식";
          break;
        case "all":
        default:
          url = BACKEND_URL + "&category=통합";
          break;
      }

      const response = await axios.get(url);
      setCategoryData(response.data.data.content);
      setShowCategoryData(true);
      setSelectedCategory(category);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (!initialLoad) {
      handleButtonPress("all"); // 초기 로드 시 디폴트로 '통합' 버튼 클릭
      setInitialLoad(true);
    }
  }, [initialLoad]);

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleButtonPress("all")}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                selectedCategory === "all" ? "#ffb15f" : "#ffddb9",
            },
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>통합</Text>
        </Pressable>

        <Pressable
          onPress={() => handleButtonPress("korean")}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                selectedCategory === "korean" ? "#ffb15f" : "#ffddb9",
            },
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>한식</Text>
        </Pressable>

        <Pressable
          onPress={() => handleButtonPress("chinese")}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                selectedCategory === "chinese" ? "#ffb15f" : "#ffddb9",
            },
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>중식</Text>
        </Pressable>

        <Pressable
          onPress={() => handleButtonPress("western")}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                selectedCategory === "western" ? "#ffb15f" : "#ffddb9",
            },
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>양식</Text>
        </Pressable>
      </View>

      <View style={styles.gray}>
        <View style={styles.localtextContainer}>
          <Text style={styles.localtext}>
            <LocationText />
          </Text>
        </View>

        <Text style={styles.text}>의 집밥 랭킹</Text>
        {showCategoryData && (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
          >
            {categoryData.map((item) => (
              <View style={styles.mapcontainer} key={item.shopId}>
                <Image
                  style={styles.imagecontainer}
                  source={{
                    uri: "https://velog.velcdn.com/images/kkaerrung/post/f2d4402d-d080-4f7b-abc7-a595fe44f2f5/image.png",
                    width: 100,
                    height: 100,
                  }}
                />
                <View style={styles.rowcontainer}>
                  <Text style={styles.name}>{item.shopName}</Text>
                  <Text style={styles.bestmenu}>{item.bestMenuName} </Text>
                  <Text style={styles.price}>{item.bestMenuPrice}원</Text>
                  <Image
                    style={styles.imagehome}
                    source={{
                      uri: "https://velog.velcdn.com/images/kkaerrung/post/92931914-3138-4031-aeab-c3aafd8772ee/image.png",
                      width: 11,
                      height: 13,
                      top: 57,
                      left: 305,
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default CustomerStoreCategory;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
    zIndex: 5,
    top: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 4,
    zIndex: 4,
    width: 69,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#ffb15f",
  },
  buttonPressed: {
    backgroundColor: "#d5d5d5",
  },
  buttonText: {
    width: 23,
    height: 17,
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  infoContainer: {
    marginTop: 10,
  },
  mapcontainer: {
    marginBottom: 10,
    flexDirection: "row",
    width: 327,
    height: 127,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  gray: {
    top: 30,
    left: 20,
    width: 350,
    height: 651,
    borderRadius: 24,
    backgroundColor: "#ebebeb",
  },
  text: {
    width: 161.5,
    height: 40,
    left: 155,
    top: 16,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
  },
  localtext: {
    position: "absolute",
    width: 161.46,
    height: 26.89,
    left: 94.3,
    top: 16,
    fontWeight: "bold",
    fontSize: 20,
    color: "#3D67FF",
  },
  name: {
    width: 113,
    height: 23,
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    left: 28,
    top: 14,
  },
  bestmenu: {
    top: 19,
    left: 28,
    width: 100,
    height: 12,
    fontSize: 10,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
  },
  rowcontainer: {
    flexDirection: "column",
  },
  price: {
    top: 58,
    left: 28,
    width: 76,
    height: 17,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
  },
  imagecontainer: {
    top: 14,
    left: 17,
  },
  scroll: {
    left: 11,
    top: 10,
  },
  imagehome: {
    top: 6,
    left: 200,
  },
  scrollContent: {
    paddingBottom: 400, // 필요한 경우 아래쪽 패딩을 추가하여 맨 마지막 아이템이 가려지지 않도록 함
  },
});
