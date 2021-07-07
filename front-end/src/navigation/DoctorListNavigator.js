import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DoctorsListScreen from '../screens/DoctorsListScreen';
import DoctorDetailsScreen from '../screens/DoctorDetailsScreen';

import routes from './routes';

const Stack = createStackNavigator();

const DoctorListNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DoctorsList"
      component={DoctorsListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.DOCTOR_DETAILS}
      component={DoctorDetailsScreen}
      options={{ title: 'Details' }}
    />
  </Stack.Navigator>
);

export default DoctorListNavigator;
