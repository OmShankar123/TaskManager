// AppNavigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        setIsOnboarding(!userName); 
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserData();
  }, []);

  if (isLoading) {
    return <SplashScreen />; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboarding ? (
          <Stack.Screen 
            name="OnBoarding" 
            component={OnboardingScreen} 
            options={{ headerShown: false }} 
          />
        ) : (
          null
          
        )}
        <Stack.Screen 
            name="BottomTab" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
