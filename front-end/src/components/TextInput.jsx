import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';
import AppText from './Text';

function AppTextInput({ title, placeholder, ...otherProps }) {
  return (
    <View style={styles.topContainer}>

      {title && < AppText size="subTitle1" style={styles.title}>
        {title}
      </AppText>}


      <View style={[styles.container]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={defaultStyles.colors.text.subTitle}
          style={[defaultStyles.text, styles.textInput]}
          returnKeyType="done"
          {...otherProps}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginBottom: 15,
  },
  container: {
    backgroundColor: defaultStyles.colors.softLight,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
  },
  textInput: {
    width: '100%',
  },
  title: {
    marginLeft: 5,
  },
});

export default AppTextInput;
