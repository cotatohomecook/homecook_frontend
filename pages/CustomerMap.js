import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const { width } = Dimensions.get('window');

function CustomerMap({ navigation }) {
  const [shops, setShops] = useState([]);

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

  console.log(shops)

  const region = {
    latitude: 37.602643,
    longitude: 126.924805,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

 
  const circleRadius = 1500; // 3km

  //가게 마커 스타일링
  const renderMarkerIcon = (shop) => {

    return (
    
      <View style={styles.markerContainer}>
        <Text style={styles.markerText}>{shop.rating}</Text>
      </View>
    );
  };

  //현재 위치 마커 스타일링
  const currentMarkerIcon = () => {

    return (
      <>
      <View style={styles.currentmarkerContainer}>
        <View style = {styles.currentmarkerInner}></View>
      </View>

      </>
    );
  };

  return (
    <>
    <View stlye = {styles.header}></View>
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {/* Add markers for current location */}
        <Marker
          title="Current Location"
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          >
          {currentMarkerIcon()}
        </Marker>
      

        {shops.map((shop) => (
          <Marker
            key={shop.shopId}
            title={shop.shopName}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
          >
          {renderMarkerIcon(shop)}
          </Marker>
        ))}

        {/* Add circle for 3km radius */}
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
    {shops.length > 0 && (
      <Carousel
      data={shops}
      renderItem={({ item }) => (
        <View style={styles.slide}>
          <Image source ={{uri: item.imageUrl,"width":100, "height": 129}}/>
          <Text style={styles.shopName}>{item.shopName}</Text>
          <Text style={styles.shopId}>{item.shopId}</Text>

          <View style={styles.starsContainer}>
          {Array.from({ length: 5 }, (_, index) => {
          if (index < item.rating) {
            return <Text key={index} style={[styles.starIcon, styles.yellowStar]}>★</Text>;
          } else {
            return <Text key={index} style={[styles.starIcon, styles.grayStar]}>★</Text>;
        }
      })}
    </View>
  </View>
      )}
      sliderWidth={width}
      itemWidth={252}
      itemHeight={129}
    />
  )}
</View>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  header:{ 
    width: 393,
    height: 168,
    backgroundColor: "#ffb15f",
    zIndex: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carouselContainer: {
    flex: 1,
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
  shopsmarker:{
    height: 24,
    width: 34,
    left: 0,
    top: 0,
    borderRadius: 12,
    backgroundColor: '#A8A8A8'
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 5,
    top: -100,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 2,
    left: 40,
    top: -20,
  },
  yellowStar: {
    color: '#ff7f00',
  },
  grayStar: {
    color: '#D3D3D3',
  },
  shopsmarker: {
    height: 50,
    width: 100,
    borderRadius: 8,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopRating: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  markerContainer: {
    width: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#a8a8a8"
  },
  markerText:{
    textAlign: 'center'
  },
  currentmarkerContainer:{ 
    width: 46,
    height: 46,
    backgroundColor: "#F05650",
    borderRadius: 50,
    zIndex: 1,
  },
  currentmarkerInner:{
  width: 16,
  height: 16,
  borderRadius: 50,
  backgroundColor:'#FFFFFF',
  zIndex: 3,
  left: 14,
  top: 14,
  
 
  }
})
export default CustomerMap;