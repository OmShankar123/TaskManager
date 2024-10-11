import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store tasks
export const storeTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem('@tasks', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

// Function to get tasks
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@tasks');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
  }
};

// Function to store user name
export const storeUserName = async (name) => {
  try {
    await AsyncStorage.setItem('@userName', name);
  } catch (e) {
    console.error(e);
  }
};

// Function to get user name
export const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem('@userName');
    return name !== null ? name : '';
  } catch (e) {
    console.error(e);
  }
};
