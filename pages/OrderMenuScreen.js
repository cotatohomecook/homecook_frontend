import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { setAddress } from "../store/redux/shopInfo";
import { postData } from "../store/redux/shopInfo";

const OrderMenuScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shopInfo.cart);
  const address = useSelector((state) => state.shopInfo.address);
  const [inputAddress, setInputAddress] = useState("");

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

  const handleSaveAddress = () => {
    dispatch(setAddress(inputAddress));
  };

  const handleOrderPress = () => {
    const orderMenus = cart.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
    }));

    const data = {
      shopId: cart[0].shopId,
      orderMenus: orderMenus,
      deliveryAddress: address,
    };

    dispatch(postData(data)).then(() => {
      navigation.navigate("PaymentScreen", { totalPrice: totalPrice });
    });
  };
  return (
    <>
      <Header title={cart[0].shopName} height={114} />
      <BackButton top={-45} onPress={handleGoBack} />
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.myTable, { height: myTableHeight }]}>
            <Text style={styles.myTableText}>내 식탁</Text>
            {cart.map((item, index) => (
              <View key={index} style={styles.menuContainer}>
                <Image
                  style={styles.menuImage}
                  source={{ uri: item.imageUrl, width: 139, height: 139 }}
                ></Image>
                <Image
                  source={{
                    uri: "https://velog.velcdn.com/images/kkaerrung/post/66392ed4-5892-485b-9200-61bca8f4ab79/image.png",
                  }}
                />
                <Text style={styles.menuName}>{item.menuName}</Text>
                <View style={styles.description}>
                  <View style={styles.separation} />
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>수량: </Text>
                    <MenuQuantity quantity={item.quantity}></MenuQuantity>
                  </View>
                  <Text style={styles.price}>가격: {itemPrice[index]}원</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>총금액: </Text>
            <Text style={styles.totalPrice}>{totalPrice} 원</Text>
            <View style={styles.separationLine} />
          </View>
          <View style={styles.delivery}>
            <Text style={styles.deliveryText}>배달받을 주소 입력하기</Text>
            {address === null ? (
              <View style={styles.location}>
                <Text style={styles.locationText}>
                  주소를 입력해주세요.
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
                  {address}
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
              </View>
            )}
          </View>
          <View style={styles.orderButton}>
            <OrderButton
              title={"주문 완료하기"}
              color={"#FFB15F"}
              onPress={handleOrderPress}
            ></OrderButton>
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
    marginLeft: -55,
    marginTop: -15,
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
  },
  quantityText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    marginRight: 10,
  },
  price: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    left: -95,
    top: 20,
  },
  secondContainer: {
    flex: 1,
  },
  priceBox: {
    width: 369,
    height: 108,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 13,
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
    height: 189,
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
    height: 132,
    marginLeft: 17,
    marginTop: 9,
    borderRadius: 10,
    backgroundColor: "#E9E9E9",
  },
  locationText: {
    marginTop: 20,
    marginLeft: 19,
    color: "#000000",
    fontSize: 15,
    fontWeight: 500,
  },
  textInput: {
    marginLeft: 20,
    marginTop: 5,
  },
  locationInput: {
    width: 307,
    height: 66,
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
