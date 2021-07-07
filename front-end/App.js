import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import navigationTheme from './src/navigation/navigationTheme';
import AppNavigator from './src/navigation/AppNavigator';
import FoodFacts from './src/screens/FoodFactsScreen';

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator />
    </NavigationContainer>
    // <FoodFacts />
  );
}
