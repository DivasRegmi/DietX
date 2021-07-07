import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import defaultStyles from '../config/styles'
import colors from '../config/colors';

const SearchBar = (
  { style,
    onPressSearch,
    ...otherProps }
) => {
  return (
    <View style={[styles.container, style]}>

      <TextInput
        placeholderTextColor={defaultStyles.colors.text.textSecondary}
        style={[defaultStyles.text, styles.inputText]}
        returnKeyType="done"
        {...otherProps}
      />
      <TouchableOpacity onPress={onPressSearch} style={styles.search}>
        <FontAwesome name="search" color={colors.text.textSecondary} size={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  inputText: {
    padding: 4,
    paddingLeft: 10,
    borderRadius: 15,
    flex: 9,
    borderColor: "#d1d1d1",
    borderWidth: 1,
    backgroundColor: colors.white,
  },

  search: {
    position: 'absolute',
    right: 12,
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default SearchBar;
