import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerStoreRank() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); //초깃값을 0으로 설정함

  const fetchNews = async () => {
    try {
      setError(null);
      setLoading(true);
      setNews([]);

      const response = await axios.get(
        "http://3.38.33.21:8080/api/shops/rank?latitude=37.602643&longitude=126.924805"
      );

      setNews(response.data.data);
      setCurrentIndex(0);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 2000);

    return () => clearInterval(interval); // setIntervar을 사용하여 반복 작업을 정지하는 역할
  }, []);

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

  const currentUser = {
    ...news[currentIndex % news.length],
    ranking: currentIndex + 1,
  }; // 현재 보여줄 사용자 정보를 선택하는 코드

  return (
    <View style={styles.newsContainer}>
      <View style={styles.companyHeader}>
        <Text>
          {currentUser && currentUser.ranking}위&nbsp;{" "}
          {currentUser && currentUser.shopName}
        </Text>
      </View>
    </View>
  );
}

export default CustomerStoreRank;

const styles = StyleSheet.create({
  newsContainer: {
    width: 100,
    height: 300,
    top: -1,
    left: -10,
    fontWeight: 500,
    fontSize: 12,
    color: "#000000",
  },
  companyHeader: {
    backgroundColor: "#ffffff",
  },
});
