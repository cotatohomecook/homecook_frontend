import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function CustomerStoreSlide() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const scrollViewRef = useRef(null);
  const { width: screenWidth } = Dimensions.get("window");
  const itemWidth = 160;
  const itemMargin = 10;
  const visibleItemCount = Math.floor(
    screenWidth / (itemWidth + itemMargin * 2)
  );

  const fetchNews = async () => {
    try {
      setError(null);
      setLoading(true);
      setNews([]);

      const response = await axios.get(
        "http://3.38.33.21:8080/api/shops/random?latitude=37.602643&longitude=126.924805"
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

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (itemWidth + itemMargin * 2));
    const fractionalOffset =
      contentOffsetX / (itemWidth + itemMargin * 2) - index;

    if (fractionalOffset >= 0.8 && index < news.length - 1) {
      setFocusedIndex(index + 1);
    } else {
      setFocusedIndex(index);
    }
  };

  useEffect(() => {
    if (
      scrollViewRef.current &&
      focusedIndex >= 0 &&
      focusedIndex < news.length
    ) {
      const offset = focusedIndex * (itemWidth + itemMargin * 2);
      const maxOffset = Math.max(
        0,
        news.length * (itemWidth + itemMargin * 2) - screenWidth
      );
      const finalOffset = Math.min(maxOffset, offset);
      scrollViewRef.current.scrollTo({ x: finalOffset, animated: true });
    }
  }, [focusedIndex, news]);

  if (loading)
    return (
      <View style={{ margin: 50, width: 300, height: 200 }}>
        <Text>로딩 중..</Text>
      </View>
    );
  if (error)
    return (
      <View style={{ margin: 50, width: 300, height: 200 }}>
        <Text>에러가 발생했습니다.</Text>
      </View>
    );
  if (!news.length) return null;

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
    >
      {news.map((item, index) => (
        <View
          key={index}
          style={[
            styles.square,
            { width: itemWidth },
            index === focusedIndex
              ? styles.focusedSquare
              : styles.unfocusedSquare,
          ]}
        >
          <Pressable>
            <Image
              style={styles.image}
              source={{ uri: item.imageUrl, width: 141, height: 90, top: -10 }}
            />
            <Text style={styles.label1}>{item.shopName}</Text>
            <Text style={styles.label2}>{item.bestMenuName}</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

export default CustomerStoreSlide;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
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
  focusedSquare: {
    opacity: 0.9,
  },
  unfocusedSquare: {
    opacity: 0.1,
  },
  label1: {
    position: "absolute",
    width: 79,
    height: 19,
    left: 30,
    top: 80,
    fontWeight: 700,
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
    fontWeight: 500,
    fontSize: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  image: {
    top: -20,
    //////
    /////
  },
});
