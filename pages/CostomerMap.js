import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

function Map({ navigation }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          'http://3.38.33.21:8080/api/shops/rank?latitude=37.602643&longitude=126.924805'
        );
        setShops(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShops();
  }, []);

  const region = {
    latitude: 37.602643,
    longitude: 126.924805,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
    >
      {/* Add markers for shops */}
      <Marker
        title="Current Location"
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
      />
      {shops.length > 0 &&
        shops.map((shop) => (
          <Marker
            key={shop.shopId}
            title={shop.shopName}
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
