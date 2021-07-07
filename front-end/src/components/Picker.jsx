import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import colors from '../config/colors';

const AppPicker = ({ children, style, ...otherProps }) => {
  return (
    <View style={[styles.container, styles]}>
      <Picker style={styles.picker} {...otherProps}>
        {children}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgLight,
    borderRadius: 20,
    paddingLeft: 10,
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'android' ? 40 : 200,
  },
});

export default AppPicker;
