import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import axios from "axios";

const latitude = 37.602643;
const longitude = 126.924805;
const itemWidth = 160;
const sliderWidth = Dimensions.get("window").width;

const { width } = Dimensions.get("window");

function CustomerStoreSlide() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const carouselRef = useRef(null);

  const fetchNews = async () => {
    try {
      setError(null);
      setLoading(true);
      setNews([]);

      const response = await axios.get(
        `http://3.38.33.21:8080/api/shops/random?latitude=${latitude}&longitude=${longitude}`
      );

      setNews(response.data.data);
      setFocusedIndex(0);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.square}>
      <Pressable>
        <Image
          style={styles.image}
          source={{ uri: item.imageUrl, width: 141, height: 90, top: -10 }}
        />
        <Text style={styles.label1}>{item.shopName}</Text>
        <Text style={styles.label2}>{item.bestMenuName}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={news}
        renderItem={renderItem}
        itemWidth={itemWidth}
        inactiveSlideOpacity={0.5}
        sliderWidth={width}
        firstItem={0}
      />
    </View>
  );
}

export default CustomerStoreSlide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 130,
    left: 50,
  },
  square: {
    width: 160,
    height: 160,
    backgroundColor: "#FFB15F",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  label1: {
    position: "absolute",
    width: 79,
    height: 19,
    left: 30,
    top: 80,
    fontWeight: "700",
    fontSize: 13,
    color: "#FFFFFF",
    textAlign: "center",
  },
  label2: {
    position: "absolute",
    width: 39,
    height: 14,
    left: 50,
    top: 99,
    fontWeight: "500",
    fontSize: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  image: {
    top: -20,
  },
});
