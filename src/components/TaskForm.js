// src/components/TaskForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/tasksSlice';
import { getTasks, storeTasks } from '../storage/storage'; // Import storage functions
import colors from '../theme/colors';

const TaskForm = ({ existingTask, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [dueDate, setDueDate] = useState(existingTask ? existingTask.dueDate : '');

  const handleSubmit = async () => {
    const task = {
      id: existingTask ? existingTask.id : Date.now(),
      title,
      description,
      dueDate,
      completed: false,
    };

    if (existingTask) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }

    // Persist tasks to AsyncStorage
    const tasks = await getTasks(); // Get current tasks from AsyncStorage
    tasks.push(task); // Add new/updated task
    await storeTasks(tasks); // Store tasks

    onClose(); // Close the form after submission
  };

  return (
    <View>
      <TextInput 
        placeholder="Title" 
        value={title} 
        onChangeText={setTitle} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Due Date" 
        value={dueDate} 
        onChangeText={setDueDate} 
        style={styles.input} 
      />
      <Button 
        title="Save Task" 
        onPress={handleSubmit} 
        color={colors.primary} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.background,
  },
});

export default TaskForm;
