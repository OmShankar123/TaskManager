import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/tasksSlice';
import { storeTasks, getTasks } from '../storage/storage';
import colors from '../theme/colors';
import TaskForm from '../components/TaskForm';
import Icon from 'react-native-vector-icons/Ionicons'; 

const TaskDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { task } = route.params || {};

  const handleClose = () => {
    navigation.goBack();
  };

  const handleTaskSubmit = async (newTask) => {
    if (task) {
      dispatch(editTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }

    const tasks = await getTasks();
    const updatedTasks = tasks.filter(t => t.id !== newTask.id);
    updatedTasks.push(newTask);
    await storeTasks(updatedTasks);

    handleClose(); 
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleClose} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon name="arrow-back" size={30} color={colors.secondary} />
      </TouchableOpacity> */}

      <Text style={styles.heading}>Create New Task</Text>

      <TaskForm
        existingTask={task} 
        onClose={handleClose} 
        onSubmit={handleTaskSubmit} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
  //  padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    padding:16
  },
  backButton: {
    position: 'absolute',
    // top: 10,
    left: 10, 
    padding: 20, 
    // backgroundColor:'red'
  },
});

export default TaskDetailScreen;
