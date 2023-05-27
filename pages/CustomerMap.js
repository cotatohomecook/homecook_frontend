import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import StarRating from '../common/StarRating';

const { width } = Dimensions.get('window');

function CustomerMap() {
  const [shops, setShops] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          'http://3.38.33.21:8080/api/shops/map?latitude=37.602643&longitude=126.924805'
        );
        setShops(response.data.data);
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

  const circleRadius = 3000; // 3km

  const renderMarkerIcon = (shop) => {
    return (
      <View style={styles.markerContainer}>
        <Text style={styles.markerText}>{shop.rating}</Text>
      </View>
    );
  };

  const currentMarkerIcon = () => {
    return (
      <View style={styles.currentmarkerContainer}>
        <View style={styles.currentmarkerInner}></View>
      </View>
    );
  };

  const handleMarkerPress = (selectedShopId) => {
      carouselRef.current.snapToItem(selectedShopId);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          title="Current Location"
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          {currentMarkerIcon()}
        </Marker>
      
        {shops.map((shop, index) => (
          <Marker
            key={shop.shopId}
            title={shop.shopName}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            onPress={() => handleMarkerPress(index)} 
          >
            {renderMarkerIcon(shop)}
          </Marker>
        ))}

        <Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          radius={circleRadius}
          strokeColor="rgba(158, 158, 255, 0.5)"
          fillColor="rgba(158, 158, 255, 0.2)"
        />
      </MapView>

      
        <View style={styles.carouselContainer}>
          <Carousel
              ref={carouselRef} 
              data={shops}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={{ uri: item.imageUrl, width: 100, height: 129 }} />
                <Text style={styles.shopName}>{item.shopName}</Text>
                <Text style={styles.shopId}>{item.shopId}</Text>
                <Text style={styles.shopReview}>리뷰 수: {item.reviewCount}</Text>
                <View style={styles.shopStar}>
                  <StarRating rating={item.rating} width={108} height={19} /> 
                </View>
              </View>
            )}
            sliderWidth={width}
            itemWidth={252}
            itemHeight={129}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
  },
  slide: {
    width: 252,
    height: 129,
    left: -40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    zIndex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    left: 130,
    top: -110,
  },
  shopReview: {
    width: 92,
    height: 14,
    top: -140,
    left: 110,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.7,
    textAlign: "center",
    color: "#77838f",
  },
  shopStar: {
    left: 70,
    top: -110,
    width: 108,
    height: 19,
  },
  markerContainer: {
    width: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#a8a8a8",
  },
  markerText: {
    textAlign: 'center',
  },
  currentmarkerContainer: {
    width: 46,
    height: 46,
    backgroundColor: "#F05650",
    borderRadius: 50,
    zIndex: 1,
  },
  currentmarkerInner: {
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    zIndex: 3,
    left: 14,
    top: 14,
  },
});

export default CustomerMap;
