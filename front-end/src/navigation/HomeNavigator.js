import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import CalculatorDetailsScreen from '../screens/CalculatorDetailsScreen';
import FoodFactsScreen from '../screens/FoodFactsScreen';

import routes from './routes';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.CALCULATOR} component={CalculatorScreen} />

    <Stack.Screen
      name={routes.CALCULATOR_DETAILS}
      component={CalculatorDetailsScreen}
    />
    <Stack.Screen
      name={routes.ADDFOOD}
      component={AddFoodScreen}
      options={({ route }) => ({ title: route.params.name })}
    />

    <Stack.Screen name={routes.FOOD_FACTS} component={FoodFactsScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
