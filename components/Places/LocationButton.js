import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAddress } from "../../utill/location";

const latitude = 37.602643;
const longitude = 126.924805;

function LocationButton() {
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const handleLocation = async () => {
      try {
        const fetchedAddress = await getAddress(latitude, longitude);
        setAddress(fetchedAddress);
      } catch (error) {
        console.error(error);
      }
    };

    handleLocation();
  }, [latitude, longitude]);

  const handlePress = () => {
    navigation.navigate("CustomerMap");
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
      <Text style={styles.buttonText}>{address}</Text>
    </TouchableOpacity>
  );
}

export default LocationButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    elevation: 3,
    width: 69,
    height: 27,
    zIndex: 10,
  },
  buttonText: {
    width: 34,
    height: 17,
    fontFamily: "NotoSansKR",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#3d67ff",
    top: 5,
    left: 18,
  },
});
