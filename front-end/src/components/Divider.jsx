import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors';

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.softLight,
  },
});

export default Divider;
