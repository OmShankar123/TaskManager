
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors'; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary, 
        },
        tabBarActiveTintColor: colors.secondary, 
        tabBarInactiveTintColor: colors.label, 
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="information-circle-outline" size={24} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
