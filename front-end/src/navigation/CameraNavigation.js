import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import CameraScreen from '../screens/CameraScreen';
import FoodFactsScreen from '../screens/FoodFactsScreen';

const Stack = createStackNavigator();

const CameraNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.FOOD_FACTS} component={FoodFactsScreen} />
  </Stack.Navigator>
);

export default CameraNavigator;
