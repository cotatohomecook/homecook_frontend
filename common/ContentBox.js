import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import StarRating from "./StarRating";

const ContentBox = ({
  width,
  height,
  imgUrl,
  title,
  detail,
  rating,
  handleToggleFavorite,
  isFavorite,
  imageUri,
}) => {
  const formattedRating = Number.isInteger(rating) ? `${rating}.0` : rating;

  return (
    <View style={[styles.container, { width, height }]}>
      <Image source={{ uri: imgUrl, width: 93, height: 93 }} />
      <View style={styles.textContainer}>
        <Text style={styles.resultText}>{title}</Text>
        <Text style={styles.detailText}>대표 메뉴: {detail}</Text>
        {rating !== undefined && rating !== null && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>최근 평점:</Text>
            <Text style={styles.ratingNum}>{formattedRating}</Text>
            <View style={styles.ratingStar}>
              <StarRating rating={rating} width={65} height={12} />
            </View>
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Image
                style={styles.bookmark}
                source={{
                  uri: imageUri,
                  width: 34.7,
                  height: 33,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    marginLeft: 12,
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 14,
    top: 10,
  },
  resultText: {
    width: 244,
    height: 23,
    fontWeight: "bold",
    fontSize: 18,
  },
  detailText: {
    width: 153,
    height: 22,
    fontWeight: "600",
    fontSize: 12,
    top: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
  },
  ratingText: {
    fontWeight: "600",
    fontSize: 12,
  },
  ratingNum: {
    width: 25,
    height: 20,
    color: "#FF911D",
    fontWeight: "900",
    left: 10,
  },
  ratingStar: {
    top: 9,
    left: 10,
  },
  bookmark: {
    left: 120,
    top: -5,
  },
});

export default ContentBox;
