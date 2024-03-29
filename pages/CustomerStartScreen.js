import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import LocationButton from "../components/Places/LocationButton";
import CustomerStoreRank from "../components/Home/CustomerStoreRank";
import CustomerStoreSlide from "../components/Home/CustomerStoreSlide";
import CustomerStoreCategory from "../components/Home/CustomerStoreCategory";

function CustomerStartScreen() {
  return (
    <>
      <View style={styles.imageContainer}>
        <Text style={styles.title}>지금 내 지역은?</Text>

        <View style={[styles.position, styles.color]}>
          <Image
            source={{
              uri: "https://velog.velcdn.com/images/kkaerrung/post/efcd26f6-62fd-4a75-9437-0453832e0472/image.png",
              width: 14.18,
              height: 13,
            }}
          />
        </View>
        <View style={styles.locationbutton}>
          <LocationButton />
        </View>
      </View>

      <View style={[styles.whitebox]}></View>
      <Text style={[styles.text]}>지금까지 누적 랭킹입니다.</Text>

      <View style={styles.textdesign}>
        <CustomerStoreRank />
      </View>
      <Text style={styles.how}> 오늘은 어떤</Text>
      <Text style={styles.food}>음식 </Text>
      <Text style={styles.want}>이 땡기세요?</Text>

      <View style={styles.storeslide}>
        <CustomerStoreSlide />
      </View>
      <View style={styles.categoryslide}>
        <CustomerStoreCategory />
      </View>
    </>
  );
}
export default CustomerStartScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 393,
    height: 168,
    left: 0,
    top: 0,
    backgroundColor: "#FFB15F",
    borderRadius: 16,
    zIndex: 2,
    elevation: 11,
  },

  position: {
    position: "absolute",
    width: 14.18,
    height: 13,
    left: 220,
    top: 91,
  },
  color: {
    position: "absolute",
    width: 13,
    height: 12,
    left: 220.5,
    top: 95,
  },
  locationbutton: {
    top: 16,
    left: 90,
  },
  title: {
    position: "absolute",
    width: 224,
    height: 22,
    left: 79,
    top: 88,
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 19,
    color: "#000000",
  },
  whitebox: {
    position: "absolute",
    width: 328,
    height: 44,
    left: 33,
    top: 147,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 7,
    zIndex: 3,
  },
  text: {
    position: "absolute",
    width: 131,
    height: 17,
    left: 49,
    top: 159,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
    zIndex: 4,
    color: "#000000",
  },
  textdesign: {
    position: "absolute",
    width: 87,
    height: 17,
    left: 263,
    top: 160,
    zIndex: 5,
    fontWeight: 500,
    fontSize: 12,
    color: "#000000",
  },
  how: {
    position: "absolute",
    width: 278,
    height: 38,
    left: 58,
    top: 209,
    fontWeight: 500,
    fontSize: 20,
    color: "#000000",
  },
  food: {
    position: "absolute",
    width: 69,
    height: 38,
    left: 170,
    top: 206,
    fontWeight: 900,
    fontSize: 24,
    color: "#F3AC61",
  },
  want: {
    position: "absolute",
    width: 130,
    height: 29,
    left: 220,
    top: 210,
    fontWeight: 500,
    fontSize: 20,
    color: "#000000",
  },
  slide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 0,
    gap: 15,
    position: "absolute",
    width: 510,
    height: 160,
    left: 10,
    top: 0,
  },
  box: {
    position: "absolute",
    width: 160,
    height: 160,
    left: 0,
    top: 0,
    background: "#FFB15F",
    borderRadius: 30,
  },

  gridItem: {
    flex: 1,
    margin: 15,
    width: 160,
    height: 160,
    marginTop: 200,
    borderRadius: 30,
    elevation: 4,
    backgroundColor: "#FFB15F",
  },
  buttons: {
    flex: 1,
    top: 8,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: 30,
    heigth: 200,
  },
  titles: {
    flex: 1,
    position: "absolute",
    width: 79,
    height: 19,
    top: 99,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 13,
    color: "#FFFFFF",
  },
  details: {
    position: "absolute",
    width: 39,
    height: 14,
    textAlign: "center",
    top: 124,
    fontWeight: 500,
    fontSize: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  storeslide: {
    flex: 1,
    width: "100%",
    top: 130,
  },
  Meals: {
    position: "absolute",
    width: 393,
    height: 27,
    left: 0,
    top: 450,
  },
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#eee",
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  categoryslide: {
    top: 50,
    height: 400,
  },
});
