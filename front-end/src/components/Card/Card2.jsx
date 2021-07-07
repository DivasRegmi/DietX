import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../../config/colors';
import AppText from '../Text';

const Card2 = ({ image, title, subTitle, info, swipe, info2 }) => {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.texts}>
        <AppText>{title} </AppText>
        <AppText size="subTitle2">{subTitle}</AppText>
        <AppText size="subTitle2" style={styles.subTitle} >{info}</AppText>
        {
          info2 && <AppText size="subTitle2" style={styles.subTitle} >{info2}</AppText>
        }


      </View>

      {
        swipe && <FontAwesome
          name="chevron-right"
          color={colors.softLight}
          style={styles.icon}
        />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  texts: {
    paddingLeft: 5,
    // paddingTop: 10,
    justifyContent: 'space-around',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 'auto',
  },
  subTitle: {
    width: '100%',
    flex: 1,
    flexWrap: 'wrap'
  }
});

export default Card2;
