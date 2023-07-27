import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerStoreRank() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchNews = async () => {
    try {
      setError(null);
      setLoading(true);

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
    if (news.length > 0) {
      const validIndex = currentIndex % news.length;
      setCurrentUser({
        ...news[validIndex],
        ranking: validIndex + 1,
      });
    }
  }, [currentIndex, news]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <View style={{ maginTop: -50, width: 300, height: 200 }}>
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
    <View style={styles.newsContainer}>
      {currentUser && (
        <View style={styles.companyHeader}>
          <Text>
            {currentUser.ranking}위&nbsp; {currentUser.shopName}
          </Text>
        </View>
      )}
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
