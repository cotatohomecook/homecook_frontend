import React from 'react';
import { View, Text, Image } from 'react-native';

const StarRating = ({ rating, width, height }) => {
  const starView = rating * (width / 5);

  return (
    <View style={styles.starsContainer}>
      <View style={styles.star}>
        <Image
          style={[styles.starImage, { width: width, height: height }]}
          source={{
            uri: "https://velog.velcdn.com/images/kkaerrung/post/e37933ac-259a-49a1-9fcd-d929df92fad9/image.png",
          }}
        />
        <View style={[styles.starImage, styles.yellowStar, { width: starView }]}>
          <Image
            style={{ width: width, height: height }}
            source={{
              uri: "https://velog.velcdn.com/images/kkaerrung/post/bec7292c-f5ae-49c4-bd21-0210d605b9ff/image.png",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 5,
    top: -20,
  },
  star: {
    position: 'relative',
  },
  starImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  yellowStar: {
    overflow: 'hidden',
  },
};

export default StarRating;

