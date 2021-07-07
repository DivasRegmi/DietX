import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';
import AppText from '../Text';

const DoctorCard = ({ image, title, number, money, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={image} />

      <View style={styles.texts}>
        <AppText>{title}</AppText>
        <View>
          <AppText size="body2">{number}</AppText>
        </View>
        <View style={styles.inline}>
          <AppText size="body2">${money}</AppText>
          <AppText size="subTitle1">/hrs</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  texts: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default DoctorCard;
