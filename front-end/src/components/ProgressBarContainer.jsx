import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import AppText from './Text';

const ProgressBarContainer = ({ title, subTitle, color }) => {
  return (
    <View style={styles.container}>
      <AppText size="subTitle1">{title}</AppText>

      <ProgressBar progress={0.5} color={color} style={styles.bar} />

      <AppText size="subTitle2">{subTitle}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bar: {
    width: 120,
    marginTop: 7,
    marginBottom: 7,
    height: 10,
    borderRadius: 15,
  },
});

export default ProgressBarContainer;
