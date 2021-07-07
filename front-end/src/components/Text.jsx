import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

function AppText({ children, size, style, ...otherProps }) {
  return (
    <Text
      style={[defaultStyles.text, defaultStyles[size], style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export default AppText;
