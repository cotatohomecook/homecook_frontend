import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../../common/Header';
import BackButton from '../../common/BackButton';
import { useNavigation } from '@react-navigation/native';

function MyPage() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('CustomerStartScreen');
  };

  return (
    <>
      <Header height={114} title={'배달현황'} />
      <BackButton onPress={handleGoBack} top={-45} />
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.text}>순이네 집밥</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://velog.velcdn.com/images/thgus05061/post/e9213801-3aae-4e4b-8702-a85bfa114222/image.png',
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.bottomText}>분 후 도착!</Text>
        <Text style={styles.bottomMinuteText}>10</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxContainer: {
    width: 347,
    height: 60,
    borderRadius: 9,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bottomText: {
    position: 'absolute',
    bottom: 100,
    left: 150,
    width: 200,
    height: 44,
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  bottomMinuteText: {
    position: 'absolute',
    bottom: 100,
    left: 105,
    width: 153,
    height: 44,
    fontSize: 32,
    color: '#ffb15f',
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, 
  },
  image: {
    width: 260,
    height: 319,
  },
});

export default MyPage;