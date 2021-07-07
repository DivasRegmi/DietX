import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import Colors from '../config/colors';
import AppText from './Text';

const Circle = ({ primaryText, secondaryText, color = colors.white }) => {
  return (
    <View style={styles.circle}>
      <AppText size="h4" style={{ color }}>
        {primaryText}
      </AppText>
      <AppText size="subTitle2" style={{ color }}>
        {secondaryText}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Circle;
