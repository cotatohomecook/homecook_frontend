import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "../common/Header";
import BackButton from "../common/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import OrderButton from "../common/OrderButton";
import CreditModalComponent from "../common/CreditModalComponent";
import ConfirmModal from "../common/ConfirmModal";
import { useDispatch } from "react-redux";
import { postData } from "../store/redux/shopInfo";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedText, totalPrice, shopId, orderMenus, deliveryAddress } =
    route.params;
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    setConfirmModalVisible(true);
  };

  const handleOrderPress = () => {
    const data = {
      shopId: shopId,
      orderMenus: orderMenus,
      deliveryAddress: deliveryAddress,
    };

    dispatch(postData(data));
  };

  const modalVisible = () => {
    setCardModalVisible(true);
  };

  const closeModal = () => {
    setCardModalVisible(false);
  };

  const onConfirm = () => {
    navigation.navigate("ShopScreen", { shopId: shopId });
  };

  const onCancel = () => {
    setConfirmModalVisible(false);
  };
  return (
    <>
      <Header title={"주문하기"} height={115} />
      <BackButton top={-45} onPress={handleGoBack} />
      <View style={styles.sortContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>결제수단</Text>
          <View style={styles.checkBox}>
            <Text style={styles.detail}>이전에 사용했던 결제수단</Text>
          </View>
          <View style={styles.account} />
          <Text style={styles.payment}>다른 결제수단 이용</Text>
          <View style={styles.credit}>
            <Text style={styles.creditText}>신용 / 체크카드</Text>
          </View>

          <TouchableOpacity style={styles.card} onPress={modalVisible}>
            <View style={styles.cardContainer}>
              <Image
                style={styles.cardImage}
                source={{
                  uri: "https://postfiles.pstatic.net/MjAyMzA3MDVfODkg/MDAxNjg4NTQ4MTM1MDQ4.94E78-s-FXJtrJofw8JFywsI5tyaTfGYgbpppGvUk0Qg.IdYhAsW9Ollb2yXC0htNU2gHVWiCxNInXW4frBMIetwg.PNG.jeongsi2468/image.png?type=w773",
                  width: 24,
                  height: 18,
                }}
              />
              {selectedText ? (
                <Text style={styles.cardText}>{selectedText}</Text>
              ) : (
                <Text style={styles.cardText}>
                  결제 가능한 카드를 선택해주세요.{" "}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>총 금액</Text>
            <Text style={styles.totalPrice}>{totalPrice} 원</Text>
            <View style={styles.seperation} />
          </View>
          <View style={{ marginLeft: -10 }}>
            <OrderButton
              title={"주문 완료하기"}
              color={"#FFB15F"}
              onPress={handleOrderPress}
            />
          </View>
        </View>
      </View>
      <CreditModalComponent
        modalVisible={cardModalVisible}
        closeModal={closeModal}
        totalPrice={totalPrice}
      />
      <ConfirmModal
        text={"다음에 주문하시겠습니까?"}
        onConfirm={onConfirm}
        onCancel={onCancel}
        modalVisible={confirmModalVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    alignItems: "center",
  },
  container: {
    width: 369,
    height: 381,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 25,
    marginTop: 20,
  },
  detail: {
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 25,
    marginTop: 17,
  },
  checkBox: {
    flexDirection: "row",
  },
  account: {
    width: 329,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E8E8E8",
    marginLeft: 20,
    marginTop: 13,
  },
  payment: {
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 25,
    marginTop: 16,
  },
  credit: {
    width: 329,
    height: 52,
    borderWidth: 0.4,
    borderColor: "#000000",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    marginLeft: 20,
  },
  creditText: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 23,
    marginTop: 15,
  },
  card: {
    width: 330,
    height: 52,
    borderWidth: 0.5,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginLeft: 20,
    marginTop: 13,
  },
  totalPriceContainer: {
    width: 369,
    height: 106,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginTop: 70,
  },
  totalPriceText: {
    fontSize: 17,
    fontWeight: 700,
    marginLeft: 26,
    marginTop: 14,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 266,
    marginTop: 20,
  },
  seperation: {
    width: 318,
    borderWidth: 0.5,
    marginLeft: 26,
  },
  cardText: {
    marginLeft: 8,
  },
  cardContainer: {
    marginLeft: 23,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  orderButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -20,
  },
});

export default PaymentScreen;
