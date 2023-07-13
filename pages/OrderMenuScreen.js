import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import MenuQuantity from "../common/menuQuantity";
import { useNavigation } from "@react-navigation/native";
import OrderButton from "../common/OrderButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderMenuScreen = () => {
  const cart = useSelector((state) => state.shopInfo.cart);
  const [inputAddress, setInputAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState(null);

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.navigate("ShopScreen", { shopId: cart[0].shopId });
  };

  const itemPrice = cart.map((item) => item.price * item.quantity);
  const totalPrice = itemPrice.reduce((sum, price) => sum + price, 0);
  const myTableHeight = cart.length * 180 + 60;

  const handleAddressChange = (text) => {
    setInputAddress(text);
  };

  const handleAddCart = () => {
    navigation.navigate("ShopScreen", { shopId: cart[0].shopId });
  };

  const handleSaveAddress = async () => {
    try {
      await AsyncStorage.setItem("deliveryAddress", inputAddress);
      setCurrentAddress(inputAddress);
    } catch (error) {
      console.log("Failed to save address:", error);
    }
  };

  const handleOrderPress = () => {
    const orderMenus = cart.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
    }));
    navigation.navigate("PaymentScreen", {
      shopId: cart[0].shopId,
      totalPrice: totalPrice,
      orderMenus: orderMenus,
      deliveryAddress: currentAddress,
    });
  };

  useEffect(() => {
    const fetchDeliveryAddress = async () => {
      const savedAddress = await AsyncStorage.getItem("deliveryAddress");
      if (savedAddress) {
        setCurrentAddress(savedAddress);
      }
    };

    fetchDeliveryAddress();
  }, []);

  return (
    <>
      <Header title={cart[0].shopName} height={114} />
      <BackButton top={-45} onPress={handleGoBack} />
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.myTable, { height: myTableHeight }]}>
            <Text style={styles.myTableText}>내 식탁</Text>
            {cart.map((item, index) => (
              <View key={item.menuId} style={styles.menuContainer}>
                <Image
                  style={styles.menuImage}
                  source={{ uri: item.imageUrl, width: 139, height: 139 }}
                />
                <Image
                  source={{
                    uri: "https://velog.velcdn.com/images/kkaerrung/post/66392ed4-5892-485b-9200-61bca8f4ab79/image.png",
                  }}
                />
                <View style={styles.menuContainer}>
                  <Text style={styles.menuName}>{item.menuName}</Text>
                  <View style={styles.description}>
                    <View style={styles.separation} />
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityText}>수량: </Text>
                      <MenuQuantity quantity={item.quantity} />
                    </View>
                    <View style={styles.itemPriceContainer}>
                      <Text style={styles.itemPrice}>가격:</Text>
                      <Text style={styles.itemPriceText}>
                        {itemPrice[index]} 원
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={handleAddCart}>
            <Image
              style={styles.addCartButton}
              source={{
                uri: "https://velog.velcdn.com/images/kkaerrung/post/fb09c0d3-179f-43da-b5bf-dde85b4be734/image.png",
                width: 65,
                height: 65,
              }}
            ></Image>
          </TouchableOpacity>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>총금액: </Text>
            <Text style={styles.totalPrice}>{totalPrice} 원</Text>
            <View style={styles.separationLine} />
          </View>
          <View style={styles.delivery}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.deliveryText}>배달받을 주소 입력하기</Text>
            </View>

            {currentAddress == null ? (
              <View style={styles.location}>
                <Text style={styles.locationText}>
                  주소를 입력해주세요{"  "}
                  <Image
                    source={{
                      uri: "https://velog.velcdn.com/images/kkaerrung/post/d51c9b99-6f02-4ff6-831c-7925a8d78dad/image.png",
                      width: 13,
                      height: 13,
                    }}
                  />
                </Text>
                <View style={styles.locationInput}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="상세주소 입력하기"
                    value={inputAddress}
                    onChangeText={handleAddressChange}
                  />
                </View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveAddress}
                >
                  <Text style={styles.saveText}>저장하기</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.location}>
                <Text style={styles.locationText}>
                  {currentAddress}{" "}
                  <Image
                    source={{
                      uri: "https://velog.velcdn.com/images/kkaerrung/post/d51c9b99-6f02-4ff6-831c-7925a8d78dad/image.png",
                      width: 13,
                      height: 13,
                    }}
                  />
                </Text>
                <View style={styles.locationInput}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"수정할 주소를 입력해주세요"}
                    value={inputAddress}
                    onChangeText={handleAddressChange}
                  />
                </View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveAddress}
                >
                  <Text style={styles.saveText}>수정하기</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.orderButton}>
            <OrderButton
              title={"주문 완료하기"}
              color={"#FFB15F"}
              onPress={handleOrderPress}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 12,
  },
  myTable: {
    width: 369,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 30,
  },
  myTableText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    top: 20,
    paddingBottom: 30,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  menuImage: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#000000",
    width: 139,
    height: 139,
    left: 15,
  },
  menuName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    left: 68,
    top: -40,
  },
  separation: {
    width: 160,
    height: 1,
    marginLeft: -100,
    marginTop: 5,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  description: {
    flexDirection: "column",
    alignItems: "center",
    top: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: -50,
    marginTop: 10,
  },
  quantityText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    marginRight: 10,
    marginTop: 10,
  },
  itemPriceContainer: { flexDirection: "row", marginTop: 10 },
  itemPrice: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: -110,
  },
  itemPriceText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 70,
  },
  addCartButton: {
    marginLeft: 150,
    marginTop: -15,
  },
  secondContainer: {
    flex: 1,
    marginLeft: 10,
  },
  priceBox: {
    width: 369,
    height: 108,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 13,
    marginTop: 15,
  },
  priceText: {
    marginTop: 14,
    marginLeft: 26,
    fontSize: 17,
    fontWeight: 700,
  },
  separationLine: {
    borderWidth: 0.5,
    width: 318,
    marginLeft: 26,
  },
  totalPrice: {
    marginLeft: 256,
    marginTop: 30,
    fontWeight: 500,
    fontSize: 18,
  },
  delivery: {
    width: 369,
    height: 210,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  deliveryText: {
    fontSize: 17,
    fontWeight: 700,
    marginLeft: 26,
    marginTop: 11,
  },
  location: {
    width: 333,
    height: 150,
    marginLeft: 17,
    marginTop: 9,
    borderRadius: 10,
    backgroundColor: "#E9E9E9",
  },
  locationText: {
    width: 280,
    marginTop: 15,
    marginLeft: 19,
    color: "#000000",
    fontSize: 15,
    fontWeight: 500,
  },
  textInput: {
    width: 260,
    marginLeft: 20,
    marginTop: 5,
  },
  locationButtonText: {
    fontSize: 9,
    fontWeight: 600,
    marginLeft: 10,
    marginTop: 2,
  },
  locationInput: {
    width: 307,
    height: 80,
    marginTop: 10,
    marginLeft: 13,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    width: 80,
    height: 30,
    marginLeft: 230,
    borderRadius: 20,
    backgroundColor: "#E9E9E9",
    marginTop: -40,
  },
  saveText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  orderButton: {
    top: -30,
    left: -10,
  },
});

export default OrderMenuScreen;
