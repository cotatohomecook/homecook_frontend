import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../store/redux/shopInfo";
import { useRoute } from "@react-navigation/native";
import Header from "../common/Header";
import ShopMenuInfo from "../common/ShopMenuInfo";
import BackButton from "../common/BackButton";
import { useNavigation } from "@react-navigation/native";
import OrderButton from "../common/OrderButton";
import { shopInfoActions } from "../store/redux/shopInfo";

const ShopScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { shopId, searchText, shopName } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(shopId));
    dispatch(shopInfoActions.setSearchText(searchText));
  }, [dispatch, shopId]);

  const shopInfo = useSelector((state) => state.shopInfo);
  const search = useSelector((state) => state.shopInfo.searchText);
  console.log(search);

  const handleGoBack = () => {
    console.log(search);
    navigation.navigate("SearchResult", {
      searchText: search,
      shopName: shopName,
      shopId: shopId,
    });
  };

  const handleOrder = () => {
    navigation.navigate("OrderMenuScreen", {
      shopName: shopName,
      shopId: shopId,
    });
  };

  if (shopInfo === undefined || !shopInfo || !shopInfo.data) {
    return <Text>Loading...</Text>;
  }
  const orderItemCount = shopInfo.cart.length;
  console.log(shopInfo.cart);

  return (
    <>
      <Header title={shopInfo.data.shopName} height={114} />
      <BackButton top={-45} onPress={handleGoBack}></BackButton>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Image
              source={{ uri: shopInfo.data.imageUrl }}
              style={{
                width: 324,
                height: 299,
                marginTop: 10,
                marginLeft: 17,
                borderRadius: 10,
              }}
            />
            <TouchableOpacity style={styles.receipt}>
              <Image
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/34e2da0c-30b0-4766-947d-0f67f90996f3/image.png",
                  width: 9,
                  height: 11,
                }}
              />
              <Text style={styles.receiptText}>재료 영수증 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.review}>
              <Image
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/f1778d6e-a13f-44a1-8f0f-d47079f8fe6d/image.png",
                  width: 11,
                  height: 11,
                }}
              />
              <Text style={styles.reviewText}>이 집의 리뷰</Text>
            </TouchableOpacity>
          </View>
          <ShopMenuInfo menus={shopInfo.data.menus} />
          <View style={styles.bottomSpace} />
        </View>
      </ScrollView>
      {orderItemCount > 0 ? (
        <>
          <View style={styles.orderedGuide}>
            <Text style={styles.orderedGuideText}>
              내 식탁에 넣어둔 주문이{" "}
              <Text style={styles.orderItemText}>{orderItemCount}건</Text>{" "}
              있어요.
            </Text>
          </View>
          <View style={styles.orderButton}>
            <OrderButton
              title={"주문하러 가기"}
              color={"#FFB15F"}
              onPress={handleOrder}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.orderGuide}>
            <Text style={styles.orderGuideText}>
              내 식탁에 넣어둔 주문이 없어요.
            </Text>
          </View>
          <View style={styles.orderButton}>
            <OrderButton title={"주문하러 가기"} color={"#C0C0C0"} />
          </View>
        </>
      )}
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    width: 362,
    height: 370,
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    marginLeft: 14,
    marginBottom: 18,
  },
  receipt: {
    width: 100,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    left: 240,
    top: 10,
  },
  review: {
    width: 94,
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    left: 240,
    top: 10,
  },
  receiptText: {
    marginLeft: 10,
    fontSize: 12,
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 12,
  },
  scrollView: {
    marginTop: -5,
  },
  bottomSpace: {
    height: 100,
  },
  orderedGuide: {
    position: "absolute",
    marginTop: 650,
    marginLeft: 44,
    width: 302,
    height: 26,
    borderRadius: 4,
    backgroundColor: "#FFFBA7",
  },
  orderedGuideText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
    color: "#000000",
  },
  orderItemText: {
    color: "#F16F57",
  },
  orderGuide: {
    position: "absolute",
    marginTop: 650,
    marginLeft: 44,
    width: 302,
    height: 26,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
  },
  orderGuideText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 500,
    textAlign: "center",
    color: "#FFFFFF",
  },
  orderButton: {
    position: "absolute",
    marginTop: 620,
  },
});
