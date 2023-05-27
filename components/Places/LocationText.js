import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { getAddress } from "../../utill/location";

const latitude = 37.602643;
const longitude = 126.924805;

function LocationText() {
  const [address, setAddress] = useState("");

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

  return <Text style={styles.addressText}>{address}</Text>;
}

const styles = StyleSheet.create({
  addressText: {
    fontFamily: "NotoSansKR",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#3d67ff",
  },
});

export default LocationText;
