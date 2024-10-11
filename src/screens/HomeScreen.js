import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask } from '../redux/tasksSlice';
import { getTasks, storeTasks } from '../storage/storage';
import colors from '../theme/colors';
import TaskSection from '../components/TaskSection';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await getTasks();
      storedTasks.forEach(task => dispatch(addTask(task)));
    };

    const loadUserName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    };

    loadTasks();
    loadUserName();
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    dispatch(deleteTask(taskId));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await storeTasks(updatedTasks);
  };

  const handleToggleCompletion = async (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'Pending' 
          ? 'In Progress' 
          : task.status === 'In Progress' 
          ? 'Completed' 
          : 'Pending';
        const newCompleted = newStatus === 'Completed';
        return { ...task, status: newStatus, completed: newCompleted };
      }
      return task;
    });

    updatedTasks.forEach(task => {
      if (task.id === taskId) {
        dispatch(editTask(task));
      }
    });

    await storeTasks(updatedTasks);
  };

  // Organize tasks into categories
  const today = moment().startOf('day');
  const todayTasks = tasks.filter(task => moment(task.dueDate).isSame(today, 'day') && task.status !== 'Completed');
  const upcomingTasks = tasks.filter(task => moment(task.dueDate).isAfter(today, 'day') && task.status !== 'Completed');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Greeting */}
      <Text style={styles.greeting}>Hi, {userName || 'there'}!</Text>

      {/* Heading */}
      <Text style={styles.heading}>Task Manager</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>No tasks available. Add a task!</Text>
        ) : (
          <>
            <TaskSection 
              title="Upcoming" 
              tasks={upcomingTasks} 
              onDelete={handleDelete} 
              onToggleCompletion={handleToggleCompletion}
              onPress={(task) => navigation.navigate('TaskDetail', { task })}
            />
            <TaskSection 
              title="Today" 
              tasks={todayTasks} 
              onDelete={handleDelete} 
              onToggleCompletion={handleToggleCompletion}
              onPress={(task) => navigation.navigate('TaskDetail', { task })}
            />
            <TaskSection 
              title="Completed" 
              tasks={completedTasks} 
              onDelete={handleDelete} 
              onToggleCompletion={handleToggleCompletion}
              onPress={(task) => navigation.navigate('TaskDetail', { task })}
            />
          </>
        )}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('TaskDetail')}
      >
        <Icon name="add" size={24} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  greeting: {
    fontSize: 20,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default HomeScreen;
