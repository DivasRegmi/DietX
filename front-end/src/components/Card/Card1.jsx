import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';
import AppText from '../Text';

const Card1 = ({ image, title, subTitle, calorie, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={image} />
      <View style={styles.texts}>
        <AppText>{title}</AppText>

        <AppText size="subTitle1">{calorie} calories</AppText>

        <AppText size="subTitle1">{subTitle}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  texts: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default Card1;
