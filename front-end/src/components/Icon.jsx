import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import colors from '../config/colors'

function Icon({
  name,
  size = 40,
  backgroundColor = colors.primary.dark,
  iconColor = '#fff',
  materialIcons,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      {materialIcons ? (
        <MaterialIcons name={name} color={iconColor} size={size * 0.5} />
      ) : (
        <FontAwesome name={name} color={iconColor} size={size * 0.5} />
      )}
    </View>
  );
}

export default Icon;
