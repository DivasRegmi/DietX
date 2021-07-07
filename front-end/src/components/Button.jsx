import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function AppButton({
  title,
  onPress,
  color = colors.primary.dark,
  textColor = colors.white,
  icon,
  iconSize = 20,
  iconColor = colors.white,
  style,
  materialIcons,
  fontAwesome
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      {icon && fontAwesome && (
        <FontAwesome
          name={icon}
          color={iconColor}
          size={iconSize}
          style={styles.icon}
        />
      )}
      {icon && materialIcons && (
        <MaterialIcons
          name={icon}
          color={iconColor}
          size={iconSize}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default AppButton;
