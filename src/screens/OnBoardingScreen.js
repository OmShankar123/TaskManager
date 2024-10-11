import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import colors from '../theme/colors';

const OnboardingScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleGetStarted = async () => {
    if (userName.trim()) {
      
      try {
        await AsyncStorage.setItem('userName', userName.trim());
        navigation.replace('BottomTab', { userName });
      } catch (error) {
        Alert.alert('Error', 'Failed to save your name. Please try again.');
      }
    } else {
      Alert.alert('Input Required', 'Please enter your name to get started!');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Text style={styles.title}>Welcome to Task Manager</Text>
      <Text style={styles.description}>
        This app helps you stay organized by allowing you to create, manage, and track your tasks efficiently. 
        Set due dates, monitor your progress, and mark tasks as completed with ease.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name to know you better 😊"
        placeholderTextColor={colors.label}
        value={userName}
        onChangeText={setUserName}
      />

      <TouchableOpacity onPress={handleGetStarted} style={styles.getStartedButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.label,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    width: '100%',
    color: colors.label,
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    top:20
  },
  buttonText: {
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default OnboardingScreen;
