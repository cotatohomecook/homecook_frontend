import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreditModalComponent = ({ modalVisible, closeModal, totalPrice }) => {
  const ImageUri = [
    "https://velog.velcdn.com/images/kkaerrung/post/43c083db-cb97-4585-a3d3-dd1421950917/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/cc70041a-3b7b-428e-8b6a-a10e26eea063/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/96010dbc-c24f-4010-bff9-395dc4219687/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/7bdb72ce-dd79-4558-8649-05c650305d54/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/30652b1c-829f-4ed2-ad91-99e9e59f2cf3/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/826e008b-7c4d-47b8-929a-26af552c2057/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/63838021-67a1-4003-bbd3-2454611a865e/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/d33e341a-8cea-419b-9dde-bedeed072c93/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/f51a1c74-ba69-4422-b0fc-981117b7cf83/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/74fd3fe8-1804-4cfe-853c-242ab7a52635/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/b6e41644-e940-4d75-a2d1-13a2edb73d87/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/0ec4ad01-3a57-415c-98f6-d45127bf573c/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/8eaf7d9b-f01d-4286-8e3f-104a97f79de4/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/8b0a8a4d-c736-4fa9-a083-10b790b32bc3/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/2f823e07-654f-42c4-887f-f66e4575fae6/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/b26ebca6-015c-4429-b1d3-d35f650e9f92/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/bfec992d-676e-434e-b250-84cb0ef6be30/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/b6ca9e2d-8079-4884-bb1c-5114ab288fb7/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/1501bc33-862f-497a-9650-a4c9494f0168/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/610d6522-247d-4426-ae14-cb8b6be3c19d/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/6e665dce-d8ec-4faa-8dba-ee66937b3a27/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/27ecb160-9dd5-4db3-b09d-9d7d50ec4ea6/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/dc40dacc-3e40-47ed-b189-2689d2022d5b/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/7c58e302-d7a1-46f5-8f42-c75dff4670dd/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/0fdfe047-e566-4271-aa93-a387166b6188/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/72edf8cd-35dc-4978-89eb-18f74397a4a4/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/3785a5f3-ab25-41d9-9200-4689d3054927/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/ab90a015-5273-43e1-aed6-30a8b1fa2224/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/1ee695bb-21a0-47aa-986e-45f2de444012/image.png",
    "https://velog.velcdn.com/images/kkaerrung/post/44f766f6-d495-4796-9738-d7b1d2450c16/image.png",
  ];

  const TextData = [
    "농협은행",
    "카카오뱅크",
    "국민은행",
    "신한은행",
    "우리은행",
    "토스뱅크",
    "기업은행",
    "하나은행",
    "새마을금고",
    "부산은행",
    "대구은행",
    "케이뱅크",
    "산업은행",
    "우체국",
    "SC제일",
    "경남은행",
    "전북은행",
    "신협",
    "광주은행",
    "저축은행",
    "수협",
    "시티은행",
    "뱅크오브아메리카",
    "산림조합",
    "HSBC",
    "중국공산은행",
    "도이치은행",
    "JP모간체이스",
    "BNP파리바은행",
    "중국건설은행",
  ];
  const renderGridItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleCreditPress(index)}>
      <View style={styles.gridItem}>
        <Image source={{ uri: item }} style={styles.images} />
        <Text style={styles.text}>{TextData[index]}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleGoBack = () => {
    closeModal();
  };

  const navigation = useNavigation();
  const handleCreditPress = (index) => {
    const selectedText = TextData[index];
    navigation.navigate("PaymentScreen", {
      selectedText: selectedText,
      totalPrice: totalPrice,
    });
    closeModal();
  };
  return (
    <View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleGoBack}>
              <Image
                style={styles.backbutton}
                source={{
                  uri: "https://velog.velcdn.com/images/kkaerrung/post/2b0ed3a4-5cbb-4205-bc91-d7c9c08c4974/image.png",
                  width: 14,
                  height: 14,
                }}
              />
            </TouchableOpacity>

            <FlatList
              data={ImageUri}
              renderItem={renderGridItem}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              style={styles.cardStyle}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    width: 371,
    height: 780,
  },
  backbutton: {
    marginLeft: 300,
    marginTop: 10,
  },
  images: {
    width: 50,
    height: 50,
    marginTop: 17,
  },
  text: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "bold",
  },
  gridItem: {
    backgroundColor: "#F5F5F5",
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 14,
    marginTop: 20,
  },
});

export default CreditModalComponent;
