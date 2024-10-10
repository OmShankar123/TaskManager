import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/tasksSlice';
import { storeTasks, getTasks } from '../storage/storage';

const TaskDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { task } = route.params || {};

  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

  const handleSubmit = async () => {
    const newTask = {
      id: task ? task.id : Date.now().toString(),
      title,
      description,
      dueDate,
      completed:task ?task.completed:false,
    };

    if (task) {
      dispatch(editTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }

    // Get current tasks from AsyncStorage
    const tasks = await getTasks();

    // Update or add the task in the tasks array
    const updatedTasks = tasks.filter(t => t.id !== newTask.id);
    updatedTasks.push(newTask);

    // Store the updated tasks back to AsyncStorage
    await storeTasks(updatedTasks);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <Button title="Save Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
});

export default TaskDetailScreen;
