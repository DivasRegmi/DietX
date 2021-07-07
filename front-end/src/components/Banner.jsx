import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Banner = (source, style) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source.source} style={styles.bannerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 164,
  },
});

export default Banner;
