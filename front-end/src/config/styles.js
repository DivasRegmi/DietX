import { Platform } from 'react-native';

import colors from './colors';

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 22,
  },
  h4: {
    fontSize: 20,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 15,
  },
  subTitle1: {
    fontSize: 14,
    color: colors.text.subTitle,
  },
  subTitle2: {
    fontSize: 12,
    color: colors.text.textSecondary,
  },
};
