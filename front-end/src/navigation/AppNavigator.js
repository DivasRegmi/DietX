import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import DoctorListNavigator from './DoctorListNavigator';
import CameraNavigation from './CameraNavigation';
import HomeNavigator from './HomeNavigator';

import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator tabBarOptions={{ keyboardHidesTabBar: true }}>
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Camera"
      component={CameraNavigation}
      options={() => ({
        title: 'Camera',
        tabBarIcon: ({ color, size }) => (
          <View style={styles.middleIcon}>
            <MaterialCommunityIcons
              name="camera-iris"
              color={color}
              size={40}
            />
          </View>
        ),
      })}
    />
    <Tab.Screen
      name="DoctorsList"
      component={DoctorListNavigator}
      options={() => ({
        title: 'Nutritionist',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="laptop-medical" color={color} size={size} />
        ),
      })}
    />
    {/* <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  middleIcon: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    position: 'relative',
    top: -1,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
