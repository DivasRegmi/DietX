import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';

import Button from './Button';

const ButtonToggle = ({ state, ...otherProps }) => {
  const styles = {
    textColor: state ? colors.white : colors.text.textSecondary,
    iconColor: state ? colors.white : colors.text.textSecondary,
    color: state ? colors.primary.dark : colors.softLight,
  };
  return <Button {...styles} {...otherProps} />;
};

export default ButtonToggle;
