import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Prompt from 'react-native-input-prompt';

const AppPrompt = ({ visible, ...otherProps }) => {
  return (
    <ImageBackground
      source={require('../assets/brakefast.jpg')}
      style={styles(visible).container}
    >
      <Prompt visible={visible} {...otherProps} />
    </ImageBackground>
  );
};

const styles = (visible) =>
  StyleSheet.create({
    container: {
      width: visible ? '100%' : 0,
      height: visible ? '100%' : 0,
      position: 'absolute',
    },
  });

export default AppPrompt;
