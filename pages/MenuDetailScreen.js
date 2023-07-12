import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../common/Header";
import { useRoute } from "@react-navigation/native";
import OrderButton from "../common/OrderButton";
import {
  addToCart,
  shopInfoActions,
  updateCartItem,
} from "../store/redux/shopInfo";
import BackButton from "../common/BackButton";
import { useNavigation } from "@react-navigation/native";
import ShopScreen from "./ShopScreen";

const MenuDetailScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.shopInfo.quantity);
  const cart = useSelector((state) => state.shopInfo.cart);
  const navigation = useNavigation();

  const { shopId, shopName, menuName, imageUrl, description, price, menuId } =
    route.params;

  const handleIncreaseQuantity = () => {
    dispatch(shopInfoActions.increaseQuantity());
  };

  const handleDecreaseQuantity = () => {
    dispatch(shopInfoActions.decreaseQuantity());
  };

  const handleAddToCart = () => {
    const cartItem = {
      shopName: shopName,
      shopId: shopId,
      menuId: menuId,
      menuName: menuName,
      quantity: quantity,
      price: price,
      imageUrl: imageUrl,
    };
    console.log("추가된 카트 아이템:", cartItem);

    const existingItemIndex = cart.findIndex(
      (item) => item.menuName === cartItem.menuName
    );

    if (existingItemIndex !== -1) {
      const existingItem = cart[existingItemIndex];
      const updatedQuantity = existingItem.quantity + cartItem.quantity;
      dispatch(updateCartItem(existingItemIndex, cartItem.quantity));
    } else {
      dispatch(addToCart(cartItem));
    }

    navigation.navigate("ShopScreen", { shopId: shopId });
  };

  const handleGoBack = () => {
    navigation.navigate("ShopScreen", { shopId: shopId });
  };

  return (
    <>
      <Header title={shopName} height={114} />
      <BackButton top={-45} onPress={handleGoBack} />
      <ScrollView>
        <View style={styles.menuBox}>
          <Image
            style={styles.menuImg}
            source={{ uri: imageUrl, width: 270, height: 270 }}
          />
          <Text style={styles.menuName}>{menuName}</Text>
          <Text style={styles.menuDetail}> {description}</Text>
        </View>

        <View style={styles.quantityBox}>
          <Text style={styles.quantityText}>수량 :</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecreaseQuantity}
              style={styles.minusButton}
            >
              <Text style={styles.minusText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}개</Text>
            <TouchableOpacity
              onPress={handleIncreaseQuantity}
              style={styles.plusButton}
            >
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.priceText}> 가격 : </Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.orderButton}>
          <OrderButton
            color={"#FFB15F"}
            title={"내 식탁에 담기"}
            onPress={handleAddToCart}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default MenuDetailScreen;

const styles = StyleSheet.create({
  menuBox: {
    width: 369,
    height: 410,
    marginLeft: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  menuImg: {
    borderRadius: 17,
    alignItems: "center",
    marginLeft: 35,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000000",
  },
  menuName: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 40,
    fontWeight: 500,
  },
  menuDetail: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
  quantityBox: {
    width: 369,
    height: 75,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    marginLeft: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    width: 120,
    height: 33,
    marginTop: -30,
    marginLeft: 230,
    backgroundColor: "#F9F9F9",
    borderRadius: 9,
    elevation: 5,
  },
  quantityText: {
    marginTop: 28,
    marginLeft: 80,
    fontSize: 16,
    fontWeight: 600,
  },
  priceBox: {
    width: 369,
    height: 75,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    marginTop: 29,
    marginLeft: 12,
  },
  quantityButton: {
    left: 223,
    top: -30,
    width: 118,
    height: 33,
    borderRadius: 9,
    backgroundColor: "#F9F9F9",
    elevation: 9,
  },
  minusButton: {
    left: 10,
    top: 4,
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    elevation: 5,
  },
  plusButton: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#F9F9F9",
    elevation: 5,
    left: 37,
    top: 4,
  },
  minusText: {
    fontSize: 30,
    left: 8,
    top: -10,
  },
  plusText: {
    fontSize: 20,
    left: 7,
    top: -2,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 500,
    left: 25,
    top: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 600,
    left: 75,
    top: 27,
  },
  price: {
    fontSize: 16,
    fontWeight: 600,
    left: 270,
    top: 3,
  },
  orderButton: {
    top: -30,
  },
});
