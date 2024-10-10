import React, { useEffect } from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion } from '../redux/tasksSlice';
import TaskItem from '../components/TaskItem';
import { getTasks, storeTasks } from '../storage/storage';

const HomeScreen = ({ navigation }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await getTasks();
      storedTasks.forEach(task => dispatch(addTask(task)));
    };

    loadTasks();
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    dispatch(deleteTask(taskId));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await storeTasks(updatedTasks);
  };

  const handleToggleCompletion = async (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
    
    // Update AsyncStorage after toggling
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    await storeTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('TaskDetail')} />
      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available. Add a task!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => handleDelete(item.id)}
              onToggleCompletion={() => handleToggleCompletion(item.id)} // Updated call
              onPress={() => navigation.navigate('TaskDetail', { task: item })}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
