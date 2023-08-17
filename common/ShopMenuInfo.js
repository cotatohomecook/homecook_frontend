import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMenuId } from "../store/redux/shopInfo";
import { useNavigation } from "@react-navigation/native";

const ShopMenuInfo = () => {
  const shopInfo = useSelector((state) => state.shopInfo);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleMenuClick = (
    shopId,
    menuId,
    shopName,
    menuName,
    imageUrl,
    description,
    price
  ) => {
    navigation.navigate("MenuDetailScreen", {
      shopId,
      menuId,
      shopName,
      menuName,
      imageUrl,
      description,
      price,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {shopInfo.data.menus.map((menu) => (
        <TouchableOpacity
          key={menu.menuId}
          style={styles.button}
          onPress={() =>
            handleMenuClick(
              shopInfo.data.shopId,
              menu.menuId,
              shopInfo.data.shopName,
              menu.menuName,
              menu.imageUrl,
              menu.description,
              menu.price
            )
          }
        >
          <View key={menu.menuId} style={styles.button}>
            <Image
              source={{
                uri: menu.imageUrl,
                width: 93,
                height: 93,
              }}
              style={styles.menuImg}
            />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{menu.menuName}</Text>
              <Text style={styles.menuDetail}>{menu.description}</Text>
              <Text style={styles.menuIngredient}>
                구성재료:{" "}
                {menu.ingrediants.map((ingredient, index) => (
                  <Text
                    style={styles.ingredientText}
                    key={ingredient.ingrediantId}
                  >
                    {ingredient.ingrediant}
                    {index !== menu.ingrediants.length - 1 ? " , " : "..."}
                  </Text>
                ))}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{menu.price}원</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.ScrollView} />
    </ScrollView>
  );
};

export default ShopMenuInfo;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 10,
  },
  button: {
    marginBottom: 15,
    width: 364,
    height: 119,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },
  menuInfo: {
    flexDirection: "column",
    marginLeft: 13,
    top: 10,
  },
  menuImg: {
    borderRadius: 17,
    marginLeft: 12,
    top: 15,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 600,
    top: -10,
  },
  menuDetail: {
    fontSize: 12,
    fontWeight: 600,
    top: 0,
  },
  menuIngredient: {
    top: 20,
    flexDirection: "row",
    fontSize: 8,
  },
  ingredientText: {
    fontSize: 9,
    marginLeft: 10,
  },
  priceContainer: {
    marginLeft: 100,
    top: -15,
  },
  priceText: {
    width: 66,
    height: 22,
    top: 20,
    fontWeight: 600,
    fontSize: 15,
    marginLeft: 70,
  },
  ScrollView: {
    height: 30,
  },
});
